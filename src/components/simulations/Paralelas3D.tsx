"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCcw, Plus, Trash2, Settings2 } from "lucide-react";
import * as THREE from "three";

interface Force {
  id: number;
  position: number;
  magnitude: number;
  direction: 1 | -1;
}

function ForceArrow({ 
  position, 
  magnitude, 
  direction, 
  color,
  beamLength
}: { 
  position: number; 
  magnitude: number; 
  direction: 1 | -1;
  color: string;
  beamLength: number;
}) {
  const xPos = (position / beamLength) * beamLength - beamLength / 2;
  const arrowLength = (magnitude / 100) * 3;
  const yStart = direction === 1 ? 0.15 : -0.15;
  const yEnd = direction === 1 ? yStart + arrowLength : yStart - arrowLength;

  return (
    <group position={[xPos, 0, 0]}>
      <Line
        points={[[0, yStart, 0], [0, yEnd, 0]]}
        color={color}
        lineWidth={4}
      />
      
      <mesh position={[0, yEnd, 0]} rotation={direction === 1 ? [0, 0, 0] : [Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 0.25, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.3, 8]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>

      <Text
        position={[0, yEnd + (direction * 0.4), 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
      >
        {magnitude}N
      </Text>

      <Text
        position={[0, -0.8, 0]}
        fontSize={0.15}
        color="#94a3b8"
        anchorX="center"
      >
        x={position.toFixed(1)}m
      </Text>
    </group>
  );
}

function Beam3D({ 
  forces, 
  resultant, 
  beamLength 
}: { 
  forces: Force[]; 
  resultant: { magnitude: number; position: number }; 
  beamLength: number;
}) {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[beamLength, 0.2, 0.4]} />
        <meshStandardMaterial 
          color="#1e40af" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>

      {Array.from({ length: Math.floor(beamLength) + 1 }).map((_, i) => {
        const x = -beamLength / 2 + i;
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
            <Text
              position={[0, 0.4, 0]}
              fontSize={0.12}
              color="#64748b"
              anchorX="center"
            >
              {i}m
            </Text>
          </group>
        );
      })}

      {forces.map((force) => (
        <ForceArrow
          key={force.id}
          position={force.position}
          magnitude={force.magnitude}
          direction={force.direction}
          color={force.direction === 1 ? "#10b981" : "#ef4444"}
          beamLength={beamLength}
        />
      ))}

      {Math.abs(resultant.magnitude) > 0.1 && (
        <group>
          <ForceArrow
            position={resultant.position}
            magnitude={Math.abs(resultant.magnitude)}
            direction={resultant.magnitude > 0 ? 1 : -1}
            color="#f59e0b"
            beamLength={beamLength}
          />
          <Text
            position={[0, -2.5, 0]}
            fontSize={0.25}
            color="#f59e0b"
            anchorX="center"
          >
            Resultante en x={resultant.position.toFixed(2)}m
          </Text>
        </group>
      )}

      <gridHelper args={[beamLength + 4, 20, "#94a3b8", "#cbd5e1"]} position={[0, -2, 0]} />
    </group>
  );
}

