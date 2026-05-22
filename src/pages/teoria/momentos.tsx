import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCw, Calculator, FlaskConical, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Momentos3D } from "@/components/simulations/Momentos3D";
import { WikipediaCard } from "@/components/WikipediaCard";

export default function MomentosDeFuerza() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Momentos de Fuerza (Torque) - Sistema de Fuerzas"
        description="Aprende sobre momentos de fuerza, torque, regla de la mano derecha, cuplas y equilibrio rotacional."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary flex items-center gap-3">
              <RotateCw className="w-10 h-10" />
              Momentos de Fuerza (Torque)
            </h1>
            <p className="text-lg text-muted-foreground">
              Tendencia de una fuerza a producir rotación alrededor de un punto o eje
            </p>
          </div>

          {/* Definición */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Definición de Momento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                El <strong>momento de una fuerza</strong> (también llamado <strong>torque</strong>) respecto a un punto 
                es la medida de la tendencia de esa fuerza a producir una rotación del cuerpo alrededor de ese punto.
              </p>
              
              <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <div className="font-mono text-xl mb-2">
                  <strong>M = F × d</strong>
                </div>
                <div className="text-sm space-y-1 mt-3">
                  <div><strong>M</strong> = Momento de la fuerza</div>
                  <div><strong>F</strong> = Magnitud de la fuerza</div>
                  <div><strong>d</strong> = Distancia perpendicular desde el punto al vector fuerza (brazo de palanca)</div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Unidades:</strong> Newton·metro (N·m), kilogramo-fuerza·metro (kgf·m), dina·centímetro (dina·cm)
                </AlertDescription>
              </Alert>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-mono font-semibold mb-3">Características Importantes</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>El momento es una magnitud vectorial</li>
                  <li>Su dirección es perpendicular al plano formado por F y d</li>
                  <li>El signo indica el sentido de rotación</li>
                  <li>Si la línea de acción pasa por el punto, M = 0</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Brazo de Palanca */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Brazo de Palanca (d)</CardTitle>
              <CardDescription>Distancia perpendicular fundamental</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                El <strong>brazo de palanca</strong> es la distancia perpendicular desde el punto de referencia 
                hasta la línea de acción de la fuerza. <em>No</em> es la distancia del punto al punto de aplicación.
              </p>

              <div className="bg-accent/10 p-6 rounded-lg">
                <h4 className="font-mono font-semibold mb-3">Cálculo del Brazo de Palanca</h4>
                <p className="mb-3">Si la fuerza F forma un ángulo θ con la línea que une el punto con el punto de aplicación (distancia r):</p>
                <div className="bg-white p-4 rounded-lg font-mono text-lg">
                  <strong>d = r · sin(θ)</strong>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Por lo tanto: M = F · r · sin(θ)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2 text-sm">Caso: Fuerza Perpendicular</h4>
                  <p className="text-sm mb-2">Si θ = 90°, entonces sin(90°) = 1</p>
                  <div className="font-mono bg-white p-2 rounded text-sm">
                    M = F · r (máximo)
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2 text-sm">Caso: Fuerza Paralela</h4>
                  <p className="text-sm mb-2">Si θ = 0° o 180°, entonces sin(0°) = 0</p>
                  <div className="font-mono bg-white p-2 rounded text-sm">
                    M = 0 (sin efecto)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regla de la Mano Derecha */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Regla de la Mano Derecha</CardTitle>
              <CardDescription>Convención para determinar el sentido del momento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-mono font-semibold mb-3">Procedimiento</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Coloca los dedos de tu mano derecha en la dirección del vector <strong>r</strong> (del punto al punto de aplicación)</li>
                  <li>Curva los dedos hacia la dirección de la fuerza <strong>F</strong></li>
                  <li>Tu pulgar apunta en la dirección del vector momento <strong>M</strong></li>
                </ol>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Convención de signos (plano 2D):</strong> Momento positivo (+) produce rotación antihoraria. 
                  Momento negativo (-) produce rotación horaria.
                </AlertDescription>
              </Alert>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Alternativa simplificada:</strong> Si el momento tiende a girar el cuerpo en sentido antihorario 
                  (contrario a las agujas del reloj), es positivo. Si es horario, es negativo.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Suma de Momentos */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Suma de Momentos - Equilibrio Rotacional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Cuando varias fuerzas actúan sobre un cuerpo, el <strong>momento total</strong> es la suma algebraica 
                de los momentos individuales:
              </p>

              <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <div className="font-mono text-xl">
                  <strong>ΣM = M₁ + M₂ + M₃ + ... + Mₙ</strong>
                </div>
                <p className="text-sm mt-2 text-muted-foreground">
                  Respetando los signos (+ antihorario, - horario)
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                <h4 className="font-mono font-semibold mb-3">Condición de Equilibrio Rotacional</h4>
                <p className="mb-3">Un cuerpo está en equilibrio rotacional si:</p>
                <div className="font-mono text-xl">
                  <strong>ΣM = 0</strong>
                </div>
                <p className="text-sm mt-3">
                  La suma de todos los momentos respecto a cualquier punto debe ser cero.
                </p>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-mono font-semibold mb-3">Equilibrio Completo</h4>
                <p className="mb-3">Para que un cuerpo esté en equilibrio estático completo:</p>
                <div className="space-y-2 font-mono">
                  <div className="bg-white p-3 rounded">ΣFx = 0 <span className="text-muted-foreground text-sm">(equilibrio traslacional horizontal)</span></div>
                  <div className="bg-white p-3 rounded">ΣFy = 0 <span className="text-muted-foreground text-sm">(equilibrio traslacional vertical)</span></div>
                  <div className="bg-white p-3 rounded">ΣM = 0 <span className="text-muted-foreground text-sm">(equilibrio rotacional)</span></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cuplas o Pares */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cuplas o Pares de Fuerzas</CardTitle>
              <CardDescription>Sistema especial de dos fuerzas paralelas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Una <strong>cupla</strong> o <strong>par</strong> es un sistema formado por dos fuerzas paralelas de igual 
                magnitud pero sentidos opuestos, separadas por una distancia.
              </p>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-mono font-semibold mb-3">Características de una Cupla</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Las dos fuerzas tienen la misma magnitud: F₁ = F₂ = F</li>
                  <li>Son paralelas pero de sentidos opuestos</li>
                  <li>La resultante es cero (ΣF = 0), no produce traslación</li>
                  <li>El momento NO es cero, produce rotación pura</li>
                </ul>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                <h4 className="font-mono font-semibold mb-3">Momento de una Cupla</h4>
                <div className="font-mono text-xl mb-2">
                  <strong>M = F × d</strong>
                </div>
                <p className="text-sm">
                  Donde <strong>d</strong> es la distancia perpendicular entre las dos líneas de acción (brazo de la cupla).
                </p>
                <p className="text-sm mt-3 text-muted-foreground">
                  El momento de una cupla es independiente del punto de referencia elegido.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-mono font-semibold mb-2 text-sm">Ejemplo Común</h4>
                <p className="text-sm">
                  Girar el volante de un automóvil con ambas manos: aplicas dos fuerzas iguales en sentidos opuestos, 
                  creando una cupla que hace girar el volante sin desplazarlo.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ejemplo Resuelto */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ejemplo Resuelto</CardTitle>
              <CardDescription>Equilibrio de una viga con múltiples fuerzas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-4">
                  <strong>Problema:</strong> Una viga horizontal de 4 m de longitud tiene un apoyo en el extremo izquierdo (punto A). 
                  Se aplican las siguientes fuerzas:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>F₁ = 50 N hacia abajo, a 1 m del punto A</li>
                  <li>F₂ = 30 N hacia abajo, a 3 m del punto A</li>
                  <li>Calcular la reacción en el apoyo A</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 1: Equilibrio de fuerzas verticales</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-sm">
                    <div>ΣFy = 0</div>
                    <div className="mt-2">RA - F₁ - F₂ = 0</div>
                    <div className="mt-2">RA = 50 + 30 = <strong className="text-primary">80 N</strong> (hacia arriba)</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono font-semibold mb-2">Paso 2: Verificación con momentos (respecto a A)</h4>
                  <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>ΣMA = 0</div>
                    <div>-F₁·(1) - F₂·(3) + RA·(0) = 0</div>
                    <div>-50·1 - 30·3 = 0</div>
                    <div>-50 - 90 = <strong>-140 N·m</strong></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    El momento negativo indica que las fuerzas tienden a rotar la viga en sentido horario. 
                    La reacción en A contrarresta esto.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aplicaciones */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Aplicaciones Prácticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Palancas</h4>
                  <p className="text-sm">
                    La ley de la palanca se basa en el equilibrio de momentos: F₁·d₁ = F₂·d₂. 
                    Una fuerza pequeña con brazo largo puede equilibrar una fuerza grande con brazo corto.
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Llaves y Destornilladores</h4>
                  <p className="text-sm">
                    El mango largo aumenta el brazo de palanca, permitiendo generar mayor momento con menos fuerza.
                  </p>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold mb-2">Estructuras y Vigas</h4>
                  <p className="text-sm">
                    El análisis de momentos es fundamental para calcular reacciones en apoyos y diseñar estructuras seguras.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulación 3D */}
          <Momentos3D />
        </div>

        {/* Información de Wikipedia */}
        <div className="mt-12">
          <WikipediaCard 
            term="Momento de fuerza" 
            title="📚 Amplía tu conocimiento: Momento de Fuerza (Torque)"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}