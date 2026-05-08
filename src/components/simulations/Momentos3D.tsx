"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { Vector3 } from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Play, Pause } from "lucide-react";

function RotatingBar({ 
  rotation, 
  force, 
  distance 
}: { 
  rotation: number; 
  force: number; 
  distance: number;
}) {
  const barRef = useRef<any>();

  useFrame(() => {
    if (barRef.current) {
      barRef.current.rotation.z = rotation;
    }
  });

  const forceScale = force / 30;
  const forcePosition = new Vector3(
    Math.cos(rotation) * distance,
    Math.sin(rotation) * distance,
    0
  );

  return (
    <group ref={barRef}>
      {/* Central pivot */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Bar */}
      <mesh rotation={[0, 0, 0]}>
        <boxGeometry args={[distance * 2, 0.15, 0.15]} />
        <meshStandardMaterial color="#2563eb" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Force arrow */}
      <group position={forcePosition}>
        {/* Shaft perpendicular to bar */}
        <mesh position={[0, forceScale / 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, forceScale, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        {/* Arrowhead */}
        <mesh position={[0, forceScale, 0]}>
          <coneGeometry args={[0.15, 0.3, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        {/* Label */}
        <Html position={[0, forceScale + 0.5, 0]} center>
          <div className="bg-background/90 px-2 py-1 rounded text-xs font-mono border border-border">
            F = {force}N
          </div>
        </Html>
      </group>

      {/* Distance indicator */}
      <mesh position={[distance / 2, 0, 0.3]}>
        <boxGeometry args={[distance, 0.05, 0.05]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <Html position={[distance / 2, 0, 0.5]} center>
        <div className="bg-background/90 px-2 py-1 rounded text-xs font-mono border border-border">
          d = {distance.toFixed(1)}m
        </div>
      </Html>
    </group>
  );
}

export function Momentos3D() {
  const [force, setForce] = useState(60);
  const [distance, setDistance] = useState(2);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const torque = force * distance;

  useFrame(() => {
    if (isRotating) {
      setRotation(prev => prev + 0.02);
    }
  });

  const reset = () => {
    setForce(60);
    setDistance(2);
    setRotation(0);
    setIsRotating(false);
  };

  return (
    <div className="space-y-4">
      <div className="h-[600px] rounded-lg overflow-hidden border border-border bg-background">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <RotatingBar rotation={rotation} force={force} distance={distance} />
          
          {/* Rotation indicator circle */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.5]}>
            <ringGeometry args={[distance * 1.1, distance * 1.15, 64]} />
            <meshBasicMaterial color="#64748b" transparent opacity={0.3} />
          </mesh>

          <Text
            position={[0, -3.5, 0]}
            fontSize={0.4}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
          >
            Torque: {torque.toFixed(1)} N·m
          </Text>
          
          <OrbitControls 
            enablePan={false}
            minDistance={5}
            maxDistance={15}
          />
        </Canvas>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono font-semibold">Controles</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRotating(!isRotating)}
            >
              {isRotating ? (
                <><Pause className="w-4 h-4 mr-2" /> Pausar</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Rotar</>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-4">
              <span className="font-mono text-sm w-32">Fuerza (N):</span>
              <input
                type="range"
                min="20"
                max="150"
                value={force}
                onChange={(e) => setForce(Number(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono text-sm w-16">{force}N</span>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-4">
              <span className="font-mono text-sm w-32">Distancia (m):</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono text-sm w-16">{distance.toFixed(1)}m</span>
            </label>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="p-3 bg-accent/10 rounded border border-accent/20">
            <p className="text-sm font-mono">
              <span className="font-bold">Torque (τ):</span> F × d = {force} × {distance.toFixed(1)} = <span className="text-accent font-bold">{torque.toFixed(1)} N·m</span>
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded border border-primary/20 text-xs text-muted-foreground">
            <p>El torque (momento de fuerza) es el producto de la fuerza aplicada por la distancia perpendicular al eje de rotación. Mayor torque = mayor tendencia a rotar.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}