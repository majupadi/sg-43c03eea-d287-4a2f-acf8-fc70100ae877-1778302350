"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

export function Simple3DTest() {
  return (
    <div className="w-full h-[400px] bg-slate-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#1e293b"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RotatingCube />
        <OrbitControls />
      </Canvas>
    </div>
  );
}