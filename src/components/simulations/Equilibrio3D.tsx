"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RotateCcw, Plus, Trash2 } from "lucide-react";

interface Load {
  id: number;
  position: number;
  weight: number;
}

function BeamWithLoads({ loads, supports }: { loads: Load[]; supports: { left: number; right: number } }) {
  const beamLength = 10;
  
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[beamLength, 0.3, 0.4]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {Array.from({ length: 11 }).map((_, i) => (
        <group key={i}>
          <mesh position={[-beamLength/2 + i, -0.2, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          <Text position={[-beamLength/2 + i, -0.6, 0]} fontSize={0.2} color="#94a3b8" anchorX="center">
            {i}m
          </Text>
        </group>
      ))}

      {loads.map((load) => {
        const xPos = -beamLength/2 + load.position;
        const arrowHeight = load.weight / 30;
        
        return (
          <group key={load.id}>
            <mesh position={[xPos, arrowHeight / 2 + 0.3, 0]}>
              <cylinderGeometry args={[0.06, 0.06, arrowHeight, 8]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[xPos, 0.3, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.15, 0.3, 8]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <Text position={[xPos, arrowHeight + 0.7, 0]} fontSize={0.2} color="#ef4444" anchorX="center">
              {load.weight}N
            </Text>
          </group>
        );
      })}

      <group position={[-beamLength/2 + 1, 0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <coneGeometry args={[0.3, 0.5, 3]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <Text position={[0, -1.8, 0]} fontSize={0.25} color="#10b981" anchorX="center">
          RA={supports.left.toFixed(1)}N
        </Text>
      </group>

      <group position={[-beamLength/2 + 9, 0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <coneGeometry args={[0.3, 0.5, 3]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <Text position={[0, -1.8, 0]} fontSize={0.25} color="#10b981" anchorX="center">
          RB={supports.right.toFixed(1)}N
        </Text>
      </group>
    </group>
  );
}

export function Equilibrio3D() {
  const [loads, setLoads] = useState<Load[]>([
    { id: 1, position: 3, weight: 100 },
    { id: 2, position: 7, weight: 80 },
  ]);
  const [nextId, setNextId] = useState(3);

  const supportPositions = { left: 1, right: 9 };

  const calculateReactions = () => {
    const totalWeight = loads.reduce((sum, l) => sum + l.weight, 0);
    const momentAboutLeft = loads.reduce((sum, l) => 
      sum + l.weight * (l.position - supportPositions.left), 0
    );
    const supportDistance = supportPositions.right - supportPositions.left;
    const rightReaction = momentAboutLeft / supportDistance;
    const leftReaction = totalWeight - rightReaction;
    
    return {
      left: leftReaction,
      right: rightReaction,
      isBalanced: Math.abs(leftReaction + rightReaction - totalWeight) < 0.1
    };
  };

  const reactions = calculateReactions();

  const addLoad = () => {
    if (loads.length >= 6) return;
    const newPosition = Math.random() * 8 + 1;
    const newWeight = Math.floor(Math.random() * 60) + 40;
    setLoads([...loads, { id: nextId, position: newPosition, weight: newWeight }]);
    setNextId(nextId + 1);
  };

  const removeLoad = (id: number) => {
    if (loads.length > 1) {
      setLoads(loads.filter(l => l.id !== id));
    }
  };

  const reset = () => {
    setLoads([
      { id: 1, position: 3, weight: 100 },
      { id: 2, position: 7, weight: 80 },
    ]);
    setNextId(3);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 shadow-sm">
        <CardContent className="p-3 md:p-6">
          <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [0, 3, 12], fov: 50 }}>
              <color attach="background" args={["#f1f5f9"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              
              <BeamWithLoads loads={loads} supports={reactions} />
              
              <OrbitControls 
                enablePan={false}
                minDistance={8}
                maxDistance={20}
                maxPolarAngle={Math.PI / 2}
              />
              
              <gridHelper args={[20, 20, "#94a3b8", "#cbd5e1"]} position={[0, -2.5, 0]} />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg md:text-xl">Control de Cargas</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={addLoad} disabled={loads.length >= 6}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar ({loads.length}/6)
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {loads.map((load, idx) => (
            <Card key={load.id} className="p-3 md:p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-mono font-semibold text-sm md:text-base">Carga W{idx + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLoad(load.id)}
                  disabled={loads.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-xs">Peso</Label>
                    <span className="text-xs font-mono">{load.weight} N</span>
                  </div>
                  <Slider
                    value={[load.weight]}
                    onValueChange={([v]) => setLoads(loads.map(l => 
                      l.id === load.id ? { ...l, weight: v } : l
                    ))}
                    min={20}
                    max={150}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-xs">Posición</Label>
                    <span className="text-xs font-mono">{load.position.toFixed(1)} m</span>
                  </div>
                  <Slider
                    value={[load.position]}
                    onValueChange={([v]) => setLoads(loads.map(l => 
                      l.id === load.id ? { ...l, position: v } : l
                    ))}
                    min={0.5}
                    max={9.5}
                    step={0.1}
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
          <CardTitle className="text-lg md:text-xl">📊 Reacciones en los Apoyos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Reacción izquierda:</p>
              <p className="font-mono font-bold text-xl md:text-2xl text-green-600 dark:text-green-400">
                RA = {reactions.left.toFixed(1)} N
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Reacción derecha:</p>
              <p className="font-mono font-bold text-xl md:text-2xl text-green-600 dark:text-green-400">
                RB = {reactions.right.toFixed(1)} N
              </p>
            </div>
          </div>

          {reactions.isBalanced ? (
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-500">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300 text-center">
                ✓ Sistema en equilibrio: ΣF = 0, ΣM = 0
              </p>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border-2 border-amber-500">
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 text-center">
                ⚠ Ajusta las posiciones para equilibrar
              </p>
            </div>
          )}

          <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Condiciones de equilibrio:</strong> La suma de fuerzas verticales debe ser cero (ΣF = 0) y 
              la suma de momentos respecto a cualquier punto debe ser cero (ΣM = 0). Los soportes en 1m y 9m 
              generan reacciones que equilibran las cargas aplicadas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}