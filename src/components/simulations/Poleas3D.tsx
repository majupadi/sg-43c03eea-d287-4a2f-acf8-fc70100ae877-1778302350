"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCw, Settings2 } from "lucide-react";
import * as THREE from "three";

type PolyType = "fija" | "movil" | "aparejo";

interface PolySystemProps {
  type: PolyType;
  weight: number;
  isAnimating: boolean;
  pulleyRadius: number;
  ropeLength: number;
  animationSpeed: number;
}

function Pulley({ position, radius = 0.4, isMoving = false, speed = 1 }: { position: [number, number, number]; radius?: number; isMoving?: boolean; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && isMoving) {
      meshRef.current.rotation.z += 0.02 * speed;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, 0.08, 16, 32]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.15]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

function Rope({ points, color = "#78350f" }: { points: [number, number, number][]; color?: string }) {
  return (
    <Line
      points={points}
      color={color}
      lineWidth={4}
    />
  );
}

function Weight({ position, mass }: { position: [number, number, number]; mass: number }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color="#dc2626" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      <Text
        position={[0, 0, 0.35]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {mass}N
      </Text>
    </group>
  );
}

function FijaSystem({ weight, isAnimating, ropeLength, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY = -ropeLength;
  const ropeY = isAnimating ? baseY + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.4 : baseY;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[0, 2.5, 0]} radius={pulleyRadius} isMoving={isAnimating} speed={animationSpeed} />

      <Rope points={[[0, 2.5, 0], [0, ropeY + 0.3, 0]]} />
      
      <Weight position={[0, ropeY, 0]} mass={weight} />

      <Rope points={[[pulleyRadius + 0.1, 2.5, 0], [2, 2.5, 0], [2, 0, 0]]} color="#10b981" />

      <group position={[2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.6, 0, 0]} fontSize={0.15} color="#10b981">
          F = {weight}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Polea Fija
      </Text>
      <Text position={[0, -3.5, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 1 · Solo cambia dirección
      </Text>
    </group>
  );
}

function MovilSystem({ weight, isAnimating, ropeLength, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY = -ropeLength * 0.6;
  const poleyaY = isAnimating ? baseY + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.4 : baseY;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[-1.5, 2.5, 0]} radius={pulleyRadius * 0.8} isMoving={isAnimating} speed={animationSpeed} />

      <Pulley position={[0, poleyaY, 0]} radius={pulleyRadius} isMoving={isAnimating} speed={animationSpeed} />

      <Rope points={[
        [-1.5, 2.5, 0],
        [pulleyRadius + 0.1, poleyaY, 0],
        [1.5, 2.5, 0],
        [1.5, 0, 0]
      ]} color="#10b981" />

      <Weight position={[0, poleyaY - 0.8, 0]} mass={weight} />

      <Rope points={[[0, poleyaY - 0.5, 0], [0, poleyaY - 0.1, 0]]} />

      <group position={[1.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.15} color="#10b981">
          F = {(weight / 2).toFixed(1)}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Polea Móvil
      </Text>
      <Text position={[0, -3.2, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 2 · Fuerza = Peso/2
      </Text>
    </group>
  );
}

function AparejoSystem({ weight, isAnimating, ropeLength, pulleyRadius, animationSpeed }: Omit<PolySystemProps, 'type'>) {
  const baseY = -ropeLength * 0.5;
  const movingY = isAnimating ? baseY + Math.sin(Date.now() * 0.001 * animationSpeed) * 0.3 : baseY;
  
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[6, 0.25, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <Pulley position={[-1, 2.5, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />
      <Pulley position={[1, 2.5, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />

      <group position={[0, movingY, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.6, 0.15, 0.4]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        
        <Pulley position={[-0.55, 0, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />
        <Pulley position={[0.55, 0, 0]} radius={pulleyRadius * 0.75} isMoving={isAnimating} speed={animationSpeed} />

        <Weight position={[0, -0.8, 0]} mass={weight} />
        <Rope points={[[0, -0.5, 0], [0, 0.15, 0]]} />
      </group>

      <Rope points={[[-1, 2.5, 0], [-0.55 - pulleyRadius * 0.75 - 0.08, movingY, 0]]} color="#78350f" />
      <Rope points={[[-0.55 + pulleyRadius * 0.75 + 0.08, movingY, 0], [0.55 - pulleyRadius * 0.75 - 0.08, movingY, 0]]} color="#78350f" />
      <Rope points={[[0.55 + pulleyRadius * 0.75 + 0.08, movingY, 0], [1, 2.5, 0]]} color="#78350f" />
      <Rope points={[[1, 2.5, 0], [2, 2.5, 0], [2, 0, 0]]} color="#10b981" />

      <group position={[2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.15} color="#10b981">
          F = {(weight / 4).toFixed(1)}N
        </Text>
      </group>

      <Text position={[0, 3.6, 0]} fontSize={0.22} color="#f59e0b" anchorX="center">
        Aparejo (4 ramales)
      </Text>
      <Text position={[0, -3.2, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        VM = 4 · Fuerza = Peso/4
      </Text>
    </group>
  );
}

function PolySystem(props: PolySystemProps) {
  switch (props.type) {
    case "fija":
      return <FijaSystem {...props} />;
    case "movil":
      return <MovilSystem {...props} />;
    case "aparejo":
      return <AparejoSystem {...props} />;
  }
}

export function Poleas3D() {
  const [polyType, setPolyType] = useState<PolyType>("fija");
  const [weight, setWeight] = useState(80);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulleyRadius, setPulleyRadius] = useState(0.4);
  const [ropeLength, setRopeLength] = useState(2.2);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const forciaRequerida = polyType === "fija" ? weight : polyType === "movil" ? weight / 2 : weight / 4;
  const ventajaMecanica = polyType === "fija" ? 1 : polyType === "movil" ? 2 : 4;

  return (
    <div className="space-y-4">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Simulación de Poleas 3D Mejorada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <Button
              variant={polyType === "fija" ? "default" : "outline"}
              onClick={() => setPolyType("fija")}
              className="w-full"
            >
              Polea Fija
            </Button>
            <Button
              variant={polyType === "movil" ? "default" : "outline"}
              onClick={() => setPolyType("movil")}
              className="w-full"
            >
              Polea Móvil
            </Button>
            <Button
              variant={polyType === "aparejo" ? "default" : "outline"}
              onClick={() => setPolyType("aparejo")}
              className="w-full"
            >
              Aparejo (4 ramales)
            </Button>
          </div>

          <div className="h-[550px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas 
              camera={{ position: [5, 2, 8], fov: 50 }}
              shadows
            >
              <color attach="background" args={["#f1f5f9"]} />
              <ambientLight intensity={0.7} />
              <directionalLight 
                position={[5, 10, 5]} 
                intensity={1.2} 
                castShadow 
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-5, 5, -5]} intensity={0.5} />
              <spotLight position={[0, 8, 0]} intensity={0.3} angle={0.6} penumbra={0.5} />
              
              <PolySystem 
                type={polyType} 
                weight={weight} 
                isAnimating={isAnimating}
                pulleyRadius={pulleyRadius}
                ropeLength={ropeLength}
                animationSpeed={animationSpeed}
              />
              
              <gridHelper args={[10, 20, "#94a3b8", "#cbd5e1"]} position={[0, -3.5, 0]} />
              
              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={15}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Controles Principales</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Settings2 className="w-4 h-4 mr-2" />
              {showAdvanced ? "Ocultar" : "Mostrar"} Avanzados
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Peso del objeto</label>
              <span className="text-sm font-mono text-primary">{weight} N</span>
            </div>
            <Slider
              value={[weight]}
              onValueChange={(v) => setWeight(v[0])}
              min={20}
              max={200}
              step={10}
              className="w-full"
            />
          </div>

          {showAdvanced && (
            <>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Radio de poleas</label>
                  <span className="text-sm font-mono text-primary">{pulleyRadius.toFixed(2)} m</span>
                </div>
                <Slider
                  value={[pulleyRadius]}
                  onValueChange={(v) => setPulleyRadius(v[0])}
                  min={0.2}
                  max={0.6}
                  step={0.05}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Longitud de cuerda</label>
                  <span className="text-sm font-mono text-primary">{ropeLength.toFixed(1)} m</span>
                </div>
                <Slider
                  value={[ropeLength]}
                  onValueChange={(v) => setRopeLength(v[0])}
                  min={1.5}
                  max={3.5}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Velocidad de animación</label>
                  <span className="text-sm font-mono text-primary">{animationSpeed}x</span>
                </div>
                <Slider
                  value={[animationSpeed]}
                  onValueChange={(v) => setAnimationSpeed(v[0])}
                  min={0.5}
                  max={3}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-4 pt-2">
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              variant={isAnimating ? "default" : "outline"}
              className="flex-1"
            >
              <RotateCw className={`w-4 h-4 mr-2 ${isAnimating ? "animate-spin" : ""}`} />
              {isAnimating ? "Detener Animación" : "Animar Sistema"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20 border-2">
        <CardContent className="pt-6">
          <h3 className="font-mono font-bold mb-3">📊 Análisis del Sistema</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Tipo de sistema:</span>
                <span className="font-mono font-semibold">
                  {polyType === "fija" ? "Polea Fija" : polyType === "movil" ? "Polea Móvil" : "Aparejo"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Peso del objeto:</span>
                <span className="font-mono font-semibold text-red-600 dark:text-red-400">W = {weight} N</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Fuerza requerida:</span>
                <span className="font-mono font-semibold text-green-600 dark:text-green-400">F = {forciaRequerida.toFixed(1)} N</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Ventaja mecánica:</span>
                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">VM = {ventajaMecanica}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Ramales soportando:</span>
                <span className="font-mono font-semibold">{ventajaMecanica} {ventajaMecanica === 1 ? "ramal" : "ramales"}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Reducción de esfuerzo:</span>
                <span className="font-mono font-semibold text-purple-600 dark:text-purple-400">
                  {((1 - forciaRequerida / weight) * 100).toFixed(0)}%
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {polyType === "fija" && (
                <>
                  <strong>Polea Fija:</strong> No proporciona ventaja mecánica (VM = 1). Solo cambia la dirección de la fuerza.
                  La fuerza aplicada debe ser igual al peso. Útil cuando es más cómodo tirar hacia abajo.
                </>
              )}
              {polyType === "movil" && (
                <>
                  <strong>Polea Móvil:</strong> VM = 2. El peso se distribuye entre 2 ramales de cuerda.
                  Reduces la fuerza a la mitad pero debes jalar el doble de distancia de cuerda.
                </>
              )}
              {polyType === "aparejo" && (
                <>
                  <strong>Aparejo/Polipasto:</strong> VM = 4. El peso se distribuye entre 4 ramales.
                  Solo necesitas 1/4 de la fuerza, pero debes jalar 4 veces más distancia. Ideal para cargas muy pesadas.
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}