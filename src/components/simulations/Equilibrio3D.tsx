"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { Vector3 } from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Plus, Trash2 } from "lucide-react";

interface Load {
  id: number;
  position: number;
  weight: number;
}

function BeamWithLoads({ loads, supports }: { loads: Load[]; supports: { left: number; right: number } }) {
  const beamLength = 10;
  
  return (
    <group>
      {/* Main beam */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[beamLength, 0.3, 0.4]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Grid marks every meter */}
      {Array.from({ length: 11 }).map((_, i) => (
        <group key={i}>
          <mesh position={[-beamLength/2 + i, -0.2, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          <Text
            position={[-beamLength/2 + i, -0.6, 0]}
            fontSize={0.2}
            color="#94a3b8"
            anchorX="center"
          >
            {i}m
          </Text>
        </group>
      ))}

      {/* Loads (weights) */}
      {loads.map((load) => {
        const xPos = -beamLength/2 + load.position;
        const arrowHeight = load.weight / 30;
        
        return (
          <group key={load.id}>
            {/* Weight arrow pointing down */}
            <mesh position={[xPos, arrowHeight / 2 + 0.3, 0]}>
              <cylinderGeometry args={[0.06, 0.06, arrowHeight, 8]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[xPos, 0.3, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.15, 0.3, 8]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            {/* Load value label */}
            <Html position={[xPos, arrowHeight + 0.6, 0]} center>
              <div className="bg-background/90 px-2 py-1 rounded text-xs font-mono border border-border">
                {load.weight}N
              </div>
            </Html>
          </group>
        );
      })}

      {/* Left support (reaction) */}
      <group position={[-beamLength/2 + supports.left, 0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <coneGeometry args={[0.3, 0.5, 3]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.25}
          color="#10b981"
          anchorX="center"
        >
          RA = {supports.left.toFixed(1)}N
        </Text>
      </group>

      {/* Right support (reaction) */}
      <group position={[-beamLength/2 + supports.right, 0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <coneGeometry args={[0.3, 0.5, 3]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.25}
          color="#10b981"
          anchorX="center"
        >
          RB = {supports.right.toFixed(1)}N
        </Text>
      </group>
    </group>
  );
}

export function Equilibrio3D() {
  const [loads, setLoads] = useState<Load[]>([
    { id: 1, position: 3, weight: 100 },
    { id: 2, position: 7, weight: 80 },
  ]);
  const [nextId, setNextId] = useState(3);

  const supportPositions = { left: 1, right: 9 }; // Fixed supports at 1m and 9m
  const beamLength = 10;

  const calculateReactions = () => {
    const totalWeight = loads.reduce((sum, l) => sum + l.weight, 0);
    const momentAboutLeft = loads.reduce((sum, l) => 
      sum + l.weight * (l.position - supportPositions.left), 0
    );
    const supportDistance = supportPositions.right - supportPositions.left;
    const rightReaction = momentAboutLeft / supportDistance;
    const leftReaction = totalWeight - rightReaction;
    
    return {
      left: leftReaction,
      right: rightReaction,
      isBalanced: Math.abs(leftReaction + rightReaction - totalWeight) < 0.1
    };
  };

  const reactions = calculateReactions();

  const addLoad = () => {
    const newPosition = Math.random() * 8 + 1; // Random position between 1-9m
    const newWeight = Math.floor(Math.random() * 60) + 40; // 40-100N
    setLoads([...loads, { id: nextId, position: newPosition, weight: newWeight }]);
    setNextId(nextId + 1);
  };

  const removeLoad = (id: number) => {
    if (loads.length > 1) {
      setLoads(loads.filter(l => l.id !== id));
    }
  };

  const reset = () => {
    setLoads([
      { id: 1, position: 3, weight: 100 },
      { id: 2, position: 7, weight: 80 },
    ]);
    setNextId(3);
  };

  return (
    <div className="space-y-4">
      <div className="h-[600px] rounded-lg overflow-hidden border border-border bg-background">
        <Canvas camera={{ position: [0, 3, 12], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <BeamWithLoads loads={loads} supports={reactions} />
          
          <OrbitControls 
            enablePan={false}
            minDistance={8}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
          />
          
          <gridHelper args={[20, 20, "#64748b", "#334155"]} position={[0, -2.5, 0]} />
        </Canvas>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono font-semibold">Controles de Cargas</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addLoad}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Carga
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {loads.map((load, idx) => (
            <div key={load.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
              <span className="font-mono text-sm w-16">W{idx + 1}:</span>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-16">Peso:</span>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={load.weight}
                    onChange={(e) => setLoads(loads.map(l => 
                      l.id === load.id ? { ...l, weight: Number(e.target.value) } : l
                    ))}
                    className="flex-1"
                  />
                  <span className="font-mono text-xs w-12">{load.weight}N</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-16">Posición:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="9.5"
                    step="0.1"
                    value={load.position}
                    onChange={(e) => setLoads(loads.map(l => 
                      l.id === load.id ? { ...l, position: Number(e.target.value) } : l
                    ))}
                    className="flex-1"
                  />
                  <span className="font-mono text-xs w-12">{load.position.toFixed(1)}m</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLoad(load.id)}
                disabled={loads.length <= 1}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="p-3 bg-primary/10 rounded border border-primary/20">
            <p className="text-sm font-mono mb-1">
              <span className="font-bold">Reacción izquierda (RA):</span> {reactions.left.toFixed(2)}N
            </p>
            <p className="text-sm font-mono">
              <span className="font-bold">Reacción derecha (RB):</span> {reactions.right.toFixed(2)}N
            </p>
          </div>
          
          {reactions.isBalanced ? (
            <div className="p-3 bg-green-100 dark:bg-green-950 rounded border border-green-500 text-green-700 dark:text-green-400 text-sm">
              ✓ Sistema en equilibrio: ΣF = 0, ΣM = 0
            </div>
          ) : (
            <div className="p-3 bg-amber-100 dark:bg-amber-950 rounded border border-amber-500 text-amber-700 dark:text-amber-400 text-sm">
              ⚠ Ajusta las posiciones para equilibrar la viga
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}