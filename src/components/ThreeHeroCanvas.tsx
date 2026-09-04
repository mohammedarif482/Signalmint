import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ThreeHeroCanvasProps {
  runwayId?: string;
}

export function ThreeHeroCanvas({ runwayId = "hero-runway" }: ThreeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.8);

    // 2. WebGL Renderer with High-DPI & Film Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. Studio Lighting Rig (bouncing off coaster surface)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3.5, 5, 3.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe7e6fb, 1.6);
    fillLight.position.set(-4, -1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x6495eb, 1.2);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);

    // 4. Model Anchor Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Initial base tilt (angled toward camera like Oryzo)
    modelGroup.rotation.x = 0.55;
    modelGroup.rotation.y = -0.2;

    // 5. Load official 3D model (oryzo_coaster.glb) with procedural fallback
    let isLoaded = false;
    const loader = new GLTFLoader();

    loader.load(
      "/oryzo_coaster.glb",
      (gltf) => {
        const root = gltf.scene;

        // Auto-center & compute scale
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2.4 / (maxDim || 1);

        root.position.sub(center);
        root.scale.setScalar(scaleFactor);

        // Enhance material properties for realistic tactile lighting
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(mat.roughness ?? 0.7, 0.65);
              mat.metalness = Math.min(mat.metalness ?? 0.1, 0.15);
              mat.needsUpdate = true;
            }
          }
        });

        modelGroup.add(root);
        isLoaded = true;
      },
      undefined,
      (error) => {
        console.warn("GLTF Load error, creating high-fidelity procedural coaster:", error);
        createProceduralCoaster();
      }
    );

    function createProceduralCoaster() {
      if (isLoaded) return;
      // High-precision circular coaster geometry
      const coasterGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.18, 64);
      const innerRecessGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.08, 64);

      const corkMat = new THREE.MeshStandardMaterial({
        color: 0xc49a6c,
        roughness: 0.85,
        metalness: 0.05,
      });

      const baseMesh = new THREE.Mesh(coasterGeo, corkMat);
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;

      const recessMat = new THREE.MeshStandardMaterial({
        color: 0xaa8256,
        roughness: 0.9,
      });
      const recessMesh = new THREE.Mesh(innerRecessGeo, recessMat);
      recessMesh.position.y = 0.06;

      const proceduralGroup = new THREE.Group();
      proceduralGroup.add(baseMesh);
      proceduralGroup.add(recessMesh);
      modelGroup.add(proceduralGroup);
      isLoaded = true;
    }

    // 6. Mouse Tracking & Smooth Math Interpolation (lerp: 0.025 for heavy underwater float)
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized device coordinates (-1 to +1)
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. GSAP ScrollTrigger Integration: Spin & Shrink down runway
    const runway = document.getElementById(runwayId);
    let scrollAnim: ScrollTrigger | null = null;

    if (runway) {
      scrollAnim = ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          // Scale down from 1.0 to 0.3
          const scaleVal = Math.max(1 - p * 0.7, 0.25);
          modelGroup.scale.setScalar(scaleVal);
          // Spin around Y and tilt
          modelGroup.rotation.y = -0.2 + p * Math.PI * 1.8;
          modelGroup.rotation.z = p * 0.8;
          // Drop down subtly
          modelGroup.position.y = -p * 1.5;
        },
      });
    }

    // 8. Animation & Physics Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Fluid lag interpolation (lerp factor 0.025 for heavy floating physics)
      mouse.x += (targetMouse.x - mouse.x) * 0.025;
      mouse.y += (targetMouse.y - mouse.y) * 0.025;

      // Idle floating sine wave
      const idleFloatY = Math.sin(elapsedTime * 1.3) * 0.08;
      const idleFloatZ = Math.cos(elapsedTime * 0.9) * 0.03;

      // Parallax rotation responding with fluid lag to mouse
      modelGroup.position.x = mouse.x * 0.35;
      modelGroup.position.y = idleFloatY + mouse.y * 0.25;

      modelGroup.rotation.x = 0.55 + mouse.y * 0.35 + Math.sin(elapsedTime * 0.8) * 0.02;
      modelGroup.rotation.z = idleFloatZ - mouse.x * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      scrollAnim?.kill();

      renderer.dispose();
      scene.clear();
    };
  }, [runwayId]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
