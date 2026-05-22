import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Calculator, FlaskConical, Lightbulb } from "lucide-react";
import Link from "next/link";
import { WikipediaCard } from "@/components/WikipediaCard";

export default function PalancasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Palancas - Teoría y Clasificación"
        description="Aprende sobre las palancas de 1°, 2° y 3° orden, ley de la palanca y ventaja mecánica."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Palancas</h1>
            <p className="text-lg text-muted-foreground">
              Máquina simple que permite multiplicar la fuerza aplicada mediante el uso de un punto de apoyo
            </p>
          </div>

          {/* Definición */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>¿Qué es una Palanca?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Una <strong>palanca</strong> es una máquina simple que consiste en una barra rígida que puede girar 
                libremente alrededor de un punto de apoyo llamado <strong>fulcro</strong>. Se utiliza para 
                multiplicar la fuerza mecánica aplicada a un objeto, incrementar su velocidad, o la distancia 
                recorrida en respuesta a la aplicación de una fuerza.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-mono font-semibold mb-2 text-primary">Elementos de una palanca:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Fulcro (F):</strong> Punto de apoyo sobre el cual gira la palanca</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Potencia (P):</strong> Fuerza que aplicamos</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Resistencia (R):</strong> Fuerza que vencemos (peso o carga)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Brazo de potencia (BP):</strong> Distancia del fulcro al punto de aplicación de P</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Brazo de resistencia (BR):</strong> Distancia del fulcro al punto de aplicación de R</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Ley de la Palanca */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ley de la Palanca</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-primary/5 border-primary/20">
                <AlertDescription>
                  <div className="text-center">
                    <p className="font-mono text-2xl font-bold text-primary mb-2">
                      P × BP = R × BR
                    </p>
                    <p className="text-sm text-muted-foreground">
                      El momento de la potencia es igual al momento de la resistencia
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <p className="leading-relaxed">
                  Para que una palanca esté en equilibrio, el producto de la potencia por su brazo debe 
                  ser igual al producto de la resistencia por su brazo.
                </p>
                
                <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2 text-accent">Ventaja Mecánica (VM):</h4>
                  <p className="text-sm mb-2">
                    Es la relación entre la resistencia vencida y la potencia aplicada:
                  </p>
                  <p className="font-mono text-lg font-bold text-center">
                    VM = R / P = BP / BR
                  </p>
                  <p className="text-sm mt-2 text-muted-foreground">
                    Si VM &gt; 1: ganamos fuerza (palanca de ventaja)<br/>
                    Si VM &lt; 1: ganamos velocidad o distancia
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clasificación de Palancas */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Clasificación de las Palancas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Las palancas se clasifican en tres géneros según la posición relativa del fulcro, 
                la potencia y la resistencia:
              </p>

              {/* Primer Género */}
              <div className="border-l-4 border-l-blue-500 pl-4 space-y-2">
                <h3 className="font-mono font-bold text-lg text-blue-600 dark:text-blue-400">
                  Palancas de Primer Género (Inter-apoyo)
                </h3>
                <p className="text-sm leading-relaxed">
                  El <strong>fulcro</strong> está situado entre la potencia y la resistencia.
                </p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <p className="font-mono mb-2">Disposición: P --- F --- R</p>
                  <p className="text-muted-foreground">
                    <strong>Ejemplos:</strong> Balancín, tijeras, alicates, balanza de brazos, remo, 
                    martillo sacando un clavo.
                  </p>
                  <p className="mt-2">
                    <strong>Ventaja:</strong> Pueden dar ganancia de fuerza o de velocidad según 
                    la relación BP/BR. Si BP &gt; BR: ganancia de fuerza.
                  </p>
                </div>
              </div>

              {/* Segundo Género */}
              <div className="border-l-4 border-l-green-500 pl-4 space-y-2">
                <h3 className="font-mono font-bold text-lg text-green-600 dark:text-green-400">
                  Palancas de Segundo Género (Inter-resistencia)
                </h3>
                <p className="text-sm leading-relaxed">
                  La <strong>resistencia</strong> está entre el fulcro y la potencia.
                </p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <p className="font-mono mb-2">Disposición: F --- R --- P</p>
                  <p className="text-muted-foreground">
                    <strong>Ejemplos:</strong> Carretilla, cascanueces, destapador de botellas, 
                    remo (desde otro punto de vista), abrelatas.
                  </p>
                  <p className="mt-2">
                    <strong>Ventaja:</strong> Siempre dan ganancia de fuerza (BP &gt; BR siempre). 
                    Son las más ventajosas para vencer grandes resistencias con poca potencia.
                  </p>
                </div>
              </div>

              {/* Tercer Género */}
              <div className="border-l-4 border-l-purple-500 pl-4 space-y-2">
                <h3 className="font-mono font-bold text-lg text-purple-600 dark:text-purple-400">
                  Palancas de Tercer Género (Inter-potencia)
                </h3>
                <p className="text-sm leading-relaxed">
                  La <strong>potencia</strong> está entre el fulcro y la resistencia.
                </p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <p className="font-mono mb-2">Disposición: F --- P --- R</p>
                  <p className="text-muted-foreground">
                    <strong>Ejemplos:</strong> Pinzas de cejas, caña de pescar, brazo humano 
                    (bíceps), pala, escoba, antebrazo levantando un peso.
                  </p>
                  <p className="mt-2">
                    <strong>Ventaja:</strong> Dan ganancia de velocidad y recorrido (BR &gt; BP). 
                    Sacrifican fuerza para ganar amplitud de movimiento. Comunes en el cuerpo humano.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aplicaciones */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Aplicaciones Prácticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">En la vida cotidiana:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Balanza de brazos (medir masa)</li>
                    <li>• Tijeras y alicates (cortar)</li>
                    <li>• Carretilla (transportar cargas)</li>
                    <li>• Destapadores (abrir botellas)</li>
                    <li>• Martillo (sacar clavos)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">En el cuerpo humano:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Cráneo sobre la columna (1° género)</li>
                    <li>• Pie al caminar (2° género)</li>
                    <li>• Antebrazo y bíceps (3° género)</li>
                    <li>• Mandíbula al masticar (3° género)</li>
                    <li>• Codo flexionando (3° género)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fórmulas Importantes */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Fórmulas Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background p-3 rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Equilibrio:</p>
                  <p className="font-mono font-bold text-lg">P × BP = R × BR</p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Ventaja Mecánica:</p>
                  <p className="font-mono font-bold text-lg">VM = R/P = BP/BR</p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Potencia necesaria:</p>
                  <p className="font-mono font-bold text-lg">P = (R × BR) / BP</p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Resistencia máxima:</p>
                  <p className="font-mono font-bold text-lg">R = (P × BP) / BR</p>
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
              <Link href="/simulaciones/palancas-3d">
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
            term="Palanca" 
            title="📚 Amplía tu conocimiento: Palancas y Ventaja Mecánica"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}