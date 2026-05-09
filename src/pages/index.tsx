import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { 
  TrendingUp, 
  Triangle, 
  Scale, 
  Anchor, 
  Book, 
  FlaskConical, 
  Calculator,
  Brain,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const topics = [
    {
      id: "colineales",
      title: "Sistemas de Fuerzas Colineales",
      description: "Aprende a sumar y restar fuerzas que actúan sobre una misma línea recta. Incluye simulación interactiva 2D.",
      icon: TrendingUp,
      href: "/teoria/colineales",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      id: "graficos",
      title: "Métodos Gráficos",
      description: "Domina los métodos del paralelogramo y polígono para composición vectorial de fuerzas.",
      icon: Triangle,
      href: "/teoria/metodos-graficos",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
    },
    {
      id: "paralelas",
      title: "Sistemas de Fuerzas Paralelas",
      description: "Comprende sistemas donde las fuerzas actúan en direcciones paralelas con simulación 3D interactiva.",
      icon: Scale,
      href: "/teoria/paralelas",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
    {
      id: "equilibrio",
      title: "Peso y Equilibrio",
      description: "Estudia condiciones de equilibrio, centros de gravedad y estabilidad de cuerpos.",
      icon: Anchor,
      href: "/teoria/equilibrio",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-950",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Algo de Fisica lab 1 - Sistemas de Fuerzas"
        description="Plataforma educativa interactiva para aprender sistemas de fuerzas físicas mediante simulaciones realistas, teoría clara y ejercicios progresivos."
      />
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                Sistemas de Fuerzas
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Plataforma educativa interactiva para dominar sistemas de fuerzas físicas mediante 
                <strong className="text-foreground"> simulaciones 3D realistas</strong>, teoría clara y ejercicios paso a paso.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/simulaciones">
                  <FlaskConical className="mr-2 h-5 w-5" />
                  Explorar Simulaciones
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/teoria">
                  <Book className="mr-2 h-5 w-5" />
                  Ver Teoría
                </Link>
              </Button>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {topics.map((topic) => (
                <Card 
                  key={topic.id} 
                  className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-14 h-14 rounded-lg ${topic.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <topic.icon className={`w-7 h-7 ${topic.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {topic.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={topic.href}>
                        Aprender más
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quiz CTA Card */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2 text-purple-900 dark:text-purple-100">
                      Pon a Prueba tus Conocimientos
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-purple-700 dark:text-purple-300">
                      Evalúa tu comprensión con quizzes interactivos. Recibe feedback instantáneo y repasa los conceptos que necesites mejorar.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Link href="/quiz">
                      <Brain className="mr-2 h-4 w-4" />
                      Iniciar Quiz
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-purple-300 dark:border-purple-700">
                    <Link href="/ejercicios">
                      <Calculator className="mr-2 h-4 w-4" />
                      Ver Ejercicios
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Características de la Plataforma</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <FlaskConical className="w-10 h-10 text-primary mb-3" />
                  <CardTitle>Simulaciones 3D Interactivas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Experimenta con sistemas de fuerzas en entornos 3D realistas. Manipula vectores, 
                    ajusta parámetros y observa resultados en tiempo real.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Book className="w-10 h-10 text-primary mb-3" />
                  <CardTitle>Teoría Completa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Explicaciones detalladas de todos los conceptos con fórmulas, diagramas y ejemplos 
                    prácticos para facilitar tu aprendizaje.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Calculator className="w-10 h-10 text-primary mb-3" />
                  <CardTitle>Ejercicios Resueltos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    26 problemas resueltos paso a paso que cubren desde conceptos básicos hasta 
                    aplicaciones avanzadas de sistemas de fuerzas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">¿Tienes preguntas o sugerencias?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Estamos aquí para ayudarte a aprender. No dudes en contactarnos para cualquier consulta.
                    </p>
                    <a 
                      href="mailto:majupadi@gmail.com"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      majupadi@gmail.com
                    </a>
                  </div>
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