export function Paralelas3D() {
  const [forces, setForces] = useState<Force[]>([
    { id: 1, position: 2, magnitude: 60, direction: 1 },
    { id: 2, position: 6, magnitude: 40, direction: 1 },
    { id: 3, position: 8, magnitude: 50, direction: -1 },
  ]);
  const [beamLength, setBeamLength] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [nextId, setNextId] = useState(4);

  const calculateResultant = () => {
    const totalForce = forces.reduce((sum, f) => sum + f.magnitude * f.direction, 0);
    const moment = forces.reduce((sum, f) => sum + f.position * f.magnitude * f.direction, 0);
    const position = totalForce !== 0 ? moment / totalForce : beamLength / 2;
    return { magnitude: totalForce, position };
  };

  const resultant = calculateResultant();

  const addForce = () => {
    if (forces.length < 8) {
      setForces([...forces, {
        id: nextId,
        position: beamLength / 2,
        magnitude: 50,
        direction: 1
      }]);
      setNextId(nextId + 1);
    }
  };

  const removeForce = (id: number) => {
    if (forces.length > 1) {
      setForces(forces.filter(f => f.id !== id));
    }
  };

  const updateForce = (id: number, updates: Partial<Force>) => {
    setForces(forces.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const reset = () => {
    setForces([
      { id: 1, position: 2, magnitude: 60, direction: 1 },
      { id: 2, position: 6, magnitude: 40, direction: 1 },
      { id: 3, position: 8, magnitude: 50, direction: -1 },
    ]);
    setBeamLength(10);
    setNextId(4);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Simulación de Fuerzas Paralelas 3D Mejorada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[550px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [0, 4, 14], fov: 50 }} shadows>
              <color attach="background" args={["#f1f5f9"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-10, 5, -5]} intensity={0.4} />
              <spotLight position={[0, 8, 0]} intensity={0.3} angle={0.5} penumbra={0.5} />
              
              <Beam3D forces={forces} resultant={resultant} beamLength={beamLength} />
              
              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={8}
                maxDistance={20}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Configuración del Sistema</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Settings2 className="w-4 h-4 mr-2" />
                {showAdvanced ? "Ocultar" : "Mostrar"} Avanzados
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAdvanced && (
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Longitud de la barra</label>
                <span className="text-sm font-mono text-primary">{beamLength} m</span>
              </div>
              <Slider
                value={[beamLength]}
                onValueChange={(v) => {
                  setBeamLength(v[0]);
                  setForces(forces.map(f => ({
                    ...f,
                    position: Math.min(f.position, v[0])
                  })));
                }}
                min={6}
                max={16}
                step={1}
                className="w-full"
              />
            </div>
          )}

          <div className="space-y-3">
            {forces.map((force, idx) => (
              <Card key={force.id} className="p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono font-semibold">Fuerza {idx + 1}</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateForce(force.id, { 
                        direction: (force.direction === 1 ? -1 : 1) as 1 | -1 
                      })}
                    >
                      {force.direction === 1 ? "↑ Arriba" : "↓ Abajo"}
                    </Button>
                    {forces.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeForce(force.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-muted-foreground">Magnitud</label>
                      <span className="text-xs font-mono">{force.magnitude} N</span>
                    </div>
                    <Slider
                      value={[force.magnitude]}
                      onValueChange={(v) => updateForce(force.id, { magnitude: v[0] })}
                      min={10}
                      max={150}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-muted-foreground">Posición en la barra</label>
                      <span className="text-xs font-mono">{force.position.toFixed(1)} m</span>
                    </div>
                    <Slider
                      value={[force.position]}
                      onValueChange={(v) => updateForce(force.id, { position: v[0] })}
                      min={0}
                      max={beamLength}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {forces.length < 8 && (
            <Button onClick={addForce} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Fuerza ({forces.length}/8)
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20 border-2">
        <CardContent className="pt-6">
          <h3 className="font-mono font-bold mb-3">📊 Análisis del Sistema</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Número de fuerzas:</span>
                <span className="font-mono font-semibold">{forces.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Fuerzas hacia arriba:</span>
                <span className="font-mono font-semibold text-green-600 dark:text-green-400">
                  {forces.filter(f => f.direction === 1).reduce((sum, f) => sum + f.magnitude, 0)} N
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Fuerzas hacia abajo:</span>
                <span className="font-mono font-semibold text-red-600 dark:text-red-400">
                  {forces.filter(f => f.direction === -1).reduce((sum, f) => sum + f.magnitude, 0)} N
                </span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Resultante:</span>
                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
                  R = {Math.abs(resultant.magnitude).toFixed(1)} N {resultant.magnitude > 0 ? "↑" : resultant.magnitude < 0 ? "↓" : ""}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Posición de R:</span>
                <span className="font-mono font-semibold">x = {resultant.position.toFixed(2)} m</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <span className="font-mono font-semibold">
                  {Math.abs(resultant.magnitude) < 0.5 ? "✓ En equilibrio" : "⚠ No equilibrado"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Cálculo de la resultante:</strong> R = ΣF = F₁ + F₂ + F₃ + ... (considerando signos).
              La posición se calcula con: x = ΣMo / R, donde ΣMo es la suma de momentos respecto al origen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}