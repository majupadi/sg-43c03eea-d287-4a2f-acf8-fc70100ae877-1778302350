"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { Vector3 } from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Force {
  id: number;
  position: number;
  magnitude: number;
  direction: 1 | -1;
}

function Arrow({ start, direction, magnitude, color }: { 
  start: Vector3; 
  direction: number; 
  magnitude: number; 
  color: string;
}) {
  const scale = magnitude / 50;
  const yPos = direction * scale;

  return (
    <group position={start}>
      {/* Shaft */}
      <mesh position={[0, yPos / 2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, Math.abs(yPos), 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Arrowhead */}
      <mesh position={[0, yPos, 0]} rotation={direction === 1 ? [0, 0, 0] : [Math.PI, 0, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Label */}
      <Html position={[0, yPos + (direction * 0.5), 0]} center>
        <div className="bg-background/90 px-2 py-1 rounded text-xs font-mono border border-border">
          {magnitude}N
        </div>
      </Html>
    </group>
  );
}

function Beam({ forces, resultant }: { forces: Force[]; resultant: { magnitude: number; position: number } }) {
  const beamRef = useRef<any>();

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={beamRef}>
      {/* Main beam */}
      <mesh>
        <boxGeometry args={[10, 0.2, 0.3]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Grid marks */}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={i} position={[-5 + i, -0.15, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}

      {/* Forces */}
      {forces.map((force) => (
        <Arrow
          key={force.id}
          start={new Vector3(force.position - 5, 0, 0)}
          direction={force.direction}
          magnitude={force.magnitude}
          color={force.direction === 1 ? "#10b981" : "#ef4444"}
        />
      ))}

      {/* Resultant */}
      {resultant.magnitude !== 0 && (
        <>
          <Arrow
            start={new Vector3(resultant.position - 5, 0, 0.5)}
            direction={resultant.magnitude > 0 ? 1 : -1}
            magnitude={Math.abs(resultant.magnitude)}
            color="#f59e0b"
          />
          <Text
            position={[resultant.position - 5, -2, 0]}
            fontSize={0.3}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
          >
            Resultante: {Math.abs(resultant.magnitude).toFixed(1)}N
          </Text>
        </>
      )}
    </group>
  );
}

export function Paralelas3D() {
  const [forces, setForces] = useState<Force[]>([
    { id: 1, position: 2, magnitude: 50, direction: 1 },
    { id: 2, position: 6, magnitude: 30, direction: 1 },
    { id: 3, position: 8, magnitude: 40, direction: -1 },
  ]);

  const calculateResultant = () => {
    const totalForce = forces.reduce((sum, f) => sum + f.magnitude * f.direction, 0);
    const moment = forces.reduce((sum, f) => sum + f.position * f.magnitude * f.direction, 0);
    const position = totalForce !== 0 ? moment / totalForce : 5;
    return { magnitude: totalForce, position };
  };

  const resultant = calculateResultant();

  const reset = () => {
    setForces([
      { id: 1, position: 2, magnitude: 50, direction: 1 },
      { id: 2, position: 6, magnitude: 30, direction: 1 },
      { id: 3, position: 8, magnitude: 40, direction: -1 },
    ]);
  };

  const toggleDirection = (id: number) => {
    setForces(forces.map(f => 
      f.id === id ? { ...f, direction: (f.direction === 1 ? -1 : 1) as 1 | -1 } : f
    ));
  };

  return (
    <div className="space-y-4">
      <div className="h-[600px] rounded-lg overflow-hidden border border-border bg-background">
        <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <Beam forces={forces} resultant={resultant} />
          
          <OrbitControls 
            enablePan={false}
            minDistance={8}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
          />
          
          <gridHelper args={[20, 20, "#64748b", "#334155"]} position={[0, -3, 0]} />
        </Canvas>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono font-semibold">Controles</h3>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <div className="space-y-3">
          {forces.map((force, idx) => (
            <div key={force.id} className="flex items-center gap-4">
              <span className="font-mono text-sm w-20">F{idx + 1}:</span>
              <input
                type="range"
                min="10"
                max="100"
                value={force.magnitude}
                onChange={(e) => setForces(forces.map(f => 
                  f.id === force.id ? { ...f, magnitude: Number(e.target.value) } : f
                ))}
                className="flex-1"
              />
              <span className="font-mono text-sm w-16">{force.magnitude}N</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleDirection(force.id)}
                className="w-20"
              >
                {force.direction === 1 ? "↑" : "↓"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-accent/10 rounded border border-accent/20">
          <p className="text-sm font-mono">
            <span className="font-bold">Resultante:</span> {Math.abs(resultant.magnitude).toFixed(1)}N {resultant.magnitude >= 0 ? "↑" : "↓"}
            {" | "}
            <span className="font-bold">Posición:</span> {resultant.position.toFixed(2)}m
          </p>
        </div>
      </Card>
    </div>
  );
}