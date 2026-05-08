import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ParalelasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                ← Volver al inicio
              </Button>
            </Link>
            <h1 className="font-mono text-4xl font-bold mb-4">
              Sistemas de Fuerzas Paralelas
            </h1>
            <p className="text-lg text-muted-foreground">
              Análisis de fuerzas paralelas y cálculo de resultante
            </p>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Las fuerzas paralelas son aquellas que mantienen la misma dirección pero
              pueden tener sentidos iguales o opuestos. Su estudio es fundamental para
              el análisis de vigas y estructuras.
            </AlertDescription>
          </Alert>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Definición</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Un <strong>sistema de fuerzas paralelas</strong> está formado por fuerzas
                cuyas líneas de acción son paralelas entre sí. Estas fuerzas pueden:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tener el mismo sentido (fuerzas paralelas concordantes)</li>
                <li>Tener sentidos opuestos (fuerzas paralelas discordantes)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Fuerzas Paralelas del Mismo Sentido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="font-semibold mb-3">Características:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Todas las fuerzas actúan en la misma dirección</li>
                  <li>La resultante también tiene ese mismo sentido</li>
                  <li>El sistema tiende a producir traslación en esa dirección</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                <p className="font-semibold">Cálculo de la resultante:</p>
                <div className="font-mono text-sm space-y-3">
                  <div>
                    <p className="mb-2">Magnitud:</p>
                    <div className="bg-background p-3 rounded text-base">
                      R = F₁ + F₂ + F₃ + ... + Fₙ
                    </div>
                  </div>
                  <div>
                    <p className="mb-2">Posición de la resultante (distancia desde un punto):</p>
                    <div className="bg-background p-3 rounded text-base">
                      R · d = F₁·d₁ + F₂·d₂ + F₃·d₃ + ... + Fₙ·dₙ
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      donde dᵢ es la distancia de cada fuerza al punto de referencia
                    </p>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  El punto de aplicación de la resultante se encuentra entre las fuerzas
                  extremas del sistema, más cerca de las fuerzas mayores.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Fuerzas Paralelas de Distinto Sentido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="font-semibold mb-3">Características:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Las fuerzas actúan en direcciones opuestas</li>
                  <li>Pueden producir rotación además de traslación</li>
                  <li>El sistema puede estar en equilibrio si se cumplen condiciones especiales</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                <p className="font-semibold">Cálculo de la resultante:</p>
                <div className="font-mono text-sm space-y-3">
                  <div>
                    <p className="mb-2">Magnitud (suma algebraica):</p>
                    <div className="bg-background p-3 rounded text-base">
                      R = |F₁ - F₂ - F₃ + F₄ ...|
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Se asignan signos según el sentido elegido como positivo
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">Posición (teorema de Varignon):</p>
                    <div className="bg-background p-3 rounded text-base">
                      R · d = ΣM = Σ(F · d)
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      El momento de la resultante iguala la suma de momentos de las componentes
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3">Caso especial: Par de fuerzas</p>
                <p>
                  Cuando dos fuerzas paralelas de igual magnitud y sentidos opuestos actúan,
                  forman un <strong>par</strong> que produce rotación pura sin traslación.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mt-3 font-mono text-sm">
                  <p>Momento del par:</p>
                  <div className="bg-background p-3 rounded mt-2">
                    M = F · d
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    donde d es la distancia perpendicular entre las líneas de acción
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Condiciones de Equilibrio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Para que un sistema de fuerzas paralelas esté en equilibrio, se deben cumplir
                dos condiciones:
              </p>

              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold mb-2">1. Equilibrio de traslación:</p>
                  <div className="font-mono bg-background p-3 rounded">
                    ΣF = 0
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    La suma algebraica de todas las fuerzas debe ser cero
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold mb-2">2. Equilibrio de rotación:</p>
                  <div className="font-mono bg-background p-3 rounded">
                    ΣM = 0
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    La suma de momentos respecto a cualquier punto debe ser cero
                  </p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Estas condiciones son fundamentales para el análisis de estructuras
                  estáticas como vigas, puentes y edificios.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Aplicaciones Prácticas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <strong>Vigas:</strong> Análisis de cargas distribuidas y reacciones en apoyos
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <strong>Balanzas:</strong> Determinación de pesos mediante equilibrio de momentos
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <strong>Palancas:</strong> Cálculo de fuerzas aplicadas y resistencias
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <strong>Puentes:</strong> Distribución de cargas entre pilares
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/simulaciones/paralelas">
                Ir a Simulación Interactiva
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/ejercicios">
                Ver Ejercicios
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}