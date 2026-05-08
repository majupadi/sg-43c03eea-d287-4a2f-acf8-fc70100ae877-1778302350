"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

function InclinedPlaneScene({ 
  angle, 
  weight, 
  friction 
}: { 
  angle: number;
  weight: number;
  friction: number;
}) {
  const angleRad = (angle * Math.PI) / 180;
  const length = 6;
  const height = length * Math.sin(angleRad);
  const base = length * Math.cos(angleRad);

  // Componentes del peso
  const wParallel = weight * Math.sin(angleRad);
  const wNormal = weight * Math.cos(angleRad);
  const frictionForce = friction * wNormal;
  const requiredForce = wParallel + frictionForce;

  // Posición del objeto en el plano
  const objX = base / 2;
  const objY = height / 2;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      {/* Plano inclinado */}
      <mesh position={[objX, objY / 2, 0]} rotation={[0, 0, -angleRad]}>
        <boxGeometry args={[length, 0.3, 3]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Base del plano */}
      <Line
        points={[[0, 0, 0], [base, 0, 0]]}
        color="#64748b"
        lineWidth={4}
      />

      {/* Altura del plano */}
      <Line
        points={[[base, 0, 0], [base, height, 0]]}
        color="#64748b"
        lineWidth={4}
        dashed
      />

      {/* Objeto sobre el plano */}
      <mesh position={[objX, objY, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Peso (W) - flecha hacia abajo */}
      <Line
        points={[[objX, objY, 0], [objX, objY - 2, 0]]}
        color="#dc2626"
        lineWidth={3}
      />
      <mesh position={[objX, objY - 2, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.12, 0.25, 8]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <Text position={[objX + 0.5, objY - 1, 0]} fontSize={0.3} color="#dc2626" anchorX="left">
        {`W=${weight}N`}
      </Text>

      {/* Componente paralela (W‖) */}
      <Line
        points={[
          [objX, objY, 0],
          [objX + wParallel / 50, objY - wParallel / 50, 0]
        ]}
        color="#f59e0b"
        lineWidth={3}
      />
      <mesh 
        position={[objX + wParallel / 50, objY - wParallel / 50, 0]} 
        rotation={[0, 0, -angleRad]}
      >
        <coneGeometry args={[0.12, 0.25, 8]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <Text 
        position={[objX + wParallel / 100 + 0.5, objY - wParallel / 100, 0]} 
        fontSize={0.25} 
        color="#f59e0b" 
        anchorX="left"
      >
        {`W‖=${wParallel.toFixed(1)}N`}
      </Text>

      {/* Componente normal (W⊥) */}
      <Line
        points={[
          [objX, objY, 0],
          [objX + Math.sin(angleRad) * 1.5, objY - Math.cos(angleRad) * 1.5, 0]
        ]}
        color="#3b82f6"
        lineWidth={3}
        dashed
      />
      <Text 
        position={[objX + Math.sin(angleRad) * 0.8 + 0.3, objY - Math.cos(angleRad) * 0.8, 0]} 
        fontSize={0.25} 
        color="#3b82f6" 
        anchorX="left"
      >
        {`W⊥=${wNormal.toFixed(1)}N`}
      </Text>

      {/* Fuerza aplicada (F) - paralela al plano, hacia arriba */}
      <Line
        points={[
          [objX, objY, 0],
          [objX - Math.cos(angleRad) * 1.5, objY + Math.sin(angleRad) * 1.5, 0]
        ]}
        color="#22c55e"
        lineWidth={4}
      />
      <mesh 
        position={[objX - Math.cos(angleRad) * 1.5, objY + Math.sin(angleRad) * 1.5, 0]} 
        rotation={[0, 0, Math.PI - angleRad]}
      >
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      <Text 
        position={[objX - Math.cos(angleRad) * 0.8 - 0.5, objY + Math.sin(angleRad) * 0.8, 0]} 
        fontSize={0.3} 
        color="#22c55e" 
        anchorX="right"
      >
        {`F=${requiredForce.toFixed(1)}N`}
      </Text>

      {/* Etiquetas de dimensiones */}
      <Text position={[base / 2, -0.4, 0]} fontSize={0.3} color="#64748b" anchorX="center">
        {`Base = ${base.toFixed(2)}m`}
      </Text>
      <Text position={[base + 0.6, height / 2, 0]} fontSize={0.3} color="#64748b" anchorX="left">
        {`h = ${height.toFixed(2)}m`}
      </Text>
      <Text position={[objX - 0.8, objY + 0.8, 0]} fontSize={0.3} color="#8b5cf6" anchorX="center">
        {`θ = ${angle}°`}
      </Text>

      {/* Plano de referencia */}
      <mesh position={[base / 2, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#e5e7eb" opacity={0.3} transparent />
      </mesh>

      <gridHelper args={[12, 12, "#94a3b8", "#cbd5e1"]} position={[base / 2, -1, 0]} />
    </>
  );
}

export function PlanoInclinado3D() {
  const [angle, setAngle] = useState(30);
  const [weight, setWeight] = useState(100);
  const [friction, setFriction] = useState(0.2);

  const angleRad = (angle * Math.PI) / 180;
  const wParallel = weight * Math.sin(angleRad);
  const wNormal = weight * Math.cos(angleRad);
  const frictionForce = friction * wNormal;
  const requiredForce = wParallel + frictionForce;
  const vm = 1 / Math.sin(angleRad);

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="h-[500px] bg-muted/20 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
              <InclinedPlaneScene angle={angle} weight={weight} friction={friction} />
              <OrbitControls 
                enablePan={false}
                minDistance={6}
                maxDistance={15}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Controles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Ángulo de Inclinación (θ)</Label>
              <span className="text-sm font-mono text-muted-foreground">{angle}°</span>
            </div>
            <Slider
              value={[angle]}
              onValueChange={([v]) => setAngle(v)}
              min={10}
              max={60}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Peso del Objeto (W)</Label>
              <span className="text-sm font-mono text-muted-foreground">{weight} N</span>
            </div>
            <Slider
              value={[weight]}
              onValueChange={([v]) => setWeight(v)}
              min={20}
              max={200}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Coeficiente de Fricción (μ)</Label>
              <span className="text-sm font-mono text-muted-foreground">{friction.toFixed(2)}</span>
            </div>
            <Slider
              value={[friction]}
              onValueChange={([v]) => setFriction(v)}
              min={0}
              max={0.8}
              step={0.05}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Cálculos y Componentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground mb-1">Componente Paralela:</p>
              <p className="font-mono font-bold text-lg text-amber-600 dark:text-amber-400">
                W‖ = {wParallel.toFixed(1)} N
              </p>
              <p className="text-xs text-muted-foreground mt-1">W × sin({angle}°)</p>
            </div>
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground mb-1">Componente Normal:</p>
              <p className="font-mono font-bold text-lg text-blue-600 dark:text-blue-400">
                W⊥ = {wNormal.toFixed(1)} N
              </p>
              <p className="text-xs text-muted-foreground mt-1">W × cos({angle}°)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground mb-1">Fuerza de Fricción:</p>
              <p className="font-mono font-bold text-lg text-red-600 dark:text-red-400">
                Ff = {frictionForce.toFixed(1)} N
              </p>
              <p className="text-xs text-muted-foreground mt-1">μ × W⊥</p>
            </div>
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground mb-1">Ventaja Mecánica:</p>
              <p className="font-mono font-bold text-lg text-accent">
                VM = {vm.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">1 / sin(θ)</p>
            </div>
          </div>

          <div className="bg-background p-3 rounded border">
            <p className="text-xs text-muted-foreground mb-2">Fuerza Requerida (con fricción):</p>
            <p className="font-mono font-bold text-xl text-center text-green-600 dark:text-green-400">
              F = {requiredForce.toFixed(1)} N
            </p>
            <p className="text-xs text-center text-muted-foreground mt-2">
              F = W·sin(θ) + μ·W·cos(θ)
            </p>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            {friction === 0 
              ? "✓ Sin fricción: F = W·sin(θ)" 
              : `Con fricción μ=${friction.toFixed(2)}: se requiere ${frictionForce.toFixed(1)}N adicional`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}