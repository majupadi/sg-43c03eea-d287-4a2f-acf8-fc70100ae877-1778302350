import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Book, ArrowLeft, Calculator } from "lucide-react";
import Link from "next/link";
import { ConcurrentesMethods } from "@/components/simulations/ConcurrentesMethods";

export default function ConcurrentesMetodosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación: Fuerzas Concurrentes - Métodos Gráficos - Algo de Fisica lab 1"
        description="Simulación interactiva de sistemas de fuerzas concurrentes usando método del Paralelogramo y Polígono. Visualiza vectores en tiempo real."
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
              <Link href="/teoria/concurrentes">
                <Button variant="outline" size="sm">
                  <Book className="w-4 h-4 mr-2" />
                  Ver Teoría
                </Button>
              </Link>
              <Link href="/ejercicios?topic=concurrentes">
                <Button variant="outline" size="sm">
                  <Calculator className="w-4 h-4 mr-2" />
                  Ejercicios 38-42
                </Button>
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
              Fuerzas Concurrentes - Métodos Gráficos
            </h1>
            <p className="text-muted-foreground text-lg">
              Visualiza y manipula sistemas de fuerzas concurrentes usando los métodos del Paralelogramo y del Polígono
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <AlertDescription>
                <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                  📐 Método del Paralelogramo
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Ideal para sumar <strong>2 vectores</strong>. Se construye un paralelogramo con las dos fuerzas 
                  como lados adyacentes. La diagonal representa la resultante.
                </p>
              </AlertDescription>
            </Alert>

            <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
              <AlertDescription>
                <h3 className="font-semibold mb-2 text-green-900 dark:text-green-100">
                  📊 Método del Polígono
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Para <strong>n vectores</strong>. Se dibujan en secuencia (punta con cola). 
                  La resultante va desde el origen hasta el extremo final.
                </p>
              </AlertDescription>
            </Alert>
          </div>

          {/* Simulación Principal */}
          <ConcurrentesMethods />

          {/* Instrucciones de Uso */}
          <Alert className="mt-8">
            <AlertDescription>
              <h3 className="font-semibold mb-3">💡 Cómo usar esta simulación:</h3>
              <ul className="text-sm space-y-2 ml-4 list-disc">
                <li>
                  <strong>Tab Paralelogramo:</strong> Muestra las primeras 2 fuerzas formando un paralelogramo. 
                  La diagonal roja es la resultante.
                </li>
                <li>
                  <strong>Tab Polígono:</strong> Muestra todas las fuerzas conectadas en secuencia. 
                  La línea roja punteada es la resultante desde el origen hasta el punto final.
                </li>
                <li>
                  <strong>Tab Controles:</strong> Ajusta magnitud (5-100 N) y ángulo (0-360°) de cada fuerza. 
                  Agrega hasta 6 fuerzas o elimina las existentes (mínimo 2).
                </li>
                <li>
                  <strong>Resultados:</strong> Observa cómo cambian R (resultante), Rx y Ry en tiempo real 
                  al modificar cualquier parámetro.
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Conceptos Clave */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Alert className="bg-primary/5 border-primary/20">
              <AlertDescription>
                <h4 className="font-mono font-semibold mb-2">Componentes</h4>
                <p className="text-sm">
                  Cada fuerza se descompone en:<br/>
                  <code className="text-xs">Fx = F·cos(θ)</code><br/>
                  <code className="text-xs">Fy = F·sin(θ)</code>
                </p>
              </AlertDescription>
            </Alert>

            <Alert className="bg-accent/10 border-accent/30">
              <AlertDescription>
                <h4 className="font-mono font-semibold mb-2">Resultante</h4>
                <p className="text-sm">
                  La suma vectorial:<br/>
                  <code className="text-xs">R = √(ΣFx² + ΣFy²)</code><br/>
                  <code className="text-xs">θ = arctan(ΣFy/ΣFx)</code>
                </p>
              </AlertDescription>
            </Alert>

            <Alert className="bg-muted/50 border-muted">
              <AlertDescription>
                <h4 className="font-mono font-semibold mb-2">Equilibrio</h4>
                <p className="text-sm">
                  Sistema equilibrado si:<br/>
                  <code className="text-xs">ΣFx = 0</code><br/>
                  <code className="text-xs">ΣFy = 0</code><br/>
                  <code className="text-xs">R = 0</code>
                </p>
              </AlertDescription>
            </Alert>
          </div>

          {/* Enlaces Relacionados */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg border">
            <h3 className="font-mono font-semibold mb-4">📚 Recursos relacionados:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/teoria/concurrentes">
                <Button variant="outline" className="w-full justify-start">
                  <Book className="w-4 h-4 mr-2" />
                  Teoría Completa
                </Button>
              </Link>
              <Link href="/ejercicios?topic=concurrentes">
                <Button variant="outline" className="w-full justify-start">
                  <Calculator className="w-4 h-4 mr-2" />
                  Ejercicios 38-42
                </Button>
              </Link>
              <Link href="/simulaciones/concurrentes-3d">
                <Button variant="outline" className="w-full justify-start">
                  <Book className="w-4 h-4 mr-2" />
                  Simulación 3D
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