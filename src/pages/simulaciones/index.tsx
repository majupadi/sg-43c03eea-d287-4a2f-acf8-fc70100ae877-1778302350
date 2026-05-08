import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FlaskConical, ArrowRight } from "lucide-react";

export default function SimulacionesPage() {
  const simulations = [
    {
      title: "Fuerzas Colineales",
      description: "Visualiza 6 fuerzas sobre una línea horizontal y calcula la resultante algebraicamente",
      href: "/simulaciones/colineales",
      features: ["6 fuerzas manipulables", "Conversión de unidades", "Cálculo en tiempo real"],
      available: true,
    },
    {
      title: "Método del Paralelogramo",
      description: "Suma de dos vectores concurrentes mediante construcción geométrica",
      href: "/simulaciones/paralelogramo",
      features: ["Ángulo ajustable", "Visualización del paralelogramo", "Fórmulas automáticas"],
      available: true,
    },
    {
      title: "Método del Polígono",
      description: "Composición de 3 o más fuerzas mediante cadena de vectores",
      href: "/simulaciones/poligono",
      features: ["Múltiples fuerzas", "Trazado secuencial", "Vector resultante"],
      available: false,
    },
    {
      title: "Fuerzas Paralelas",
      description: "Análisis de sistemas de fuerzas paralelas y cálculo del punto de aplicación",
      href: "/simulaciones/paralelas",
      features: ["Momento y posición", "Equilibrio de vigas", "Teorema de Varignon"],
      available: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                ← Volver al inicio
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="h-10 w-10 text-accent" />
              <h1 className="font-mono text-4xl font-bold">
                Simulaciones Interactivas
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Experimenta con sistemas de fuerzas y visualiza conceptos en tiempo real
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {simulations.map((sim) => (
              <Card key={sim.href} className={!sim.available ? "opacity-60" : ""}>
                <CardHeader>
                  <CardTitle className="font-mono">{sim.title}</CardTitle>
                  <CardDescription>{sim.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {sim.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {sim.available ? (
                    <Button asChild className="w-full">
                      <Link href={sim.href}>
                        Abrir Simulación
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Próximamente
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-mono font-semibold mb-2">Aprende mientras experimentas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cada simulación incluye controles interactivos, cálculos automáticos y fórmulas
              explicadas. Modifica los valores y observa cómo cambian los resultados en tiempo real.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/teoria/colineales">
                  Ver Teoría
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/ejercicios">
                  Ver Ejercicios
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}