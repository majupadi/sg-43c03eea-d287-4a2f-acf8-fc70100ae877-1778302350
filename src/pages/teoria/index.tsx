import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { ArrowRight, TrendingUp, Triangle, Scale, Zap, RotateCw, Anchor } from "lucide-react";
import Link from "next/link";

export default function TeoriaIndex() {
  const teorias = [
    {
      title: "Sistemas de Fuerzas Colineales",
      description: "Fuerzas que actúan sobre la misma línea recta. Suma algebraica y cálculo de resultante.",
      icon: TrendingUp,
      href: "/teoria/colineales",
      topics: ["Suma algebraica", "Convención de signos", "Resultante", "Ejemplos resueltos"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Métodos Gráficos",
      description: "Composición de fuerzas mediante construcciones geométricas: paralelogramo y polígono.",
      icon: Triangle,
      href: "/teoria/metodos-graficos",
      topics: ["Método del paralelogramo", "Método del polígono", "Construcción gráfica", "Casos especiales"],
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Sistemas de Fuerzas Paralelas",
      description: "Fuerzas paralelas de igual o distinto sentido. Cálculo de resultante y posición.",
      icon: Scale,
      href: "/teoria/paralelas",
      topics: ["Mismo sentido", "Distinto sentido", "Posición de resultante", "Centro de fuerzas"],
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Sistemas de Fuerzas Concurrentes",
      description: "Vectores que convergen en un punto común. Descomposición en componentes rectangulares.",
      icon: Zap,
      href: "/teoria/concurrentes",
      topics: ["Descomposición vectorial", "Componentes x,y", "Resultante por componentes", "Ángulo resultante"],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Momentos de Fuerza (Torque)",
      description: "Efecto rotacional de las fuerzas. Momento, cuplas y regla de la mano derecha.",
      icon: RotateCw,
      href: "/teoria/momentos",
      topics: ["M = F × d", "Regla mano derecha", "Cuplas", "Suma de momentos"],
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Equilibrio de Cuerpos Rígidos",
      description: "Condiciones de equilibrio estático. Diagramas de cuerpo libre y análisis de estructuras.",
      icon: Anchor,
      href: "/teoria/equilibrio",
      topics: ["ΣFx = 0, ΣFy = 0", "ΣM = 0", "Diagrama cuerpo libre", "Reacciones en apoyos"],
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Teoría - Sistema de Fuerzas"
        description="Teoría completa sobre sistemas de fuerzas: colineales, paralelas, concurrentes, momentos y equilibrio."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary font-mono">
              Teoría de Sistemas de Fuerzas
            </h1>
            <p className="text-lg text-muted-foreground">
              Conceptos fundamentales de estática y análisis de fuerzas. Cada sección incluye explicaciones detalladas, 
              fórmulas, diagramas y ejemplos resueltos paso a paso.
            </p>
          </div>

          {/* Grid de Temas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {teorias.map((teoria) => {
              const Icon = teoria.icon;
              return (
                <Link key={teoria.href} href={teoria.href} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl ${teoria.bgColor} flex items-center justify-center mb-4`}>
                        <Icon className={`h-7 w-7 ${teoria.color}`} />
                      </div>
                      <CardTitle className="font-mono text-xl group-hover:text-primary transition-colors mb-2">
                        {teoria.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {teoria.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {teoria.topics.map((topic, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all pt-2">
                          Estudiar tema
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Recursos Adicionales */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold font-mono">Recursos Complementarios</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Además de la teoría, la plataforma incluye simulaciones interactivas y ejercicios resueltos 
                  para reforzar tu aprendizaje de forma práctica.
                </p>
                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <Link href="/simulaciones">
                    <Card className="px-6 py-4 hover:shadow-md transition-shadow cursor-pointer bg-background">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <span className="text-xl">🔬</span>
                        </div>
                        <div className="text-left">
                          <p className="font-mono font-semibold text-sm">Simulaciones</p>
                          <p className="text-xs text-muted-foreground">Canvas interactivo</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                  <Link href="/ejercicios">
                    <Card className="px-6 py-4 hover:shadow-md transition-shadow cursor-pointer bg-background">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-xl">📝</span>
                        </div>
                        <div className="text-left">
                          <p className="font-mono font-semibold text-sm">Ejercicios</p>
                          <p className="text-xs text-muted-foreground">26 problemas resueltos</p>
                        </div>
                      </div>
                    </Card>
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