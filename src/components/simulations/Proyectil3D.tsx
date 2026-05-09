"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Grid } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RotateCcw, Play, Pause, ChevronDown, Settings2 } from "lucide-react";
import * as THREE from "three";

function ProjectileScene({
  angle,
  velocity,
  isRunning,
  onStateChange,
}: {
  angle: number;
  velocity: number;
  isRunning: boolean;
  onStateChange: (state: any) => void;
}) {
  const projectileRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Vector3[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!isRunning) {
      timeRef.current = 0;
      trailRef.current = [];
    }
  }, [isRunning, angle, velocity]);

  useFrame((state, delta) => {
    if (!projectileRef.current || !isRunning) return;

    const g = 9.81;
    const angleRad = (angle * Math.PI) / 180;
    const vx = velocity * Math.cos(angleRad);
    const vy = velocity * Math.sin(angleRad);

    timeRef.current += delta;
    const t = timeRef.current;

    const x = vx * t;
    const y = vy * t - 0.5 * g * t * t;

    if (y < 0) {
      timeRef.current = 0;
      trailRef.current = [];
      onStateChange({ x: 0, y: 0, vx: vx, vy: vy, t: 0 });
      return;
    }

    projectileRef.current.position.set(x, y, 0);

    // Agregar punto a la trayectoria
    if (trailRef.current.length === 0 || 
        trailRef.current[trailRef.current.length - 1].distanceTo(new THREE.Vector3(x, y, 0)) > 0.2) {
      trailRef.current.push(new THREE.Vector3(x, y, 0));
    }

    const currentVx = vx;
    const currentVy = vy - g * t;

    onStateChange({ x, y, vx: currentVx, vy: currentVy, t });
  });

  const angleRad = (angle * Math.PI) / 180;
  const vx = velocity * Math.cos(angleRad);
  const vy = velocity * Math.sin(angleRad);
  const g = 9.81;
  
  const timeOfFlight = (2 * vy) / g;
  const maxRange = (velocity * velocity * Math.sin(2 * angleRad)) / g;
  const maxHeight = (vy * vy) / (2 * g);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, 5, -5]} intensity={0.6} />
      <pointLight position={[0, 10, 10]} intensity={0.5} />

      {/* Punto de lanzamiento */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cañón/Lanzador */}
      <group rotation={[0, 0, angleRad]}>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.15, 1, 16]} />
          <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Proyectil */}
      <group ref={projectileRef} position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#dc2626" metalness={0.6} roughness={0.2} />
        </mesh>
        
        {/* Vector velocidad actual */}
        {isRunning && projectileRef.current && (
          <>
            <Line
              points={[[0, 0, 0], [vx / 5, (vy - g * timeRef.current) / 5, 0]]}
              color="#10b981"
              lineWidth={3}
            />
            <mesh position={[vx / 5, (vy - g * timeRef.current) / 5, 0]}>
              <coneGeometry args={[0.08, 0.15, 8]} />
              <meshStandardMaterial color="#10b981" />
            </mesh>
          </>
        )}
      </group>

      {/* Trayectoria recorrida */}
      {trailRef.current.length > 1 && (
        <Line
          points={trailRef.current}
          color="#f59e0b"
          lineWidth={3}
          dashed
          dashSize={0.2}
          gapSize={0.1}
        />
      )}

      {/* Trayectoria teórica completa */}
      {!isRunning && (() => {
        const points: THREE.Vector3[] = [];
        const steps = 50;
        for (let i = 0; i <= steps; i++) {
          const t = (timeOfFlight * i) / steps;
          const x = vx * t;
          const y = vy * t - 0.5 * g * t * t;
          if (y >= 0) points.push(new THREE.Vector3(x, y, 0));
        }
        return points.length > 1 ? (
          <Line
            points={points}
            color="#94a3b8"
            lineWidth={2}
            dashed
            dashSize={0.3}
            gapSize={0.2}
            transparent
            opacity={0.5}
          />
        ) : null;
      })()}

      {/* Marcador de altura máxima */}
      {!isRunning && maxHeight > 0 && (
        <group position={[(maxRange / 2), maxHeight, 0]}>
          <Line
            points={[[0, 0, 0], [0, -maxHeight, 0]]}
            color="#8b5cf6"
            lineWidth={2}
            dashed
          />
          <Text position={[0.3, 0, 0]} fontSize={0.25} color="#8b5cf6" anchorX="left">
            H máx = {maxHeight.toFixed(1)}m
          </Text>
        </group>
      )}

      {/* Marcador de alcance máximo */}
      {!isRunning && maxRange > 0 && (
        <group position={[maxRange, 0, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
          <Text position={[0, -0.3, 0]} fontSize={0.25} color="#3b82f6" anchorX="center">
            R = {maxRange.toFixed(1)}m
          </Text>
        </group>
      )}

      {/* Suelo */}
      <mesh position={[maxRange / 2, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[Math.max(maxRange + 5, 20), 15]} />
        <meshStandardMaterial color="#86efac" opacity={0.4} transparent />
      </mesh>

      {/* Grid de referencia */}
      <Grid
        args={[Math.max(maxRange + 5, 20), 15]}
        position={[maxRange / 2, -0.01, 0]}
        cellColor="#94a3b8"
        sectionColor="#64748b"
        fadeDistance={50}
        fadeStrength={1}
      />

      {/* Marcas de distancia en el suelo */}
      {Array.from({ length: Math.floor(maxRange) + 2 }).map((_, i) => (
        <Text
          key={i}
          position={[i * 5, -0.5, 0]}
          fontSize={0.3}
          color="#374151"
          anchorX="center"
        >
          {i * 5}m
        </Text>
      ))}

      {/* Etiqueta del ángulo */}
      <Text
        position={[1, 0.5, 0]}
        fontSize={0.35}
        color="#f59e0b"
        anchorX="left"
      >
        θ = {angle}°
      </Text>

      {/* Vector velocidad inicial */}
      <Line
        points={[[0, 0, 0], [vx / 3, vy / 3, 0]]}
        color="#3b82f6"
        lineWidth={4}
      />
      <mesh position={[vx / 3, vy / 3, 0]} rotation={[0, 0, angleRad]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <Text
        position={[vx / 6, vy / 6 + 0.4, 0]}
        fontSize={0.25}
        color="#3b82f6"
        anchorX="center"
      >
        v₀ = {velocity}m/s
      </Text>
    </>
  );
}

export function Proyectil3D() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState({ x: 0, y: 0, vx: 0, vy: 0, t: 0 });

  const g = 9.81;
  const angleRad = (angle * Math.PI) / 180;
  const vx = velocity * Math.cos(angleRad);
  const vy = velocity * Math.sin(angleRad);

  const timeOfFlight = (2 * vy) / g;
  const maxRange = (velocity * velocity * Math.sin(2 * angleRad)) / g;
  const maxHeight = (vy * vy) / (2 * g);

  const currentSpeed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
  const currentAngle = (Math.atan2(state.vy, state.vx) * 180) / Math.PI;

  const reset = () => {
    setAngle(45);
    setVelocity(20);
    setIsRunning(false);
    setState({ x: 0, y: 0, vx: 0, vy: 0, t: 0 });
  };

  const toggleAnimation = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 shadow-sm">
        <CardContent className="p-3 md:p-6">
          <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-sky-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [maxRange / 2, maxHeight + 3, 15], fov: 50 }}>
              <color attach="background" args={["#e0f2fe"]} />
              <ProjectileScene
                angle={angle}
                velocity={velocity}
                isRunning={isRunning}
                onStateChange={setState}
              />
              <OrbitControls 
                enablePan={false}
                minDistance={8}
                maxDistance={40}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg md:text-xl">Controles de Lanzamiento</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={isRunning ? "default" : "outline"}
                size="sm"
                onClick={toggleAnimation}
              >
                {isRunning ? (
                  <><Pause className="w-4 h-4 mr-2" /> Pausar</>
                ) : (
                  <><Play className="w-4 h-4 mr-2" /> Lanzar</>
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
              <Label className="text-sm md:text-base">Ángulo de lanzamiento (θ)</Label>
              <span className="text-sm md:text-base font-mono font-bold text-primary">{angle}°</span>
            </div>
            <Slider
              value={[angle]}
              onValueChange={([v]) => setAngle(v)}
              min={5}
              max={85}
              step={5}
              className="cursor-pointer"
              disabled={isRunning}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm md:text-base">Velocidad inicial (v₀)</Label>
              <span className="text-sm md:text-base font-mono font-bold text-primary">{velocity} m/s</span>
            </div>
            <Slider
              value={[velocity]}
              onValueChange={([v]) => setVelocity(v)}
              min={5}
              max={40}
              step={1}
              className="cursor-pointer"
              disabled={isRunning}
            />
          </div>

          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4" />
                  Componentes de Velocidad
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Horizontal (vₓ):</p>
                  <p className="font-mono font-bold text-base">{vx.toFixed(2)} m/s</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Vertical (vᵧ):</p>
                  <p className="font-mono font-bold text-base">{vy.toFixed(2)} m/s</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {isRunning && (
        <Card className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg md:text-xl">🎯 Estado Actual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background p-3 rounded-lg border-2">
                <p className="text-xs text-muted-foreground mb-1">Posición X:</p>
                <p className="font-mono font-bold text-base text-blue-600 dark:text-blue-400">
                  {state.x.toFixed(2)} m
                </p>
              </div>
              <div className="bg-background p-3 rounded-lg border-2">
                <p className="text-xs text-muted-foreground mb-1">Altura Y:</p>
                <p className="font-mono font-bold text-base text-green-600 dark:text-green-400">
                  {state.y.toFixed(2)} m
                </p>
              </div>
              <div className="bg-background p-3 rounded-lg border-2">
                <p className="text-xs text-muted-foreground mb-1">Rapidez:</p>
                <p className="font-mono font-bold text-base text-purple-600 dark:text-purple-400">
                  {currentSpeed.toFixed(2)} m/s
                </p>
              </div>
              <div className="bg-background p-3 rounded-lg border-2">
                <p className="text-xs text-muted-foreground mb-1">Tiempo:</p>
                <p className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                  {state.t.toFixed(2)} s
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background p-3 rounded-lg border-2">
                <p className="text-xs text-muted-foreground mb-1">Velocidad X:</p>
                <p className="font-mono font-bold text-base">{state.vx.toFixed(2)} m/s</p>
              </div>
              <div className="bg-background p-3 rounded-lg border-2">
                <p className="text-xs text-muted-foreground mb-1">Velocidad Y:</p>
                <p className="font-mono font-bold text-base">{state.vy.toFixed(2)} m/s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-primary/5 border-2 border-primary/20 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">📊 Análisis de Trayectoria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Alcance máximo:</p>
              <p className="font-mono font-bold text-xl text-blue-600 dark:text-blue-400">
                {maxRange.toFixed(2)} m
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Altura máxima:</p>
              <p className="font-mono font-bold text-xl text-purple-600 dark:text-purple-400">
                {maxHeight.toFixed(2)} m
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Tiempo de vuelo:</p>
              <p className="font-mono font-bold text-xl text-green-600 dark:text-green-400">
                {timeOfFlight.toFixed(2)} s
              </p>
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border-2 space-y-2">
            <p className="text-xs text-muted-foreground">Ecuaciones del movimiento:</p>
            <div className="font-mono text-sm space-y-1">
              <p>x(t) = v₀ · cos(θ) · t</p>
              <p>y(t) = v₀ · sin(θ) · t - ½gt²</p>
              <p className="text-primary">R = v₀² · sin(2θ) / g</p>
            </div>
          </div>

          <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>💡 Tip:</strong> El ángulo de 45° proporciona el alcance máximo cuando no hay resistencia del aire. 
              Ángulos menores alcanzan menos altura pero mantienen velocidad horizontal. 
              Ángulos mayores alcanzan más altura pero menor alcance.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent/10 border-2 border-accent/30 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">📚 Conceptos Clave</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-background p-3 rounded-lg border">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Movimiento independiente:</strong><br/>
              • Horizontal: MRU (velocidad constante vₓ)<br/>
              • Vertical: MRUV (aceleración -g = -9.81 m/s²)
            </p>
          </div>
          <div className="bg-background p-3 rounded-lg border">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Alcance máximo:</strong><br/>
              • R = v₀² · sin(2θ) / g<br/>
              • Máximo cuando θ = 45° (sin(90°) = 1)
            </p>
          </div>
          <div className="bg-background p-3 rounded-lg border">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Simetría:</strong><br/>
              • El tiempo de subida = tiempo de bajada<br/>
              • La velocidad al aterrizar = velocidad inicial (magnitud)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}