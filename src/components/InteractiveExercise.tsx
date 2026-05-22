"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Ruler } from "lucide-react";

interface Force {
  magnitude: number;
  angle: number;
  unit: "N" | "kgf";
}

interface InteractiveExerciseProps {
  exerciseNumber: number;
  title: string;
  initialForces: Force[];
}

export function InteractiveExercise({ 
  exerciseNumber, 
  title, 
  initialForces 
}: InteractiveExerciseProps) {
  const [forces, setForces] = useState<Force[]>(initialForces);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateForce = (index: number, field: "magnitude" | "angle", value: number) => {
    const newForces = [...forces];
    newForces[index][field] = value;
    setForces(newForces);
  };

  const toggleUnit = (index: number) => {
    const newForces = [...forces];
    const currentUnit = newForces[index].unit;
    const magnitude = newForces[index].magnitude;
    
    if (currentUnit === "kgf") {
      newForces[index].unit = "N";
      newForces[index].magnitude = magnitude * 9.8;
    } else {
      newForces[index].unit = "kgf";
      newForces[index].magnitude = magnitude / 9.8;
    }
    setForces(newForces);
  };

  // Convertir todo a Newtons para cálculos
  const forcesInNewtons = forces.map(f => ({
    magnitude: f.unit === "kgf" ? f.magnitude * 9.8 : f.magnitude,
    angle: f.angle
  }));

  // Calcular componentes
  const components = forcesInNewtons.map(f => ({
    x: f.magnitude * Math.cos((f.angle * Math.PI) / 180),
    y: f.magnitude * Math.sin((f.angle * Math.PI) / 180)
  }));

  // Resultante
  const Rx = components.reduce((sum, c) => sum + c.x, 0);
  const Ry = components.reduce((sum, c) => sum + c.y, 0);
  const R = Math.sqrt(Rx * Rx + Ry * Ry);
  const angleR = (Math.atan2(Ry, Rx) * 180) / Math.PI;

  // Equilibrante (opuesto a la resultante)
  const E = R;
  const angleE = (angleR + 180) % 360;

  // Dibujar en canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 2; // pixels por Newton

    // Limpiar
    ctx.clearRect(0, 0, width, height);

    // Fondo
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, width, height);

    // Ejes
    ctx.strokeStyle = "#dee2e6";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Dibujar cada fuerza
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
    forcesInNewtons.forEach((force, index) => {
      const endX = centerX + force.magnitude * Math.cos((force.angle * Math.PI) / 180) * scale;
      const endY = centerY - force.magnitude * Math.sin((force.angle * Math.PI) / 180) * scale;

      ctx.strokeStyle = colors[index % colors.length];
      ctx.fillStyle = colors[index % colors.length];
      ctx.lineWidth = 3;

      // Vector
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Punta de flecha
      const headLen = 12;
      const angle = Math.atan2(centerY - endY, endX - centerX);
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - headLen * Math.cos(angle - Math.PI / 6),
        endY + headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        endX - headLen * Math.cos(angle + Math.PI / 6),
        endY + headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      // Etiqueta
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 14px monospace";
      const labelX = centerX + (force.magnitude / 2) * Math.cos((force.angle * Math.PI) / 180) * scale;
      const labelY = centerY - (force.magnitude / 2) * Math.sin((force.angle * Math.PI) / 180) * scale;
      ctx.fillText(`F${index + 1}`, labelX + 10, labelY - 10);
    });

    // Resultante (rojo grueso)
    if (R > 0.1) {
      const endRx = centerX + Rx * scale;
      const endRy = centerY - Ry * scale;

      ctx.strokeStyle = "#dc2626";
      ctx.fillStyle = "#dc2626";
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 4]);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endRx, endRy);
      ctx.stroke();

      // Punta
      const headLen = 14;
      const angle = Math.atan2(centerY - endRy, endRx - centerX);
      ctx.beginPath();
      ctx.moveTo(endRx, endRy);
      ctx.lineTo(
        endRx - headLen * Math.cos(angle - Math.PI / 6),
        endRy + headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        endRx - headLen * Math.cos(angle + Math.PI / 6),
        endRy + headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      ctx.setLineDash([]);
      ctx.font = "bold 16px monospace";
      ctx.fillText("R", endRx + 15, endRy - 15);
    }
  }, [forcesInNewtons, Rx, Ry, R]);

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Ejercicio {exerciseNumber}: {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="controls">Controles</TabsTrigger>
            <TabsTrigger value="diagram">Diagrama</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="space-y-4 mt-4">
            {forces.map((force, index) => (
              <Card key={index} className="p-4">
                <h4 className="font-mono font-semibold mb-3 text-sm">
                  Fuerza F{index + 1}
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`mag-${index}`} className="text-xs">
                        Magnitud
                      </Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id={`mag-${index}`}
                          type="number"
                          min="0"
                          max="1000"
                          step="0.1"
                          value={force.magnitude.toFixed(1)}
                          onChange={(e) => updateForce(index, "magnitude", parseFloat(e.target.value))}
                          className="text-sm"
                        />
                        <button
                          onClick={() => toggleUnit(index)}
                          className="px-3 py-1 text-xs font-mono font-bold border rounded hover:bg-accent/10"
                        >
                          {force.unit}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`angle-${index}`} className="text-xs">
                        Ángulo: {force.angle}°
                      </Label>
                      <Input
                        id={`angle-${index}`}
                        type="number"
                        min="0"
                        max="360"
                        value={force.angle}
                        onChange={(e) => updateForce(index, "angle", parseInt(e.target.value))}
                        className="mt-1 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Slider
                      value={[force.angle]}
                      onValueChange={([val]) => updateForce(index, "angle", val)}
                      min={0}
                      max={360}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    Componentes: x = {components[index].x.toFixed(2)} N, y = {components[index].y.toFixed(2)} N
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="diagram" className="mt-4">
            <div className="border rounded-lg overflow-hidden bg-background">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Diagrama vectorial - Resultante en rojo (punteado)
            </p>
          </TabsContent>

          <TabsContent value="results" className="space-y-3 mt-4">
            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <AlertDescription>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Componentes de la Resultante</p>
                  <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                    Rx = {Rx.toFixed(2)} N
                  </p>
                  <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                    Ry = {Ry.toFixed(2)} N
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
              <AlertDescription>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Resultante (R)</p>
                  <p className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">
                    R = {R.toFixed(2)} N
                  </p>
                  <p className="text-sm font-mono text-red-600 dark:text-red-400">
                    θ = {angleR.toFixed(1)}°
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    R = √(Rx² + Ry²) = √({Rx.toFixed(2)}² + {Ry.toFixed(2)}²)
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
              <AlertDescription>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Equilibrante (E)</p>
                  <p className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
                    E = {E.toFixed(2)} N
                  </p>
                  <p className="text-sm font-mono text-green-600 dark:text-green-400">
                    θ = {angleE.toFixed(1)}°
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    (opuesta a la resultante)
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            <div className="p-3 bg-muted/50 rounded-lg text-xs">
              <p className="font-semibold mb-2">Conversión de unidades:</p>
              <p className="font-mono">1 kgf = 9.8 N</p>
              <p className="font-mono">R = {(R / 9.8).toFixed(2)} kgf</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}