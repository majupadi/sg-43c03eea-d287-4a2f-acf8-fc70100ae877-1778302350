import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Book } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Concurrentes3D = dynamic(
  () => import("@/components/simulations/Concurrentes3D").then(mod => ({ default: mod.Concurrentes3D })),
  { ssr: false }
);

export default function ConcurrentesSimulacionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación 3D: Fuerzas Concurrentes - Algo de Fisica lab 1"
        description="Simulación interactiva 3D de sistemas de fuerzas concurrentes. Manipula fuerzas en el espacio tridimensional."
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
                  <CardTitle className="text-2xl">Simulación 3D: Fuerzas Concurrentes</CardTitle>
                  <CardDescription>
                    Manipula tres fuerzas que convergen en un punto común en el espacio tridimensional
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Concurrentes3D />
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
                      • Click y arrastra para rotar<br />
                      • Click derecho para desplazar<br />
                      • Rueda para zoom<br />
                      • Visualiza desde cualquier ángulo
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">⚡ Controles</h4>
                    <p className="text-muted-foreground">
                      • Magnitud: Intensidad de cada fuerza<br />
                      • θ (theta): Ángulo en plano XY (0-360°)<br />
                      • φ (phi): Ángulo vertical (-90° a 90°)<br />
                      • La resultante (naranja) se actualiza en tiempo real
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">📐 Sistema 3D</h4>
                    <p className="text-muted-foreground">
                      Las fuerzas concurrentes en 3D se descomponen en:<br />
                      • Fx = F·cos(φ)·cos(θ)<br />
                      • Fy = F·cos(φ)·sin(θ)<br />
                      • Fz = F·sin(φ)
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
                    <strong className="text-foreground">Concurrentes:</strong> Todas las líneas de acción se intersectan en un punto común.
                  </p>
                  <p>
                    <strong className="text-foreground">Resultante espacial:</strong> Se obtiene sumando vectorialmente las tres componentes (x, y, z).
                  </p>
                  <p>
                    <strong className="text-foreground">Equilibrio:</strong> Para equilibrio, R = 0, lo que requiere ΣFx=0, ΣFy=0, ΣFz=0.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teoría Relacionada</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/teoria/concurrentes">
                    <Button variant="outline" className="w-full gap-2">
                      <Book className="w-4 h-4" />
                      Ver Teoría de Fuerzas Concurrentes
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