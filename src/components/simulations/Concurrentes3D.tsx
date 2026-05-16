"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Plus, Trash2, Eye, EyeOff, Settings } from "lucide-react";
import * as THREE from "three";

interface Force {
  id: number;
  magnitude: number;
  angleXY: number;
  angleZ: number;
  color: string;
  showComponents: boolean;
}

interface Preset {
  name: string;
  description: string;
  forces: Omit<Force, 'id' | 'showComponents'>[];
}

const PRESETS: Preset[] = [
  {
    name: "Ejercicio 1",
    description: "F₁=20kgf (196N) θ₁₂=45°, F₂=40kgf (392N) θ₂₃=135°, F₃=30kgf (294N)",
    forces: [
      { magnitude: 20 * 9.8, angleXY: 0, angleZ: 0, color: "#ef4444" },
      { magnitude: 40 * 9.8, angleXY: 45, angleZ: 0, color: "#3b82f6" },
      { magnitude: 30 * 9.8, angleXY: 45 + 135, angleZ: 0, color: "#10b981" },
    ]
  },
  {
    name: "Ejercicio 2",
    description: "Tres fuerzas de 20kgf (196N) con ángulos de 120° entre sí",
    forces: [
      { magnitude: 20 * 9.8, angleXY: 0, angleZ: 0, color: "#ef4444" },
      { magnitude: 20 * 9.8, angleXY: 120, angleZ: 0, color: "#3b82f6" },
      { magnitude: 20 * 9.8, angleXY: 240, angleZ: 0, color: "#10b981" },
    ]
  },
  {
    name: "Ejercicio 3",
    description: "F₁=23N (2.35kgf) θ₁₂=60°, F₂=30N (3.06kgf) θ₂₃=30°, F₃=23N (2.35kgf)",
    forces: [
      { magnitude: 23, angleXY: 0, angleZ: 0, color: "#ef4444" },
      { magnitude: 30, angleXY: 60, angleZ: 0, color: "#3b82f6" },
      { magnitude: 23, angleXY: 60 + 30, angleZ: 0, color: "#10b981" },
    ]
  },
  {
    name: "Ejercicio 4",
    description: "F₁=40kgf (392N) θ=45°, F₂=12kgf (117.6N), R=50kgf (490N) θ=154° (hallar faltante)",
    forces: [
      { magnitude: 40 * 9.8, angleXY: 45, angleZ: 0, color: "#ef4444" },
      { magnitude: 12 * 9.8, angleXY: 180, angleZ: 0, color: "#3b82f6" },
    ]
  },
  {
    name: "Ejercicio 5",
    description: "F₁=12kgf (117.6N) θ=20°, F₂=20kgf (196N) θ=120°, F₃=14kgf (137.2N) θ=200°, F₄=4kgf (39.2N) θ=20°",
    forces: [
      { magnitude: 12 * 9.8, angleXY: 20, angleZ: 0, color: "#ef4444" },
      { magnitude: 20 * 9.8, angleXY: 120, angleZ: 0, color: "#3b82f6" },
      { magnitude: 14 * 9.8, angleXY: 200, angleZ: 0, color: "#10b981" },
      { magnitude: 4 * 9.8, angleXY: 20, angleZ: 0, color: "#f59e0b" },
    ]
  }
];

