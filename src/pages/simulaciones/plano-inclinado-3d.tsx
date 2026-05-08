import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { PlanoInclinado3D } from "@/components/simulations/PlanoInclinado3D";
import { Book, Calculator, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function PlanoInclinado3DPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación 3D: Plano Inclinado - Algo de Fisica lab 1"
        description="Experimenta con el plano inclinado en 3D. Analiza descomposición de fuerzas, fricción y ventaja mecánica."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              Simulación 3D: Plano Inclinado
            </h1>
            <p className="text-lg text-muted-foreground">
              Visualiza la descomposición de fuerzas en superficies inclinadas y el efecto de la fricción
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-amber-600 dark:text-amber-400">
                  Componente Paralela
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  W‖ = W × sin(θ)
                </p>
                <p className="text-xs text-muted-foreground">
                  Fuerza que tiende a hacer deslizar el objeto
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  Componente Normal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  W⊥ = W × cos(θ)
                </p>
                <p className="text-xs text-muted-foreground">
                  Presión perpendicular sobre el plano
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-green-600 dark:text-green-400">
                  Ventaja Mecánica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  VM = L / h = 1 / sin(θ)
                </p>
                <p className="text-xs text-muted-foreground">
                  Mayor longitud = menor fuerza
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Simulation */}
          <PlanoInclinado3D />

          {/* Theory Quick Reference */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Conceptos Clave
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  <div className="space-y-3">
                    <div>
                      <p className="font-mono font-bold mb-1">Fuerza sin fricción:</p>
                      <p className="text-center font-mono text-lg text-primary">F = W × sin(θ)</p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        Solo componente paralela
                      </p>
                    </div>
                    <div>
                      <p className="font-mono font-bold mb-1">Fuerza con fricción:</p>
                      <p className="text-center font-mono text-lg text-accent">F = W·sin(θ) + μ·W·cos(θ)</p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        Se suma la fuerza de fricción Ff = μ × W⊥
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Instrucciones:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Ajusta ángulo de inclinación</li>
                    <li>• Modifica peso del objeto</li>
                    <li>• Cambia coeficiente fricción</li>
                    <li>• Rota cámara para ver 3D</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Observa:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Peso total (rojo, ↓)</li>
                    <li>• Comp. paralela (naranja)</li>
                    <li>• Comp. normal (azul)</li>
                    <li>• Fuerza aplicada (verde)</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Experimenta:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• ¿Qué pasa en θ = 0°?</li>
                    <li>• ¿Y en θ = 90°?</li>
                    <li>• Efecto de la fricción</li>
                    <li>• Relación ángulo-fuerza</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
            <Link href="/simulaciones">
              <Button variant="outline">← Todas las Simulaciones</Button>
            </Link>
            <div className="flex gap-3">
              <Link href="/teoria/plano-inclinado">
                <Button variant="outline">
                  <Book className="w-4 h-4 mr-2" />
                  Ver Teoría
                </Button>
              </Link>
              <Link href="/ejercicios">
                <Button className="bg-accent hover:bg-accent/90">
                  <Calculator className="w-4 h-4 mr-2" />
                  Practicar Ejercicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}