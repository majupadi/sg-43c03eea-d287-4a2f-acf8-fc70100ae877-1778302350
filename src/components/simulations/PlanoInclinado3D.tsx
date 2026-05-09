"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RotateCcw, Settings2, ChevronDown } from "lucide-react";

function InclinedPlane({ 
  angle, 
  mass, 
  friction 
}: { 
  angle: number; 
  mass: number;
  friction: number;
}) {
  const radAngle = (angle * Math.PI) / 180;
  const weight = mass * 9.8;
  const parallelForce = weight * Math.sin(radAngle);
  const normalForce = weight * Math.cos(radAngle);
  const frictionForce = friction * normalForce;
  
  const planeLength = 6;
  const planeWidth = 3;
  const blockSize = 0.5;
  
  const blockX = (planeLength / 2) * Math.cos(radAngle);
  const blockY = (planeLength / 2) * Math.sin(radAngle);

  return (
    <group>
      <mesh rotation={[0, 0, -radAngle]} position={[planeLength / 2 * Math.cos(radAngle), planeLength / 2 * Math.sin(radAngle), 0]}>
        <boxGeometry args={[planeLength, 0.2, planeWidth]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.3} roughness={0.7} />
      </mesh>

      <mesh position={[blockX, blockY, 0]}>
        <boxGeometry args={[blockSize, blockSize, blockSize]} />
        <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.5} />
      </mesh>
      <Text position={[blockX, blockY - 0.5, 0]} fontSize={0.2} color="#dc2626" anchorX="center">
        m={mass}kg
      </Text>

      <Line
        points={[[blockX, blockY, 0], [blockX, blockY - weight / 50, 0]]}
        color="#8b5cf6"
        lineWidth={3}
      />
      <mesh position={[blockX, blockY - weight / 50, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <Text position={[blockX + 0.4, blockY - weight / 100, 0]} fontSize={0.18} color="#8b5cf6" anchorX="left">
        W={weight.toFixed(1)}N
      </Text>

      <Line
        points={[
          [blockX, blockY, 0],
          [blockX + parallelForce / 50 * Math.cos(radAngle), blockY + parallelForce / 50 * Math.sin(radAngle), 0]
        ]}
        color="#10b981"
        lineWidth={2}
      />
      <Text
        position={[
          blockX + (parallelForce / 50 * Math.cos(radAngle)) * 1.2,
          blockY + (parallelForce / 50 * Math.sin(radAngle)) * 1.2 + 0.2,
          0
        ]}
        fontSize={0.15}
        color="#10b981"
        anchorX="center"
      >
        F∥={parallelForce.toFixed(1)}N
      </Text>

      <Line
        points={[
          [blockX, blockY, 0],
          [blockX - normalForce / 50 * Math.sin(radAngle), blockY + normalForce / 50 * Math.cos(radAngle), 0]
        ]}
        color="#3b82f6"
        lineWidth={2}
      />
      <Text
        position={[
          blockX - (normalForce / 50 * Math.sin(radAngle)) * 1.2,
          blockY + (normalForce / 50 * Math.cos(radAngle)) * 1.2,
          0
        ]}
        fontSize={0.15}
        color="#3b82f6"
        anchorX="center"
      >
        N={normalForce.toFixed(1)}N
      </Text>

      {friction > 0 && (
        <>
          <Line
            points={[
              [blockX, blockY, 0],
              [blockX - frictionForce / 50 * Math.cos(radAngle), blockY - frictionForce / 50 * Math.sin(radAngle), 0]
            ]}
            color="#f59e0b"
            lineWidth={2}
          />
          <Text
            position={[
              blockX - (frictionForce / 50 * Math.cos(radAngle)) * 1.2,
              blockY - (frictionForce / 50 * Math.sin(radAngle)) * 1.2 - 0.2,
              0
            ]}
            fontSize={0.15}
            color="#f59e0b"
            anchorX="center"
          >
            Fr={frictionForce.toFixed(1)}N
          </Text>
        </>
      )}

      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[10, 0.2, planeWidth + 1]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      <gridHelper args={[12, 12, "#94a3b8", "#cbd5e1"]} position={[0, -0.25, 0]} />
    </group>
  );
}

export function PlanoInclinado3D() {
  const [angle, setAngle] = useState(30);
  const [mass, setMass] = useState(10);
  const [friction, setFriction] = useState(0.2);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const weight = mass * 9.8;
  const radAngle = (angle * Math.PI) / 180;
  const parallelForce = weight * Math.sin(radAngle);
  const normalForce = weight * Math.cos(radAngle);
  const frictionForce = friction * normalForce;
  const netForce = parallelForce - frictionForce;
  const vm = 1 / Math.sin(radAngle);

  const reset = () => {
    setAngle(30);
    setMass(10);
    setFriction(0.2);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 shadow-sm">
        <CardContent className="p-3 md:p-6">
          <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [5, 4, 8], fov: 50 }}>
              <color attach="background" args={["#f1f5f9"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-5, 5, -5]} intensity={0.5} />

              <InclinedPlane angle={angle} mass={mass} friction={friction} />

              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={5}
                maxDistance={15}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg md:text-xl">Controles</CardTitle>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm md:text-base">Ángulo de inclinación (θ)</Label>
              <span className="text-sm md:text-base font-mono font-bold text-primary">{angle}°</span>
            </div>
            <Slider
              value={[angle]}
              onValueChange={([v]) => setAngle(v)}
              min={5}
              max={60}
              step={5}
              className="cursor-pointer"
            />
          </div>

          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4" />
                  Configuración Avanzada
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-6 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Masa del objeto (m)</Label>
                  <span className="text-sm font-mono text-muted-foreground">{mass} kg</span>
                </div>
                <Slider
                  value={[mass]}
                  onValueChange={([v]) => setMass(v)}
                  min={1}
                  max={50}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Coeficiente de fricción (μ)</Label>
                  <span className="text-sm font-mono text-muted-foreground">{friction.toFixed(2)}</span>
                </div>
                <Slider
                  value={[friction]}
                  onValueChange={([v]) => setFriction(v)}
                  min={0}
                  max={0.8}
                  step={0.05}
                  className="cursor-pointer"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-2 border-primary/20 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">📊 Análisis de Fuerzas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-background p-3 md:p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Peso total:</p>
              <p className="font-mono font-bold text-lg md:text-xl text-purple-600 dark:text-purple-400">
                W = {weight.toFixed(1)} N
              </p>
            </div>
            <div className="bg-background p-3 md:p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Fuerza normal:</p>
              <p className="font-mono font-bold text-lg md:text-xl text-blue-600 dark:text-blue-400">
                N = {normalForce.toFixed(1)} N
              </p>
            </div>
            <div className="bg-background p-3 md:p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Comp. paralela:</p>
              <p className="font-mono font-bold text-lg md:text-xl text-green-600 dark:text-green-400">
                F∥ = {parallelForce.toFixed(1)} N
              </p>
            </div>
            <div className="bg-background p-3 md:p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Fricción:</p>
              <p className="font-mono font-bold text-lg md:text-xl text-amber-600 dark:text-amber-400">
                Fr = {frictionForce.toFixed(1)} N
              </p>
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border-2">
            <p className="text-xs text-muted-foreground mb-2">Fuerza neta sobre el plano:</p>
            <p className="font-mono text-base md:text-lg text-center">
              Fneta = F∥ - Fr
            </p>
            <p className="font-mono text-base md:text-lg text-center text-primary mt-1">
              Fneta = {parallelForce.toFixed(1)} - {frictionForce.toFixed(1)} = {netForce.toFixed(1)} N
            </p>
          </div>

          <div className="bg-background p-4 rounded-lg border-2">
            <p className="text-xs text-muted-foreground mb-1">Ventaja Mecánica:</p>
            <p className="font-mono font-bold text-xl md:text-2xl text-accent text-center">
              VM = {vm.toFixed(2)}
            </p>
          </div>

          <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Plano inclinado:</strong> El peso se descompone en dos componentes: paralela al plano (F∥ = W·sen θ) 
              y perpendicular (N = W·cos θ). La fricción se opone al movimiento (Fr = μ·N). 
              A menor ángulo, menor fuerza paralela pero mayor distancia recorrida (ventaja mecánica).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}