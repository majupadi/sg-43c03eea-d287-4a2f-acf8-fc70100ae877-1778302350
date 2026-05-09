import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Book, Calculator, Lightbulb } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Proyectil3D = dynamic(
  () => import("@/components/simulations/Proyectil3D").then((mod) => mod.Proyectil3D),
  { ssr: false }
);

export default function ProyectilPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación 3D: Tiro Parabólico - Algo de Fisica lab 1"
        description="Simulación interactiva del movimiento de proyectiles. Ajusta ángulo y velocidad, observa la trayectoria parabólica y analiza alcance y altura máxima."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              Simulación 3D: Tiro Parabólico
            </h1>
            <p className="text-lg text-muted-foreground">
              Explora el movimiento de proyectiles y comprende cómo el ángulo y la velocidad afectan la trayectoria
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  Componente Horizontal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  MRU - Velocidad constante vₓ = v₀·cos(θ). No hay aceleración horizontal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-green-600 dark:text-green-400">
                  Componente Vertical
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  MRUV - Aceleración constante aᵧ = -g. La gravedad desacelera la subida.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-purple-600 dark:text-purple-400">
                  Ángulo Óptimo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  45° produce el máximo alcance. Compruébalo experimentando con diferentes ángulos.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Simulation */}
          <Proyectil3D />

          {/* Additional Resources */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Link href="/teoria">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Book className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base">Teoría Completa</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Aprende los fundamentos teóricos del tiro parabólico y movimiento de proyectiles
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/ejercicios">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base">Ejercicios</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Practica con problemas resueltos de tiro parabólico y movimiento projectil
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="border-2 bg-accent/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <CardTitle className="text-base">¿Sabías que...?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  En ausencia de resistencia del aire, dos proyectiles lanzados con ángulos complementarios 
                  (30° y 60°, por ejemplo) alcanzan la misma distancia horizontal.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tips */}
          <Alert className="mt-8">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Consejos para la simulación:</strong> Experimenta con diferentes combinaciones de ángulo y velocidad. 
              Observa cómo la trayectoria se vuelve más "plana" con ángulos bajos y más "alta" con ángulos elevados. 
              La línea punteada gris muestra la trayectoria teórica completa antes del lanzamiento.
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
}