"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2, RotateCcw } from "lucide-react";

interface Force {
  id: number;
  magnitude: number;
  direction: 1 | -1; // 1 = derecha (positivo), -1 = izquierda (negativo)
  position: number;
  color: string;
}

function Arrow3D({ 
  position, 
  magnitude, 
  direction, 
  color, 
  label 
}: { 
  position: [number, number, number]; 
  magnitude: number; 
  direction: 1 | -1; 
  color: string; 
  label: string;
}) {
  const arrowLength = Math.abs(magnitude) / 15;
  const startPoint: [number, number, number] = [position[0], position[1], position[2]];
  const endPoint: [number, number, number] = [
    position[0] + arrowLength * direction,
    position[1],
    position[2]
  ];

  return (
    <group>
      {/* Línea del vector */}
      <Line
        points={[startPoint, endPoint]}
        color={color}
        lineWidth={4}
      />
      
      {/* Punta de flecha */}
      <mesh position={endPoint} rotation={[0, 0, direction === 1 ? -Math.PI / 2 : Math.PI / 2]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Cilindro base (punto de aplicación) */}
      <mesh position={startPoint}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
        <meshStandardMaterial color={color} opacity={0.7} transparent />
      </mesh>
      
      {/* Etiqueta */}
      <Text
        position={[endPoint[0], endPoint[1] + 0.6, endPoint[2]]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}: {magnitude}N
      </Text>

      {/* Indicador de posición */}
      <Text
        position={[startPoint[0], startPoint[1] - 0.5, startPoint[2]]}
        fontSize={0.2}
        color="#888"
        anchorX="center"
        anchorY="middle"
      >
        x={position[0].toFixed(1)}m
      </Text>
    </group>
  );
}

function ResultantArrow({ magnitude, position }: { magnitude: number; position: number }) {
  if (Math.abs(magnitude) < 0.1) return null;

  const direction = magnitude > 0 ? 1 : -1;
  const arrowLength = Math.abs(magnitude) / 15;
  const startPoint: [number, number, number] = [position, -1.5, 0];
  const endPoint: [number, number, number] = [
    position + arrowLength * direction,
    -1.5,
    0
  ];

  return (
    <group>
      <Line
        points={[startPoint, endPoint]}
        color="#f59e0b"
        lineWidth={6}
        dashed
        dashScale={0.5}
      />
      
      <mesh position={endPoint} rotation={[0, 0, direction === 1 ? -Math.PI / 2 : Math.PI / 2]}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>

      <mesh position={startPoint}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#f59e0b" opacity={0.8} transparent />
      </mesh>
      
      <Text
        position={[endPoint[0], endPoint[1] + 0.7, endPoint[2]]}
        fontSize={0.35}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000"
      >
        R = {magnitude.toFixed(1)}N
      </Text>

      <Text
        position={[position, -2.3, 0]}
        fontSize={0.25}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        {direction > 0 ? "→ Derecha" : "← Izquierda"}
      </Text>
    </group>
  );
}

