import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Book, Calculator, Lightbulb } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Palancas3D = dynamic(
  () => import("@/components/simulations/Palancas3D").then((mod) => mod.Palancas3D),
  { ssr: false }
);

export default function Palancas3DPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación 3D: Palancas - Algo de Fisica lab 1"
        description="Experimenta con los 3 tipos de palancas en una simulación 3D interactiva. Calcula ventaja mecánica y ley de la palanca."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              Simulación 3D: Palancas
            </h1>
            <p className="text-lg text-muted-foreground">
              Explora los tres tipos de palancas y comprende cómo funcionan las máquinas simples
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  1er Género
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Fulcro entre potencia y resistencia. Ejemplo: balancín, tijeras
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-green-600 dark:text-green-400">
                  2do Género
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Resistencia entre fulcro y potencia. Ejemplo: carretilla, cascanueces
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-purple-600 dark:text-purple-400">
                  3er Género
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Potencia entre fulcro y resistencia. Ejemplo: pinzas, brazo humano
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Simulation */}
          <Palancas3D />

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
                      <p className="font-mono font-bold mb-1">Ley de la Palanca:</p>
                      <p className="text-center font-mono text-lg text-primary">P × BP = R × BR</p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        El momento de la potencia es igual al momento de la resistencia
                      </p>
                    </div>
                    <div>
                      <p className="font-mono font-bold mb-1">Ventaja Mecánica:</p>
                      <p className="text-center font-mono text-lg text-accent">VM = R / P = BP / BR</p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        Si VM &gt; 1: ganancia de fuerza · Si VM &lt; 1: ganancia de velocidad
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Instrucciones:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Selecciona el tipo de palanca</li>
                    <li>• Ajusta brazos y resistencia</li>
                    <li>• Observa la potencia calculada</li>
                    <li>• Rota la cámara con el mouse</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Observa:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Posición del fulcro (azul)</li>
                    <li>• Fuerza de potencia (verde)</li>
                    <li>• Fuerza de resistencia (roja)</li>
                    <li>• Longitud de los brazos</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Experimenta:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• ¿Cuál tipo da más ventaja?</li>
                    <li>• ¿Qué pasa si BP = BR?</li>
                    <li>• ¿Cuándo VM &lt; 1?</li>
                    <li>• Verifica P × BP = R × BR</li>
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
              <Link href="/teoria/palancas">
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