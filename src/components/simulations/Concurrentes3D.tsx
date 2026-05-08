"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html, Line } from "@react-three/drei";
import { Vector3 } from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Force3D {
  id: number;
  magnitude: number;
  theta: number; // ángulo en el plano XY
  phi: number;   // ángulo vertical desde el plano XY
  color: string;
}

function Force3DArrow({ force }: { force: Force3D }) {
  const scale = force.magnitude / 50;
  
  // Convertir coordenadas esféricas a cartesianas
  const x = scale * Math.cos(force.phi * Math.PI / 180) * Math.cos(force.theta * Math.PI / 180);
  const y = scale * Math.cos(force.phi * Math.PI / 180) * Math.sin(force.theta * Math.PI / 180);
  const z = scale * Math.sin(force.phi * Math.PI / 180);
  
  const endPoint = new Vector3(x, y, z);
  
  return (
    <group>
      {/* Shaft */}
      <Line
        points={[[0, 0, 0], [x, y, z]]}
        color={force.color}
        lineWidth={3}
      />
      
      {/* Arrowhead */}
      <mesh position={endPoint} lookAt={new Vector3(0, 0, 0)}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial color={force.color} />
      </mesh>
      
      {/* Label */}
      <Html position={[x * 1.2, y * 1.2, z * 1.2]} center>
        <div className="bg-background/90 px-2 py-1 rounded text-xs font-mono border border-border whitespace-nowrap">
          {force.magnitude}N
          <br />
          θ={force.theta}° φ={force.phi}°
        </div>
      </Html>
    </group>
  );
}

function ResultantArrow({ resultant }: { resultant: Vector3 }) {
  const magnitude = resultant.length();
  if (magnitude < 0.1) return null;
  
  return (
    <group>
      <Line
        points={[[0, 0, 0], [resultant.x, resultant.y, resultant.z]]}
        color="#f59e0b"
        lineWidth={5}
        dashed
        dashScale={0.5}
      />
      
      <mesh position={resultant} lookAt={new Vector3(0, 0, 0)}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      
      <Html position={[resultant.x * 1.3, resultant.y * 1.3, resultant.z * 1.3]} center>
        <div className="bg-amber-100 dark:bg-amber-950 px-3 py-2 rounded text-xs font-mono border-2 border-amber-500">
          <div className="font-bold text-amber-700 dark:text-amber-400">Resultante</div>
          <div className="text-amber-600 dark:text-amber-500">R = {magnitude.toFixed(1)}N</div>
        </div>
      </Html>
    </group>
  );
}

export function Concurrentes3D() {
  const [forces, setForces] = useState<Force3D[]>([
    { id: 1, magnitude: 80, theta: 0, phi: 20, color: "#3b82f6" },
    { id: 2, magnitude: 60, theta: 120, phi: 15, color: "#10b981" },
    { id: 3, magnitude: 50, theta: 240, phi: -10, color: "#ef4444" },
  ]);

  const calculateResultant = (): Vector3 => {
    const resultant = new Vector3(0, 0, 0);
    
    forces.forEach(force => {
      const scale = force.magnitude / 50;
      const x = scale * Math.cos(force.phi * Math.PI / 180) * Math.cos(force.theta * Math.PI / 180);
      const y = scale * Math.cos(force.phi * Math.PI / 180) * Math.sin(force.theta * Math.PI / 180);
      const z = scale * Math.sin(force.phi * Math.PI / 180);
      
      resultant.add(new Vector3(x, y, z));
    });
    
    return resultant;
  };

  const resultant = calculateResultant();

  const reset = () => {
    setForces([
      { id: 1, magnitude: 80, theta: 0, phi: 20, color: "#3b82f6" },
      { id: 2, magnitude: 60, theta: 120, phi: 15, color: "#10b981" },
      { id: 3, magnitude: 50, theta: 240, phi: -10, color: "#ef4444" },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="h-[600px] rounded-lg overflow-hidden border border-border bg-background">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Central point */}
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Force vectors */}
          {forces.map(force => (
            <Force3DArrow key={force.id} force={force} />
          ))}
          
          {/* Resultant */}
          <ResultantArrow resultant={resultant} />
          
          {/* Reference axes */}
          <Line points={[[0, 0, 0], [3, 0, 0]]} color="#64748b" lineWidth={1} />
          <Line points={[[0, 0, 0], [0, 3, 0]]} color="#64748b" lineWidth={1} />
          <Line points={[[0, 0, 0], [0, 0, 3]]} color="#64748b" lineWidth={1} />
          
          <Text position={[3.3, 0, 0]} fontSize={0.3} color="#94a3b8">X</Text>
          <Text position={[0, 3.3, 0]} fontSize={0.3} color="#94a3b8">Y</Text>
          <Text position={[0, 0, 3.3]} fontSize={0.3} color="#94a3b8">Z</Text>
          
          <OrbitControls 
            enablePan={true}
            minDistance={3}
            maxDistance={15}
          />
          
          <gridHelper args={[10, 10, "#64748b", "#334155"]} position={[0, -2, 0]} />
        </Canvas>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono font-semibold">Controles</h3>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <div className="space-y-4">
          {forces.map((force, idx) => (
            <div key={force.id} className="space-y-2 p-3 bg-muted/50 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: force.color }} />
                <span className="font-mono font-semibold">Fuerza {idx + 1}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs w-24">Magnitud:</span>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={force.magnitude}
                    onChange={(e) => setForces(forces.map(f => 
                      f.id === force.id ? { ...f, magnitude: Number(e.target.value) } : f
                    ))}
                    className="flex-1"
                  />
                  <span className="font-mono text-xs w-12">{force.magnitude}N</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs w-24">Ángulo θ (XY):</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={force.theta}
                    onChange={(e) => setForces(forces.map(f => 
                      f.id === force.id ? { ...f, theta: Number(e.target.value) } : f
                    ))}
                    className="flex-1"
                  />
                  <span className="font-mono text-xs w-12">{force.theta}°</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs w-24">Ángulo φ (Z):</span>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={force.phi}
                    onChange={(e) => setForces(forces.map(f => 
                      f.id === force.id ? { ...f, phi: Number(e.target.value) } : f
                    ))}
                    className="flex-1"
                  />
                  <span className="font-mono text-xs w-12">{force.phi}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-accent/10 rounded border border-accent/20">
          <p className="text-sm font-mono">
            <span className="font-bold">Resultante:</span> R = {resultant.length().toFixed(2)}N
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Componentes: Rx={resultant.x.toFixed(1)}, Ry={resultant.y.toFixed(1)}, Rz={resultant.z.toFixed(1)}
          </p>
        </div>
      </Card>
    </div>
  );
}