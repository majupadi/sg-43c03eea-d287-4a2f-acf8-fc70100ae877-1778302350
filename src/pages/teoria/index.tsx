import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ArrowRight, Scale, CircleDot, Triangle, TrendingUp, RotateCw, Anchor, Wrench, Disc, TrendingDown } from "lucide-react";
import Link from "next/link";

export default function TeoriaIndex() {
  const sections = [
    {
      id: "colineales",
      title: "Sistemas de Fuerzas Colineales",
      description: "Fuerzas que actúan sobre una misma línea recta. Aprende a calcular la resultante y dirección.",
      icon: TrendingUp,
      topics: ["Resultante de fuerzas", "Convención de signos", "Equilibrio en una dimensión"],
      href: "/teoria/colineales",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950"
    },
    {
      id: "metodos-graficos",
      title: "Métodos Gráficos",
      description: "Método del paralelogramo y polígono para composición de fuerzas concurrentes.",
      icon: Triangle,
      topics: ["Paralelogramo de fuerzas", "Polígono de fuerzas", "Escala gráfica"],
      href: "/teoria/metodos-graficos",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950"
    },
    {
      id: "paralelas",
      title: "Sistemas de Fuerzas Paralelas",
      description: "Análisis de fuerzas paralelas y cálculo del centro de fuerzas resultante.",
      icon: Scale,
      topics: ["Fuerzas paralelas del mismo sentido", "Fuerzas paralelas opuestas", "Centro de fuerzas"],
      href: "/teoria/paralelas",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950"
    },
    {
      id: "concurrentes",
      title: "Sistemas de Fuerzas Concurrentes",
      description: "Fuerzas que convergen en un punto. Descomposición vectorial en componentes x, y.",
      icon: CircleDot,
      topics: ["Descomposición rectangular", "Resultante analítica", "Ángulo de la resultante"],
      href: "/teoria/concurrentes",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-950"
    },
    {
      id: "momentos",
      title: "Momentos de Fuerza (Torque)",
      description: "Estudio del efecto rotacional de las fuerzas. Momento, cuplas y regla de la mano derecha.",
      icon: RotateCw,
      topics: ["Momento = F × d", "Cupla o par de fuerzas", "Sentido de rotación"],
      href: "/teoria/momentos",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-950"
    },
    {
      id: "equilibrio",
      title: "Equilibrio de Cuerpos Rígidos",
      description: "Condiciones para que un cuerpo permanezca en equilibrio. Diagrama de cuerpo libre.",
      icon: Anchor,
      topics: ["ΣFx = 0, ΣFy = 0, ΣM = 0", "Reacciones en apoyos", "DCL"],
      href: "/teoria/equilibrio",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-950"
    },
    {
      id: "palancas",
      title: "Palancas",
      description: "Máquinas simples que multiplican la fuerza. Clasificación en 1°, 2° y 3° género.",
      icon: Wrench,
      topics: ["Ley de la palanca", "Ventaja mecánica", "Tipos de palancas"],
      href: "/teoria/palancas",
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-950"
    },
    {
      id: "poleas",
      title: "Poleas y Aparejos",
      description: "Sistemas de poleas fijas, móviles y combinadas. Cálculo de ventaja mecánica.",
      icon: Disc,
      topics: ["Polea fija", "Polea móvil", "Polipasto"],
      href: "/teoria/poleas",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-950"
    },
    {
      id: "plano-inclinado",
      title: "Plano Inclinado",
      description: "Análisis de fuerzas en superficies inclinadas. Descomposición del peso y fricción.",
      icon: TrendingDown,
      topics: ["Componentes del peso", "Ventaja mecánica", "Fricción"],
      href: "/teoria/plano-inclinado",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Teoría - Algo de Fisica lab 1"
        description="Contenido teórico completo sobre sistemas de fuerzas y máquinas simples."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Contenido Teórico
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprende los fundamentos de sistemas de fuerzas y máquinas simples con explicaciones claras y ejemplos prácticos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Card key={section.id} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${section.bgColor} flex items-center justify-center mb-3`}>
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-2">{section.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-xs font-mono font-semibold text-muted-foreground mb-2">
                      Temas principales:
                    </p>
                    <ul className="space-y-1">
                      {section.topics.map((topic, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="w-full group">
                    <Link href={section.href}>
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">¿Listo para practicar?</h3>
                <p className="text-muted-foreground">
                  Explora las simulaciones interactivas o resuelve ejercicios paso a paso
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/simulaciones">
                    <Button className="bg-accent hover:bg-accent/90">
                      Ir a Simulaciones
                    </Button>
                  </Link>
                  <Link href="/ejercicios">
                    <Button variant="outline">
                      Ver Ejercicios
                    </Button>
                  </Link>
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