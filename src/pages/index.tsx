import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Triangle, Scale, Anchor } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
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
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Sistema Interactivo de Fuerzas
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Aprende sistemas de fuerzas físicas mediante simulaciones realistas, teoría clara y ejercicios progresivos.
              Una plataforma completa para estudiantes de física e ingeniería.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link key={topic.href} href={topic.href} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${topic.bgColor} flex items-center justify-center mb-3`}>
                        <Icon className={`h-6 w-6 ${topic.color}`} />
                      </div>
                      <CardTitle className="font-mono text-xl group-hover:text-primary transition-colors">
                        {topic.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {topic.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Explorar tema
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
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