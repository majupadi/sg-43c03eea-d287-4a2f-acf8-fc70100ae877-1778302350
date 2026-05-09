"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RotateCcw, Plus, Trash2 } from "lucide-react";
import * as THREE from "three";

interface Force {
  id: number;
  magnitude: number;
  angleXY: number;
  angleZ: number;
  color: string;
}

function ForceVector({ magnitude, angleXY, angleZ, color, label }: Force & { label: string }) {
  const radXY = (angleXY * Math.PI) / 180;
  const radZ = (angleZ * Math.PI) / 180;
  
  const scale = magnitude / 25;
  const x = Math.cos(radXY) * Math.cos(radZ) * scale;
  const y = Math.sin(radZ) * scale;
  const z = Math.sin(radXY) * Math.cos(radZ) * scale;

  const arrowDir = new THREE.Vector3(x, y, z).normalize();
  const arrowLength = scale;

  return (
    <group>
      <Line
        points={[[0, 0, 0], [x, y, z]]}
        color={color}
        lineWidth={3}
      />
      <mesh position={[x, y, z]} quaternion={new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        arrowDir
      )}>
        <coneGeometry args={[0.1, 0.25, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[x * 1.2, y * 1.2 + 0.2, z * 1.2]}
        fontSize={0.2}
        color={color}
        anchorX="center"
      >
        {label}: {magnitude}N
      </Text>
    </group>
  );
}

export function Concurrentes3D() {
  const [forces, setForces] = useState<Force[]>([
    { id: 1, magnitude: 50, angleXY: 0, angleZ: 30, color: "#ef4444" },
    { id: 2, magnitude: 40, angleXY: 90, angleZ: 45, color: "#3b82f6" },
    { id: 3, magnitude: 60, angleXY: 180, angleZ: 0, color: "#10b981" },
  ]);
  const [nextId, setNextId] = useState(4);

  const calculateResultant = () => {
    let rx = 0, ry = 0, rz = 0;

    forces.forEach((f) => {
      const radXY = (f.angleXY * Math.PI) / 180;
      const radZ = (f.angleZ * Math.PI) / 180;
      const scale = f.magnitude / 25;

      rx += Math.cos(radXY) * Math.cos(radZ) * scale;
      ry += Math.sin(radZ) * scale;
      rz += Math.sin(radXY) * Math.cos(radZ) * scale;
    });

    const magnitude = Math.sqrt(rx * rx + ry * ry + rz * rz) * 25;
    
    return { rx, ry, rz, magnitude };
  };

  const resultant = calculateResultant();

  const addForce = () => {
    if (forces.length >= 6) return;
    const colors = ["#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"];
    setForces([...forces, {
      id: nextId,
      magnitude: 50,
      angleXY: Math.random() * 360,
      angleZ: Math.random() * 60 - 30,
      color: colors[nextId % colors.length]
    }]);
    setNextId(nextId + 1);
  };

  const removeForce = (id: number) => {
    if (forces.length > 2) {
      setForces(forces.filter(f => f.id !== id));
    }
  };

  const reset = () => {
    setForces([
      { id: 1, magnitude: 50, angleXY: 0, angleZ: 30, color: "#ef4444" },
      { id: 2, magnitude: 40, angleXY: 90, angleZ: 45, color: "#3b82f6" },
      { id: 3, magnitude: 60, angleXY: 180, angleZ: 0, color: "#10b981" },
    ]);
    setNextId(4);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 shadow-sm">
        <CardContent className="p-3 md:p-6">
          <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
              <color attach="background" args={["#f1f5f9"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-5, 5, -5]} intensity={0.5} />

              <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
              </mesh>

              {forces.map((force, idx) => (
                <ForceVector key={force.id} {...force} label={`F${idx + 1}`} />
              ))}

              {resultant.magnitude > 1 && (
                <group>
                  <Line
                    points={[[0, 0, 0], [resultant.rx, resultant.ry, resultant.rz]]}
                    color="#f59e0b"
                    lineWidth={4}
                    dashed
                    dashSize={0.1}
                    gapSize={0.05}
                  />
                  <Text
                    position={[resultant.rx * 1.2, resultant.ry * 1.2 + 0.3, resultant.rz * 1.2]}
                    fontSize={0.25}
                    color="#f59e0b"
                    anchorX="center"
                  >
                    R = {resultant.magnitude.toFixed(1)}N
                  </Text>
                </group>
              )}

              <gridHelper args={[8, 8, "#94a3b8", "#cbd5e1"]} />
              
              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={12}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg md:text-xl">Control de Fuerzas</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={addForce} disabled={forces.length >= 6}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar ({forces.length}/6)
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {forces.map((force, idx) => (
            <Card key={force.id} className="p-3 md:p-4 bg-muted/30" style={{ borderLeft: `4px solid ${force.color}` }}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-mono font-semibold text-sm md:text-base">Fuerza F{idx + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeForce(force.id)}
                  disabled={forces.length <= 2}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-xs">Magnitud</Label>
                    <span className="text-xs font-mono">{force.magnitude} N</span>
                  </div>
                  <Slider
                    value={[force.magnitude]}
                    onValueChange={([v]) => setForces(forces.map(f => 
                      f.id === force.id ? { ...f, magnitude: v } : f
                    ))}
                    min={10}
                    max={100}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-xs">Ángulo XY</Label>
                    <span className="text-xs font-mono">{force.angleXY}°</span>
                  </div>
                  <Slider
                    value={[force.angleXY]}
                    onValueChange={([v]) => setForces(forces.map(f => 
                      f.id === force.id ? { ...f, angleXY: v } : f
                    ))}
                    min={0}
                    max={360}
                    step={15}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-xs">Ángulo Z</Label>
                    <span className="text-xs font-mono">{force.angleZ}°</span>
                  </div>
                  <Slider
                    value={[force.angleZ]}
                    onValueChange={([v]) => setForces(forces.map(f => 
                      f.id === force.id ? { ...f, angleZ: v } : f
                    ))}
                    min={-60}
                    max={60}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-2 border-primary/20 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">📊 Resultante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-background p-4 rounded-lg border-2">
            <p className="text-xs text-muted-foreground mb-1">Magnitud de la resultante:</p>
            <p className="font-mono font-bold text-2xl md:text-3xl text-accent">
              R = {resultant.magnitude.toFixed(1)} N
            </p>
          </div>

          {resultant.magnitude < 5 && (
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-500">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300 text-center">
                ✓ Sistema cercano al equilibrio (R ≈ 0)
              </p>
            </div>
          )}

          <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Fuerzas concurrentes:</strong> Son fuerzas que actúan en un mismo punto en el espacio tridimensional. 
              La resultante se calcula mediante la suma vectorial de todas las componentes en X, Y y Z. Cuando R ≈ 0, 
              el sistema está en equilibrio.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}