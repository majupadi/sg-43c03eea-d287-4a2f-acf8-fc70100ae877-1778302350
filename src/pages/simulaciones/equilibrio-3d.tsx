import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Book } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Equilibrio3D = dynamic(
  () => import("@/components/simulations/Equilibrio3D").then((mod) => mod.Equilibrio3D),
  { ssr: false }
);

export default function EquilibrioSimulacionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación 3D: Equilibrio de Viga - Algo de Fisica lab 1"
        description="Simulación interactiva 3D de equilibrio de vigas. Coloca cargas y observa las reacciones en los apoyos."
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
                  <CardTitle className="text-2xl">Simulación 3D: Equilibrio de Viga</CardTitle>
                  <CardDescription>
                    Coloca cargas sobre una viga simplemente apoyada y observa cómo se distribuyen las reacciones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Equilibrio3D />
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
                      • Zoom con rueda del mouse<br />
                      • Visualiza el sistema desde arriba o lateralmente
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">⚡ Controles</h4>
                    <p className="text-muted-foreground">
                      • Ajusta peso de cada carga (20-150N)<br />
                      • Modifica posición sobre la viga (0.5-9.5m)<br />
                      • Agrega nuevas cargas con "+" <br />
                      • Elimina cargas individuales
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">📐 Condiciones de Equilibrio</h4>
                    <p className="text-muted-foreground font-mono text-xs">
                      ΣFy = 0<br />
                      ΣMA = 0<br />
                      <br />
                      RA + RB = ΣW<br />
                      RA × 0 + RB × d = Σ(W × x)
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
                    <strong className="text-foreground">Viga simplemente apoyada:</strong> Soportada en dos puntos que permiten rotación pero no traslación vertical.
                  </p>
                  <p>
                    <strong className="text-foreground">Reacciones:</strong> Fuerzas que los apoyos ejercen hacia arriba para mantener el equilibrio.
                  </p>
                  <p>
                    <strong className="text-foreground">Teorema de Varignon:</strong> El momento de la resultante es igual a la suma de los momentos de las componentes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teoría Relacionada</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/teoria/equilibrio">
                    <Button variant="outline" className="w-full gap-2">
                      <Book className="w-4 h-4" />
                      Ver Teoría de Equilibrio
                    </Button>
                  </Link>
                  <Link href="/teoria/momentos">
                    <Button variant="outline" className="w-full gap-2">
                      <Book className="w-4 h-4" />
                      Teoría de Momentos
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