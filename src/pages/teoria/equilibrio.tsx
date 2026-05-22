import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Scale, CheckCircle2, Calculator, FlaskConical, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Equilibrio3D } from "@/components/simulations/Equilibrio3D";
import { WikipediaCard } from "@/components/WikipediaCard";

export default function Equilibrio() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Condiciones de Equilibrio - Sistema de Fuerzas"
        description="Aprende sobre equilibrio estático, condiciones de equilibrio, diagrama de cuerpo libre y análisis de estructuras."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary flex items-center gap-3">
              <Scale className="w-10 h-10" />
              Condiciones de Equilibrio
            </h1>
            <p className="text-lg text-muted-foreground">
              Principios fundamentales del equilibrio estático y aplicaciones en estructuras
            </p>
          </div>

          {/* Definición de Equilibrio */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Equilibrio Estático
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Un cuerpo está en <strong>equilibrio estático</strong> cuando permanece en reposo o en movimiento 
                rectilíneo uniforme. Para que esto ocurra, deben cumplirse dos condiciones fundamentales:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-mono font-semibold mb-3 text-lg">Primera Condición</h3>
                  <p className="text-sm mb-3">La suma vectorial de todas las fuerzas debe ser cero:</p>
                  <div className="font-mono text-xl">
                    <strong>ΣF = 0</strong>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Equilibrio traslacional)
                  </p>
                </div>

                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-mono font-semibold mb-3 text-lg">Segunda Condición</h3>
                  <p className="text-sm mb-3">La suma de todos los momentos debe ser cero:</p>
                  <div className="font-mono text-xl">
                    <strong>ΣM = 0</strong>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Equilibrio rotacional)
                  </p>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Importante:</strong> Ambas condiciones deben cumplirse simultáneamente para que exista equilibrio completo.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Componentes del Equilibrio */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ecuaciones de Equilibrio en el Plano</CardTitle>
              <CardDescription>Sistema bidimensional (2D)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                En problemas bidimensionales, las dos condiciones de equilibrio se expresan mediante tres ecuaciones:
              </p>

              <div className="bg-primary/5 p-6 rounded-lg space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">1. Equilibrio de fuerzas horizontales</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-lg">
                    <strong>ΣFx = 0</strong>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    La suma de las componentes horizontales de todas las fuerzas es cero
                  </p>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">2. Equilibrio de fuerzas verticales</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-lg">
                    <strong>ΣFy = 0</strong>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    La suma de las componentes verticales de todas las fuerzas es cero
                  </p>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">3. Equilibrio de momentos</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-lg">
                    <strong>ΣM = 0</strong>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    La suma de todos los momentos respecto a cualquier punto es cero
                  </p>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  Estas tres ecuaciones permiten resolver problemas con hasta <strong>tres incógnitas</strong> 
                  (por ejemplo: dos reacciones en apoyos y una fuerza desconocida).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Diagrama de Cuerpo Libre */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Diagrama de Cuerpo Libre (DCL)</CardTitle>
              <CardDescription>Herramienta fundamental para el análisis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                El <strong>Diagrama de Cuerpo Libre</strong> es una representación esquemática donde se muestra 
                el cuerpo aislado con todas las fuerzas que actúan sobre él.
              </p>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-mono font-semibold mb-3 text-lg">Pasos para construir un DCL</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Aislar el cuerpo del sistema, eliminando conexiones y apoyos</li>
                  <li>Dibujar el contorno simplificado del cuerpo</li>
                  <li>Representar todas las fuerzas externas que actúan sobre el cuerpo</li>
                  <li>Incluir las reacciones en los apoyos y conexiones</li>
                  <li>Indicar ángulos y distancias relevantes</li>
                  <li>Establecer un sistema de coordenadas</li>
                </ol>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-mono font-semibold mb-3">Fuerzas a Incluir</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Peso:</strong> Actúa en el centro de gravedad, siempre hacia abajo</li>
                  <li><strong>Reacciones en apoyos:</strong> Dependen del tipo de apoyo</li>
                  <li><strong>Fuerzas aplicadas:</strong> Cargas externas conocidas</li>
                  <li><strong>Tensiones:</strong> En cuerdas y cables</li>
                  <li><strong>Fricción:</strong> Si hay superficies en contacto</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tipos de Apoyo */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tipos de Apoyo y sus Reacciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white border-2 border-primary/20 p-5 rounded-lg">
                  <h4 className="font-mono font-semibold mb-3 text-primary">1. Apoyo Simple o de Rodillo</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Permite rotación y desplazamiento paralelo a la superficie</li>
                    <li>• Restringe el desplazamiento perpendicular</li>
                    <li>• <strong>Reacción:</strong> Una fuerza perpendicular a la superficie (1 incógnita)</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-primary/20 p-5 rounded-lg">
                  <h4 className="font-mono font-semibold mb-3 text-primary">2. Apoyo de Pasador o Articulación</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Permite rotación pero no desplazamiento</li>
                    <li>• Restringe el movimiento en todas las direcciones</li>
                    <li>• <strong>Reacciones:</strong> Dos componentes de fuerza (Rx y Ry) (2 incógnitas)</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-primary/20 p-5 rounded-lg">
                  <h4 className="font-mono font-semibold mb-3 text-primary">3. Empotramiento o Apoyo Fijo</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• No permite rotación ni desplazamiento</li>
                    <li>• Restringe completamente el movimiento</li>
                    <li>• <strong>Reacciones:</strong> Dos fuerzas (Rx y Ry) y un momento (M) (3 incógnitas)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estrategia de Resolución */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Estrategia General de Resolución</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                <h4 className="font-mono font-semibold mb-4 text-lg">Procedimiento paso a paso</h4>
                <ol className="list-decimal list-inside space-y-3">
                  <li className="pl-2">
                    <strong>Identificar el sistema y las incógnitas</strong>
                    <p className="text-sm text-muted-foreground ml-6">¿Qué fuerzas o reacciones necesito calcular?</p>
                  </li>
                  <li className="pl-2">
                    <strong>Dibujar el Diagrama de Cuerpo Libre</strong>
                    <p className="text-sm text-muted-foreground ml-6">Mostrar todas las fuerzas, incluyendo reacciones</p>
                  </li>
                  <li className="pl-2">
                    <strong>Establecer un sistema de coordenadas</strong>
                    <p className="text-sm text-muted-foreground ml-6">Definir ejes X e Y convenientes</p>
                  </li>
                  <li className="pl-2">
                    <strong>Aplicar ΣFx = 0</strong>
                    <p className="text-sm text-muted-foreground ml-6">Sumar componentes horizontales</p>
                  </li>
                  <li className="pl-2">
                    <strong>Aplicar ΣFy = 0</strong>
                    <p className="text-sm text-muted-foreground ml-6">Sumar componentes verticales</p>
                  </li>
                  <li className="pl-2">
                    <strong>Aplicar ΣM = 0</strong>
                    <p className="text-sm text-muted-foreground ml-6">Elegir un punto conveniente para sumar momentos</p>
                  </li>
                  <li className="pl-2">
                    <strong>Resolver el sistema de ecuaciones</strong>
                    <p className="text-sm text-muted-foreground ml-6">Despejar las incógnitas</p>
                  </li>
                  <li className="pl-2">
                    <strong>Verificar la solución</strong>
                    <p className="text-sm text-muted-foreground ml-6">Comprobar con otra ecuación o punto de referencia</p>
                  </li>
                </ol>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Consejo:</strong> Al calcular momentos, elegir el punto de referencia donde pasan más fuerzas 
                  desconocidas simplifica las ecuaciones (esas fuerzas tienen momento cero).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Ejemplo Completo */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ejemplo Completo Resuelto</CardTitle>
              <CardDescription>Viga simplemente apoyada con dos cargas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-4"><strong>Problema:</strong></p>
                <p className="mb-3">Una viga horizontal de 6 m está apoyada en A (x=0) y B (x=6m). Se aplican:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>F₁ = 200 N hacia abajo en x = 2m</li>
                  <li>F₂ = 300 N hacia abajo en x = 4m</li>
                  <li>Calcular las reacciones RA y RB</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 1: DCL e Incógnitas</h4>
                  <div className="bg-white p-4 rounded-lg text-sm">
                    <p>Incógnitas: RA (vertical en A), RB (vertical en B)</p>
                    <p className="mt-2">Fuerzas conocidas: F₁ = 200 N ↓, F₂ = 300 N ↓</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 2: Aplicar ΣFy = 0</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>RA + RB - 200 - 300 = 0</div>
                    <div><strong>RA + RB = 500 N</strong> ... (ecuación 1)</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 3: Aplicar ΣMA = 0 (momentos respecto a A)</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>-200(2) - 300(4) + RB(6) = 0</div>
                    <div>-400 - 1200 + 6RB = 0</div>
                    <div>6RB = 1600</div>
                    <div><strong>RB = 266.67 N</strong></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 4: Calcular RA</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>De la ecuación 1: RA = 500 - 266.67</div>
                    <div><strong>RA = 233.33 N</strong></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 5: Verificación (ΣMB = 0)</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>RA(6) - 200(4) - 300(2) = 0</div>
                    <div>233.33(6) - 800 - 600 = 1400 - 1400 = 0 ✓</div>
                  </div>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                  <div className="flex items-center gap-2">
                    <strong className="font-mono text-lg">Respuesta: RA = 233.33 N ↑, RB = 266.67 N ↑</strong>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Casos Especiales */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Casos Especiales y Observaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Sistemas Estáticamente Determinados</h4>
                  <p className="text-sm">
                    Tienen exactamente tantas ecuaciones como incógnitas (generalmente 3 ecuaciones → 3 incógnitas). 
                    Se pueden resolver completamente con las ecuaciones de equilibrio.
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Sistemas Estáticamente Indeterminados</h4>
                  <p className="text-sm">
                    Tienen más incógnitas que ecuaciones disponibles. Requieren consideraciones adicionales sobre 
                    deformaciones y propiedades de materiales.
                  </p>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Carga Distribuida</h4>
                  <p className="text-sm">
                    Una carga uniformemente distribuida puede reemplazarse por su resultante actuando en el centroide 
                    de la distribución (generalmente el centro).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulación 3D */}
          <Equilibrio3D />
        </div>

        {/* Información de Wikipedia */}
        <div className="mt-12">
          <WikipediaCard 
            term="Equilibrio mecánico" 
            title="📚 Amplía tu conocimiento: Equilibrio Mecánico"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}