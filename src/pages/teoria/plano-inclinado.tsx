import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Calculator, FlaskConical, TrendingUp } from "lucide-react";
import Link from "next/link";
import { WikipediaCard } from "@/components/WikipediaCard";

export default function PlanoInclinadoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Plano Inclinado - Análisis de Fuerzas"
        description="Aprende sobre el plano inclinado, descomposición de fuerzas y ventaja mecánica."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Plano Inclinado</h1>
            <p className="text-lg text-muted-foreground">
              Máquina simple que permite subir cargas pesadas aplicando menos fuerza
            </p>
          </div>

          {/* Definición */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>¿Qué es un Plano Inclinado?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                El <strong>plano inclinado</strong> es una superficie plana que forma un ángulo con la horizontal. 
                Es una de las seis máquinas simples clásicas y permite levantar objetos pesados con menos esfuerzo 
                que si los levantáramos verticalmente, a costa de recorrer una mayor distancia.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-mono font-semibold mb-2 text-primary">Elementos del plano inclinado:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Altura (h):</strong> Elevación vertical del plano</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Longitud (L):</strong> Distancia a lo largo del plano inclinado</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Base (b):</strong> Proyección horizontal del plano</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Ángulo (θ):</strong> Inclinación respecto a la horizontal</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Peso (W):</strong> Fuerza gravitacional sobre el objeto</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Análisis de Fuerzas */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Análisis de Fuerzas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Cuando un objeto de peso <strong>W</strong> descansa sobre un plano inclinado de ángulo <strong>θ</strong>, 
                el peso se descompone en dos componentes:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-mono font-semibold text-blue-700 dark:text-blue-400 mb-2">
                    Componente Paralela (W‖)
                  </h4>
                  <p className="font-mono text-lg font-bold mb-2">W‖ = W × sin(θ)</p>
                  <p className="text-sm text-muted-foreground">
                    Actúa <strong>paralela</strong> al plano, hacia abajo. 
                    Es la fuerza que tiende a hacer que el objeto deslice.
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-mono font-semibold text-green-700 dark:text-green-400 mb-2">
                    Componente Normal (W⊥)
                  </h4>
                  <p className="font-mono text-lg font-bold mb-2">W⊥ = W × cos(θ)</p>
                  <p className="text-sm text-muted-foreground">
                    Actúa <strong>perpendicular</strong> al plano. 
                    Es equilibrada por la reacción normal (N) del plano.
                  </p>
                </div>
              </div>

              <Alert className="bg-primary/5 border-primary/20">
                <AlertDescription>
                  <p className="text-sm">
                    <strong>Condición de equilibrio:</strong> Para que el objeto NO deslice, 
                    debe aplicarse una fuerza F (paralela al plano, hacia arriba) tal que:
                  </p>
                  <p className="font-mono text-center text-lg font-bold mt-2 text-primary">
                    F ≥ W × sin(θ)
                  </p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Ventaja Mecánica */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ventaja Mecánica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                La ventaja mecánica del plano inclinado se define como la relación entre el peso del objeto 
                y la fuerza necesaria para subirlo (sin fricción):
              </p>

              <Alert className="bg-accent/10 border-accent/20">
                <AlertDescription>
                  <div className="text-center space-y-2">
                    <p className="font-mono text-2xl font-bold text-accent">
                      VM = L / h
                    </p>
                    <p className="text-sm text-muted-foreground">
                      o equivalentemente: VM = 1 / sin(θ)
                    </p>
                    <p className="text-sm mt-3">
                      Mientras más largo sea el plano (menor ángulo), menor fuerza se necesita, 
                      pero mayor distancia hay que recorrer.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <h4 className="font-semibold mb-2">Ejemplos de valores:</h4>
                <ul className="space-y-1">
                  <li>• <strong>θ = 30°:</strong> VM = 2 → se necesita la mitad de fuerza</li>
                  <li>• <strong>θ = 45°:</strong> VM = 1.41 → se necesita ~71% de la fuerza</li>
                  <li>• <strong>θ = 60°:</strong> VM = 1.15 → se necesita ~87% de la fuerza</li>
                </ul>
                <p className="text-muted-foreground italic mt-3">
                  A menor ángulo, mayor ventaja mecánica (menos esfuerzo, pero más distancia).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fricción */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Efecto de la Fricción</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                En la realidad, existe <strong>fricción</strong> entre el objeto y el plano. 
                La fuerza de fricción se opone al movimiento:
              </p>

              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-mono text-lg font-bold text-red-700 dark:text-red-400 mb-2">
                  Ffriction = μ × N
                </p>
                <p className="text-sm mb-2">donde:</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>μ</strong> = coeficiente de fricción (depende de las superficies)</li>
                  <li>• <strong>N</strong> = fuerza normal = W × cos(θ)</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                Con fricción, la fuerza necesaria para subir el objeto es:
              </p>
              <p className="font-mono text-center text-lg font-bold bg-background p-3 rounded border">
                F = W × sin(θ) + μ × W × cos(θ)
              </p>
            </CardContent>
          </Card>

          {/* Aplicaciones */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Aplicaciones del Plano Inclinado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">En construcción:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Rampas para accesibilidad</li>
                    <li>• Carreteras en montañas (zigzag)</li>
                    <li>• Escaleras (plano inclinado escalonado)</li>
                    <li>• Cintas transportadoras</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">En máquinas:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Tornillos y roscas (plano enrollado)</li>
                    <li>• Cuñas y cuchillas</li>
                    <li>• Hacha y cincel</li>
                    <li>• Cremallera (zipper)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fórmulas Resumen */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Fórmulas Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background p-3 rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Componente paralela:</p>
                  <p className="font-mono font-bold text-lg">W‖ = W·sin(θ)</p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Componente normal:</p>
                  <p className="font-mono font-bold text-lg">W⊥ = W·cos(θ)</p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Ventaja mecánica:</p>
                  <p className="font-mono font-bold text-lg">VM = L/h</p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Fuerza mínima (sin fricción):</p>
                  <p className="font-mono font-bold text-lg">F = W·sin(θ)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/teoria">
              <Button variant="outline">← Volver a Teoría</Button>
            </Link>
            <div className="flex gap-3">
              <Link href="/simulaciones/plano-inclinado-3d">
                <Button className="bg-accent hover:bg-accent/90">
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Ver Simulación 3D
                </Button>
              </Link>
              <Link href="/ejercicios">
                <Button variant="outline">
                  <Calculator className="w-4 h-4 mr-2" />
                  Practicar
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Información de Wikipedia */}
        <div className="mt-12">
          <WikipediaCard 
            term="Plano inclinado" 
            title="📚 Amplía tu conocimiento: Plano Inclinado"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}