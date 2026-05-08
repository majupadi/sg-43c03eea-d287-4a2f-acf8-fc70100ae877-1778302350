"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Settings2, RotateCcw } from "lucide-react";

type LeverType = "first" | "second" | "third";

function LeverScene({ 
  type, 
  powerArm, 
  resistanceArm, 
  power, 
  resistance 
}: { 
  type: LeverType;
  powerArm: number;
  resistanceArm: number;
  power: number;
  resistance: number;
}) {
  // Calcular posiciones según el tipo de palanca
  let fulcrumPos = 0;
  let powerPos = 0;
  let resistancePos = 0;

  if (type === "first") {
    // Fulcro en el centro
    fulcrumPos = 0;
    powerPos = -powerArm;
    resistancePos = resistanceArm;
  } else if (type === "second") {
    // Resistencia en el centro
    fulcrumPos = -(powerArm + resistanceArm) / 2;
    resistancePos = fulcrumPos + resistanceArm;
    powerPos = fulcrumPos + resistanceArm + powerArm;
  } else {
    // Potencia en el centro
    fulcrumPos = -(powerArm + resistanceArm) / 2;
    powerPos = fulcrumPos + powerArm;
    resistancePos = fulcrumPos + powerArm + resistanceArm;
  }

  const barLength = Math.max(powerArm + resistanceArm + 1, 8);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      {/* Barra de la palanca */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[barLength, 0.1, 0.4]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {/* Fulcro (punto de apoyo) */}
      <mesh position={[fulcrumPos, 0, 0]}>
        <coneGeometry args={[0.4, 0.8, 4]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      <Text
        position={[fulcrumPos, -0.8, 0]}
        fontSize={0.3}
        color="#1e40af"
        anchorX="center"
      >
        Fulcro (F)
      </Text>

      {/* Fuerza de Potencia (flecha hacia abajo) */}
      <Line
        points={[[powerPos, 1.5, 0], [powerPos, 0.6, 0]]}
        color="#22c55e"
        lineWidth={3}
      />
      <mesh position={[powerPos, 0.6, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      <Text
        position={[powerPos, 2, 0]}
        fontSize={0.3}
        color="#22c55e"
        anchorX="center"
      >
        {`P=${power}N`}
      </Text>

      {/* Fuerza de Resistencia (flecha hacia abajo) */}
      <Line
        points={[[resistancePos, 1.5, 0], [resistancePos, 0.6, 0]]}
        color="#ef4444"
        lineWidth={3}
      />
      <mesh position={[resistancePos, 0.6, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <Text
        position={[resistancePos, 2, 0]}
        fontSize={0.3}
        color="#ef4444"
        anchorX="center"
      >
        {`R=${resistance}N`}
      </Text>

      {/* Indicadores de brazos */}
      <Line
        points={[[fulcrumPos, -0.3, 0], [powerPos, -0.3, 0]]}
        color="#f59e0b"
        lineWidth={2}
        dashed
      />
      <Text
        position={[(fulcrumPos + powerPos) / 2, -0.6, 0]}
        fontSize={0.25}
        color="#f59e0b"
        anchorX="center"
      >
        {`BP=${powerArm.toFixed(1)}m`}
      </Text>

      <Line
        points={[[fulcrumPos, -0.3, 0], [resistancePos, -0.3, 0]]}
        color="#a855f7"
        lineWidth={2}
        dashed
      />
      <Text
        position={[(fulcrumPos + resistancePos) / 2, -0.6, 0]}
        fontSize={0.25}
        color="#a855f7"
        anchorX="center"
      >
        {`BR=${resistanceArm.toFixed(1)}m`}
      </Text>

      {/* Plano de referencia */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 10]} />
        <meshStandardMaterial color="#e5e7eb" opacity={0.3} transparent />
      </mesh>

      <gridHelper args={[15, 15, "#94a3b8", "#cbd5e1"]} position={[0, -1.5, 0]} />
    </>
  );
}

export function Palancas3D() {
  const [leverType, setLeverType] = useState<LeverType>("first");
  const [powerArm, setPowerArm] = useState(3);
  const [resistanceArm, setResistanceArm] = useState(2);
  const [resistance, setResistance] = useState(100);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calcular potencia necesaria según ley de la palanca: P × BP = R × BR
  const power = (resistance * resistanceArm) / powerArm;
  const vm = powerArm / resistanceArm;

  const leverTypes = [
    { id: "first" as LeverType, name: "1er Género", desc: "P — F — R" },
    { id: "second" as LeverType, name: "2do Género", desc: "F — R — P" },
    { id: "third" as LeverType, name: "3er Género", desc: "F — P — R" },
  ];

  const reset = () => {
    setPowerArm(3);
    setResistanceArm(2);
    setResistance(100);
    setLeverType("first");
  };

  return (
    <div className="w-full space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Tipo de Palanca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {leverTypes.map((type) => (
              <Button
                key={type.id}
                variant={leverType === type.id ? "default" : "outline"}
                onClick={() => setLeverType(type.id)}
                className="h-auto py-3 flex flex-col items-start"
              >
                <span className="font-bold text-sm">{type.name}</span>
                <span className="text-xs opacity-70 font-mono">{type.desc}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="h-[500px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [0, 3, 12], fov: 50 }}>
              <color attach="background" args={["#f1f5f9"]} />
              <LeverScene
                type={leverType}
                powerArm={powerArm}
                resistanceArm={resistanceArm}
                power={power}
                resistance={resistance}
              />
              <OrbitControls 
                enableDamping
                dampingFactor={0.05}
                enablePan={false}
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
            <CardTitle>Controles</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Settings2 className="w-4 h-4 mr-2" />
                {showAdvanced ? "Básicos" : "Avanzados"}
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Resistencia (R)</Label>
              <span className="text-sm font-mono text-primary">{resistance} N</span>
            </div>
            <Slider
              value={[resistance]}
              onValueChange={([v]) => setResistance(v)}
              min={10}
              max={200}
              step={10}
            />
          </div>

          {showAdvanced && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Brazo de Potencia (BP)</Label>
                  <span className="text-sm font-mono text-primary">{powerArm.toFixed(1)} m</span>
                </div>
                <Slider
                  value={[powerArm]}
                  onValueChange={([v]) => setPowerArm(v)}
                  min={0.5}
                  max={5}
                  step={0.1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Brazo de Resistencia (BR)</Label>
                  <span className="text-sm font-mono text-primary">{resistanceArm.toFixed(1)} m</span>
                </div>
                <Slider
                  value={[resistanceArm]}
                  onValueChange={([v]) => setResistanceArm(v)}
                  min={0.5}
                  max={5}
                  step={0.1}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20 border-2">
        <CardHeader>
          <CardTitle>📊 Análisis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground mb-1">Potencia necesaria:</p>
              <p className="font-mono font-bold text-lg text-green-600 dark:text-green-400">
                P = {power.toFixed(1)} N
              </p>
            </div>
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground mb-1">Ventaja Mecánica:</p>
              <p className="font-mono font-bold text-lg text-accent">
                VM = {vm.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="bg-background p-3 rounded border">
            <p className="text-xs text-muted-foreground mb-2">Ley de la Palanca:</p>
            <p className="font-mono text-sm text-center">
              P × BP = R × BR
            </p>
            <p className="font-mono text-sm text-center text-primary mt-1">
              {power.toFixed(1)} × {powerArm.toFixed(1)} = {resistance} × {resistanceArm.toFixed(1)}
            </p>
            <p className="font-mono text-sm text-center mt-1">
              {(power * powerArm).toFixed(1)} N·m = {(resistance * resistanceArm).toFixed(1)} N·m ✓
            </p>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {vm > 1 ? "✓ Ganancia de fuerza" : vm < 1 ? "⚠ Ganancia de velocidad/distancia" : "= Sin ventaja mecánica"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}