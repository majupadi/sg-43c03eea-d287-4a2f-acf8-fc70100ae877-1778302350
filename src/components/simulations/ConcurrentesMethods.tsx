"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Force {
  magnitude: number;
  angle: number;
  color: string;
}

export function ConcurrentesMethods() {
  const canvasParRef = useRef<HTMLCanvasElement>(null);
  const canvasPolRef = useRef<HTMLCanvasElement>(null);
  
  const [forces, setForces] = useState<Force[]>([
    { magnitude: 50, angle: 0, color: "#3B82F6" },
    { magnitude: 40, angle: 90, color: "#10B981" },
    { magnitude: 30, angle: 180, color: "#F59E0B" }
  ]);

  const updateForce = (index: number, field: "magnitude" | "angle", value: number) => {
    setForces(prev => prev.map((f, i) => 
      i === index ? { ...f, [field]: value } : f
    ));
  };

  const addForce = () => {
    const colors = ["#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];
    setForces(prev => [...prev, {
      magnitude: 25,
      angle: 45,
      color: colors[prev.length % colors.length]
    }]);
  };

  const removeForce = (index: number) => {
    if (forces.length > 2) {
      setForces(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Calcular resultante
  const calculateResultant = () => {
    let rx = 0, ry = 0;
    forces.forEach(f => {
      const rad = (f.angle * Math.PI) / 180;
      rx += f.magnitude * Math.cos(rad);
      ry += f.magnitude * Math.sin(rad);
    });
    const r = Math.sqrt(rx * rx + ry * ry);
    let theta = (Math.atan2(ry, rx) * 180) / Math.PI;
    if (theta < 0) theta += 360;
    return { r, theta, rx, ry };
  };

  const result = calculateResultant();

  // Dibujar método del paralelogramo (solo primeras 2 fuerzas)
  useEffect(() => {
    const canvas = canvasParRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 3;

    ctx.clearRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = "#E5E7EB";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Ejes
    ctx.strokeStyle = "#9CA3AF";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    if (forces.length < 2) return;

    const f1 = forces[0];
    const f2 = forces[1];

    const rad1 = (f1.angle * Math.PI) / 180;
    const rad2 = (f2.angle * Math.PI) / 180;

    const x1 = f1.magnitude * Math.cos(rad1) * scale;
    const y1 = -f1.magnitude * Math.sin(rad1) * scale;
    const x2 = f2.magnitude * Math.cos(rad2) * scale;
    const y2 = -f2.magnitude * Math.sin(rad2) * scale;

    // Fuerza 1
    ctx.strokeStyle = f1.color;
    ctx.fillStyle = f1.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + x1, centerY + y1);
    ctx.stroke();
    drawArrow(ctx, centerX, centerY, centerX + x1, centerY + y1, f1.color);
    ctx.fillText(`F₁ = ${f1.magnitude}N`, centerX + x1 / 2 + 10, centerY + y1 / 2);

    // Fuerza 2
    ctx.strokeStyle = f2.color;
    ctx.fillStyle = f2.color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + x2, centerY + y2);
    ctx.stroke();
    drawArrow(ctx, centerX, centerY, centerX + x2, centerY + y2, f2.color);
    ctx.fillText(`F₂ = ${f2.magnitude}N`, centerX + x2 / 2 + 10, centerY + y2 / 2);

    // Lados del paralelogramo (líneas punteadas)
    ctx.strokeStyle = "#9CA3AF";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX + x1, centerY + y1);
    ctx.lineTo(centerX + x1 + x2, centerY + y1 + y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX + x2, centerY + y2);
    ctx.lineTo(centerX + x1 + x2, centerY + y1 + y2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Resultante (diagonal)
    ctx.strokeStyle = "#EF4444";
    ctx.fillStyle = "#EF4444";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + x1 + x2, centerY + y1 + y2);
    ctx.stroke();
    drawArrow(ctx, centerX, centerY, centerX + x1 + x2, centerY + y1 + y2, "#EF4444");
    ctx.font = "bold 14px monospace";
    ctx.fillText(`R = ${result.r.toFixed(1)}N`, centerX + (x1 + x2) / 2 + 15, centerY + (y1 + y2) / 2);

  }, [forces]);

  // Dibujar método del polígono
  useEffect(() => {
    const canvas = canvasPolRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 3;

    ctx.clearRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = "#E5E7EB";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Ejes
    ctx.strokeStyle = "#9CA3AF";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Dibujar vectores en secuencia (método del polígono)
    let currentX = centerX;
    let currentY = centerY;

    forces.forEach((force, index) => {
      const rad = (force.angle * Math.PI) / 180;
      const dx = force.magnitude * Math.cos(rad) * scale;
      const dy = -force.magnitude * Math.sin(rad) * scale;

      ctx.strokeStyle = force.color;
      ctx.fillStyle = force.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      ctx.lineTo(currentX + dx, currentY + dy);
      ctx.stroke();
      drawArrow(ctx, currentX, currentY, currentX + dx, currentY + dy, force.color);
      ctx.font = "12px monospace";
      ctx.fillText(`F₁${index + 1}`, currentX + dx / 2 + 10, currentY + dy / 2);

      currentX += dx;
      currentY += dy;
    });

    // Resultante (desde origen hasta punto final)
    const rx = result.rx * scale;
    const ry = -result.ry * scale;
    ctx.strokeStyle = "#EF4444";
    ctx.fillStyle = "#EF4444";
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + rx, centerY + ry);
    ctx.stroke();
    ctx.setLineDash([]);
    drawArrow(ctx, centerX, centerY, centerX + rx, centerY + ry, "#EF4444");
    ctx.font = "bold 14px monospace";
    ctx.fillText(`R = ${result.r.toFixed(1)}N`, centerX + rx / 2 + 15, centerY + ry / 2 - 10);

  }, [forces]);

  function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
    const headlen = 12;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Métodos Gráficos: Paralelogramo y Polígono</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="paralelogramo" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="paralelogramo">Paralelogramo</TabsTrigger>
              <TabsTrigger value="poligono">Polígono</TabsTrigger>
              <TabsTrigger value="controles">Controles</TabsTrigger>
            </TabsList>

            <TabsContent value="paralelogramo" className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Método del Paralelogramo:</strong> Usado para sumar 2 vectores. 
                  Se dibujan ambas fuerzas desde el origen, se completa el paralelogramo, 
                  y la diagonal es la resultante.
                </AlertDescription>
              </Alert>
              <canvas
                ref={canvasParRef}
                width={800}
                height={500}
                className="w-full border-2 border-border rounded-lg bg-white dark:bg-gray-900"
              />
            </TabsContent>

            <TabsContent value="poligono" className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Método del Polígono:</strong> Para n vectores. Se dibujan en secuencia 
                  (punta de uno con cola del siguiente). La resultante va desde el origen 
                  hasta la punta del último vector.
                </AlertDescription>
              </Alert>
              <canvas
                ref={canvasPolRef}
                width={800}
                height={500}
                className="w-full border-2 border-border rounded-lg bg-white dark:bg-gray-900"
              />
            </TabsContent>

            <TabsContent value="controles" className="space-y-4">
              <div className="grid gap-4">
                {forces.map((force, index) => (
                  <Card key={index} className="p-4" style={{ borderLeft: `4px solid ${force.color}` }}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-semibold">Fuerza {index + 1} - Magnitud (N)</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Slider
                            value={[force.magnitude]}
                            onValueChange={([val]) => updateForce(index, "magnitude", val)}
                            min={5}
                            max={100}
                            step={5}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            value={force.magnitude}
                            onChange={(e) => updateForce(index, "magnitude", Number(e.target.value))}
                            className="w-20"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold">Ángulo (°)</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Slider
                            value={[force.angle]}
                            onValueChange={([val]) => updateForce(index, "angle", val)}
                            min={0}
                            max={360}
                            step={5}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            value={force.angle}
                            onChange={(e) => updateForce(index, "angle", Number(e.target.value))}
                            className="w-20"
                          />
                        </div>
                      </div>
                    </div>

                    {forces.length > 2 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeForce(index)}
                        className="mt-3"
                      >
                        Eliminar Fuerza {index + 1}
                      </Button>
                    )}
                  </Card>
                ))}

                {forces.length < 6 && (
                  <Button onClick={addForce} variant="outline" className="w-full">
                    + Agregar Fuerza
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Resultados */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
              <AlertDescription>
                <p className="text-xs text-muted-foreground">Resultante R</p>
                <p className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">
                  {result.r.toFixed(2)} N
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  a {result.theta.toFixed(1)}°
                </p>
              </AlertDescription>
            </Alert>

            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <AlertDescription>
                <p className="text-xs text-muted-foreground">Componente Rx</p>
                <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                  {result.rx.toFixed(2)} N
                </p>
              </AlertDescription>
            </Alert>

            <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
              <AlertDescription>
                <p className="text-xs text-muted-foreground">Componente Ry</p>
                <p className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
                  {result.ry.toFixed(2)} N
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}