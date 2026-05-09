"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RotateCcw, Settings2, ChevronDown, Play, Pause } from "lucide-react";
import * as THREE from "three";

function AnimatedBlock({ 
  angle, 
  mass, 
  friction,
  isAnimating,
  onPositionUpdate
}: { 
  angle: number; 
  mass: number;
  friction: number;
  isAnimating: boolean;
  onPositionUpdate: (pos: number, vel: number, acc: number) => void;
}) {
  const blockRef = useRef<THREE.Mesh>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const timeRef = useRef(0);

  const radAngle = (angle * Math.PI) / 180;
  const weight = mass * 9.8;
  const parallelForce = weight * Math.sin(radAngle);
  const normalForce = weight * Math.cos(radAngle);
  const frictionForce = friction * normalForce;
  const netForce = parallelForce - frictionForce;
  const acceleration = netForce / mass;

  const planeLength = 6;
  const blockSize = 0.5;

  useFrame((state, delta) => {
    if (!blockRef.current || !isAnimating) return;

    timeRef.current += delta;
    velocityRef.current += acceleration * delta;
    positionRef.current += velocityRef.current * delta;

    // Limitar al final del plano
    if (positionRef.current >= planeLength - 1) {
      positionRef.current = planeLength - 1;
      velocityRef.current = 0;
    }

    // Limitar al inicio si la fuerza neta es negativa (fricción > componente paralela)
    if (positionRef.current <= 0 && acceleration < 0) {
      positionRef.current = 0;
      velocityRef.current = 0;
    }

    const x = positionRef.current * Math.cos(radAngle);
    const y = positionRef.current * Math.sin(radAngle);

    blockRef.current.position.set(x, y, 0);
    blockRef.current.rotation.set(0, 0, -radAngle);

    onPositionUpdate(positionRef.current, velocityRef.current, acceleration);
  });

  // Reset cuando cambian los parámetros
  useEffect(() => {
    positionRef.current = 0;
    velocityRef.current = 0;
    timeRef.current = 0;
    if (blockRef.current) {
      blockRef.current.position.set(0, 0, 0);
      blockRef.current.rotation.set(0, 0, -radAngle);
    }
  }, [angle, mass, friction, radAngle]);

  return (
    <mesh ref={blockRef} position={[0, 0, 0]} rotation={[0, 0, -radAngle]}>
      <boxGeometry args={[blockSize, blockSize, blockSize]} />
      <meshStandardMaterial color="#dc2626" metalness={0.6} roughness={0.4} />
    </mesh>
  );
}

