import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ArrowLeft, Triangle, Calculator } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ParalelogramoSimulation } from "@/components/simulations/ParalelogramoSimulation";
import { WikipediaCard } from "@/components/WikipediaCard";

export default function MetodosGraficosPage() {
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
              Métodos Gráficos de Composición
            </h1>
            <p className="text-lg text-muted-foreground">
              Métodos del paralelogramo y del polígono
            </p>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Los métodos gráficos permiten determinar la resultante de fuerzas concurrentes
              mediante construcciones geométricas precisas.
            </AlertDescription>
          </Alert>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Método del Paralelogramo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="font-semibold mb-3">Fundamento:</p>
                <p>
                  El método del paralelogramo permite sumar dos vectores fuerza que actúan
                  sobre un mismo punto. Es especialmente útil cuando los vectores forman
                  un ángulo entre sí.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-3">Procedimiento:</p>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li>
                    <strong>Trazar los vectores:</strong> Desde un punto común (origen),
                    dibujar ambos vectores F₁ y F₂ con sus magnitudes a escala y sus
                    direcciones correctas.
                  </li>
                  <li>
                    <strong>Completar el paralelogramo:</strong> Desde el extremo de cada
                    vector, trazar una línea paralela al otro vector.
                  </li>
                  <li>
                    <strong>Diagonal resultante:</strong> La diagonal del paralelogramo
                    que parte del origen representa la resultante R.
                  </li>
                  <li>
                    <strong>Medir la resultante:</strong> Medir la longitud de la diagonal
                    y convertir usando la escala. El ángulo se mide respecto a la referencia.
                  </li>
                </ol>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="font-semibold mb-3">Fórmulas importantes:</p>
                <div className="space-y-2 font-mono text-sm">
                  <p>Magnitud de la resultante:</p>
                  <div className="bg-background p-3 rounded">
                    R = √(F₁² + F₂² + 2·F₁·F₂·cos(θ))
                  </div>
                  <p className="mt-3">Donde θ es el ángulo entre F₁ y F₂</p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Casos especiales:</strong><br/>
                  • Si θ = 0° (mismo sentido): R = F₁ + F₂<br/>
                  • Si θ = 180° (sentidos opuestos): R = |F₁ - F₂|<br/>
                  • Si θ = 90°: R = √(F₁² + F₂²)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Método del Polígono</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="font-semibold mb-3">Fundamento:</p>
                <p>
                  El método del polígono (o método de la cadena) permite sumar más de dos
                  vectores fuerza de manera secuencial. Es una extensión natural del
                  paralelogramo para múltiples fuerzas.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-3">Procedimiento:</p>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li>
                    <strong>Elegir una escala:</strong> Seleccionar una escala conveniente
                    (ej: 1 cm = 5 N).
                  </li>
                  <li>
                    <strong>Trazar el primer vector:</strong> Dibujar F₁ desde el origen
                    con su magnitud y dirección correctas.
                  </li>
                  <li>
                    <strong>Vectores sucesivos:</strong> Desde el extremo de F₁, trazar F₂.
                    Desde el extremo de F₂, trazar F₃, y así sucesivamente.
                  </li>
                  <li>
                    <strong>Cerrar el polígono:</strong> La resultante R es el vector que
                    va desde el origen hasta el extremo del último vector trazado.
                  </li>
                  <li>
                    <strong>Medir:</strong> Medir la longitud y ángulo de R, aplicar la escala.
                  </li>
                </ol>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="font-semibold mb-3">Ventajas del método:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Funciona con cualquier número de fuerzas</li>
                  <li>El orden de suma no afecta el resultado</li>
                  <li>Visualización clara del efecto combinado</li>
                  <li>Útil cuando las fórmulas analíticas son complejas</li>
                </ul>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Condición de equilibrio:</strong> Si el polígono se cierra
                  completamente (el extremo final coincide con el origen), el sistema
                  está en equilibrio y R = 0.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-mono">Comparación de Métodos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-mono">Aspecto</th>
                      <th className="text-left p-3 font-mono">Paralelogramo</th>
                      <th className="text-left p-3 font-mono">Polígono</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3">Número de fuerzas</td>
                      <td className="p-3">2 fuerzas</td>
                      <td className="p-3">2 o más fuerzas</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">Complejidad</td>
                      <td className="p-3">Simple, construcción directa</td>
                      <td className="p-3">Secuencial, más pasos</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">Aplicación ideal</td>
                      <td className="p-3">Dos fuerzas concurrentes</td>
                      <td className="p-3">Múltiples fuerzas</td>
                    </tr>
                    <tr>
                      <td className="p-3">Precisión</td>
                      <td className="p-3">Alta para dos vectores</td>
                      <td className="p-3">Depende de la escala</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/simulaciones/paralelogramo">
                Simulación del Paralelogramo
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
        <ParalelogramoSimulation />

        {/* Información de Wikipedia */}
        <div className="mt-12">
          <WikipediaCard 
            term="Método gráfico" 
            title="📚 Amplía tu conocimiento: Métodos Gráficos en Física"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}