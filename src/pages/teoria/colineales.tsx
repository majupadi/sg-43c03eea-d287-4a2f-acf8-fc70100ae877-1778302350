import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ArrowLeft, TrendingUp, Calculator } from "lucide-react";
import { ColinealesSimulation } from "@/components/simulations/ColinealesSimulation";
import { WikipediaCard } from "@/components/WikipediaCard";

export default function ColinealesPage() {
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
              Sistemas de Fuerzas Colineales
            </h1>
            <p className="text-lg text-muted-foreground">
              Fuerzas que actúan sobre una misma línea recta
            </p>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Este tema abarca el análisis de fuerzas que comparten la misma línea de acción,
              permitiendo su composición mediante suma algebraica simple.
            </AlertDescription>
          </Alert>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Definición</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Se denomina <strong>sistema de fuerzas colineales</strong> al conjunto de fuerzas
                cuyas líneas de acción se encuentran sobre una misma recta.
              </p>
              <p>
                En este tipo de sistemas, las fuerzas pueden tener el mismo sentido o sentidos opuestos,
                pero siempre mantienen la misma dirección.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Resultante de Fuerzas Colineales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                La <strong>resultante (R)</strong> de un sistema de fuerzas colineales se obtiene
                mediante la suma algebraica de todas las fuerzas:
              </p>

              <div className="bg-muted/50 p-6 rounded-lg font-mono text-center text-xl">
                R = ΣF = F₁ + F₂ + F₃ + ... + Fₙ
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Convención de signos:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Fuerzas hacia la derecha: positivas (+)</li>
                  <li>Fuerzas hacia la izquierda: negativas (-)</li>
                </ul>
              </div>

              <p>
                La dirección y sentido de la resultante quedan determinados por el signo
                del resultado:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>R &gt; 0: resultante hacia la derecha</li>
                <li>R &lt; 0: resultante hacia la izquierda</li>
                <li>R = 0: sistema en equilibrio</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Ejemplo Resuelto (Problema 17-18)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="font-semibold mb-3">Enunciado:</p>
                <p>
                  Determinar gráfica y analíticamente la resultante del sistema de fuerzas
                  colineales mostrado:
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg space-y-3">
                <p className="font-mono text-sm">Fuerzas dadas:</p>
                <ul className="space-y-1 font-mono text-sm">
                  <li>F₁ = 10 Kgf →</li>
                  <li>F₂ = 7 Kgf →</li>
                  <li>F₃ = 8 Kgf ←</li>
                  <li>F₄ = 15 Kgf ←</li>
                  <li>F₅ = 20 Kgf →</li>
                  <li>F₆ = 3 Kgf ←</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-3">Solución Analítica:</p>
                <div className="space-y-3 bg-muted/50 p-6 rounded-lg">
                  <p className="font-mono text-sm">Asignamos signos según convención:</p>
                  <div className="font-mono text-sm space-y-1">
                    <p>F₁ = +10 Kgf</p>
                    <p>F₂ = +7 Kgf</p>
                    <p>F₃ = -8 Kgf</p>
                    <p>F₄ = -15 Kgf</p>
                    <p>F₅ = +20 Kgf</p>
                    <p>F₆ = -3 Kgf</p>
                  </div>

                  <div className="border-t border-border pt-3 mt-3">
                    <p className="font-mono text-sm">Suma algebraica:</p>
                    <p className="font-mono">
                      R = (+10) + (+7) + (-8) + (-15) + (+20) + (-3)
                    </p>
                    <p className="font-mono">R = 37 - 26</p>
                    <p className="font-mono text-lg font-bold text-accent">R = 11 Kgf →</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3">Interpretación:</p>
                <p>
                  La resultante es <strong>11 Kgf hacia la derecha</strong>, lo que indica
                  que el sistema no está en equilibrio y tiende a moverse en esa dirección.
                </p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Para la solución gráfica, se utiliza una escala conveniente
                  (ej: 1 cm = 2 Kgf) y se trazan los vectores consecutivamente sobre
                  la línea horizontal, respetando sentidos.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Conversión de Unidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Unidades comunes para medir fuerzas:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Sistema Técnico:</p>
                  <ul className="space-y-1 text-sm font-mono">
                    <li>1 Kgf = 1000 grf</li>
                    <li>1 Kgf = 9.8 N</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Sistema CGS:</p>
                  <ul className="space-y-1 text-sm font-mono">
                    <li>1 N = 100,000 Dinas</li>
                    <li>1 Kgf = 980,000 Dinas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/simulaciones/colineales">
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

        {/* Simulación Interactiva */}
        <ColinealesSimulation />

        {/* Información de Wikipedia */}
        <div className="mt-12">
          <WikipediaCard 
            term="Fuerza" 
            title="📚 Amplía tu conocimiento: ¿Qué es una Fuerza?"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}