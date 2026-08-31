import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeadphoneCanvas3D({ color = "#383b47", isSpinning = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // 2. Studio Lighting (Cyber Studio Illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanRim = new THREE.PointLight(0x06b6d4, 4, 30);
    cyanRim.position.set(-5, 4, 3);
    scene.add(cyanRim);

    const purpleRim = new THREE.PointLight(0xa855f7, 4.5, 30);
    purpleRim.position.set(5, -3, 3);
    scene.add(purpleRim);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(0, 6, 6);
    scene.add(keyLight);

    // 3. Physically-Based Materials (PBR)
    const baseColor = new THREE.Color(color);

    const carbonCupMat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });

    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x12131a,
      roughness: 0.85,
      metalness: 0.05,
    });

    const neonGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    // 4. Construct Full 3D Headphone Rig
    const headphoneRig = new THREE.Group();

    // Telescoping Headband (Chrome Arc)
    const bandArcGeo = new THREE.TorusGeometry(2.35, 0.09, 24, 64, Math.PI);
    const chromeBand = new THREE.Mesh(bandArcGeo, chromeMat);
    chromeBand.rotation.z = Math.PI;
    chromeBand.position.y = 0.55;
    headphoneRig.add(chromeBand);

    // Ergonomic Breathable Head Cushion
    const cushionArcGeo = new THREE.TorusGeometry(2.28, 0.14, 20, 50, Math.PI * 0.72);
    const headCushion = new THREE.Mesh(cushionArcGeo, cushionMat);
    headCushion.rotation.z = Math.PI * 1.14;
    headCushion.position.y = 0.55;
    headphoneRig.add(headCushion);

    // Ear Cup Builder
    const buildEarCup = (xPos, isLeft) => {
      const cupGroup = new THREE.Group();

      // Outer Acoustic Shell
      const outerGeo = new THREE.CylinderGeometry(1.12, 1.22, 0.65, 36);
      const outerShell = new THREE.Mesh(outerGeo, carbonCupMat);
      outerShell.rotation.z = Math.PI / 2;
      cupGroup.add(outerShell);

      // Cyber Neon Ring
      const ringGeo = new THREE.TorusGeometry(1.23, 0.03, 16, 36);
      const neonRing = new THREE.Mesh(ringGeo, neonGlowMat);
      neonRing.rotation.y = Math.PI / 2;
      cupGroup.add(neonRing);

      // Memory Foam Ear Cushion
      const padGeo = new THREE.TorusGeometry(0.88, 0.38, 24, 44);
      const earPad = new THREE.Mesh(padGeo, cushionMat);
      earPad.rotation.y = Math.PI / 2;
      earPad.position.x = isLeft ? 0.38 : -0.38;
      cupGroup.add(earPad);

      // Swivel Mount Yoke
      const yokeGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.85, 16);
      const yoke = new THREE.Mesh(yokeGeo, chromeMat);
      yoke.position.y = 1.12;
      cupGroup.add(yoke);

      cupGroup.position.set(xPos, -0.65, 0);
      return cupGroup;
    };

    const leftCup = buildEarCup(-2.38, true);
    const rightCup = buildEarCup(2.38, false);
    headphoneRig.add(leftCup);
    headphoneRig.add(rightCup);

    headphoneRig.rotation.y = -0.35;
    headphoneRig.rotation.x = 0.15;
    scene.add(headphoneRig);

    // 5. 4D Spatial Audio Orbiting Particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.8 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i + 1] = radius * Math.sin(phi);
      particlePositions[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const orbitParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(orbitParticles);

    // 6. Interactive 360° Mouse & Touch Drag Controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotY = -0.35;
    let targetRotX = 0.15;

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX || e.touches?.[0]?.clientX, y: e.clientY || e.touches?.[0]?.clientY };
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX || e.touches?.[0]?.clientX;
      const clientY = e.clientY || e.touches?.[0]?.clientY;

      if (isDragging && clientX !== undefined && clientY !== undefined) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;

        targetRotY += deltaX * 0.009;
        targetRotX += deltaY * 0.009;

        prevMousePos = { x: clientX, y: clientY };
      } else if (clientX !== undefined && clientY !== undefined) {
        // Natural parallax hover effect
        const rect = mount.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = normX * 0.65;
        targetRotX = -normY * 0.45 + 0.15;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    mount.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // 7. Smooth Animation & Physics Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Inertia Damping
      headphoneRig.rotation.y += (targetRotY - headphoneRig.rotation.y) * 0.07;
      headphoneRig.rotation.x += (targetRotX - headphoneRig.rotation.x) * 0.07;

      // Levitation Physics
      headphoneRig.position.y = Math.sin(elapsed * 1.8) * 0.16;

      // Rotate 4D Spatial Audio Field
      orbitParticles.rotation.y = elapsed * 0.25;
      orbitParticles.rotation.x = Math.sin(elapsed * 0.2) * 0.15;

      // Auto-spin on Bass Pulse
      if (isSpinning) {
        targetRotY += 0.018;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      mount.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [color, isSpinning]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[420px] sm:h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center relative select-none"
      title="Click and drag to rotate in 3D"
    />
  );
}