function Scene({ forces, resultant }: { forces: Force[]; resultant: { magnitude: number; position: number } }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />

      {/* Eje X (línea de acción) */}
      <Line
        points={[[-8, 0, 0], [8, 0, 0]]}
        color="#555"
        lineWidth={2}
      />

      {/* Marcadores de posición en el eje */}
      {[-6, -4, -2, 0, 2, 4, 6].map((x) => (
        <group key={x}>
          <mesh position={[x, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#555" />
          </mesh>
          <Text
            position={[x, -0.4, 0]}
            fontSize={0.2}
            color="#888"
            anchorX="center"
            anchorY="middle"
          >
            {x}m
          </Text>
        </group>
      ))}

      {/* Fuerzas individuales */}
      {forces.map((force) => (
        <Arrow3D
          key={force.id}
          position={[force.position, 0, 0]}
          magnitude={force.magnitude}
          direction={force.direction}
          color={force.color}
          label={`F${force.id}`}
        />
      ))}

      {/* Resultante */}
      <ResultantArrow magnitude={resultant.magnitude} position={resultant.position} />

      {/* Grid de referencia */}
      <Grid
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#888"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#aaa"
        fadeDistance={25}
        fadeStrength={1}
        position={[0, -3, 0]}
      />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

export function Colineales3D() {
  const [forces, setForces] = useState<Force[]>([
    { id: 1, magnitude: 50, direction: 1, position: -3, color: "#3b82f6" },
    { id: 2, magnitude: 30, direction: -1, position: 2, color: "#ef4444" },
    { id: 3, magnitude: 40, direction: 1, position: 0, color: "#10b981" },
  ]);
  const [nextId, setNextId] = useState(4);

  const calculateResultant = () => {
    const totalForce = forces.reduce((sum, force) => {
      return sum + force.magnitude * force.direction;
    }, 0);

    const avgPosition = forces.length > 0
      ? forces.reduce((sum, f) => sum + f.position, 0) / forces.length
      : 0;

    return {
      magnitude: totalForce,
      position: avgPosition,
    };
  };

  const resultant = calculateResultant();

  const addForce = () => {
    if (forces.length >= 8) return;

    const newForce: Force = {
      id: nextId,
      magnitude: 30,
      direction: Math.random() > 0.5 ? 1 : -1,
      position: Math.random() * 8 - 4,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
    setForces([...forces, newForce]);
    setNextId(nextId + 1);
  };

  const removeForce = (id: number) => {
    if (forces.length <= 1) return;
    setForces(forces.filter((f) => f.id !== id));
  };

  const updateForce = (id: number, field: keyof Force, value: any) => {
    setForces(forces.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const reset = () => {
    setForces([
      { id: 1, magnitude: 50, direction: 1, position: -3, color: "#3b82f6" },
      { id: 2, magnitude: 30, direction: -1, position: 2, color: "#ef4444" },
      { id: 3, magnitude: 40, direction: 1, position: 0, color: "#10b981" },
    ]);
    setNextId(4);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardContent className="p-0">
          <div className="h-[500px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
              <Scene forces={forces} resultant={resultant} />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Control de Fuerzas</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={addForce} disabled={forces.length >= 8}>
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
              <Button size="sm" variant="outline" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {forces.map((force) => (
            <div key={force.id} className="p-4 rounded-lg border-2" style={{ borderColor: force.color }}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-mono font-semibold" style={{ color: force.color }}>
                  Fuerza F{force.id}: {force.magnitude}N {force.direction === 1 ? "→" : "←"}
                </h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeForce(force.id)}
                  disabled={forces.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Magnitud: {force.magnitude}N
                  </label>
                  <Slider
                    value={[force.magnitude]}
                    onValueChange={([v]) => updateForce(force.id, "magnitude", v)}
                    min={10}
                    max={100}
                    step={5}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Posición: {force.position.toFixed(1)}m
                  </label>
                  <Slider
                    value={[force.position]}
                    onValueChange={([v]) => updateForce(force.id, "position", v)}
                    min={-6}
                    max={6}
                    step={0.5}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={force.direction === 1 ? "default" : "outline"}
                    onClick={() => updateForce(force.id, "direction", 1)}
                    className="flex-1"
                  >
                    → Derecha (+)
                  </Button>
                  <Button
                    size="sm"
                    variant={force.direction === -1 ? "default" : "outline"}
                    onClick={() => updateForce(force.id, "direction", -1)}
                    className="flex-1"
                  >
                    ← Izquierda (-)
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="text-amber-900 dark:text-amber-100">
            📊 Análisis de la Resultante
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Fuerza Resultante</p>
              <p className="text-2xl font-mono font-bold text-amber-600">
                {Math.abs(resultant.magnitude).toFixed(1)}N
              </p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Dirección</p>
              <p className="text-2xl font-mono font-bold">
                {resultant.magnitude > 0 ? "→ Derecha" : resultant.magnitude < 0 ? "← Izquierda" : "Equilibrio"}
              </p>
            </div>
          </div>

          <div className="p-3 bg-background rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Cálculo paso a paso:</p>
            <div className="space-y-1 font-mono text-sm">
              {forces.map((f) => (
                <p key={f.id} style={{ color: f.color }}>
                  F{f.id} = {f.direction === 1 ? "+" : "-"}{f.magnitude}N
                </p>
              ))}
              <div className="border-t-2 border-amber-600 pt-1 mt-2">
                <p className="font-bold text-amber-600">
                  R = {resultant.magnitude > 0 ? "+" : ""}{resultant.magnitude.toFixed(1)}N
                </p>
              </div>
            </div>
          </div>

          {Math.abs(resultant.magnitude) < 5 && (
            <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                ✓ Sistema en equilibrio (R ≈ 0)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}