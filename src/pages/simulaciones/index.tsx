import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Box, TrendingUp, Triangle, Scale, RotateCw, Anchor, Wrench, Disc, TrendingDown, Target } from "lucide-react";
import Link from "next/link";

export default function SimulacionesIndex() {
  const simulaciones = [
    {
      id: "colineales",
      title: "Fuerzas Colineales",
      description: "Manipula fuerzas sobre una línea recta y observa la resultante en tiempo real",
      icon: TrendingUp,
      type: "2D Canvas",
      difficulty: "Básico",
      href: "/simulaciones/colineales",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      id: "paralelogramo",
      title: "Método del Paralelogramo",
      description: "Construye el paralelogramo de fuerzas y visualiza la composición vectorial",
      icon: Triangle,
      type: "2D Canvas",
      difficulty: "Intermedio",
      href: "/simulaciones/paralelogramo",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
    },
    {
      id: "concurrentes-metodos",
      title: "Fuerzas Concurrentes - Métodos Gráficos",
      description: "Visualiza sistemas de fuerzas concurrentes con método del Paralelogramo y Polígono",
      icon: Box,
      type: "2D Canvas Interactivo",
      difficulty: "Intermedio",
      href: "/simulaciones/concurrentes-metodos",
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-950",
    },
    {
      id: "paralelas",
      title: "Fuerzas Paralelas 3D",
      description: "Visualiza sistemas de fuerzas paralelas en un espacio tridimensional interactivo",
      icon: Scale,
      type: "3D Interactivo",
      difficulty: "Intermedio",
      href: "/simulaciones/paralelas-3d",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
    {
      id: "momentos",
      title: "Momentos y Torque 3D",
      description: "Aplica fuerzas a diferentes distancias y observa el efecto rotacional en 3D",
      icon: RotateCw,
      type: "3D Interactivo",
      difficulty: "Avanzado",
      href: "/simulaciones/momentos-3d",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-950",
    },
    {
      id: "equilibrio",
      title: "Equilibrio de Viga 3D",
      description: "Coloca cargas sobre una viga y encuentra el punto de equilibrio",
      icon: Anchor,
      type: "3D Interactivo",
      difficulty: "Avanzado",
      href: "/simulaciones/equilibrio-3d",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-950",
    },
    {
      id: "concurrentes",
      title: "Fuerzas Concurrentes 3D",
      description: "Sistema de fuerzas que convergen en un punto común - visualización espacial",
      icon: Box,
      type: "3D Interactivo",
      difficulty: "Avanzado",
      href: "/simulaciones/concurrentes-3d",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-950",
    },
    {
      id: "palancas",
      title: "Palancas 3D",
      description: "Experimenta con los 3 tipos de palancas y calcula ventaja mecánica",
      icon: Wrench,
      type: "3D Interactivo",
      difficulty: "Intermedio",
      href: "/simulaciones/palancas-3d",
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-950",
    },
    {
      id: "poleas",
      title: "Poleas y Aparejos 3D",
      description: "Sistemas de poleas fijas, móviles y compuestas con cálculo de fuerzas",
      icon: Disc,
      type: "3D Interactivo",
      difficulty: "Intermedio",
      href: "/simulaciones/poleas-3d",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-950",
    },
    {
      id: "plano-inclinado",
      title: "Plano Inclinado 3D",
      description: "Analiza descomposición de fuerzas en superficies inclinadas con fricción",
      icon: TrendingDown,
      type: "3D Interactivo",
      difficulty: "Intermedio",
      href: "/simulaciones/plano-inclinado-3d",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    },
    {
      id: "proyectil",
      title: "Tiro Parabólico 3D",
      description: "Lanza proyectiles con diferentes ángulos y velocidades, observa la trayectoria parabólica",
      icon: Target,
      type: "3D Interactivo",
      difficulty: "Intermedio",
      href: "/simulaciones/proyectil-3d",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-950",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Simulaciones Interactivas - Algo de Fisica lab 1"
        description="Experimenta con simulaciones 2D y 3D de sistemas de fuerzas y máquinas simples. Manipula vectores en tiempo real."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Simulaciones Interactivas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora sistemas de fuerzas y máquinas simples mediante simulaciones 2D y 3D. 
              Manipula vectores, observa resultantes y comprende los conceptos de forma visual.
            </p>
          </div>

          {/* Simulaciones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulaciones.map((sim) => (
              <Card key={sim.id} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg ${sim.bgColor} flex items-center justify-center`}>
                      <sim.icon className={`w-6 h-6 ${sim.color}`} />
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary">
                        {sim.type}
                      </span>
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        sim.difficulty === "Básico" ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400" :
                        sim.difficulty === "Intermedio" ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400" :
                        "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400"
                      }`}>
                        {sim.difficulty}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{sim.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {sim.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={sim.href}>
                      Iniciar Simulación
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono font-bold text-lg mb-3 text-primary">💡 Simulaciones 2D</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Las simulaciones 2D utilizan canvas HTML5 para renderizado rápido. 
                    Arrastra los vectores, ajusta magnitudes y observa cómo se calcula la resultante en tiempo real.
                  </p>
                </div>
                <div>
                  <h3 className="font-mono font-bold text-lg mb-3 text-accent">🎯 Simulaciones 3D</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Las simulaciones 3D utilizan React Three Fiber para visualización espacial completa. 
                    Rota la cámara, manipula fuerzas en el espacio y comprende sistemas complejos desde cualquier ángulo.
                  </p>
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