function InclinedPlaneScene({ 
  angle, 
  mass, 
  friction,
  position,
  isAnimating,
  onPositionUpdate
}: { 
  angle: number; 
  mass: number;
  friction: number;
  position: number;
  isAnimating: boolean;
  onPositionUpdate: (pos: number, vel: number, acc: number) => void;
}) {
  const radAngle = (angle * Math.PI) / 180;
  const weight = mass * 9.8;
  const parallelForce = weight * Math.sin(radAngle);
  const normalForce = weight * Math.cos(radAngle);
  const frictionForce = friction * normalForce;
  
  const planeLength = 6;
  const planeWidth = 3;
  const blockSize = 0.5;
  
  // Posición del bloque
  const blockX = position * Math.cos(radAngle);
  const blockY = position * Math.sin(radAngle);

  // Marcas de distancia en el plano
  const distanceMarks = Array.from({ length: 7 }, (_, i) => i);

  return (
    <group>
      {/* Plano inclinado con textura de madera */}
      <mesh 
        rotation={[0, 0, -radAngle]} 
        position={[planeLength / 2 * Math.cos(radAngle), planeLength / 2 * Math.sin(radAngle), 0]}
      >
        <boxGeometry args={[planeLength, 0.2, planeWidth]} />
        <meshStandardMaterial 
          color="#94a3b8" 
          metalness={0.3} 
          roughness={0.7}
        />
      </mesh>

      {/* Marcas de distancia en el plano */}
      {distanceMarks.map((mark) => {
        const markX = mark * Math.cos(radAngle);
        const markY = mark * Math.sin(radAngle);
        return (
          <group key={mark}>
            <mesh position={[markX, markY, 0.3]} rotation={[0, 0, -radAngle]}>
              <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
            <Text
              position={[markX, markY, 0.6]}
              fontSize={0.15}
              color="#64748b"
              anchorX="center"
              rotation={[0, 0, -radAngle]}
            >
              {mark}m
            </Text>
          </group>
        );
      })}

      {/* Bloque animado */}
      <AnimatedBlock
        angle={angle}
        mass={mass}
        friction={friction}
        isAnimating={isAnimating}
        onPositionUpdate={onPositionUpdate}
      />

      {/* Etiqueta de masa en el bloque */}
      <Text 
        position={[blockX, blockY - 0.5, 0]} 
        fontSize={0.2} 
        color="#dc2626" 
        anchorX="center"
      >
        {mass}kg
      </Text>

      {/* Vector de peso */}
      <Line
        points={[[blockX, blockY, 0], [blockX, blockY - weight / 50, 0]]}
        color="#8b5cf6"
        lineWidth={3}
      />
      <mesh position={[blockX, blockY - weight / 50, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <Text 
        position={[blockX + 0.5, blockY - weight / 100, 0]} 
        fontSize={0.18} 
        color="#8b5cf6" 
        anchorX="left"
      >
        W={weight.toFixed(1)}N
      </Text>

      {/* Vector componente paralela */}
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
          blockX + (parallelForce / 50 * Math.cos(radAngle)) * 1.3,
          blockY + (parallelForce / 50 * Math.sin(radAngle)) * 1.3 + 0.2,
          0
        ]}
        fontSize={0.15}
        color="#10b981"
        anchorX="center"
      >
        F∥={parallelForce.toFixed(1)}N
      </Text>

      {/* Vector normal */}
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
          blockX - (normalForce / 50 * Math.sin(radAngle)) * 1.3,
          blockY + (normalForce / 50 * Math.cos(radAngle)) * 1.3,
          0
        ]}
        fontSize={0.15}
        color="#3b82f6"
        anchorX="center"
      >
        N={normalForce.toFixed(1)}N
      </Text>

      {/* Vector de fricción */}
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
              blockX - (frictionForce / 50 * Math.cos(radAngle)) * 1.3,
              blockY - (frictionForce / 50 * Math.sin(radAngle)) * 1.3 - 0.2,
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

      {/* Base horizontal */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[12, 0.3, planeWidth + 1]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Soporte triangular */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, -radAngle]}>
        <boxGeometry args={[0.3, planeLength * Math.sin(radAngle) + 0.5, planeWidth * 0.8]} />
        <meshStandardMaterial color="#64748b" opacity={0.7} transparent />
      </mesh>

      <gridHelper args={[14, 14, "#94a3b8", "#cbd5e1"]} position={[0, -0.35, 0]} />
    </group>
  );
}

