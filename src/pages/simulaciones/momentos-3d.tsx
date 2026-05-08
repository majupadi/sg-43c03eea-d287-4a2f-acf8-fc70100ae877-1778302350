import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Book } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Momentos3D = dynamic(
  () => import("@/components/simulations/Momentos3D").then(mod => ({ default: mod.Momentos3D })),
  { ssr: false }
);

export default function MomentosSimulacionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación 3D: Momentos y Torque - Algo de Fisica lab 1"
        description="Simulación interactiva 3D de momentos de fuerza y torque. Visualiza cómo la distancia y la fuerza afectan la rotación."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-6">
            <Link href="/simulaciones">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver a Simulaciones
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Simulación 3D: Momentos y Torque</CardTitle>
                  <CardDescription>
                    Aplica una fuerza a diferentes distancias del pivote central y observa el efecto rotacional (torque)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Momentos3D />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instrucciones</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">🖱️ Navegación 3D</h4>
                    <p className="text-muted-foreground">
                      • Arrastra para rotar la vista<br />
                      • Zoom con la rueda del mouse<br />
                      • Observa desde cualquier ángulo
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">⚡ Controles</h4>
                    <p className="text-muted-foreground">
                      • Ajusta la magnitud de la fuerza (20-150N)<br />
                      • Modifica la distancia al pivote (0.5-3m)<br />
                      • Presiona "Rotar" para ver el movimiento<br />
                      • Observa cómo cambia el torque
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">📐 Fórmula del Torque</h4>
                    <p className="text-muted-foreground font-mono text-xs">
                      τ = F × d<br />
                      <br />
                      donde:<br />
                      • τ (tau) = torque [N·m]<br />
                      • F = fuerza aplicada [N]<br />
                      • d = distancia perpendicular [m]
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conceptos Clave</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Torque:</strong> Tendencia de una fuerza a producir rotación alrededor de un eje.
                  </p>
                  <p>
                    <strong className="text-foreground">Brazo de palanca:</strong> Distancia perpendicular del eje de rotación a la línea de acción de la fuerza.
                  </p>
                  <p>
                    <strong className="text-foreground">Regla práctica:</strong> Duplicar la distancia o la fuerza duplica el torque. Ambos factores son igualmente importantes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teoría Relacionada</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/teoria/momentos">
                    <Button variant="outline" className="w-full gap-2">
                      <Book className="w-4 h-4" />
                      Ver Teoría de Momentos
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}