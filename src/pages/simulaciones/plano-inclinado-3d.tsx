import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Book, Calculator, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PlanoInclinado3DPage() {
  const [weight, setWeight] = useState(100);
  const [angle, setAngle] = useState(30);
  const [friction, setFriction] = useState(0.2);
  const [useFriction, setUseFriction] = useState(true);

  const calculateInclinedPlane = () => {
    const angleRad = (angle * Math.PI) / 180;
    const wx = weight * Math.sin(angleRad);
    const wy = weight * Math.cos(angleRad);
    const normal = wy;
    const fr = useFriction ? friction * normal : 0;
    const totalForce = wx + fr;
    const vm = 1 / Math.sin(angleRad);

    return {
      wx: wx.toFixed(2),
      wy: wy.toFixed(2),
      normal: normal.toFixed(2),
      friction: fr.toFixed(2),
      totalForce: totalForce.toFixed(2),
      vm: vm.toFixed(2),
      sinAngle: Math.sin(angleRad).toFixed(3),
      cosAngle: Math.cos(angleRad).toFixed(3),
    };
  };

  const results = calculateInclinedPlane();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación: Plano Inclinado - Algo de Fisica lab 1"
        description="Diagrama completo del plano inclinado. Analiza descomposición de fuerzas, componentes y fricción."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/simulaciones">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Simulaciones
                </Button>
              </Link>
              <Link href="/teoria/plano-inclinado">
                <Button variant="outline" size="sm">
                  <Book className="w-4 h-4 mr-2" />
                  Ver Teoría
                </Button>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
              Plano Inclinado
            </h1>
            <p className="text-muted-foreground text-lg">
              Diagrama de descomposición de fuerzas en superficies inclinadas
            </p>
          </div>

          {/* Interactive Calculator */}
          <Card className="mb-8 border-2 border-accent/30 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accent" />
                Calculadora Interactiva de Plano Inclinado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="weight-pi" className="text-sm font-semibold">
                      Peso del Objeto (W) - Newtons
                    </Label>
                    <Input
                      id="weight-pi"
                      type="number"
                      min="1"
                      max="1000"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="angle-pi" className="text-sm font-semibold">
                      Ángulo de Inclinación (θ) - Grados
                    </Label>
                    <Input
                      id="angle-pi"
                      type="number"
                      min="1"
                      max="89"
                      value={angle}
                      onChange={(e) => setAngle(Number(e.target.value))}
                      className="mt-1.5"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      sin({angle}°) = {results.sinAngle} · cos({angle}°) = {results.cosAngle}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        id="use-friction"
                        checked={useFriction}
                        onChange={(e) => setUseFriction(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="use-friction" className="text-sm font-semibold cursor-pointer">
                        Incluir Fricción
                      </Label>
                    </div>
                    {useFriction && (
                      <>
                        <Label htmlFor="friction-pi" className="text-sm font-semibold">
                          Coeficiente de Fricción (μ)
                        </Label>
                        <Input
                          id="friction-pi"
                          type="number"
                          min="0"
                          max="1"
                          step="0.01"
                          value={friction}
                          onChange={(e) => setFriction(Number(e.target.value))}
                          className="mt-1.5"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          0 = sin fricción · 0.3 = madera · 0.8 = alto
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm mb-3">Resultados:</h4>
                  
                  <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Componente Paralela</p>
                        <p className="text-xl font-mono font-bold text-red-600 dark:text-red-400">
                          Wx = {results.wx} N
                        </p>
                        <p className="text-xs font-mono text-red-600 dark:text-red-400">
                          W × sin({angle}°) = {weight} × {results.sinAngle}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Componente Perpendicular</p>
                        <p className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                          Wy = {results.wy} N
                        </p>
                        <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
                          W × cos({angle}°) = {weight} × {results.cosAngle}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800">
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Fuerza Normal</p>
                        <p className="text-xl font-mono font-bold text-cyan-600 dark:text-cyan-400">
                          N = {results.normal} N
                        </p>
                        <p className="text-xs text-cyan-600 dark:text-cyan-400">
                          (N = Wy)
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>

                  {useFriction && (
                    <Alert className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800">
                      <AlertDescription>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Fuerza de Fricción</p>
                          <p className="text-xl font-mono font-bold text-orange-600 dark:text-orange-400">
                            Fr = {results.friction} N
                          </p>
                          <p className="text-xs font-mono text-orange-600 dark:text-orange-400">
                            μ × N = {friction} × {results.normal}
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Fuerza Total para Subir</p>
                        <p className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
                          F = {results.totalForce} N
                        </p>
                        <p className="text-xs font-mono text-green-600 dark:text-green-400">
                          Wx {useFriction ? `+ Fr = ${results.wx} + ${results.friction}` : '(sin fricción)'}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Ventaja Mecánica</p>
                        <p className="text-xl font-mono font-bold text-purple-600 dark:text-purple-400">
                          VM = {results.vm}
                        </p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          (sin fricción: 1/sin(θ))
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-semibold mb-2">Interpretación:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Se necesitan <strong className="text-foreground">{results.totalForce}N</strong> para subir el objeto por el plano</li>
                  <li>• Esto es {((parseFloat(results.totalForce) / weight * 100)).toFixed(1)}% del peso total ({weight}N)</li>
                  {useFriction && (
                    <li>• La fricción añade {results.friction}N de resistencia adicional</li>
                  )}
                  <li>• A menor ángulo, menor fuerza necesaria (mayor VM)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-red-600 dark:text-red-400">
                  Componente Paralela (Wx)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2 font-mono">
                  Wx = W × sin(θ)
                </p>
                <p className="text-xs text-muted-foreground">
                  Fuerza que tiende a hacer deslizar el objeto hacia abajo por el plano
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  Componente Normal (Wy)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2 font-mono">
                  Wy = W × cos(θ)
                </p>
                <p className="text-xs text-muted-foreground">
                  Presión perpendicular sobre el plano, genera la fuerza Normal (N)
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-orange-600 dark:text-orange-400">
                  Fricción (Fr)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2 font-mono">
                  Fr = μ × N = μ × Wy
                </p>
                <p className="text-xs text-muted-foreground">
                  Se opone al movimiento, proporcional al coeficiente μ
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Diagrama */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                Diagrama de Fuerzas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border-2 border-border mb-6">
                <Image 
                  src="/plano-inclinado-diagrama.png"
                  alt="Diagrama de plano inclinado con descomposición de fuerzas"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Alert className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
                  <AlertDescription>
                    <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">
                      Vectores en el Diagrama
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-purple-600 dark:text-purple-400 min-w-[40px]">W</span>
                        <span className="text-muted-foreground">Peso total del objeto (morado, hacia abajo)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400 min-w-[40px]">Wy</span>
                        <span className="text-muted-foreground">Componente perpendicular del peso (azul punteado)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400 min-w-[40px]">N</span>
                        <span className="text-muted-foreground">Normal, perpendicular al plano (azul sólido)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-red-600 dark:text-red-400 min-w-[40px]">Wx</span>
                        <span className="text-muted-foreground">Componente paralela del peso (rojo punteado)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-orange-600 dark:text-orange-400 min-w-[40px]">Fr</span>
                        <span className="text-muted-foreground">Fricción, opuesta al movimiento (naranja)</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>

                <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                  <AlertDescription>
                    <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">
                      Geometría y Ángulos
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-green-600 dark:text-green-400 min-w-[40px]">θ</span>
                        <span className="text-muted-foreground">Ángulo de inclinación del plano</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-green-600 dark:text-green-400 min-w-[40px]">h</span>
                        <span className="text-muted-foreground">Altura vertical del plano (línea punteada)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-green-600 dark:text-green-400 min-w-[40px]">L</span>
                        <span className="text-muted-foreground">Longitud de la rampa (hipotenusa)</span>
                      </div>
                      <div className="mt-3 p-2 bg-white dark:bg-gray-900 rounded border">
                        <p className="font-mono text-xs">
                          sin(θ) = h/L<br/>
                          cos(θ) = d/L<br/>
                          tan(θ) = h/d
                        </p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Theory Quick Reference */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Fórmulas Fundamentales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Alert>
                  <AlertDescription>
                    <h4 className="font-mono font-bold mb-3">Descomposición del Peso</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-muted rounded">
                        <p className="font-mono font-bold text-red-600 dark:text-red-400">Wx = W · sin(θ)</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Componente paralela (a lo largo del plano)
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded">
                        <p className="font-mono font-bold text-blue-600 dark:text-blue-400">Wy = W · cos(θ)</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Componente perpendicular (presión sobre el plano)
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded">
                        <p className="font-mono text-xs text-muted-foreground">
                          Verificación: W² = Wx² + Wy²
                        </p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertDescription>
                    <h4 className="font-mono font-bold mb-3">Equilibrio y Fricción</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-muted rounded">
                        <p className="font-mono font-bold text-blue-600 dark:text-blue-400">N = Wy = W · cos(θ)</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Normal = componente perpendicular
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded">
                        <p className="font-mono font-bold text-orange-600 dark:text-orange-400">Fr = μ · N</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Fricción = coeficiente × Normal
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded">
                        <p className="font-mono font-bold text-green-600 dark:text-green-400">F = Wx + Fr</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Fuerza total para subir con fricción
                        </p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>

              <Alert className="bg-accent/10 border-accent/20">
                <AlertDescription>
                  <h4 className="font-mono font-bold mb-2 text-accent">Ventaja Mecánica del Plano Inclinado</h4>
                  <div className="space-y-2">
                    <p className="text-center font-mono text-lg font-bold text-primary">
                      VM = L / h = 1 / sin(θ)
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      A menor ángulo (rampa más larga), mayor ventaja mecánica y menor fuerza necesaria
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                      <div className="p-2 bg-muted rounded text-center">
                        <p className="font-mono font-bold">θ = 30°</p>
                        <p className="text-muted-foreground">VM = 2</p>
                      </div>
                      <div className="p-2 bg-muted rounded text-center">
                        <p className="font-mono font-bold">θ = 45°</p>
                        <p className="text-muted-foreground">VM = 1.41</p>
                      </div>
                      <div className="p-2 bg-muted rounded text-center">
                        <p className="font-mono font-bold">θ = 60°</p>
                        <p className="text-muted-foreground">VM = 1.15</p>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Ejemplos */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ejemplos Prácticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Ejemplo 1: Rampa sin fricción</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Datos:</strong> W = 100N, θ = 30°, μ = 0</p>
                    <p className="font-mono">Wx = 100 × sin(30°) = 100 × 0.5 = 50N</p>
                    <p className="font-mono">Wy = 100 × cos(30°) = 100 × 0.866 = 86.6N</p>
                    <p className="font-mono">N = 86.6N, Fr = 0</p>
                    <p className="text-accent"><strong>Fuerza necesaria: 50N</strong></p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Ejemplo 2: Rampa con fricción</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Datos:</strong> W = 100N, θ = 30°, μ = 0.3</p>
                    <p className="font-mono">Wx = 100 × sin(30°) = 50N</p>
                    <p className="font-mono">N = 100 × cos(30°) = 86.6N</p>
                    <p className="font-mono">Fr = 0.3 × 86.6 = 26N</p>
                    <p className="font-mono">F = Wx + Fr = 50 + 26 = 76N</p>
                    <p className="text-accent"><strong>Fuerza necesaria: 76N</strong></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aplicaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Aplicaciones del Plano Inclinado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold">Uso Cotidiano:</h4>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Rampas de acceso para discapacitados</li>
                    <li>• Carreteras en zonas montañosas</li>
                    <li>• Escaleras mecánicas</li>
                    <li>• Rampas de carga y descarga</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Industria y Construcción:</h4>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Transportadores de materiales</li>
                    <li>• Sistemas de elevación</li>
                    <li>• Diseño de techos y estructuras</li>
                    <li>• Equipos de construcción</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
            <Link href="/simulaciones">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Todas las Simulaciones
              </Button>
            </Link>
            <div className="flex gap-3">
              <Link href="/teoria/plano-inclinado">
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