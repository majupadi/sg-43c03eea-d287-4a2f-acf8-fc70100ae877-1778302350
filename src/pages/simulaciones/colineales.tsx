import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Book } from "lucide-react";
import dynamic from "next/dynamic";

const Colineales3D = dynamic(
  () => import("@/components/simulations/Colineales3D").then((mod) => mod.Colineales3D),
  { ssr: false }
);

export default function ColinealesSimulacion() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación: Fuerzas Colineales 3D - Algo de Fisica lab 1"
        description="Simulación 3D interactiva de sistemas de fuerzas colineales con cálculo de resultante en tiempo real."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/simulaciones">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Simulaciones
                </Button>
              </Link>
              <Link href="/teoria/colineales">
                <Button variant="outline" size="sm">
                  <Book className="w-4 h-4 mr-2" />
                  Ver Teoría
                </Button>
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
              Sistemas de Fuerzas Colineales 3D
            </h1>
            <p className="text-muted-foreground text-lg">
              Manipula fuerzas sobre una línea recta y observa la resultante en tiempo real.
              Ajusta magnitudes, posiciones y direcciones para experimentar con diferentes configuraciones.
            </p>
          </div>

          {/* Simulación 3D */}
          <Colineales3D />

          {/* Instrucciones */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-mono font-bold text-lg mb-4 text-primary">
                📖 Instrucciones de uso
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">🖱️ Controles 3D</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Rotar:</strong> Click izquierdo + arrastrar</li>
                      <li>• <strong>Zoom:</strong> Rueda del mouse o pinch</li>
                      <li>• <strong>Panorámica:</strong> Click derecho + arrastrar</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">🎮 Ajustar Fuerzas</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Usa los sliders para cambiar magnitud (10-100N)</li>
                      <li>• Cambia la posición en el eje (-6m a +6m)</li>
                      <li>• Selecciona dirección: Derecha (+) o Izquierda (-)</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">➕ Gestión de Fuerzas</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Agregar:</strong> Añade hasta 8 fuerzas simultáneas</li>
                      <li>• <strong>Eliminar:</strong> Click en el icono de basura (mínimo 1 fuerza)</li>
                      <li>• <strong>Reset:</strong> Vuelve a la configuración inicial</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">📊 Resultante</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• La flecha naranja discontinua muestra la resultante</li>
                      <li>• Se calcula sumando algebraicamente todas las fuerzas</li>
                      <li>• Si R ≈ 0, el sistema está en equilibrio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conceptos clave */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-mono font-bold text-lg mb-4">💡 Conceptos Clave</h3>
              <div className="space-y-3 text-sm">
                <p className="leading-relaxed">
                  <strong>Fuerzas Colineales:</strong> Son fuerzas que actúan sobre la misma línea de acción. 
                  Pueden tener el mismo sentido o sentidos opuestos.
                </p>
                <p className="leading-relaxed">
                  <strong>Convención de Signos:</strong> Por convención, las fuerzas hacia la derecha se consideran 
                  positivas (+) y las fuerzas hacia la izquierda negativas (-).
                </p>
                <p className="leading-relaxed">
                  <strong>Resultante:</strong> La fuerza única que produce el mismo efecto que todas las fuerzas 
                  aplicadas simultáneamente. Se calcula como: <code className="px-2 py-1 bg-muted rounded font-mono">R = ΣF = F₁ + F₂ + F₃ + ...</code>
                </p>
                <p className="leading-relaxed">
                  <strong>Equilibrio:</strong> Un sistema está en equilibrio cuando la resultante es cero (R = 0), 
                  lo que significa que las fuerzas positivas y negativas se cancelan mutuamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}