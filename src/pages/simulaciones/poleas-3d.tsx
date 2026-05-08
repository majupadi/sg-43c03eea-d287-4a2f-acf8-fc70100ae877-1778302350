import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Book } from "lucide-react";
import dynamic from "next/dynamic";

const Poleas3D = dynamic(
  () => import("@/components/simulations/Poleas3D").then((mod) => mod.Poleas3D),
  { ssr: false }
);

export default function PoleasSimulacion() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulación: Poleas 3D - Algo de Fisica lab 1"
        description="Simulación 3D interactiva de sistemas de poleas: fija, móvil y aparejo. Visualiza ventaja mecánica en acción."
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
              Sistemas de Poleas 3D
            </h1>
            <p className="text-muted-foreground text-lg">
              Experimenta con tres tipos de sistemas de poleas y observa cómo cambia la ventaja mecánica. 
              Ajusta el peso y observa la fuerza necesaria para levantarlo en cada configuración.
            </p>
          </div>

          <Poleas3D />

          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-mono font-bold text-lg mb-4 text-primary">
                📖 Instrucciones de uso
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">🔄 Tipos de Sistemas</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Polea Fija:</strong> VM = 1 (cambia dirección, no reduce fuerza)</li>
                      <li>• <strong>Polea Móvil:</strong> VM = 2 (reduce fuerza a la mitad)</li>
                      <li>• <strong>Aparejo:</strong> VM = 4 (reduce fuerza a 1/4)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">⚙️ Controles</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Selecciona el tipo de sistema con los botones superiores</li>
                      <li>• Ajusta el peso del objeto (20-200N)</li>
                      <li>• Activa/desactiva la animación del sistema</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">🖱️ Vista 3D</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Rotar:</strong> Click izquierdo + arrastrar</li>
                      <li>• <strong>Zoom:</strong> Rueda del mouse</li>
                      <li>• <strong>Panorámica:</strong> Click derecho + arrastrar</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">📊 Observa</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Cuerdas verdes = fuerza que aplicas</li>
                      <li>• Cuerdas marrones = cuerdas del sistema</li>
                      <li>• Bloque rojo = peso a levantar</li>
                      <li>• Poleas azules rotan cuando hay animación</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-mono font-bold text-lg mb-4">💡 Conceptos Clave</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">Polea Fija</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Está sujeta a un punto fijo. Solo cambia la dirección de la fuerza aplicada. 
                    <strong> F = W</strong>. No proporciona ventaja mecánica, pero permite tirar hacia abajo 
                    en lugar de levantar directamente.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">Polea Móvil</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Se mueve junto con la carga. El peso se distribuye entre 2 ramales de cuerda. 
                    <strong> F = W/2</strong>. Ventaja mecánica VM = 2. Reduces la fuerza necesaria a la mitad, 
                    pero debes jalar el doble de distancia.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">Aparejo/Polipasto</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Combinación de poleas fijas y móviles. El sistema mostrado tiene 4 ramales soportando el peso. 
                    <strong> F = W/4</strong>. VM = 4. Ideal para levantar cargas muy pesadas con poco esfuerzo.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <h4 className="font-semibold mb-2 text-accent">⚖️ Ventaja Mecánica (VM)</h4>
                <p className="text-sm leading-relaxed">
                  La ventaja mecánica es el factor por el cual se multiplica la fuerza aplicada. 
                  Se calcula como: <code className="px-2 py-1 bg-muted rounded font-mono">VM = Carga / Fuerza aplicada</code>
                  <br/><br/>
                  También es igual al número de ramales de cuerda que soportan directamente el peso. 
                  A mayor VM, menor fuerza necesitas, pero mayor distancia debes recorrer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-mono font-bold text-lg mb-3">🔬 Experimentos Sugeridos</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-muted rounded">
                  <strong>1. Comparación de esfuerzo:</strong> Coloca un peso de 100N y cambia entre los 3 sistemas. 
                  Observa cómo disminuye la fuerza requerida: 100N → 50N → 25N.
                </div>
                <div className="p-3 bg-muted rounded">
                  <strong>2. Límites prácticos:</strong> Prueba con 200N. El aparejo solo requiere 50N, 
                  pero en la vida real tendrías que jalar 4 veces más distancia de cuerda.
                </div>
                <div className="p-3 bg-muted rounded">
                  <strong>3. Efecto de la animación:</strong> Activa la animación para ver cómo las poleas rotan. 
                  Las poleas fijas giran en un solo sentido, las móviles se desplazan verticalmente.
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