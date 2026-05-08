"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Sphere } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCw } from "lucide-react";
import * as THREE from "three";

type PolyType = "fija" | "movil" | "aparejo";

interface PolySystemProps {
  type: PolyType;
  weight: number;
  isAnimating: boolean;
}

function Pulley({ position, radius = 0.4, isMoving = false }: { position: [number, number, number]; radius?: number; isMoving?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && isMoving) {
      meshRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Polea principal */}
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, 0.08, 16, 32]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Centro de la polea */}
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Eje */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Soporte */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.15]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
    </group>
  );
}

function Rope({ points, color = "#8b4513" }: { points: [number, number, number][]; color?: string }) {
  return (
    <Line
      points={points}
      color={color}
      lineWidth={3}
    />
  );
}

function Weight({ position, mass }: { position: [number, number, number]; mass: number }) {
  return (
    <group position={position}>
      {/* Bloque de peso */}
      <mesh>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#ef4444" roughness={0.4} />
      </mesh>

      {/* Gancho superior */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Etiqueta del peso */}
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

function FijaSystem({ weight, isAnimating }: { weight: number; isAnimating: boolean }) {
  const ropeY = isAnimating ? -2 + Math.sin(Date.now() * 0.002) * 0.3 : -2;
  
  return (
    <group>
      {/* Viga superior */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[6, 0.2, 0.3]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Polea fija en el techo */}
      <Pulley position={[0, 2.5, 0]} isMoving={isAnimating} />

      {/* Cuerda: lado del peso */}
      <Rope points={[[0, 2.5, 0], [0, ropeY + 0.3, 0]]} />
      
      {/* Peso */}
      <Weight position={[0, ropeY, 0]} mass={weight} />

      {/* Cuerda: lado de la fuerza aplicada */}
      <Rope points={[[0.8, 2.5, 0], [2, 2.5, 0], [2, 0, 0]]} color="#22c55e" />

      {/* Indicador de fuerza aplicada */}
      <group position={[2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
        <Text position={[0.5, 0, 0]} fontSize={0.15} color="#22c55e">
          F = {weight}N
        </Text>
      </group>

      {/* Etiquetas */}
      <Text position={[0, 3.5, 0]} fontSize={0.2} color="#f59e0b" anchorX="center">
        Polea Fija
      </Text>
      <Text position={[0, -3, 0]} fontSize={0.15} color="#94a3b8" anchorX="center">
        Ventaja Mecánica: VM = 1 (No hay ganancia de fuerza)
      </Text>
    </group>
  );
}

function MovilSystem({ weight, isAnimating }: { weight: number; isAnimating: boolean }) {
  const poleyaY = isAnimating ? 0.5 + Math.sin(Date.now() * 0.002) * 0.3 : 0.5;
  
  return (
    <group>
      {/* Viga superior */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[6, 0.2, 0.3]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Polea fija izquierda */}
      <Pulley position={[-1.5, 2.5, 0]} radius={0.3} isMoving={isAnimating} />

      {/* Polea móvil (se mueve con el peso) */}
      <Pulley position={[0, poleyaY, 0]} radius={0.4} isMoving={isAnimating} />

      {/* Cuerda continua */}
      <Rope points={[
        [-1.5, 2.5, 0],
        [0.4, poleyaY, 0],
        [1.5, 2.5, 0],
        [1.5, 0, 0]
      ]} color="#22c55e" />

      {/* Peso colgando de la polea móvil */}
      <Weight position={[0, poleyaY - 0.8, 0]} mass={weight} />

      {/* Cuerda del peso a polea móvil */}
      <Rope points={[[0, poleyaY - 0.5, 0], [0, poleyaY - 0.1, 0]]} />

      {/* Indicador de fuerza aplicada */}
      <group position={[1.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
        <Text position={[0.6, 0, 0]} fontSize={0.15} color="#22c55e">
          F = {(weight / 2).toFixed(1)}N
        </Text>
      </group>

      {/* Etiquetas */}
      <Text position={[0, 3.5, 0]} fontSize={0.2} color="#f59e0b" anchorX="center">
        Polea Móvil
      </Text>
      <Text position={[0, -2.5, 0]} fontSize={0.15} color="#94a3b8" anchorX="center">
        Ventaja Mecánica: VM = 2 (Fuerza necesaria = Peso/2)
      </Text>
    </group>
  );
}

function AparejoSystem({ weight, isAnimating }: { weight: number; isAnimating: boolean }) {
  const baseY = isAnimating ? -0.5 + Math.sin(Date.now() * 0.002) * 0.2 : -0.5;
  
  return (
    <group>
      {/* Viga superior */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[6, 0.2, 0.3]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Poleas fijas superiores */}
      <Pulley position={[-1, 2.5, 0]} radius={0.3} isMoving={isAnimating} />
      <Pulley position={[1, 2.5, 0]} radius={0.3} isMoving={isAnimating} />

      {/* Bloque móvil con 2 poleas */}
      <group position={[0, baseY, 0]}>
        {/* Base del bloque móvil */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.5, 0.15, 0.4]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        
        <Pulley position={[-0.5, 0, 0]} radius={0.3} isMoving={isAnimating} />
        <Pulley position={[0.5, 0, 0]} radius={0.3} isMoving={isAnimating} />

        {/* Peso colgando */}
        <Weight position={[0, -0.8, 0]} mass={weight} />
        <Rope points={[[0, -0.5, 0], [0, 0.15, 0]]} />
      </group>

      {/* Sistema de cuerdas (aparejo potencial 4 ramales) */}
      <Rope points={[[-1, 2.5, 0], [-0.5 - 0.3, baseY, 0]]} color="#8b4513" />
      <Rope points={[[-0.5 + 0.3, baseY, 0], [0.5 - 0.3, baseY, 0]]} color="#8b4513" />
      <Rope points={[[0.5 + 0.3, baseY, 0], [1, 2.5, 0]]} color="#8b4513" />
      <Rope points={[[1, 2.5, 0], [2, 2.5, 0], [2, 0, 0]]} color="#22c55e" />

      {/* Indicador de fuerza aplicada */}
      <group position={[2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
        <Text position={[0.6, 0, 0]} fontSize={0.15} color="#22c55e">
          F = {(weight / 4).toFixed(1)}N
        </Text>
      </group>

      {/* Etiquetas */}
      <Text position={[0, 3.5, 0]} fontSize={0.2} color="#f59e0b" anchorX="center">
        Aparejo (Polipasto)
      </Text>
      <Text position={[0, -2.5, 0]} fontSize={0.15} color="#94a3b8" anchorX="center">
        Ventaja Mecánica: VM = 4 (4 ramales soportan el peso)
      </Text>
    </group>
  );
}

function PolySystem({ type, weight, isAnimating }: PolySystemProps) {
  switch (type) {
    case "fija":
      return <FijaSystem weight={weight} isAnimating={isAnimating} />;
    case "movil":
      return <MovilSystem weight={weight} isAnimating={isAnimating} />;
    case "aparejo":
      return <AparejoSystem weight={weight} isAnimating={isAnimating} />;
  }
}

export function Poleas3D() {
  const [polyType, setPolyType] = useState<PolyType>("fija");
  const [weight, setWeight] = useState(80);
  const [isAnimating, setIsAnimating] = useState(false);

  const forciaRequerida = polyType === "fija" ? weight : polyType === "movil" ? weight / 2 : weight / 4;
  const ventajaMecanica = polyType === "fija" ? 1 : polyType === "movil" ? 2 : 4;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Simulación de Poleas 3D
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

          <div className="h-[500px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden border-2 border-primary/20">
            <Canvas camera={{ position: [5, 2, 8], fov: 50 }}>
              <color attach="background" args={["#0f172a"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-5, 5, -5]} intensity={0.4} />
              
              <PolySystem type={polyType} weight={weight} isAnimating={isAnimating} />
              
              {/* Grid de referencia */}
              <gridHelper args={[10, 20, "#1e40af", "#1e3a8a"]} position={[0, -3, 0]} />
              
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controles</CardTitle>
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

          <div className="flex items-center gap-4">
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

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-mono font-bold mb-3">📊 Análisis del Sistema</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Tipo de sistema:</span>
                <span className="font-mono font-semibold">
                  {polyType === "fija" ? "Polea Fija" : polyType === "movil" ? "Polea Móvil" : "Aparejo (Polipasto)"}
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
                  La fuerza aplicada debe ser igual al peso. Útil para cambiar dirección, no para reducir esfuerzo.
                </>
              )}
              {polyType === "movil" && (
                <>
                  <strong>Polea Móvil:</strong> Proporciona VM = 2. El peso se distribuye entre 2 ramales de cuerda.
                  La fuerza necesaria es la mitad del peso. Reduce el esfuerzo pero duplica la distancia a recorrer.
                </>
              )}
              {polyType === "aparejo" && (
                <>
                  <strong>Aparejo/Polipasto:</strong> Sistema compuesto con VM = 4. El peso se distribuye entre 4 ramales.
                  La fuerza necesaria es un cuarto del peso. Ideal para levantar cargas pesadas con poco esfuerzo.
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}