"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export function ParalelogramoSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [f1, setF1] = useState(30);
  const [f2, setF2] = useState(40);
  const [angle, setAngle] = useState(60);

  const calculateResultant = () => {
    const angleRad = (angle * Math.PI) / 180;
    const rMagnitude = Math.sqrt(
      f1 * f1 + f2 * f2 + 2 * f1 * f2 * Math.cos(angleRad)
    );
    
    const rAngleRad = Math.atan2(
      f2 * Math.sin(angleRad),
      f1 + f2 * Math.cos(angleRad)
    );
    const rAngleDeg = (rAngleRad * 180) / Math.PI;
    
    return {
      magnitude: rMagnitude,
      angle: rAngleDeg,
    };
  };

  const resultant = calculateResultant();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const originX = 100;
    const originY = canvas.height - 100;
    const scale = 4;

    // Draw coordinate axes
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(50, originY);
    ctx.lineTo(canvas.width - 50, originY);
    ctx.moveTo(originX, 50);
    ctx.lineTo(originX, canvas.height - 50);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw F1 (horizontal)
    const f1EndX = originX + f1 * scale;
    const f1EndY = originY;
    
    ctx.strokeStyle = "#2563eb";
    ctx.fillStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(f1EndX, f1EndY);
    ctx.stroke();
    
    drawArrowhead(ctx, f1EndX, f1EndY, 0, "#2563eb");
    
    ctx.font = "16px 'JetBrains Mono', monospace";
    ctx.fillText(`F₁ = ${f1} N`, (originX + f1EndX) / 2, f1EndY + 25);

    // Draw F2 (at angle)
    const angleRad = (angle * Math.PI) / 180;
    const f2EndX = originX + f2 * scale * Math.cos(angleRad);
    const f2EndY = originY - f2 * scale * Math.sin(angleRad);
    
    ctx.strokeStyle = "#dc2626";
    ctx.fillStyle = "#dc2626";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(f2EndX, f2EndY);
    ctx.stroke();
    
    drawArrowhead(ctx, f2EndX, f2EndY, angleRad, "#dc2626");
    
    ctx.fillText(
      `F₂ = ${f2} N`,
      f2EndX + 15,
      f2EndY + (angle > 90 ? 25 : -5)
    );

    // Draw parallelogram construction lines
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    
    // Line from F1 end parallel to F2
    ctx.beginPath();
    ctx.moveTo(f1EndX, f1EndY);
    ctx.lineTo(f1EndX + f2 * scale * Math.cos(angleRad), f1EndY - f2 * scale * Math.sin(angleRad));
    ctx.stroke();
    
    // Line from F2 end parallel to F1
    ctx.beginPath();
    ctx.moveTo(f2EndX, f2EndY);
    ctx.lineTo(f2EndX + f1 * scale, f2EndY);
    ctx.stroke();
    
    ctx.setLineDash([]);

    // Draw resultant (diagonal)
    const rEndX = f1EndX + f2 * scale * Math.cos(angleRad);
    const rEndY = f1EndY - f2 * scale * Math.sin(angleRad);
    
    ctx.strokeStyle = "#f59e0b";
    ctx.fillStyle = "#f59e0b";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(rEndX, rEndY);
    ctx.stroke();
    
    const rAngleRad = Math.atan2(originY - rEndY, rEndX - originX);
    drawArrowhead(ctx, rEndX, rEndY, rAngleRad, "#f59e0b");
    
    ctx.font = "bold 16px 'JetBrains Mono', monospace";
    ctx.fillText(
      `R = ${resultant.magnitude.toFixed(1)} N`,
      (originX + rEndX) / 2 - 40,
      (originY + rEndY) / 2 + 30
    );

    // Draw angle arc
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(originX, originY, 40, -angleRad, 0);
    ctx.stroke();
    
    ctx.font = "14px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#64748b";
    ctx.fillText(`${angle}°`, originX + 50, originY - 10);
  }, [f1, f2, angle, resultant]);

  const drawArrowhead = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number,
    color: string
  ) => {
    const arrowSize = 10;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x - arrowSize * Math.cos(angle - Math.PI / 6),
      y + arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      x - arrowSize * Math.cos(angle + Math.PI / 6),
      y + arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  };

  const resetValues = () => {
    setF1(30);
    setF2(40);
    setAngle(60);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-mono">Simulación Interactiva</CardTitle>
        </CardHeader>
        <CardContent>
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full border border-border rounded-lg bg-background"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">Controles</CardTitle>
              <Button onClick={resetValues} size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="font-mono text-sm mb-2 block">
                Fuerza F₁ (N):
              </Label>
              <Input
                type="number"
                min="5"
                max="100"
                value={f1}
                onChange={(e) => setF1(Number(e.target.value))}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Rango: 5 - 100 N (vector azul horizontal)
              </p>
            </div>

            <div>
              <Label className="font-mono text-sm mb-2 block">
                Fuerza F₂ (N):
              </Label>
              <Input
                type="number"
                min="5"
                max="100"
                value={f2}
                onChange={(e) => setF2(Number(e.target.value))}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Rango: 5 - 100 N (vector rojo angular)
              </p>
            </div>

            <div>
              <Label className="font-mono text-sm mb-2 block">
                Ángulo entre F₁ y F₂ (°):
              </Label>
              <Input
                type="number"
                min="0"
                max="180"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Rango: 0° - 180°
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg space-y-2">
              <p className="text-xs font-semibold">Construcción:</p>
              <ul className="text-xs space-y-1 ml-4 list-disc">
                <li>Líneas punteadas grises = lados del paralelogramo</li>
                <li>Línea ámbar gruesa = resultante (diagonal)</li>
                <li>El paralelogramo completo es visible</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-lg">Resultados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-accent/10 p-6 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Magnitud de la Resultante</p>
              <p className="font-mono text-3xl font-bold text-accent">
                {resultant.magnitude.toFixed(2)} N
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Ángulo: {resultant.angle.toFixed(1)}° respecto a F₁
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">Fórmula de la magnitud:</p>
                <div className="font-mono text-xs bg-background p-3 rounded">
                  R = √(F₁² + F₂² + 2·F₁·F₂·cos(θ))
                </div>
                <p className="text-xs mt-2 font-mono">
                  R = √({f1}² + {f2}² + 2·{f1}·{f2}·cos({angle}°))
                </p>
                <p className="text-xs mt-1 font-mono">
                  R = √(
                  {(f1 * f1 + f2 * f2 + 2 * f1 * f2 * Math.cos((angle * Math.PI) / 180)).toFixed(0)}
                  )
                </p>
                <p className="text-xs mt-1 font-mono text-accent font-bold">
                  R = {resultant.magnitude.toFixed(2)} N
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">Casos especiales:</p>
                <ul className="text-xs space-y-1 font-mono">
                  <li>θ = 0°: R = {(f1 + f2).toFixed(1)} N (mismo sentido)</li>
                  <li>θ = 90°: R = {Math.sqrt(f1 * f1 + f2 * f2).toFixed(1)} N</li>
                  <li>θ = 180°: R = {Math.abs(f1 - f2).toFixed(1)} N (opuestos)</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                <strong>Interpretación:</strong> La resultante representa el efecto
                combinado de ambas fuerzas actuando simultáneamente sobre el mismo punto.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}