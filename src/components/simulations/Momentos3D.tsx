"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Vector3 } from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RotateCcw, Play, Pause } from "lucide-react";

function RotatingBar({ 
  rotation, 
  force, 
  distance,
  isRotating
}: { 
  rotation: number; 
  force: number; 
  distance: number;
  isRotating: boolean;
}) {
  const barRef = useRef<any>();
  const rotRef = useRef(rotation);

  useFrame(() => {
    if (barRef.current) {
      if (isRotating) {
        rotRef.current += 0.02;
      }
      barRef.current.rotation.z = rotRef.current;
    }
  });

  const forceScale = force / 30;
  const forcePosition = new Vector3(
    Math.cos(rotRef.current) * distance,
    Math.sin(rotRef.current) * distance,
    0
  );

  return (
    <group ref={barRef}>
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh rotation={[0, 0, 0]}>
        <boxGeometry args={[distance * 2, 0.15, 0.15]} />
        <meshStandardMaterial color="#2563eb" metalness={0.7} roughness={0.3} />
      </mesh>

      <group position={forcePosition}>
        <mesh position={[0, forceScale / 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, forceScale, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, forceScale, 0]}>
          <coneGeometry args={[0.15, 0.3, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <Text position={[0, forceScale + 0.5, 0]} fontSize={0.2} color="#10b981" anchorX="center">
          F={force}N
        </Text>
      </group>

      <mesh position={[distance / 2, 0, 0.3]}>
        <boxGeometry args={[distance, 0.05, 0.05]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <Text position={[distance / 2, 0, 0.6]} fontSize={0.18} color="#f59e0b" anchorX="center">
        d={distance.toFixed(1)}m
      </Text>
    </group>
  );
}

export function Momentos3D() {
  const [force, setForce] = useState(60);
  const [distance, setDistance] = useState(2);
  const [rotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const torque = force * distance;

  const reset = () => {
    setForce(60);
    setDistance(2);
    setIsRotating(false);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 shadow-sm">
        <CardContent className="p-3 md:p-6">
          <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <color attach="background" args={["#f1f5f9"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              
              <RotatingBar rotation={rotation} force={force} distance={distance} isRotating={isRotating} />
              
              <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.5]}>
                <ringGeometry args={[distance * 1.1, distance * 1.15, 64]} />
                <meshBasicMaterial color="#64748b" transparent opacity={0.3} />
              </mesh>

              <Text position={[0, -3.5, 0]} fontSize={0.4} color="#f59e0b" anchorX="center">
                τ = {torque.toFixed(1)} N·m
              </Text>
              
              <OrbitControls 
                enablePan={false}
                minDistance={5}
                maxDistance={15}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg md:text-xl">Controles</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={isRotating ? "default" : "outline"}
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
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm md:text-base">Fuerza (F)</Label>
              <span className="text-sm md:text-base font-mono font-bold text-primary">{force} N</span>
            </div>
            <Slider
              value={[force]}
              onValueChange={([v]) => setForce(v)}
              min={20}
              max={150}
              step={5}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm md:text-base">Distancia (d)</Label>
              <span className="text-sm md:text-base font-mono font-bold text-primary">{distance.toFixed(1)} m</span>
            </div>
            <Slider
              value={[distance]}
              onValueChange={([v]) => setDistance(v)}
              min={0.5}
              max={3}
              step={0.1}
              className="cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-2 border-primary/20 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">📊 Análisis del Momento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Fuerza aplicada:</p>
              <p className="font-mono font-bold text-lg md:text-xl text-green-600 dark:text-green-400">
                F = {force} N
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Distancia al eje:</p>
              <p className="font-mono font-bold text-lg md:text-xl text-blue-600 dark:text-blue-400">
                d = {distance.toFixed(1)} m
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Torque resultante:</p>
              <p className="font-mono font-bold text-lg md:text-xl text-accent">
                τ = {torque.toFixed(1)} N·m
              </p>
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border-2">
            <p className="text-xs text-muted-foreground mb-2">Fórmula del torque:</p>
            <p className="font-mono text-sm md:text-base text-center">
              τ = F × d
            </p>
            <p className="font-mono text-sm md:text-base text-center text-primary mt-1">
              τ = {force} × {distance.toFixed(1)} = {torque.toFixed(1)} N·m
            </p>
          </div>

          <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Momento de fuerza (torque):</strong> Es el producto de la fuerza aplicada por la distancia perpendicular 
              al eje de rotación. A mayor torque, mayor es la tendencia del objeto a rotar. Se mide en Newton-metro (N·m).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}