import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { BookOpen, Calculator, FlaskConical, ArrowRight } from "lucide-react";

export default function SistemasConcurrentes() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Sistemas de Fuerzas Concurrentes - Sistema de Fuerzas"
        description="Aprende sobre sistemas de fuerzas concurrentes, descomposición vectorial, componentes rectangulares y métodos de resolución."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Sistemas de Fuerzas Concurrentes</h1>
            <p className="text-lg text-muted-foreground">
              Fuerzas que actúan a través de un punto común en el espacio
            </p>
          </div>

          {/* Definición */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Definición
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Un <strong>sistema de fuerzas concurrentes</strong> es aquel en el cual todas las líneas de acción de las fuerzas 
                se intersectan en un punto común. Este punto puede estar en el cuerpo o fuera de él.
              </p>
              
              <Alert>
                <AlertDescription>
                  <strong>Característica principal:</strong> Todas las fuerzas pasan por el mismo punto, aunque sus direcciones 
                  y magnitudes sean diferentes.
                </AlertDescription>
              </Alert>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-mono font-semibold mb-3 text-lg">Propiedades Importantes</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Las fuerzas pueden estar en un plano (2D) o en el espacio (3D)</li>
                  <li>La resultante siempre pasa por el punto de concurrencia</li>
                  <li>No producen momento respecto al punto de concurrencia</li>
                  <li>Se pueden resolver usando métodos gráficos o analíticos</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Descomposición Vectorial */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Descomposición en Componentes Rectangulares</CardTitle>
              <CardDescription>Método analítico para resolver sistemas concurrentes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-mono font-semibold mb-3">Componentes X e Y</h3>
                <p className="mb-4">
                  Cualquier fuerza <strong>F</strong> que forma un ángulo <strong>θ</strong> con el eje horizontal puede 
                  descomponerse en dos componentes perpendiculares:
                </p>
                
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                  <div className="space-y-3 font-mono">
                    <div className="text-lg">
                      <strong>Fx = F · cos(θ)</strong> → Componente horizontal
                    </div>
                    <div className="text-lg">
                      <strong>Fy = F · sin(θ)</strong> → Componente vertical
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono font-semibold mb-3">Magnitud de la Fuerza Original</h3>
                <p className="mb-4">A partir de las componentes, podemos recuperar la magnitud:</p>
                
                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                  <div className="font-mono text-lg">
                    <strong>F = √(Fx² + Fy²)</strong>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono font-semibold mb-3">Ángulo de la Fuerza</h3>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="font-mono text-lg">
                    <strong>θ = arctan(Fy / Fx)</strong>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    *Considerar el cuadrante correcto según los signos de Fx y Fy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Método de Resolución */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Método Analítico - Suma de Componentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-mono font-semibold mb-4 text-lg">Procedimiento paso a paso</h3>
                <ol className="list-decimal list-inside space-y-3">
                  <li className="pl-2">
                    <strong>Descomponer cada fuerza</strong> en sus componentes Fx y Fy
                  </li>
                  <li className="pl-2">
                    <strong>Sumar todas las componentes horizontales:</strong>
                    <div className="ml-6 mt-2 font-mono bg-white p-3 rounded">
                      ΣFx = F1x + F2x + F3x + ... + Fnx
                    </div>
                  </li>
                  <li className="pl-2">
                    <strong>Sumar todas las componentes verticales:</strong>
                    <div className="ml-6 mt-2 font-mono bg-white p-3 rounded">
                      ΣFy = F1y + F2y + F3y + ... + Fny
                    </div>
                  </li>
                  <li className="pl-2">
                    <strong>Calcular la resultante:</strong>
                    <div className="ml-6 mt-2 font-mono bg-white p-3 rounded">
                      R = √[(ΣFx)² + (ΣFy)²]
                    </div>
                  </li>
                  <li className="pl-2">
                    <strong>Determinar el ángulo:</strong>
                    <div className="ml-6 mt-2 font-mono bg-white p-3 rounded">
                      θ = arctan(ΣFy / ΣFx)
                    </div>
                  </li>
                </ol>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Convención de signos:</strong> Fuerzas hacia la derecha y arriba son positivas (+). 
                  Fuerzas hacia la izquierda y abajo son negativas (-).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Ejemplo Práctico */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ejemplo Resuelto</CardTitle>
              <CardDescription>Tres fuerzas concurrentes en un punto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-4">
                  <strong>Datos:</strong> Tres fuerzas actúan sobre un punto O:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>F₁ = 50 N a 30° respecto al eje X</li>
                  <li>F₂ = 40 N a 120° respecto al eje X</li>
                  <li>F₃ = 60 N a 240° respecto al eje X</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 1: Descomposición</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>F₁x = 50·cos(30°) = 43.3 N &nbsp;&nbsp; F₁y = 50·sin(30°) = 25.0 N</div>
                    <div>F₂x = 40·cos(120°) = -20.0 N &nbsp;&nbsp; F₂y = 40·sin(120°) = 34.6 N</div>
                    <div>F₃x = 60·cos(240°) = -30.0 N &nbsp;&nbsp; F₃y = 60·sin(240°) = -52.0 N</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 2: Suma de componentes</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>ΣFx = 43.3 + (-20.0) + (-30.0) = <strong className="text-primary">-6.7 N</strong></div>
                    <div>ΣFy = 25.0 + 34.6 + (-52.0) = <strong className="text-primary">7.6 N</strong></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 3: Resultante</h4>
                  <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                    <div className="font-mono space-y-2">
                      <div>R = √[(-6.7)² + (7.6)²] = √[44.89 + 57.76]</div>
                      <div className="text-lg"><strong>R = 10.1 N</strong></div>
                      <div className="mt-3">θ = arctan(7.6 / -6.7) = <strong>131.4°</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Casos Especiales */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Casos Especiales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Equilibrio Estático</h4>
                  <p className="text-sm mb-2">Si la resultante es cero (R = 0), el sistema está en equilibrio:</p>
                  <div className="font-mono bg-white p-3 rounded">
                    ΣFx = 0 &nbsp;&nbsp;y&nbsp;&nbsp; ΣFy = 0
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Fuerzas Perpendiculares</h4>
                  <p className="text-sm mb-2">Si todas las fuerzas están a 90° entre sí, no hay componentes cruzadas:</p>
                  <div className="font-mono bg-white p-3 rounded text-sm">
                    R = √(F₁² + F₂²) si F₁ ⊥ F₂
                  </div>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Tres Fuerzas en Equilibrio</h4>
                  <p className="text-sm">
                    Si tres fuerzas concurrentes están en equilibrio, forman un triángulo cerrado cuando 
                    se colocan punta con cola.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navegación */}
          <div className="flex flex-wrap gap-4 justify-between items-center pt-8 border-t">
            <Link href="/teoria/metodos-graficos">
              <Button variant="outline" className="gap-2">
                ← Métodos Gráficos
              </Button>
            </Link>
            
            <Link href="/simulaciones">
              <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <FlaskConical className="w-4 h-4" />
                Probar Simulación
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/teoria/momentos">
              <Button variant="outline" className="gap-2">
                Momentos de Fuerza →
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}