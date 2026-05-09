import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Calculator, FlaskConical, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function PoleasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Poleas y Aparejos - Teoría Completa"
        description="Aprende sobre poleas fijas, móviles, aparejos y sistemas de poleas compuestos."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Poleas y Aparejos</h1>
            <p className="text-lg text-muted-foreground">
              Máquinas simples que modifican la dirección y magnitud de las fuerzas mediante cuerdas y ruedas
            </p>
          </div>

          {/* Definición */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>¿Qué es una Polea?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Una <strong>polea</strong> es una rueda acanalada que gira alrededor de un eje y por cuyo canal 
                pasa una cuerda o cable. Se utiliza para transmitir fuerzas, cambiar la dirección de una fuerza, 
                o crear ventaja mecánica para levantar cargas pesadas con menos esfuerzo.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-mono font-semibold mb-2 text-primary">Elementos de una polea:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Roldana:</strong> Rueda acanalada que gira</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Eje:</strong> Soporte central de la rueda</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Cuerda/Cable:</strong> Elemento que transmite la fuerza</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Carga (R):</strong> Peso que se desea levantar o mover</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Esfuerzo (F):</strong> Fuerza que aplicamos</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Polea Fija */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Polea Fija (Simple)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                La polea está <strong>fija</strong> a un soporte y no se desplaza. Solo cambia la dirección 
                de la fuerza aplicada, pero no proporciona ventaja mecánica.
              </p>

              <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-mono text-lg font-bold text-blue-700 dark:text-blue-400">
                      F = R
                    </p>
                    <p className="text-sm text-muted-foreground">
                      La fuerza aplicada es igual al peso de la carga
                    </p>
                    <p className="text-sm">
                      <strong>Ventaja Mecánica:</strong> VM = 1 (no hay ganancia de fuerza)
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <p><strong>Ventaja:</strong> Permite tirar hacia abajo para levantar un peso (más cómodo)</p>
                <p><strong>Ejemplos:</strong> Izar una bandera, pozos de agua, persianas, cuerdas de tender</p>
                <p className="text-muted-foreground italic">
                  Se usa cuando NO necesitamos reducir el esfuerzo, solo cambiar la dirección de la fuerza.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Polea Móvil */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Polea Móvil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                La polea se desplaza junto con la carga. Un extremo de la cuerda está fijo y el otro se tira. 
                La carga cuelga del eje de la polea.
              </p>

              <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-mono text-lg font-bold text-green-700 dark:text-green-400">
                      F = R / 2
                    </p>
                    <p className="text-sm text-muted-foreground">
                      La fuerza necesaria es la mitad del peso de la carga
                    </p>
                    <p className="text-sm">
                      <strong>Ventaja Mecánica:</strong> VM = 2 (reducción del esfuerzo a la mitad)
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <p><strong>Ventaja:</strong> Se necesita la mitad de fuerza para levantar la carga</p>
                <p><strong>Desventaja:</strong> Hay que tirar el doble de cuerda (se pierde distancia)</p>
                <p><strong>Ejemplos:</strong> Grúas, montacargas, sistemas de elevación en construcción</p>
                <p className="text-muted-foreground italic">
                  Ideal para levantar cargas muy pesadas aplicando menos fuerza.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Polipasto/Aparejo */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                Polipasto o Aparejo (Sistema de Poleas)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Es una <strong>combinación de poleas fijas y móviles</strong> que trabajan en conjunto para 
                multiplicar aún más la ventaja mecánica. Existen dos tipos principales de aparejos según su configuración.
              </p>

              <div className="space-y-4">
                {/* Aparejo Potencial */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">
                    1. Aparejo Potencial (Exponencial)
                  </h4>
                  <p className="text-sm mb-3 leading-relaxed">
                    En este sistema, <strong>cada polea móvil se apoya en la anterior</strong>, formando una cadena vertical.
                    La ventaja mecánica crece exponencialmente.
                  </p>
                  
                  <Alert className="bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700">
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-mono text-xl font-bold text-blue-700 dark:text-blue-300">
                          Fm = R / 2ⁿ
                        </p>
                        <p className="text-sm text-muted-foreground">
                          donde <strong>n</strong> = número de poleas móviles
                        </p>
                        <p className="text-sm">
                          <strong>Ventaja Mecánica:</strong> VM = 2ⁿ
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div className="mt-3 space-y-2 text-sm">
                    <p className="font-semibold">Ejemplos:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>n = 1:</strong> VM = 2¹ = 2 → Fm = R/2</li>
                      <li>• <strong>n = 2:</strong> VM = 2² = 4 → Fm = R/4</li>
                      <li>• <strong>n = 3:</strong> VM = 2³ = 8 → Fm = R/8</li>
                      <li>• <strong>n = 4:</strong> VM = 2⁴ = 16 → Fm = R/16</li>
                    </ul>
                  </div>
                </div>

                {/* Aparejo Factorial */}
                <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">
                    2. Aparejo Factorial (Lineal)
                  </h4>
                  <p className="text-sm mb-3 leading-relaxed">
                    Aquí las poleas móviles están <strong>todas sujetas a la misma barra horizontal</strong>.
                    La ventaja mecánica crece linealmente.
                  </p>
                  
                  <Alert className="bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700">
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-mono text-xl font-bold text-green-700 dark:text-green-300">
                          Fm = R / (2 · n)
                        </p>
                        <p className="text-sm text-muted-foreground">
                          donde <strong>n</strong> = número de poleas móviles
                        </p>
                        <p className="text-sm">
                          <strong>Ventaja Mecánica:</strong> VM = 2 · n
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div className="mt-3 space-y-2 text-sm">
                    <p className="font-semibold">Ejemplos:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>n = 1:</strong> VM = 2·1 = 2 → Fm = R/2</li>
                      <li>• <strong>n = 2:</strong> VM = 2·2 = 4 → Fm = R/4</li>
                      <li>• <strong>n = 3:</strong> VM = 2·3 = 6 → Fm = R/6</li>
                      <li>• <strong>n = 4:</strong> VM = 2·4 = 8 → Fm = R/8</li>
                    </ul>
                  </div>
                </div>

                {/* Comparación */}
                <div className="bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h4 className="font-bold mb-3 text-purple-700 dark:text-purple-400">
                    Comparación de Eficiencia
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-purple-300 dark:border-purple-700">
                          <th className="text-left p-2 font-mono">Poleas</th>
                          <th className="text-center p-2 font-mono">Potencial (2ⁿ)</th>
                          <th className="text-center p-2 font-mono">Factorial (2·n)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-200 dark:divide-purple-800">
                        <tr>
                          <td className="p-2 font-mono">n = 1</td>
                          <td className="p-2 text-center font-mono">VM = 2</td>
                          <td className="p-2 text-center font-mono">VM = 2</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono">n = 2</td>
                          <td className="p-2 text-center font-mono text-blue-600 dark:text-blue-400">VM = 4</td>
                          <td className="p-2 text-center font-mono">VM = 4</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono">n = 3</td>
                          <td className="p-2 text-center font-mono font-bold text-blue-600 dark:text-blue-400">VM = 8 ✓</td>
                          <td className="p-2 text-center font-mono text-green-600 dark:text-green-400">VM = 6</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono">n = 4</td>
                          <td className="p-2 text-center font-mono font-bold text-blue-600 dark:text-blue-400">VM = 16 ✓</td>
                          <td className="p-2 text-center font-mono text-green-600 dark:text-green-400">VM = 8</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs mt-3 text-muted-foreground">
                    El aparejo <strong>potencial es más eficiente</strong> con 3 o más poleas móviles (VM crece exponencialmente)
                  </p>
                </div>

                <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg text-sm">
                  <p><strong>Regla práctica:</strong></p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>• Para <strong>1-2 poleas móviles:</strong> Ambos sistemas son equivalentes</li>
                    <li>• Para <strong>3+ poleas móviles:</strong> El aparejo potencial ofrece mayor VM</li>
                    <li>• <strong>Desventaja:</strong> Mayor VM = más longitud de cuerda a tirar</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                  <p><strong>Aplicaciones industriales:</strong></p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>Potencial:</strong> Grúas de gran altura, elevadores industriales</li>
                    <li>• <strong>Factorial:</strong> Talleres mecánicos, aparejos navales, montacargas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ley de la Polea */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Principio de Funcionamiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Las poleas funcionan según el <strong>principio de conservación de la energía</strong>:
              </p>
              
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <p className="font-mono text-center text-lg mb-2">
                  Trabajo realizado = Trabajo obtenido
                </p>
                <p className="font-mono text-center text-xl font-bold text-primary">
                  F × d_F = R × d_R
                </p>
                <p className="text-sm text-center mt-2 text-muted-foreground">
                  Lo que ganamos en fuerza, lo perdemos en distancia
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded border border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">✓ Ganamos:</p>
                  <p className="text-muted-foreground">Reducción de la fuerza necesaria (VM &gt; 1)</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded border border-amber-200 dark:border-amber-800">
                  <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">⚠ Perdemos:</p>
                  <p className="text-muted-foreground">Mayor distancia de cuerda a tirar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparación */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tabla Comparativa Completa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left p-2 font-mono">Tipo</th>
                      <th className="text-center p-2 font-mono">Fórmula</th>
                      <th className="text-center p-2 font-mono">VM</th>
                      <th className="text-left p-2 font-mono">Uso Principal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Polea Fija</td>
                      <td className="p-2 text-center font-mono">Fm = R</td>
                      <td className="p-2 text-center font-mono">1</td>
                      <td className="p-2 text-muted-foreground">Cambiar dirección</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-green-600 dark:text-green-400">Polea Móvil</td>
                      <td className="p-2 text-center font-mono">Fm = R/2</td>
                      <td className="p-2 text-center font-mono">2</td>
                      <td className="p-2 text-muted-foreground">Reducir esfuerzo</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-purple-600 dark:text-purple-400">Aparejo Potencial</td>
                      <td className="p-2 text-center font-mono">Fm = R/2ⁿ</td>
                      <td className="p-2 text-center font-mono">2ⁿ</td>
                      <td className="p-2 text-muted-foreground">Grandes cargas (exponencial)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-orange-600 dark:text-orange-400">Aparejo Factorial</td>
                      <td className="p-2 text-center font-mono">Fm = R/(2·n)</td>
                      <td className="p-2 text-center font-mono">2·n</td>
                      <td className="p-2 text-muted-foreground">Cargas medias (lineal)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground italic">
                <p>n = número de poleas móviles en el sistema</p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/teoria">
              <Button variant="outline">← Volver a Teoría</Button>
            </Link>
            <div className="flex gap-3">
              <Link href="/simulaciones/poleas-3d">
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
      </main>

      <Footer />
    </div>
  );
}