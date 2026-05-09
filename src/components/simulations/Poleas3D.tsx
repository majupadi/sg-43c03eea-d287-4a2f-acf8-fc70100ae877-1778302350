"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCw, Settings2 } from "lucide-react";
import * as THREE from "three";

type PolyType = "fija" | "movil" | "potencial-2" | "potencial-3" | "factorial-2" | "factorial-3" | "factorial-4";

interface PolySystemProps {
  type: PolyType;
  weight: number;
  isAnimating: boolean;
  pulleyRadius: number;
  animationSpeed: number;
}

function Pulley({ position, radius = 0.4, isMoving = false, speed = 1 }: { position: [number, number, number]; radius?: number; isMoving?: boolean; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && isMoving) {
      meshRef.current.rotation.z += 0.02 * speed;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, 0.08, 16, 32]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.15]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

function Rope({ points, color = "#78350f" }: { points: [number, number, number][]; color?: string }) {
  return (
    <Line
      points={points}
      color={color}
      lineWidth={4}
    />
  );
}

function Weight({ position, mass }: { position: [number, number, number]; mass: number }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color="#dc2626" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      <Text
        position={[0, 0, 0.35]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {mass}N
      </Text>
    </group>
  );
}

function FijaSystem({ weight, isAnimating, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY = -2;
  const ropeY = isAnimating ? baseY + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.4 : baseY;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[0, 2.5, 0]} radius={pulleyRadius} isMoving={isAnimating} speed={animationSpeed} />

      <Rope points={[[0, 2.5, 0], [0, ropeY + 0.3, 0]]} />
      
      <Weight position={[0, ropeY, 0]} mass={weight} />

      <Rope points={[[pulleyRadius + 0.1, 2.5, 0], [2, 2.5, 0], [2, 0, 0]]} color="#10b981" />

      <group position={[2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.6, 0, 0]} fontSize={0.15} color="#10b981">
          Fm = {weight}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Polea Fija
      </Text>
      <Text position={[0, -3.5, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 1 · Solo cambia dirección
      </Text>
    </group>
  );
}

function MovilSystem({ weight, isAnimating, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY = -1.3;
  const poleyaY = isAnimating ? baseY + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.4 : baseY;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[-1.5, 2.5, 0]} radius={pulleyRadius * 0.8} isMoving={isAnimating} speed={animationSpeed} />

      <Pulley position={[0, poleyaY, 0]} radius={pulleyRadius} isMoving={isAnimating} speed={animationSpeed} />

      <Rope points={[
        [-1.5, 2.5, 0],
        [-(pulleyRadius + 0.08), poleyaY, 0],
        [pulleyRadius + 0.08, poleyaY, 0],
        [1.5, 2.5, 0],
        [1.5, 0, 0]
      ]} color="#10b981" />

      <Weight position={[0, poleyaY - 0.8, 0]} mass={weight} />

      <Rope points={[[0, poleyaY - 0.5, 0], [0, poleyaY - 0.1, 0]]} />

      <group position={[1.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.15} color="#10b981">
          Fm = {(weight / 2).toFixed(1)}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Polea Móvil (VM=2)
      </Text>
      <Text position={[0, -3.2, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        Fm = R/2
      </Text>
    </group>
  );
}

function Potencial2System({ weight, isAnimating, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY1 = -0.8;
  const baseY2 = -2;
  const movingY1 = isAnimating ? baseY1 + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.3 : baseY1;
  const movingY2 = isAnimating ? baseY2 + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.3 : baseY2;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[-1.2, 2.5, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[0, movingY1, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[0, movingY2, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />

      <Rope points={[[-1.2, 2.5, 0], [-(pulleyRadius * 0.75 + 0.08), movingY1, 0]]} />
      <Rope points={[[pulleyRadius * 0.75 + 0.08, movingY1, 0], [1.5, 2.5, 0], [1.5, 0, 0]]} color="#10b981" />
      <Rope points={[[0, movingY1 - (pulleyRadius * 0.75 + 0.1), 0], [0, movingY2 + (pulleyRadius * 0.75 + 0.1), 0]]} />

      <Weight position={[0, movingY2 - 0.8, 0]} mass={weight} />
      <Rope points={[[0, movingY2 - 0.5, 0], [0, movingY2 - (pulleyRadius * 0.75 + 0.08), 0]]} />

      <group position={[1.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.15} color="#10b981">
          Fm = {(weight / 4).toFixed(1)}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Aparejo Potencial (n=2)
      </Text>
      <Text position={[0, -3.4, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 2² = 4 · Fm = R/4
      </Text>
    </group>
  );
}

function Potencial3System({ weight, isAnimating, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY1 = -0.2;
  const baseY2 = -1.2;
  const baseY3 = -2.2;
  const movingY1 = isAnimating ? baseY1 + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.25 : baseY1;
  const movingY2 = isAnimating ? baseY2 + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.25 : baseY2;
  const movingY3 = isAnimating ? baseY3 + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.25 : baseY3;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[-1.2, 2.5, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[0, movingY1, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[0, movingY2, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[0, movingY3, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />

      <Rope points={[[-1.2, 2.5, 0], [-(pulleyRadius * 0.65 + 0.08), movingY1, 0]]} />
      <Rope points={[[pulleyRadius * 0.65 + 0.08, movingY1, 0], [1.5, 2.5, 0], [1.5, 0, 0]]} color="#10b981" />
      <Rope points={[[0, movingY1 - (pulleyRadius * 0.65 + 0.1), 0], [0, movingY2 + (pulleyRadius * 0.65 + 0.1), 0]]} />
      <Rope points={[[0, movingY2 - (pulleyRadius * 0.65 + 0.1), 0], [0, movingY3 + (pulleyRadius * 0.65 + 0.1), 0]]} />

      <Weight position={[0, movingY3 - 0.75, 0]} mass={weight} />
      <Rope points={[[0, movingY3 - 0.5, 0], [0, movingY3 - (pulleyRadius * 0.65 + 0.08), 0]]} />

      <group position={[1.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.15} color="#10b981">
          Fm = {(weight / 8).toFixed(1)}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Aparejo Potencial (n=3)
      </Text>
      <Text position={[0, -3.4, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 2³ = 8 · Fm = R/8
      </Text>
    </group>
  );
}

function Factorial2System({ weight, isAnimating, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY = -1.5;
  const movingY = isAnimating ? baseY + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.35 : baseY;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[-1, 2.5, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[1, 2.5, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />

      <group position={[0, movingY, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.6, 0.15, 0.4]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        
        <Pulley position={[-0.55, 0, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />
        <Pulley position={[0.55, 0, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />

        <Weight position={[0, -0.8, 0]} mass={weight} />
        <Rope points={[[0, -0.5, 0], [0, 0.15, 0]]} />
      </group>

      <Rope points={[[-1, 2.5, 0], [-0.55 - (pulleyRadius * 0.75 + 0.08), movingY, 0]]} />
      <Rope points={[[-0.55 + (pulleyRadius * 0.75 + 0.08), movingY, 0], [0.55 - (pulleyRadius * 0.75 + 0.08), movingY, 0]]} />
      <Rope points={[[0.55 + (pulleyRadius * 0.75 + 0.08), movingY, 0], [1, 2.5, 0]]} />
      <Rope points={[[1, 2.5, 0], [2, 2.5, 0], [2, 0, 0]]} color="#10b981" />

      <group position={[2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.15} color="#10b981">
          Fm = {(weight / 4).toFixed(1)}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Aparejo Factorial (n=2)
      </Text>
      <Text position={[0, -3.3, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 2·2 = 4 · Fm = R/4
      </Text>
    </group>
  );
}

function Factorial3System({ weight, isAnimating, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY = -1.3;
  const movingY = isAnimating ? baseY + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.3 : baseY;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[-1.2, 2.5, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[0, 2.5, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[1.2, 2.5, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />

      <group position={[0, movingY, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.2, 0.15, 0.4]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        
        <Pulley position={[-0.8, 0, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />
        <Pulley position={[0, 0, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />
        <Pulley position={[0.8, 0, 0]} radius={pulleyRadius * 0.65} isMoving={isAnimating} speed={animationSpeed} />

        <Weight position={[0, -0.75, 0]} mass={weight} />
        <Rope points={[[0, -0.5, 0], [0, 0.15, 0]]} />
      </group>

      <Rope points={[[-1.2, 2.5, 0], [-0.8 - (pulleyRadius * 0.65 + 0.08), movingY, 0]]} />
      <Rope points={[[-0.8 + (pulleyRadius * 0.65 + 0.08), movingY, 0], [0 - (pulleyRadius * 0.65 + 0.08), movingY, 0]]} />
      <Rope points={[[0 + (pulleyRadius * 0.65 + 0.08), movingY, 0], [0.8 - (pulleyRadius * 0.65 + 0.08), movingY, 0]]} />
      <Rope points={[[0.8 + (pulleyRadius * 0.65 + 0.08), movingY, 0], [1.2, 2.5, 0]]} />
      <Rope points={[[0, 2.5, 0], [2, 2.5, 0], [2, 0, 0]]} color="#10b981" />

      <group position={[2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.15} color="#10b981">
          Fm = {(weight / 6).toFixed(1)}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Aparejo Factorial (n=3)
      </Text>
      <Text position={[0, -3.2, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 2·3 = 6 · Fm = R/6
      </Text>
    </group>
  );
}

function Factorial4System({ weight, isAnimating, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY = -1.2;
  const movingY = isAnimating ? baseY + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.28 : baseY;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[-1.5, 2.5, 0]} radius={pulleyRadius * 0.6} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[-0.5, 2.5, 0]} radius={pulleyRadius * 0.6} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[0.5, 2.5, 0]} radius={pulleyRadius * 0.6} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[1.5, 2.5, 0]} radius={pulleyRadius * 0.6} isMoving={isAnimating} speed={animationSpeed} />

      <group position={[0, movingY, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.8, 0.15, 0.4]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        
        <Pulley position={[-1.05, 0, 0]} radius={pulleyRadius * 0.6} isMoving={isAnimating} speed={animationSpeed} />
        <Pulley position={[-0.35, 0, 0]} radius={pulleyRadius * 0.6} isMoving={isAnimating} speed={animationSpeed} />
        <Pulley position={[0.35, 0, 0]} radius={pulleyRadius * 0.6} isMoving={isAnimating} speed={animationSpeed} />
        <Pulley position={[1.05, 0, 0]} radius={pulleyRadius * 0.6} isMoving={isAnimating} speed={animationSpeed} />

        <Weight position={[0, -0.7, 0]} mass={weight} />
        <Rope points={[[0, -0.45, 0], [0, 0.15, 0]]} />
      </group>

      <Rope points={[[-1.5, 2.5, 0], [-1.05 - (pulleyRadius * 0.6 + 0.08), movingY, 0]]} />
      <Rope points={[[-1.05 + (pulleyRadius * 0.6 + 0.08), movingY, 0], [-0.35 - (pulleyRadius * 0.6 + 0.08), movingY, 0]]} />
      <Rope points={[[-0.35 + (pulleyRadius * 0.6 + 0.08), movingY, 0], [0.35 - (pulleyRadius * 0.6 + 0.08), movingY, 0]]} />
      <Rope points={[[0.35 + (pulleyRadius * 0.6 + 0.08), movingY, 0], [1.05 - (pulleyRadius * 0.6 + 0.08), movingY, 0]]} />
      <Rope points={[[1.05 + (pulleyRadius * 0.6 + 0.08), movingY, 0], [1.5, 2.5, 0]]} />
      <Rope points={[[-0.5, 2.5, 0], [2.2, 2.5, 0], [2.2, 0, 0]]} color="#10b981" />

      <group position={[2.2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.15} color="#10b981">
          Fm = {(weight / 8).toFixed(1)}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Aparejo Factorial (n=4)
      </Text>
      <Text position={[0, -3.1, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 2·4 = 8 · Fm = R/8
      </Text>
    </group>
  );
}

function PolySystem(props: PolySystemProps) {
  switch (props.type) {
    case "fija":
      return <FijaSystem {...props} />;
    case "movil":
      return <MovilSystem {...props} />;
    case "potencial-2":
      return <Potencial2System {...props} />;
    case "potencial-3":
      return <Potencial3System {...props} />;
    case "factorial-2":
      return <Factorial2System {...props} />;
    case "factorial-3":
      return <Factorial3System {...props} />;
    case "factorial-4":
      return <Factorial4System {...props} />;
  }
}

export function Poleas3D() {
  const [polyType, setPolyType] = useState<PolyType>("fija");
  const [weight, setWeight] = useState(80);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulleyRadius, setPulleyRadius] = useState(0.4);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const getSystemInfo = () => {
    switch (polyType) {
      case "fija":
        return { force: weight, vm: 1, formula: "Fm = R" };
      case "movil":
        return { force: weight / 2, vm: 2, formula: "Fm = R/2" };
      case "potencial-2":
        return { force: weight / 4, vm: 4, formula: "Fm = R/2² = R/4" };
      case "potencial-3":
        return { force: weight / 8, vm: 8, formula: "Fm = R/2³ = R/8" };
      case "factorial-2":
        return { force: weight / 4, vm: 4, formula: "Fm = R/(2·2) = R/4" };
      case "factorial-3":
        return { force: weight / 6, vm: 6, formula: "Fm = R/(2·3) = R/6" };
      case "factorial-4":
        return { force: weight / 8, vm: 8, formula: "Fm = R/(2·4) = R/8" };
    }
  };

  const systemInfo = getSystemInfo();

  return (
    <div className="space-y-4">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Simulación Completa de Poleas 3D
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={polyType === "fija" ? "default" : "outline"}
                onClick={() => setPolyType("fija")}
                size="sm"
              >
                Fija
              </Button>
              <Button
                variant={polyType === "movil" ? "default" : "outline"}
                onClick={() => setPolyType("movil")}
                size="sm"
              >
                Móvil
              </Button>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm font-semibold mb-2 text-blue-600 dark:text-blue-400">Aparejo Potencial (2ⁿ)</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={polyType === "potencial-2" ? "default" : "outline"}
                  onClick={() => setPolyType("potencial-2")}
                  size="sm"
                >
                  n=2 (VM=4)
                </Button>
                <Button
                  variant={polyType === "potencial-3" ? "default" : "outline"}
                  onClick={() => setPolyType("potencial-3")}
                  size="sm"
                >
                  n=3 (VM=8)
                </Button>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">Aparejo Factorial (2·n)</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={polyType === "factorial-2" ? "default" : "outline"}
                  onClick={() => setPolyType("factorial-2")}
                  size="sm"
                >
                  n=2 (VM=4)
                </Button>
                <Button
                  variant={polyType === "factorial-3" ? "default" : "outline"}
                  onClick={() => setPolyType("factorial-3")}
                  size="sm"
                >
                  n=3 (VM=6)
                </Button>
                <Button
                  variant={polyType === "factorial-4" ? "default" : "outline"}
                  onClick={() => setPolyType("factorial-4")}
                  size="sm"
                >
                  n=4 (VM=8)
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[550px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner mt-4">
            <Canvas 
              camera={{ position: [5, 2, 8], fov: 50 }}
              shadows
            >
              <color attach="background" args={["#f1f5f9"]} />
              <ambientLight intensity={0.7} />
              <directionalLight 
                position={[5, 10, 5]} 
                intensity={1.2} 
                castShadow 
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-5, 5, -5]} intensity={0.5} />
              <spotLight position={[0, 8, 0]} intensity={0.3} angle={0.6} penumbra={0.5} />
              
              <PolySystem 
                type={polyType} 
                weight={weight} 
                isAnimating={isAnimating}
                pulleyRadius={pulleyRadius}
                animationSpeed={animationSpeed}
              />
              
              <gridHelper args={[10, 20, "#94a3b8", "#cbd5e1"]} position={[0, -3.5, 0]} />
              
              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={15}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Controles</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Settings2 className="w-4 h-4 mr-2" />
              {showAdvanced ? "Ocultar" : "Mostrar"} Avanzados
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Peso del objeto (R)</label>
              <span className="text-sm font-mono text-primary">{weight} N</span>
            </div>
            <Slider
              value={[weight]}
              onValueChange={(v) => setWeight(v[0])}
              min={20}
              max={200}
              step={10}
              className="w-full"
            />
          </div>

          {showAdvanced && (
            <>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Radio de poleas</label>
                  <span className="text-sm font-mono text-primary">{pulleyRadius.toFixed(2)} m</span>
                </div>
                <Slider
                  value={[pulleyRadius]}
                  onValueChange={(v) => setPulleyRadius(v[0])}
                  min={0.2}
                  max={0.6}
                  step={0.05}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Velocidad de animación</label>
                  <span className="text-sm font-mono text-primary">{animationSpeed}x</span>
                </div>
                <Slider
                  value={[animationSpeed]}
                  onValueChange={(v) => setAnimationSpeed(v[0])}
                  min={0.5}
                  max={3}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-4 pt-2">
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              variant={isAnimating ? "default" : "outline"}
              className="flex-1"
            >
              <RotateCw className={`w-4 h-4 mr-2 ${isAnimating ? "animate-spin" : ""}`} />
              {isAnimating ? "Detener" : "Animar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20 border-2">
        <CardContent className="pt-6">
          <h3 className="font-mono font-bold mb-3">📊 Análisis del Sistema</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Peso (R):</span>
                <span className="font-mono font-semibold text-red-600 dark:text-red-400">{weight} N</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Fuerza (Fm):</span>
                <span className="font-mono font-semibold text-green-600 dark:text-green-400">{systemInfo.force.toFixed(1)} N</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Ventaja Mecánica:</span>
                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">VM = {systemInfo.vm}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Fórmula:</span>
                <span className="font-mono font-semibold text-purple-600 dark:text-purple-400">{systemInfo.formula}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Reducción:</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {((1 - systemInfo.force / weight) * 100).toFixed(0)}%
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Tipo:</span>
                <span className="font-mono font-semibold">
                  {polyType.includes("potencial") ? "Potencial (2ⁿ)" : 
                   polyType.includes("factorial") ? "Factorial (2·n)" : 
                   polyType === "movil" ? "Móvil" : "Fija"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {polyType === "fija" && "La polea fija (VM=1) solo cambia la dirección de la fuerza. No hay ventaja mecánica."}
              {polyType === "movil" && "La polea móvil (VM=2) reduce la fuerza a la mitad mediante 2 ramales de soporte."}
              {polyType === "potencial-2" && "Aparejo potencial con n=2: VM = 2² = 4. Cada polea móvil se apoya en la anterior (configuración vertical)."}
              {polyType === "potencial-3" && "Aparejo potencial con n=3: VM = 2³ = 8. Máxima ventaja mecánica para 3 poleas (crecimiento exponencial)."}
              {polyType === "factorial-2" && "Aparejo factorial con n=2: VM = 2·2 = 4. Poleas móviles en la misma barra horizontal."}
              {polyType === "factorial-3" && "Aparejo factorial con n=3: VM = 2·3 = 6. Ventaja mecánica menor que el potencial equivalente."}
              {polyType === "factorial-4" && "Aparejo factorial con n=4: VM = 2·4 = 8. Misma VM que potencial n=3, pero con más poleas."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}