"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line, Torus } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type PulleyType = "fixed" | "mobile" | "compound";

function PulleyScene({ 
  type, 
  load, 
  numPulleys 
}: { 
  type: PulleyType;
  load: number;
  numPulleys: number;
}) {
  const force = type === "fixed" ? load : type === "mobile" ? load / 2 : load / numPulleys;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      {type === "fixed" && (
        <>
          {/* Soporte fijo superior */}
          <mesh position={[0, 4, 0]}>
            <boxGeometry args={[1.5, 0.2, 0.4]} />
            <meshStandardMaterial color="#334155" />
          </mesh>

          {/* Polea fija */}
          <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.1, 16, 32]} />
            <meshStandardMaterial color="#1e40af" />
          </mesh>

          {/* Cuerda */}
          <Line points={[[0, 3.5, 0], [0.5, 3, 0], [0.5, 0.5, 0]]} color="#8b4513" lineWidth={3} />
          <Line points={[[-0.5, 3, 0], [-0.5, 1.5, 0]]} color="#8b4513" lineWidth={3} />

          {/* Carga */}
          <mesh position={[0.5, 0.3, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <Text position={[0.5, -0.3, 0]} fontSize={0.25} color="#dc2626" anchorX="center">
            {`${load}N`}
          </Text>

          {/* Fuerza aplicada */}
          <Line points={[[-0.5, 2, 0], [-0.5, 1.5, 0]]} color="#22c55e" lineWidth={4} />
          <mesh position={[-0.5, 1.5, 0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.12, 0.25, 8]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
          <Text position={[-0.5, 2.3, 0]} fontSize={0.25} color="#22c55e" anchorX="center">
            {`F=${force.toFixed(0)}N`}
          </Text>
        </>
      )}

      {type === "mobile" && (
        <>
          {/* Soporte fijo superior */}
          <mesh position={[-1, 4, 0]}>
            <boxGeometry args={[1, 0.2, 0.4]} />
            <meshStandardMaterial color="#334155" />
          </mesh>

          {/* Polea móvil */}
          <mesh position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.1, 16, 32]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>

          {/* Cuerda (anclada a un lado, pasa por polea móvil, sube al otro lado) */}
          <Line points={[[-1, 4, 0], [-1, 3, 0], [-0.5, 2.4, 0]]} color="#8b4513" lineWidth={3} />
          <Line points={[[0.5, 2.4, 0], [0.5, 3, 0], [0.5, 4, 0]]} color="#8b4513" lineWidth={3} />

          {/* Carga en la polea móvil */}
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <Text position={[0, 0.4, 0]} fontSize={0.25} color="#dc2626" anchorX="center">
            {`${load}N`}
          </Text>

          {/* Fuerza aplicada */}
          <Line points={[[0.5, 4.5, 0], [0.5, 4, 0]]} color="#22c55e" lineWidth={4} />
          <mesh position={[0.5, 4, 0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.12, 0.25, 8]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
          <Text position={[0.5, 4.8, 0]} fontSize={0.25} color="#22c55e" anchorX="center">
            {`F=${force.toFixed(0)}N`}
          </Text>
        </>
      )}

      {type === "compound" && (
        <>
          {/* Sistema de poleas compuesto (aparejo) */}
          <mesh position={[0, 5, 0]}>
            <boxGeometry args={[2, 0.2, 0.4]} />
            <meshStandardMaterial color="#334155" />
          </mesh>

          {/* Poleas fijas (arriba) */}
          {Array.from({ length: Math.min(numPulleys, 3) }).map((_, i) => (
            <mesh key={`fixed-${i}`} position={[i - 1, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.35, 0.08, 16, 32]} />
              <meshStandardMaterial color="#1e40af" />
            </mesh>
          ))}

          {/* Poleas móviles (abajo) */}
          {Array.from({ length: Math.min(Math.floor(numPulleys / 2), 2) }).map((_, i) => (
            <mesh key={`mobile-${i}`} position={[i * 0.8 - 0.4, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.35, 0.08, 16, 32]} />
              <meshStandardMaterial color="#22c55e" />
            </mesh>
          ))}

          {/* Cuerdas simplificadas */}
          {Array.from({ length: numPulleys }).map((_, i) => (
            <Line
              key={`rope-${i}`}
              points={[
                [i * 0.4 - (numPulleys * 0.4) / 2 + 0.2, 4.3, 0],
                [i * 0.4 - (numPulleys * 0.4) / 2 + 0.2, 2, 0],
              ]}
              color="#8b4513"
              lineWidth={2}
            />
          ))}

          {/* Carga */}
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.3} color="#dc2626" anchorX="center">
            {`${load}N`}
          </Text>

          {/* Fuerza aplicada */}
          <Line points={[[numPulleys * 0.2, 5, 0], [numPulleys * 0.2, 4.5, 0]]} color="#22c55e" lineWidth={4} />
          <mesh position={[numPulleys * 0.2, 4.5, 0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.15, 0.3, 8]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
          <Text position={[numPulleys * 0.2, 5.5, 0]} fontSize={0.3} color="#22c55e" anchorX="center">
            {`F=${force.toFixed(0)}N`}
          </Text>
        </>
      )}

      {/* Plano de referencia */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#e5e7eb" opacity={0.3} transparent />
      </mesh>

      <gridHelper args={[10, 10, "#94a3b8", "#cbd5e1"]} position={[0, -0.5, 0]} />
    </>
  );
}

export function Poleas3D() {
  const [pulleyType, setPulleyType] = useState<PulleyType>("fixed");
  const [load, setLoad] = useState(100);
  const [numPulleys, setNumPulleys] = useState(4);

  const force = pulleyType === "fixed" ? load : pulleyType === "mobile" ? load / 2 : load / numPulleys;
  const vm = pulleyType === "fixed" ? 1 : pulleyType === "mobile" ? 2 : numPulleys;

  const pulleyTypes = [
    { id: "fixed" as PulleyType, name: "Polea Fija", desc: "F = R, VM = 1" },
    { id: "mobile" as PulleyType, name: "Polea Móvil", desc: "F = R/2, VM = 2" },
    { id: "compound" as PulleyType, name: "Aparejo", desc: "F = R/n, VM = n" },
  ];

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tipo de Sistema de Poleas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pulleyTypes.map((type) => (
              <Button
                key={type.id}
                variant={pulleyType === type.id ? "default" : "outline"}
                onClick={() => setPulleyType(type.id)}
                className="h-auto py-3 flex flex-col items-start"
              >
                <span className="font-bold text-sm">{type.name}</span>
                <span className="text-xs opacity-70 font-mono">{type.desc}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="h-[500px] bg-muted/20 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 2.5, 8], fov: 50 }}>
              <PulleyScene type={pulleyType} load={load} numPulleys={numPulleys} />
              <OrbitControls 
                enablePan={false}
                minDistance={5}
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
              <Label>Carga (R)</Label>
              <span className="text-sm font-mono text-muted-foreground">{load} N</span>
            </div>
            <Slider
              value={[load]}
              onValueChange={([v]) => setLoad(v)}
              min={20}
              max={300}
              step={10}
            />
          </div>

          {pulleyType === "compound" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Número de Poleas (n)</Label>
                <span className="text-sm font-mono text-muted-foreground">{numPulleys}</span>
              </div>
              <Slider
                value={[numPulleys]}
                onValueChange={([v]) => setNumPulleys(v)}
                min={2}
                max={6}
                step={1}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Cálculos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground mb-1">Fuerza necesaria:</p>
              <p className="font-mono font-bold text-lg text-green-600 dark:text-green-400">
                F = {force.toFixed(0)} N
              </p>
            </div>
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground mb-1">Ventaja Mecánica:</p>
              <p className="font-mono font-bold text-lg text-accent">
                VM = {vm}
              </p>
            </div>
          </div>
          <div className="bg-background p-3 rounded border">
            <p className="text-xs text-muted-foreground mb-2">Relación de fuerzas:</p>
            <p className="font-mono text-sm text-center text-primary">
              {pulleyType === "fixed" && "F = R (sin ventaja mecánica)"}
              {pulleyType === "mobile" && "F = R / 2 (mitad de esfuerzo)"}
              {pulleyType === "compound" && `F = R / ${numPulleys} (${numPulleys}x ventaja)`}
            </p>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-semibold">Principio de conservación:</p>
            <p className="text-center font-mono">
              Trabajo = F × distancia recorrida
            </p>
            <p className="text-center text-xs">
              {vm > 1 ? `Menos fuerza, pero ${vm}x más distancia de cuerda` : "Mismo esfuerzo, cambia dirección"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}