function ForceVector({ 
  magnitude, 
  angleXY, 
  angleZ, 
  color, 
  label,
  showComponents,
  visualScale = 25
}: Force & { label: string; visualScale?: number }) {
  const radXY = (angleXY * Math.PI) / 180;
  const radZ = (angleZ * Math.PI) / 180;
  
  const scale = magnitude / visualScale;
  const x = Math.cos(radXY) * Math.cos(radZ) * scale;
  const y = Math.sin(radZ) * scale;
  const z = Math.sin(radXY) * Math.cos(radZ) * scale;

  const arrowDir = new THREE.Vector3(x, y, z).normalize();

  return (
    <group>
      {/* Vector principal */}
      <Line
        points={[[0, 0, 0], [x, y, z]]}
        color={color}
        lineWidth={4}
      />
      <mesh position={[x, y, z]} quaternion={new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        arrowDir
      )}>
        <coneGeometry args={[0.12, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Etiqueta del vector */}
      <Text
        position={[x * 1.15, y * 1.15 + 0.25, z * 1.15]}
        fontSize={0.22}
        color={color}
        anchorX="center"
        outlineWidth={0.01}
        outlineColor="#ffffff"
      >
        {label}
      </Text>

      {/* Componentes visuales */}
      {showComponents && (
        <group>
          {/* Componente X (rojo claro) */}
          <Line
            points={[[0, 0, 0], [x, 0, 0]]}
            color="#ff6b6b"
            lineWidth={2}
            dashed
            dashSize={0.08}
            gapSize={0.04}
          />
          
          {/* Componente Y (verde claro) */}
          <Line
            points={[[0, 0, 0], [0, y, 0]]}
            color="#51cf66"
            lineWidth={2}
            dashed
            dashSize={0.08}
            gapSize={0.04}
          />
          
          {/* Componente Z (azul claro) */}
          <Line
            points={[[0, 0, 0], [0, 0, z]]}
            color="#4dabf7"
            lineWidth={2}
            dashed
            dashSize={0.08}
            gapSize={0.04}
          />

          {/* Líneas de proyección */}
          <Line
            points={[[x, 0, 0], [x, y, z]]}
            color="#888888"
            lineWidth={1}
            opacity={0.3}
          />
          <Line
            points={[[0, y, 0], [x, y, z]]}
            color="#888888"
            lineWidth={1}
            opacity={0.3}
          />
          <Line
            points={[[0, 0, z], [x, y, z]]}
            color="#888888"
            lineWidth={1}
            opacity={0.3}
          />
        </group>
      )}
    </group>
  );
}