export function PlanoInclinado3D() {
  const [angle, setAngle] = useState(30);
  const [mass, setMass] = useState(10);
  const [friction, setFriction] = useState(0.2);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [acceleration, setAcceleration] = useState(0);

  const weight = mass * 9.8;
  const radAngle = (angle * Math.PI) / 180;
  const parallelForce = weight * Math.sin(radAngle);
  const normalForce = weight * Math.cos(radAngle);
  const frictionForce = friction * normalForce;
  const netForce = parallelForce - frictionForce;
  const calculatedAcceleration = netForce / mass;
  const vm = 1 / Math.sin(radAngle);

  // Energía
  const height = position * Math.sin(radAngle);
  const initialHeight = 0; // Empieza desde el top cuando position = 0
  const potentialEnergy = mass * 9.8 * (6 * Math.sin(radAngle) - height);
  const kineticEnergy = 0.5 * mass * velocity * velocity;
  const workByFriction = frictionForce * position;

  const handlePositionUpdate = (pos: number, vel: number, acc: number) => {
    setPosition(pos);
    setVelocity(vel);
    setAcceleration(acc);
  };

  const reset = () => {
    setAngle(30);
    setMass(10);
    setFriction(0.2);
    setIsAnimating(false);
    setPosition(0);
    setVelocity(0);
    setAcceleration(0);
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 shadow-sm">
        <CardContent className="p-3 md:p-6">
          <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [6, 5, 9], fov: 50 }}>
              <color attach="background" args={["#f1f5f9"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-5, 5, -5]} intensity={0.5} />

              <InclinedPlaneScene 
                angle={angle} 
                mass={mass} 
                friction={friction}
                position={position}
                isAnimating={isAnimating}
                onPositionUpdate={handlePositionUpdate}
              />

              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={5}
                maxDistance={18}
                maxPolarAngle={Math.PI / 2.2}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg md:text-xl">Controles de Simulación</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={isAnimating ? "default" : "outline"}
                size="sm"
                onClick={toggleAnimation}
              >
                {isAnimating ? (
                  <><Pause className="w-4 h-4 mr-2" /> Pausar</>
                ) : (
                  <><Play className="w-4 h-4 mr-2" /> Iniciar</>
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
              disabled={isAnimating}
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
                  disabled={isAnimating}
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
                  disabled={isAnimating}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">🎯 Estado del Movimiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-background p-3 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Posición:</p>
              <p className="font-mono font-bold text-base text-blue-600 dark:text-blue-400">
                {position.toFixed(2)} m
              </p>
            </div>
            <div className="bg-background p-3 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Velocidad:</p>
              <p className="font-mono font-bold text-base text-green-600 dark:text-green-400">
                {velocity.toFixed(2)} m/s
              </p>
            </div>
            <div className="bg-background p-3 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Aceleración:</p>
              <p className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                {calculatedAcceleration.toFixed(2)} m/s²
              </p>
            </div>
            <div className="bg-background p-3 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Altura:</p>
              <p className="font-mono font-bold text-base text-purple-600 dark:text-purple-400">
                {height.toFixed(2)} m
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-2 border-primary/20 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">📊 Análisis de Fuerzas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-background p-3 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Peso total:</p>
              <p className="font-mono font-bold text-base text-purple-600 dark:text-purple-400">
                {weight.toFixed(1)} N
              </p>
            </div>
            <div className="bg-background p-3 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Normal:</p>
              <p className="font-mono font-bold text-base text-blue-600 dark:text-blue-400">
                {normalForce.toFixed(1)} N
              </p>
            </div>
            <div className="bg-background p-3 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Paralela:</p>
              <p className="font-mono font-bold text-base text-green-600 dark:text-green-400">
                {parallelForce.toFixed(1)} N
              </p>
            </div>
            <div className="bg-background p-3 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Fricción:</p>
              <p className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                {frictionForce.toFixed(1)} N
              </p>
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border-2">
            <p className="text-xs text-muted-foreground mb-2">Fuerza neta sobre el plano:</p>
            <p className="font-mono text-sm md:text-base text-center">
              Fneta = F∥ - Fr = ma
            </p>
            <p className="font-mono text-sm md:text-base text-center text-primary mt-1">
              {netForce.toFixed(1)} N = {mass} kg × {calculatedAcceleration.toFixed(2)} m/s²
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Ventaja Mecánica:</p>
              <p className="font-mono font-bold text-xl text-accent text-center">
                VM = {vm.toFixed(2)}
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Energía Total:</p>
              <p className="font-mono font-bold text-xl text-accent text-center">
                {(potentialEnergy + kineticEnergy).toFixed(1)} J
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">⚡ Análisis Energético</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Energía Potencial:</p>
              <p className="font-mono font-bold text-lg text-blue-600 dark:text-blue-400">
                Ep = {potentialEnergy.toFixed(1)} J
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Energía Cinética:</p>
              <p className="font-mono font-bold text-lg text-green-600 dark:text-green-400">
                Ec = {kineticEnergy.toFixed(1)} J
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Trabajo Fricción:</p>
              <p className="font-mono font-bold text-lg text-red-600 dark:text-red-400">
                Wfr = {workByFriction.toFixed(1)} J
              </p>
            </div>
          </div>

          <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Conservación de energía:</strong> La energía potencial se convierte en cinética conforme 
              el bloque desciende. La fricción disipa energía como calor (trabajo negativo). 
              La suma Ep + Ec - Wfr se mantiene aproximadamente constante.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent/10 border-2 border-accent/30 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">💡 Conceptos Clave</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-background p-3 rounded-lg border">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Descomposición del peso:</strong><br/>
              • F∥ = W · sen(θ) - Componente que hace deslizar el bloque<br/>
              • N = W · cos(θ) - Fuerza perpendicular al plano
            </p>
          </div>
          <div className="bg-background p-3 rounded-lg border">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Fricción:</strong><br/>
              • Fr = μ · N - Se opone al movimiento<br/>
              • Si Fr {'>'} F∥, el objeto no se moverá (fricción estática)
            </p>
          </div>
          <div className="bg-background p-3 rounded-lg border">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Ventaja mecánica:</strong><br/>
              • VM = 1/sen(θ) - A menor ángulo, menor fuerza necesaria<br/>
              • Pero se recorre mayor distancia (mismo trabajo total)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}