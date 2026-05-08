import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Book } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Paralelas3D = dynamic(
  () => import("@/components/simulations/Paralelas3D").then(mod => ({ default: mod.Paralelas3D })),
  { ssr: false }
);

export default function ParalelasSimulacionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación 3D: Fuerzas Paralelas - Algo de Fisica lab 1"
        description="Simulación interactiva 3D de sistemas de fuerzas paralelas. Manipula fuerzas y observa la resultante en tiempo real."
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
                  <CardTitle className="text-2xl">Simulación 3D: Fuerzas Paralelas</CardTitle>
                  <CardDescription>
                    Manipula fuerzas paralelas sobre una viga y observa cómo se calcula la resultante y su posición de equilibrio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Paralelas3D />
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
                      • Arrastra con el mouse para rotar la vista<br />
                      • Usa la rueda para hacer zoom<br />
                      • Observa el sistema desde cualquier ángulo
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">⚡ Controles</h4>
                    <p className="text-muted-foreground">
                      • Ajusta la magnitud de cada fuerza con los sliders<br />
                      • Cambia la dirección (↑/↓) de cada fuerza<br />
                      • La resultante (naranja) se calcula automáticamente
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">📐 Cálculos</h4>
                    <p className="text-muted-foreground">
                      La resultante usa:<br />
                      • R = ΣF (suma algebraica)<br />
                      • x = ΣM / R (teorema de Varignon)<br />
                      • Fuerzas hacia arriba: positivas (+)<br />
                      • Fuerzas hacia abajo: negativas (-)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teoría Relacionada</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/teoria/paralelas">
                    <Button variant="outline" className="w-full gap-2">
                      <Book className="w-4 h-4" />
                      Ver Teoría de Fuerzas Paralelas
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