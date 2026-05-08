"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Force {
  magnitude: number;
  direction: 1 | -1; // 1 = right, -1 = left
}

export function ColinealesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [forces, setForces] = useState<Force[]>([
    { magnitude: 10, direction: 1 },
    { magnitude: 7, direction: 1 },
    { magnitude: 8, direction: -1 },
    { magnitude: 15, direction: -1 },
    { magnitude: 20, direction: 1 },
    { magnitude: 3, direction: -1 },
  ]);

  const [unit, setUnit] = useState<"Kgf" | "N" | "Dinas">("Kgf");

  const calculateResultant = () => {
    return forces.reduce((sum, force) => sum + force.magnitude * force.direction, 0);
  };

  const resultant = calculateResultant();

  const convertUnit = (value: number, toUnit: typeof unit): string => {
    if (unit === toUnit) return value.toFixed(2);
    
    if (unit === "Kgf") {
      if (toUnit === "N") return (value * 9.8).toFixed(2);
      if (toUnit === "Dinas") return (value * 980000).toExponential(2);
    }
    return value.toFixed(2);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = canvas.height / 2;
    const startX = 50;
    const scale = 15; // pixels per unit force

    // Draw horizontal line
    ctx.strokeStyle = "#1e3a5f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, centerY);
    ctx.lineTo(canvas.width - 50, centerY);
    ctx.stroke();

    // Draw forces
    let currentX = startX + 100;
    forces.forEach((force, index) => {
      const length = force.magnitude * scale;
      const endX = currentX + length * force.direction;

      // Draw vector
      ctx.strokeStyle = force.direction === 1 ? "#2563eb" : "#dc2626";
      ctx.fillStyle = force.direction === 1 ? "#2563eb" : "#dc2626";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(currentX, centerY);
      ctx.lineTo(endX, centerY);
      ctx.stroke();

      // Draw arrowhead
      const arrowSize = 8;
      const arrowAngle = force.direction === 1 ? 0 : Math.PI;
      ctx.beginPath();
      ctx.moveTo(endX, centerY);
      ctx.lineTo(
        endX - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
        centerY - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
      );
      ctx.lineTo(
        endX - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
        centerY - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      // Draw label
      ctx.fillStyle = "#1e3a5f";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        `F₁₂₃₄₅₆`[index] + `=${force.magnitude}`,
        currentX + (length * force.direction) / 2,
        centerY - 15
      );

      currentX = endX + 20 * force.direction;
    });

    // Draw resultant
    if (resultant !== 0) {
      const resultantLength = Math.abs(resultant) * scale;
      const resultantDirection = resultant > 0 ? 1 : -1;
      const resultantStartX = startX + 100;
      const resultantEndX = resultantStartX + resultantLength * resultantDirection;

      ctx.strokeStyle = "#f59e0b";
      ctx.fillStyle = "#f59e0b";
      ctx.lineWidth = 4;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(resultantStartX, centerY + 40);
      ctx.lineTo(resultantEndX, centerY + 40);
      ctx.stroke();
      ctx.setLineDash([]);

      // Resultant arrowhead
      const arrowSize = 10;
      const arrowAngle = resultantDirection === 1 ? 0 : Math.PI;
      ctx.beginPath();
      ctx.moveTo(resultantEndX, centerY + 40);
      ctx.lineTo(
        resultantEndX - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
        centerY + 40 - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
      );
      ctx.lineTo(
        resultantEndX - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
        centerY + 40 - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      // Resultant label
      ctx.font = "bold 16px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        `R=${Math.abs(resultant).toFixed(1)} ${unit}`,
        resultantStartX + (resultantLength * resultantDirection) / 2,
        centerY + 65
      );
    }
  }, [forces, unit, resultant]);

  const updateForce = (index: number, field: "magnitude" | "direction", value: number) => {
    const newForces = [...forces];
    if (field === "magnitude") {
      newForces[index].magnitude = Math.max(0, Math.min(50, value));
    } else {
      newForces[index].direction = value as 1 | -1;
    }
    setForces(newForces);
  };

  const resetForces = () => {
    setForces([
      { magnitude: 10, direction: 1 },
      { magnitude: 7, direction: 1 },
      { magnitude: 8, direction: -1 },
      { magnitude: 15, direction: -1 },
      { magnitude: 20, direction: 1 },
      { magnitude: 3, direction: -1 },
    ]);
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
            height={300}
            className="w-full border border-border rounded-lg bg-background"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">Controles de Fuerzas</CardTitle>
              <Button onClick={resetForces} size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {forces.map((force, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 items-center">
                <Label className="font-mono text-sm">
                  F₁₂₃₄₅₆{index}:
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="50"
                  value={force.magnitude}
                  onChange={(e) => updateForce(index, "magnitude", Number(e.target.value))}
                  className="font-mono"
                />
                <select
                  value={force.direction}
                  onChange={(e) => updateForce(index, "direction", Number(e.target.value) as 1 | -1)}
                  className="border border-input rounded-md px-3 py-2 font-mono text-sm"
                >
                  <option value="1">→ Derecha</option>
                  <option value="-1">← Izquierda</option>
                </select>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-lg">Resultante</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-accent/10 p-6 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Magnitud</p>
              <p className="font-mono text-3xl font-bold text-accent">
                {Math.abs(resultant).toFixed(2)} {unit}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {resultant > 0 ? "→ Hacia la derecha" : resultant < 0 ? "← Hacia la izquierda" : "Sistema en equilibrio"}
              </p>
            </div>

            <div>
              <Label className="font-mono text-sm mb-2 block">Unidad de medida:</Label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as typeof unit)}
                className="w-full border border-input rounded-md px-3 py-2 font-mono text-sm"
              >
                <option value="Kgf">Kilogramo-fuerza (Kgf)</option>
                <option value="N">Newtons (N)</option>
                <option value="Dinas">Dinas</option>
              </select>
            </div>

            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-muted-foreground">En Kgf:</span>
                <span>{convertUnit(resultant, "Kgf")} Kgf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">En N:</span>
                <span>{convertUnit(resultant, "N")} N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">En Dinas:</span>
                <span>{convertUnit(resultant, "Dinas")} Dinas</span>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-xs font-mono text-muted-foreground">
                <strong>Fórmula:</strong> R = ΣF = F₁ + F₂ + F₃ + F₄ + F₅ + F₆
              </p>
              <p className="text-xs font-mono mt-2">
                R = {forces.map((f, i) => `${f.direction === 1 ? "+" : ""}${(f.magnitude * f.direction).toFixed(1)}`).join(" ")}
              </p>
              <p className="text-xs font-mono">
                R = {resultant.toFixed(2)} {unit}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}