import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { AIAssistant } from "@/components/AIAssistant";
import { Lightbulb, MessageSquare, Calculator, Book } from "lucide-react";

export default function AsistentePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Asistente IA - Algo de Fisica lab 1"
        description="Asistente de IA especializado en física para resolver dudas sobre fuerzas, momentos, equilibrio y máquinas simples."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Asistente de Física IA
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pregunta cualquier duda sobre física. El asistente está entrenado en sistemas de fuerzas, 
              momentos, equilibrio y máquinas simples.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIAssistant />
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-mono font-bold text-lg mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    Ejemplos de preguntas
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">
                      "¿Cómo funciona una palanca de 2° género?"
                    </div>
                    <div className="p-2 bg-muted rounded">
                      "Explícame la ley de momentos"
                    </div>
                    <div className="p-2 bg-muted rounded">
                      "¿Cuál es la ventaja mecánica de una polea móvil?"
                    </div>
                    <div className="p-2 bg-muted rounded">
                      "¿Cómo se calcula la resultante de fuerzas concurrentes?"
                    </div>
                    <div className="p-2 bg-muted rounded">
                      "Ayúdame a resolver un problema de equilibrio"
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-mono font-bold text-lg mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Capacidades
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Explicaciones detalladas de conceptos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Resolución paso a paso de problemas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Fórmulas y ecuaciones relevantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Ejemplos prácticos y aplicaciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Analogías para conceptos complejos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-mono font-bold text-lg mb-3 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Temas cubiertos
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong className="text-primary">Sistemas de Fuerzas</strong>
                      <p className="text-xs text-muted-foreground">
                        Colineales, paralelas, concurrentes, métodos gráficos
                      </p>
                    </div>
                    <div>
                      <strong className="text-primary">Momentos y Equilibrio</strong>
                      <p className="text-xs text-muted-foreground">
                        Torque, cuplas, condiciones de equilibrio, DCL
                      </p>
                    </div>
                    <div>
                      <strong className="text-primary">Máquinas Simples</strong>
                      <p className="text-xs text-muted-foreground">
                        Palancas, poleas, plano inclinado, ventaja mecánica
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-mono font-bold text-lg mb-3 flex items-center gap-2">
                    <Book className="w-5 h-5 text-accent" />
                    Recursos adicionales
                  </h3>
                  <div className="space-y-2 text-sm">
                    <a
                      href="/teoria"
                      className="block p-2 bg-muted hover:bg-muted/70 rounded transition-colors"
                    >
                      📚 Ver contenido teórico completo
                    </a>
                    <a
                      href="/simulaciones"
                      className="block p-2 bg-muted hover:bg-muted/70 rounded transition-colors"
                    >
                      🎮 Explorar simulaciones 3D
                    </a>
                    <a
                      href="/ejercicios"
                      className="block p-2 bg-muted hover:bg-muted/70 rounded transition-colors"
                    >
                      ✏️ Practicar con ejercicios
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-8 bg-accent/10 border-accent/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> El asistente está en modo de desarrollo. 
                  Para habilitar respuestas completas con IA, configura la variable de entorno 
                  <code className="px-2 py-1 bg-muted rounded mx-1 font-mono">OPENAI_API_KEY</code> 
                  en tu archivo <code className="px-2 py-1 bg-muted rounded font-mono">.env.local</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  Actualmente funciona con respuestas simuladas inteligentes basadas en los temas de la plataforma.
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