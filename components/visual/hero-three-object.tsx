"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type HeroThreeObjectProps = {
  className?: string;
};

export function HeroThreeObject({ className }: HeroThreeObjectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;

    let animationFrame = 0;
    let disposed = false;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
    } catch {
      const fallbackTimer = window.setTimeout(() => setIsFallback(true), 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.28, 6.35);

    const group = new THREE.Group();
    group.rotation.set(-0.22, -0.54, 0.12);
    group.scale.setScalar(1.42);
    group.position.set(-1.28, 0.12, 0);
    scene.add(group);

    const darkMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1a2027"),
      clearcoat: 1,
      clearcoatRoughness: 0.14,
      emissive: new THREE.Color("#05090e"),
      emissiveIntensity: 0.22,
      metalness: 0.08,
      roughness: 0.18,
    });
    const edgeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#7f8b96"),
      transparent: true,
      opacity: 0.76,
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const positions = [
      [-1.25, 0.72, 0],
      [-0.18, 0.92, 0.12],
      [0.88, 0.55, -0.05],
      [-0.72, -0.2, 0.2],
      [0.38, -0.02, 0.05],
      [1.48, -0.24, 0.2],
      [-0.08, -1.04, 0.1],
      [1.04, -1.18, -0.06],
    ] as const;

    positions.forEach(([x, y, z], index) => {
      const cube = new THREE.Mesh(geometry, darkMaterial);
      const scale = index % 3 === 0 ? 0.92 : index % 3 === 1 ? 0.78 : 0.66;
      cube.position.set(x, y, z);
      cube.scale.setScalar(scale);
      cube.rotation.set(index * 0.06, index * 0.09, -index * 0.035);
      cube.castShadow = false;
      cube.receiveShadow = false;
      group.add(cube);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial);
      edges.position.copy(cube.position);
      edges.rotation.copy(cube.rotation);
      edges.scale.copy(cube.scale);
      group.add(edges);
    });

    const keyLight = new THREE.DirectionalLight(0xffffff, 8.6);
    keyLight.position.set(-4.2, 4.8, 5.4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x70b8ff, 2.6);
    rimLight.position.set(3.8, -0.6, 4.8);
    scene.add(rimLight);

    const violetLight = new THREE.PointLight(0x9281f7, 10, 10);
    violetLight.position.set(1.8, 1.7, 2.6);
    scene.add(violetLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.46);
    scene.add(ambient);

    function resize() {
      if (!canvas) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function render(time = 0) {
      if (disposed) {
        return;
      }

      const t = time * 0.001;
      if (!reducedMotion) {
        group.rotation.y = -0.62 + Math.sin(t * 0.38) * 0.18;
        group.rotation.x = -0.24 + Math.cos(t * 0.28) * 0.06;
        group.position.y = Math.sin(t * 0.45) * 0.08;
      }

      renderer.render(scene, camera);

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }

    resize();
    render();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) {
        render();
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      geometry.dispose();
      darkMaterial.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`overflow-hidden ${className ?? "relative"}`}>
      <canvas
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          isFallback ? "opacity-0" : "opacity-100"
        }`}
        data-three-hero="true"
        ref={canvasRef}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${
          isFallback ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-40 w-40 rotate-12 rounded-[28px] border border-graphite-rail bg-[linear-gradient(145deg,#1b1b1b,#030303)] shadow-[inset_18px_18px_42px_rgba(255,255,255,0.035)]" />
      </div>
    </div>
  );
}
