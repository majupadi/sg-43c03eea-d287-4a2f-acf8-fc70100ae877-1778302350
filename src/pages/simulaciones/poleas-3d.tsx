import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Poleas3D } from "@/components/simulations/Poleas3D";
import { Book, Calculator, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Poleas3DPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación 3D: Poleas y Aparejos - Algo de Fisica lab 1"
        description="Experimenta con poleas fijas, móviles y aparejos en una simulación 3D interactiva. Calcula ventaja mecánica."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              Simulación 3D: Poleas y Aparejos
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprende cómo los sistemas de poleas multiplican la fuerza mediante ventaja mecánica
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  Polea Fija
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  F = R, VM = 1
                </p>
                <p className="text-xs text-muted-foreground">
                  Solo cambia dirección, sin ventaja mecánica
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-green-600 dark:text-green-400">
                  Polea Móvil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  F = R/2, VM = 2
                </p>
                <p className="text-xs text-muted-foreground">
                  Reduce el esfuerzo a la mitad
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-purple-600 dark:text-purple-400">
                  Aparejo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  F = R/n, VM = n
                </p>
                <p className="text-xs text-muted-foreground">
                  n poleas multiplican la ventaja
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Simulation */}
          <Poleas3D />

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
                      <p className="font-mono font-bold mb-1">Principio de Conservación:</p>
                      <p className="text-center font-mono text-lg text-primary">Trabajo = F × distancia</p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        Lo que ganamos en fuerza, lo perdemos en distancia
                      </p>
                    </div>
                    <div>
                      <p className="font-mono font-bold mb-1">Ventaja Mecánica:</p>
                      <p className="text-center font-mono text-lg text-accent">VM = R / F = n</p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        n = número de segmentos de cuerda que sostienen la carga
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Instrucciones:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Selecciona tipo de polea</li>
                    <li>• Ajusta la carga (R)</li>
                    <li>• En aparejo: ajusta cantidad</li>
                    <li>• Observa fuerza necesaria</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Observa:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Poleas fijas (azul)</li>
                    <li>• Poleas móviles (verde)</li>
                    <li>• Carga (rojo)</li>
                    <li>• Fuerza aplicada (verde)</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold mb-2 text-primary">Experimenta:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Compara los 3 tipos</li>
                    <li>• ¿Cuál es más eficiente?</li>
                    <li>• Más poleas = ¿más fácil?</li>
                    <li>• Relación fuerza/distancia</li>
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
              <Link href="/teoria/poleas">
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