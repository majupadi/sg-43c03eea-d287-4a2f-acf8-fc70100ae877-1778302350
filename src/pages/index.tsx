import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Triangle, Scale, Anchor, Book, Calculator, FlaskConical, Zap } from "lucide-react";
import Link from "next/link";
import { SEO } from "@/components/SEO";

export default function Home() {
  const topics = [
    {
      title: "Sistemas de Fuerzas Colineales",
      description: "Fuerzas que actúan sobre una misma línea recta. Aprende a calcular la resultante mediante suma algebraica.",
      icon: TrendingUp,
      href: "/teoria/colineales",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Métodos Gráficos",
      description: "Método del paralelogramo y polígono para composición de fuerzas concurrentes. Construcciones geométricas precisas.",
      icon: Triangle,
      href: "/teoria/metodos-graficos",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Sistemas de Fuerzas Paralelas",
      description: "Fuerzas paralelas de igual o distinto sentido. Cálculo de resultante, posición y equilibrio de sistemas.",
      icon: Scale,
      href: "/teoria/paralelas",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Peso y Equilibrio",
      description: "Centro de gravedad, peso específico y condiciones de equilibrio. Aplicaciones prácticas en estructuras.",
      icon: Anchor,
      href: "/teoria/peso-equilibrio",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Algo de Fisica lab 1 - Sistema de Fuerzas Interactivo"
        description="Aprende sistemas de fuerzas mediante simulaciones interactivas, teoría completa y ejercicios resueltos paso a paso."
      />
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-mono font-semibold text-accent">
                <Zap className="w-4 h-4" />
                Aprende con Simulaciones Interactivas
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                Sistema de Fuerzas
                <br />
                <span className="text-foreground">Teoría y Práctica</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Domina los conceptos de sistemas de fuerzas mediante simulaciones realistas, 
                explicaciones claras y ejercicios resueltos paso a paso.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild size="lg" className="font-medium">
                  <Link href="/simulaciones">
                    Comenzar Simulaciones
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-medium">
                  <Link href="/teoria">Explorar Teoría</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4">
                Características de la Plataforma
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-mono font-semibold mb-2">Simulaciones Realistas</h3>
                  <p className="text-sm text-muted-foreground">
                    Manipula vectores en tiempo real y observa cómo se calcula la resultante
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="font-mono font-semibold mb-2">Teoría Completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Toda la teoría explicada con diagramas y fórmulas detalladas
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✏️</span>
                  </div>
                  <h3 className="font-mono font-semibold mb-2">Ejercicios Paso a Paso</h3>
                  <p className="text-sm text-muted-foreground">
                    11 ejercicios resueltos con procedimiento detallado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}