export function Concurrentes3D() {
  const [forces, setForces] = useState<Force[]>([
    { id: 1, magnitude: 50, angleXY: 0, angleZ: 30, color: "#ef4444", showComponents: false },
    { id: 2, magnitude: 40, angleXY: 120, angleZ: 45, color: "#3b82f6", showComponents: false },
    { id: 3, magnitude: 60, angleXY: 240, angleZ: -20, color: "#10b981", showComponents: false },
  ]);
  const [nextId, setNextId] = useState(4);
  const [visualScale, setVisualScale] = useState(25);

  const calculateComponents = () => {
    return forces.map((f) => {
      const radXY = (f.angleXY * Math.PI) / 180;
      const radZ = (f.angleZ * Math.PI) / 180;
      
      const fx = f.magnitude * Math.cos(radXY) * Math.cos(radZ);
      const fy = f.magnitude * Math.sin(radZ);
      const fz = f.magnitude * Math.sin(radXY) * Math.cos(radZ);

      return { ...f, fx, fy, fz };
    });
  };

  const calculateResultant = () => {
    const components = calculateComponents();
    let rx = 0, ry = 0, rz = 0;

    components.forEach((f) => {
      rx += f.fx;
      ry += f.fy;
      rz += f.fz;
    });

    const magnitude = Math.sqrt(rx * rx + ry * ry + rz * rz);
    
    // Ángulos de la resultante
    const angleXY = rx !== 0 || rz !== 0 ? Math.atan2(rz, rx) * 180 / Math.PI : 0;
    const angleZ = magnitude !== 0 ? Math.asin(ry / magnitude) * 180 / Math.PI : 0;

    return { 
      rx, ry, rz, 
      magnitude,
      angleXY: angleXY >= 0 ? angleXY : angleXY + 360,
      angleZ,
      components 
    };
  };

  const resultant = calculateResultant();

  const addForce = () => {
    if (forces.length >= 8) return;
    const colors = ["#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#06b6d4"];
    setForces([...forces, {
      id: nextId,
      magnitude: 50,
      angleXY: Math.random() * 360,
      angleZ: Math.random() * 80 - 40,
      color: colors[(nextId - 1) % colors.length],
      showComponents: false
    }]);
    setNextId(nextId + 1);
  };

  const removeForce = (id: number) => {
    if (forces.length > 1) {
      setForces(forces.filter(f => f.id !== id));
    }
  };

  const updateForce = (id: number, updates: Partial<Force>) => {
    setForces(forces.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const toggleComponents = (id: number) => {
    setForces(forces.map(f => 
      f.id === id ? { ...f, showComponents: !f.showComponents } : f
    ));
  };

  const reset = () => {
    setForces([
      { id: 1, magnitude: 50, angleXY: 0, angleZ: 30, color: "#ef4444", showComponents: false },
      { id: 2, magnitude: 40, angleXY: 120, angleZ: 45, color: "#3b82f6", showComponents: false },
      { id: 3, magnitude: 60, angleXY: 240, angleZ: -20, color: "#10b981", showComponents: false },
    ]);
    setNextId(4);
  };

  const loadPreset = (preset: Preset) => {
    const newForces = preset.forces.map((f, idx) => ({
      ...f,
      id: idx + 1,
      showComponents: false
    }));
    setForces(newForces);
    setNextId(newForces.length + 1);
  };

  return (
    <div className="space-y-4">
      {/* Visualización 3D */}
      <Card className="border-2 shadow-lg">
        <CardContent className="p-3 md:p-6">
          <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-primary/30 shadow-inner">
            <Canvas camera={{ position: [5, 4, 5], fov: 50 }}>
              <color attach="background" args={["#f8fafc"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-5, 5, -5]} intensity={0.5} />

              {/* Punto central */}
              <mesh>
                <sphereGeometry args={[0.18, 20, 20]} />
                <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
              </mesh>

              {/* Ejes de referencia */}
              <Line points={[[0, 0, 0], [3, 0, 0]]} color="#ff6b6b" lineWidth={2} />
              <Line points={[[0, 0, 0], [0, 3, 0]]} color="#51cf66" lineWidth={2} />
              <Line points={[[0, 0, 0], [0, 0, 3]]} color="#4dabf7" lineWidth={2} />
              
              <Text position={[3.2, 0, 0]} fontSize={0.2} color="#ff6b6b">X</Text>
              <Text position={[0, 3.2, 0]} fontSize={0.2} color="#51cf66">Y</Text>
              <Text position={[0, 0, 3.2]} fontSize={0.2} color="#4dabf7">Z</Text>

              {/* Vectores de fuerza */}
              {forces.map((force, idx) => (
                <ForceVector key={force.id} {...force} label={`F${idx + 1}`} visualScale={visualScale} />
              ))}

              {/* Resultante */}
              {resultant.magnitude > 1 && (
                <group>
                  <Line
                    points={[[0, 0, 0], [
                      resultant.rx / visualScale,
                      resultant.ry / visualScale,
                      resultant.rz / visualScale
                    ]]}
                    color="#f59e0b"
                    lineWidth={5}
                    dashed
                    dashSize={0.12}
                    gapSize={0.06}
                  />
                  <mesh 
                    position={[
                      resultant.rx / visualScale,
                      resultant.ry / visualScale,
                      resultant.rz / visualScale
                    ]}
                    quaternion={new THREE.Quaternion().setFromUnitVectors(
                      new THREE.Vector3(0, 1, 0),
                      new THREE.Vector3(resultant.rx, resultant.ry, resultant.rz).normalize()
                    )}
                  >
                    <coneGeometry args={[0.15, 0.35, 8]} />
                    <meshStandardMaterial color="#f59e0b" />
                  </mesh>
                  <Text
                    position={[
                      resultant.rx / visualScale * 1.15,
                      resultant.ry / visualScale * 1.15 + 0.3,
                      resultant.rz / visualScale * 1.15
                    ]}
                    fontSize={0.28}
                    color="#f59e0b"
                    anchorX="center"
                    outlineWidth={0.015}
                    outlineColor="#ffffff"
                  >
                    R
                  </Text>
                </group>
              )}

              <gridHelper args={[10, 10, "#94a3b8", "#cbd5e1"]} />
              
              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={15}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      {/* Control de Escala Visual */}
      <Card className="border-2 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Escala Visual
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Ajusta el tamaño de las flechas en pantalla sin cambiar los valores reales
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">
                Factor de escala: 1:{visualScale}
              </Label>
              <Input
                type="number"
                value={visualScale}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 10 && val <= 100) {
                    setVisualScale(val);
                  }
                }}
                className="w-20 h-8 text-sm text-right"
                min={10}
                max={100}
              />
            </div>
            <Slider
              value={[visualScale]}
              onValueChange={([v]) => setVisualScale(v)}
              min={10}
              max={100}
              step={5}
              className="cursor-pointer"
            />
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVisualScale(15)}
                className="h-8"
              >
                Grande (1:15)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVisualScale(25)}
                className="h-8"
              >
                Normal (1:25)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVisualScale(50)}
                className="h-8"
              >
                Pequeño (1:50)
              </Button>
            </div>
            <div className="bg-background p-3 rounded-lg border text-xs space-y-1">
              <p><strong>💡 Tip:</strong> Para fuerzas grandes (como 392N), usa escala 1:50 o mayor.</p>
              <p>Para fuerzas pequeñas (como 23N), usa escala 1:15 para mejor visualización.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ejercicios Predefinidos */}
      <Card className="border-2 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Ejercicios del Laboratorio
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Carga ejercicios predefinidos con un clic
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRESETS.map((preset, idx) => (
              <Card 
                key={idx}
                className="p-3 hover:shadow-md transition-shadow cursor-pointer bg-background"
                onClick={() => loadPreset(preset)}
              >
                <h4 className="font-semibold text-sm mb-1">{preset.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {preset.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    loadPreset(preset);
                  }}
                >
                  Cargar ejercicio
                </Button>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Controles de Fuerzas */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg md:text-xl">⚡ Control de Fuerzas</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addForce} 
                disabled={forces.length >= 8}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar ({forces.length}/8)
              </Button>
              <Button variant="outline" size="sm" onClick={reset} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {forces.map((force, idx) => {
            const comp = resultant.components.find(c => c.id === force.id);
            return (
              <Card 
                key={force.id} 
                className="p-3 md:p-4 bg-muted/30" 
                style={{ borderLeft: `4px solid ${force.color}` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono font-semibold text-sm md:text-base">
                    Fuerza F{idx + 1}
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleComponents(force.id)}
                      title={force.showComponents ? "Ocultar componentes" : "Mostrar componentes"}
                    >
                      {force.showComponents ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeForce(force.id)}
                      disabled={forces.length <= 1}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Magnitud */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Magnitud (N)</Label>
                      <Input
                        type="number"
                        value={force.magnitude}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val >= 10 && val <= 150) {
                            updateForce(force.id, { magnitude: val });
                          }
                        }}
                        className="w-16 h-7 text-xs text-right"
                        min={10}
                        max={150}
                      />
                    </div>
                    <Slider
                      value={[force.magnitude]}
                      onValueChange={([v]) => updateForce(force.id, { magnitude: v })}
                      min={10}
                      max={150}
                      step={5}
                      className="cursor-pointer"
                    />
                  </div>

                  {/* Ángulo XY */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Ángulo XY (°)</Label>
                      <Input
                        type="number"
                        value={force.angleXY}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val >= 0 && val <= 360) {
                            updateForce(force.id, { angleXY: val });
                          }
                        }}
                        className="w-16 h-7 text-xs text-right"
                        min={0}
                        max={360}
                      />
                    </div>
                    <Slider
                      value={[force.angleXY]}
                      onValueChange={([v]) => updateForce(force.id, { angleXY: v })}
                      min={0}
                      max={360}
                      step={5}
                      className="cursor-pointer"
                    />
                  </div>

                  {/* Ángulo Z */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Ángulo Z (°)</Label>
                      <Input
                        type="number"
                        value={force.angleZ}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val >= -180 && val <= 180) {
                            updateForce(force.id, { angleZ: val });
                          }
                        }}
                        className="w-16 h-7 text-xs text-right"
                        min={-180}
                        max={180}
                      />
                    </div>
                    <Slider
                      value={[force.angleZ]}
                      onValueChange={([v]) => updateForce(force.id, { angleZ: v })}
                      min={-180}
                      max={180}
                      step={5}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* Componentes */}
                {comp && (
                  <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-red-50 dark:bg-red-950/30 rounded">
                      <div className="text-muted-foreground">Fx</div>
                      <div className="font-mono font-semibold">{comp.fx.toFixed(1)} N</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-950/30 rounded">
                      <div className="text-muted-foreground">Fy</div>
                      <div className="font-mono font-semibold">{comp.fy.toFixed(1)} N</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
                      <div className="text-muted-foreground">Fz</div>
                      <div className="font-mono font-semibold">{comp.fz.toFixed(1)} N</div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Resultante */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-500/30 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Fuerza Resultante
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-background p-4 rounded-lg border-2">
              <p className="text-xs text-muted-foreground mb-1">Magnitud:</p>
              <p className="font-mono font-bold text-3xl text-amber-600 dark:text-amber-400">
                {resultant.magnitude.toFixed(2)} N
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-background p-3 rounded-lg border">
                <p className="text-xs text-muted-foreground mb-1">Ángulo XY:</p>
                <p className="font-mono font-semibold text-lg">
                  {resultant.angleXY.toFixed(1)}°
                </p>
              </div>
              <div className="bg-background p-3 rounded-lg border">
                <p className="text-xs text-muted-foreground mb-1">Ángulo Z:</p>
                <p className="font-mono font-semibold text-lg">
                  {resultant.angleZ.toFixed(1)}°
                </p>
              </div>
            </div>

            {resultant.magnitude < 5 && (
              <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg border-2 border-green-500">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 text-center">
                  ✓ Sistema en equilibrio (R ≈ 0)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sumatorias de Componentes */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">📊 Sumatorias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-xs text-muted-foreground mb-1">ΣFx</p>
                <p className="font-mono font-semibold text-lg">
                  {resultant.rx.toFixed(1)}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-xs text-muted-foreground mb-1">ΣFy</p>
                <p className="font-mono font-semibold text-lg">
                  {resultant.ry.toFixed(1)}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-muted-foreground mb-1">ΣFz</p>
                <p className="font-mono font-semibold text-lg">
                  {resultant.rz.toFixed(1)}
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg border text-xs space-y-1">
              <p className="font-semibold">Cálculo de la resultante:</p>
              <p className="font-mono">R = √(ΣFx² + ΣFy² + ΣFz²)</p>
              <p className="font-mono text-muted-foreground">
                R = √({resultant.rx.toFixed(1)}² + {resultant.ry.toFixed(1)}² + {resultant.rz.toFixed(1)}²)
              </p>
            </div>

            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20 text-xs">
              <p className="leading-relaxed">
                <strong>Equilibrio:</strong> Para que el sistema esté en equilibrio, 
                ΣFx = 0, ΣFy = 0 y ΣFz = 0 simultáneamente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Componentes */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">📋 Tabla de Componentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-2 font-semibold">Fuerza</th>
                  <th className="text-right p-2 font-semibold">Mag. (N)</th>
                  <th className="text-right p-2 font-semibold">θ XY (°)</th>
                  <th className="text-right p-2 font-semibold">θ Z (°)</th>
                  <th className="text-right p-2 font-semibold bg-red-50 dark:bg-red-950/30">Fx (N)</th>
                  <th className="text-right p-2 font-semibold bg-green-50 dark:bg-green-950/30">Fy (N)</th>
                  <th className="text-right p-2 font-semibold bg-blue-50 dark:bg-blue-950/30">Fz (N)</th>
                </tr>
              </thead>
              <tbody>
                {resultant.components.map((comp, idx) => (
                  <tr key={comp.id} className="border-b">
                    <td className="p-2">
                      <span 
                        className="inline-block w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: comp.color }}
                      />
                      <span className="font-mono">F{idx + 1}</span>
                    </td>
                    <td className="text-right p-2 font-mono">{comp.magnitude}</td>
                    <td className="text-right p-2 font-mono">{comp.angleXY}</td>
                    <td className="text-right p-2 font-mono">{comp.angleZ}</td>
                    <td className="text-right p-2 font-mono bg-red-50 dark:bg-red-950/30">
                      {comp.fx.toFixed(2)}
                    </td>
                    <td className="text-right p-2 font-mono bg-green-50 dark:bg-green-950/30">
                      {comp.fy.toFixed(2)}
                    </td>
                    <td className="text-right p-2 font-mono bg-blue-50 dark:bg-blue-950/30">
                      {comp.fz.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="font-bold bg-muted/50 border-t-2">
                  <td className="p-2" colSpan={4}>ΣTOTAL</td>
                  <td className="text-right p-2 font-mono bg-red-100 dark:bg-red-950/50">
                    {resultant.rx.toFixed(2)}
                  </td>
                  <td className="text-right p-2 font-mono bg-green-100 dark:bg-green-950/50">
                    {resultant.ry.toFixed(2)}
                  </td>
                  <td className="text-right p-2 font-mono bg-blue-100 dark:bg-blue-950/50">
                    {resultant.rz.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}