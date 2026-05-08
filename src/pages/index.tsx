import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { ArrowRight, Book, FlaskConical, Calculator, TrendingUp, Triangle, Scale, Bot } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const mainTopics = [
    {
      title: "Sistemas de Fuerzas",
      description: "Aprende sobre fuerzas colineales, paralelas y concurrentes con teoría completa y simulaciones 3D interactivas",
      icon: TrendingUp,
      href: "/teoria/colineales",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950"
    },
    {
      title: "Métodos Gráficos",
      description: "Domina el método del paralelogramo y polígono para composición de fuerzas mediante simulaciones",
      icon: Triangle,
      href: "/teoria/metodos-graficos",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950"
    },
    {
      title: "Equilibrio y Momentos",
      description: "Estudia condiciones de equilibrio, momentos de fuerza y análisis de cuerpos rígidos",
      icon: Scale,
      href: "/teoria/equilibrio",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950"
    },
    {
      title: "Asistente IA",
      description: "Pregunta cualquier duda sobre física. Obtén explicaciones paso a paso y resuelve problemas con ayuda de IA",
      icon: Bot,
      href: "/asistente",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-950"
    }
  ];

  const features = [
    {
      icon: Book,
      title: "Teoría Completa",
      description: "9 secciones con explicaciones detalladas, fórmulas y conceptos clave",
      href: "/teoria"
    },
    {
      icon: FlaskConical,
      title: "Simulaciones 3D",
      description: "9 simulaciones interactivas con física realista y controles completos",
      href: "/simulaciones"
    },
    {
      icon: Calculator,
      title: "Ejercicios Resueltos",
      description: "26 problemas resueltos paso a paso (problemas 17-42)",
      href: "/ejercicios"
    },
    {
      icon: Bot,
      title: "Asistente IA",
      description: "Consulta tus dudas en tiempo real con un asistente especializado",
      href: "/asistente"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO />
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
              Algo de Fisica lab 1
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Aprende sistemas de fuerzas y máquinas simples mediante simulaciones 3D realistas, 
              teoría clara y ejercicios resueltos paso a paso
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/simulaciones">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Explorar Simulaciones
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/teoria">
                <Button size="lg" variant="outline">
                  Ver Teoría
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Main Topics */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Temas Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainTopics.map((topic) => (
                <Card key={topic.title} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl ${topic.bgColor} flex items-center justify-center mb-4`}>
                      <topic.icon className={`w-7 h-7 ${topic.color}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
                    <CardDescription className="text-base">{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={topic.href}>
                      <Button className="w-full group">
                        Explorar
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">¿Qué incluye la plataforma?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer">
                    <CardHeader>
                      <feature.icon className="w-10 h-10 text-primary mb-3" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="pt-8 pb-8 text-center">
                <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Explora 9 temas de física con simulaciones 3D, 26 ejercicios resueltos y un asistente IA 
                  que responde tus dudas en tiempo real
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/teoria">
                    <Button size="lg" variant="default">
                      <Book className="mr-2 w-5 h-5" />
                      Empezar con la Teoría
                    </Button>
                  </Link>
                  <Link href="/asistente">
                    <Button size="lg" variant="outline">
                      <Bot className="mr-2 w-5 h-5" />
                      Consultar al Asistente
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}