import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ArrowLeft, Book } from "lucide-react";
import Image from "next/image";

export default function PoleasSimulacion() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación: Sistemas de Poleas - Algo de Fisica lab 1"
        description="Diagramas completos de sistemas de poleas: fija, móvil, aparejo potencial y factorial. Visualiza ventaja mecánica."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/simulaciones">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Simulaciones
                </Button>
              </Link>
              <Link href="/teoria/poleas">
                <Button variant="outline" size="sm">
                  <Book className="w-4 h-4 mr-2" />
                  Ver Teoría
                </Button>
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
              Sistemas de Poleas
            </h1>
            <p className="text-muted-foreground text-lg">
              Diagramas de sistemas de poleas mostrando polea fija, móvil y aparejos potencial y factorial.
            </p>
          </div>

          {/* Tipos de Poleas */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Tipos de Poleas: Fija y Móvil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border-2 border-border mb-6">
                <Image 
                  src="/poleas-tipos.png"
                  alt="Tipos de poleas: fija y móvil"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                  <AlertDescription>
                    <h4 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-400">
                      Polea Fija
                    </h4>
                    <p className="text-sm mb-3 leading-relaxed">
                      La polea está <strong>fija a un soporte</strong> y no se mueve. Solo cambia la dirección de la fuerza aplicada.
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="font-mono font-bold">Fm = R</p>
                      <p className="font-mono">VM = 1</p>
                      <p className="text-muted-foreground">No reduce el esfuerzo, solo redirige la fuerza</p>
                    </div>
                  </AlertDescription>
                </Alert>

                <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                  <AlertDescription>
                    <h4 className="font-bold text-lg mb-2 text-green-700 dark:text-green-400">
                      Polea Móvil
                    </h4>
                    <p className="text-sm mb-3 leading-relaxed">
                      La polea se <strong>mueve junto con la carga</strong>. El peso se distribuye entre 2 ramales de cuerda.
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="font-mono font-bold">Fm = R/2</p>
                      <p className="font-mono">VM = 2</p>
                      <p className="text-muted-foreground">Reduce el esfuerzo a la mitad</p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Aparejo Potencial */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                Aparejo Potencial (Exponencial)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border-2 border-border mb-6">
                <Image 
                  src="/poleas-aparejo-potencial.png"
                  alt="Aparejo potencial - poleas en cadena vertical"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>

              <Alert className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
                <AlertDescription>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-400">
                        Configuración en Cadena Vertical
                      </h4>
                      <p className="text-sm mb-3 leading-relaxed">
                        Las poleas móviles están <strong>dispuestas en cadena vertical</strong> (una colgando de la otra). 
                        La ventaja mecánica crece exponencialmente.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded border border-purple-300 dark:border-purple-700">
                      <p className="font-mono text-xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                        Fm = R / 2ⁿ
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        donde <strong>n</strong> = número de poleas móviles
                      </p>
                      <p className="font-mono text-sm">
                        <strong>Ventaja Mecánica:</strong> VM = 2ⁿ
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">Ejemplos:</p>
                        <ul className="space-y-1 ml-4 text-muted-foreground">
                          <li>• <strong>n = 1:</strong> VM = 2¹ = 2 → Fm = R/2</li>
                          <li>• <strong>n = 2:</strong> VM = 2² = 4 → Fm = R/4</li>
                          <li>• <strong>n = 3:</strong> VM = 2³ = 8 → Fm = R/8</li>
                          <li>• <strong>n = 4:</strong> VM = 2⁴ = 16 → Fm = R/16</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Ventajas:</p>
                        <ul className="space-y-1 ml-4 text-muted-foreground">
                          <li>✓ Máxima ventaja mecánica</li>
                          <li>✓ Ideal para cargas muy pesadas</li>
                          <li>✓ Diseño compacto vertical</li>
                          <li>✓ Mayor eficiencia con 3+ poleas</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Aparejo Factorial */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                Aparejo Factorial (Lineal)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border-2 border-border mb-6">
                <Image 
                  src="/poleas-aparejo-factorial.png"
                  alt="Aparejo factorial - poleas en barra horizontal"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>

              <Alert className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800">
                <AlertDescription>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-orange-700 dark:text-orange-400">
                        Configuración en Barra Horizontal
                      </h4>
                      <p className="text-sm mb-3 leading-relaxed">
                        Las poleas móviles están <strong>todas sujetas a la misma barra horizontal</strong>. 
                        La ventaja mecánica crece linealmente.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded border border-orange-300 dark:border-orange-700">
                      <p className="font-mono text-xl font-bold text-orange-700 dark:text-orange-300 mb-2">
                        Fm = R / (2 · n)
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        donde <strong>n</strong> = número de poleas móviles
                      </p>
                      <p className="font-mono text-sm">
                        <strong>Ventaja Mecánica:</strong> VM = 2 · n
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">Ejemplos:</p>
                        <ul className="space-y-1 ml-4 text-muted-foreground">
                          <li>• <strong>n = 1:</strong> VM = 2·1 = 2 → Fm = R/2</li>
                          <li>• <strong>n = 2:</strong> VM = 2·2 = 4 → Fm = R/4</li>
                          <li>• <strong>n = 3:</strong> VM = 2·3 = 6 → Fm = R/6</li>
                          <li>• <strong>n = 4:</strong> VM = 2·4 = 8 → Fm = R/8</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Ventajas:</p>
                        <ul className="space-y-1 ml-4 text-muted-foreground">
                          <li>✓ Diseño más simple</li>
                          <li>✓ Fácil mantenimiento</li>
                          <li>✓ Uso común en talleres</li>
                          <li>✓ Distribución horizontal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Comparación */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Comparación de Eficiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border bg-muted/50">
                      <th className="text-left p-3 font-mono">Poleas Móviles</th>
                      <th className="text-center p-3 font-mono">Potencial (2ⁿ)</th>
                      <th className="text-center p-3 font-mono">Factorial (2·n)</th>
                      <th className="text-center p-3 font-mono">Más Eficiente</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-3 font-mono">n = 1</td>
                      <td className="p-3 text-center font-mono">VM = 2</td>
                      <td className="p-3 text-center font-mono">VM = 2</td>
                      <td className="p-3 text-center text-muted-foreground">Empate</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono">n = 2</td>
                      <td className="p-3 text-center font-mono">VM = 4</td>
                      <td className="p-3 text-center font-mono">VM = 4</td>
                      <td className="p-3 text-center text-muted-foreground">Empate</td>
                    </tr>
                    <tr className="bg-purple-50 dark:bg-purple-950/30">
                      <td className="p-3 font-mono">n = 3</td>
                      <td className="p-3 text-center font-mono font-bold text-purple-600 dark:text-purple-400">VM = 8</td>
                      <td className="p-3 text-center font-mono text-orange-600 dark:text-orange-400">VM = 6</td>
                      <td className="p-3 text-center font-bold text-purple-600 dark:text-purple-400">Potencial ✓</td>
                    </tr>
                    <tr className="bg-purple-50 dark:bg-purple-950/30">
                      <td className="p-3 font-mono">n = 4</td>
                      <td className="p-3 text-center font-mono font-bold text-purple-600 dark:text-purple-400">VM = 16</td>
                      <td className="p-3 text-center font-mono text-orange-600 dark:text-orange-400">VM = 8</td>
                      <td className="p-3 text-center font-bold text-purple-600 dark:text-purple-400">Potencial ✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm">
                  <strong>Conclusión:</strong> El aparejo <strong>potencial es más eficiente</strong> cuando se usan 
                  3 o más poleas móviles, ya que su ventaja mecánica crece exponencialmente (2ⁿ) en lugar de linealmente (2·n).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Aplicaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Aplicaciones Industriales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">Aparejo Potencial:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>Grúas de gran altura:</strong> Construcción de edificios altos</li>
                    <li>• <strong>Elevadores industriales:</strong> Fábricas y almacenes</li>
                    <li>• <strong>Montacargas pesados:</strong> Puertos y muelles</li>
                    <li>• <strong>Equipos mineros:</strong> Extracción de materiales</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400">Aparejo Factorial:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>Talleres mecánicos:</strong> Levantamiento de motores</li>
                    <li>• <strong>Aparejos navales:</strong> Carga y descarga de barcos</li>
                    <li>• <strong>Construcción:</strong> Movimiento de materiales</li>
                    <li>• <strong>Mantenimiento:</strong> Reparaciones industriales</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}