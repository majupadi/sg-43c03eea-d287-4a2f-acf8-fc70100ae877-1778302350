import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { Quiz } from "@/components/Quiz";
import { physicsQuizQuestions, quizByTopic } from "@/data/quizQuestions";
import { Brain, Zap, Target, TrendingUp, BookOpen, Trophy, Triangle, Scale, RotateCw, Wrench, Settings } from "lucide-react";

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizOptions = [
    {
      id: "full",
      title: "Quiz Completo",
      description: "Todas las preguntas de todos los temas",
      icon: Brain,
      questions: physicsQuizQuestions,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950",
      count: physicsQuizQuestions.length,
    },
    {
      id: "colineales",
      title: "Fuerzas Colineales",
      description: "Suma y resta de fuerzas en línea recta",
      icon: TrendingUp,
      questions: quizByTopic["Fuerzas Colineales"],
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
      count: quizByTopic["Fuerzas Colineales"].length,
    },
    {
      id: "graficos",
      title: "Métodos Gráficos",
      description: "Paralelogramo y polígono de fuerzas",
      icon: Target,
      questions: quizByTopic["Métodos Gráficos"],
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
      count: quizByTopic["Métodos Gráficos"].length,
    },
    {
      id: "paralelas",
      title: "Fuerzas Paralelas",
      description: "Sistemas de fuerzas paralelas",
      icon: Zap,
      questions: quizByTopic["Fuerzas Paralelas"],
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-950",
      count: quizByTopic["Fuerzas Paralelas"].length,
    },
    {
      id: "momentos",
      title: "Momentos y Torque",
      description: "Fuerzas rotacionales y palancas",
      icon: Trophy,
      questions: [...quizByTopic["Momentos"], ...quizByTopic["Palancas"]],
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-950",
      count: quizByTopic["Momentos"].length + quizByTopic["Palancas"].length,
    },
    {
      id: "maquinas",
      title: "Máquinas Simples",
      description: "Poleas, planos inclinados y equilibrio",
      icon: BookOpen,
      questions: [...quizByTopic["Poleas"], ...quizByTopic["Plano Inclinado"], ...quizByTopic["Equilibrio"]],
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-950",
      count: quizByTopic["Poleas"].length + quizByTopic["Plano Inclinado"].length + quizByTopic["Equilibrio"].length,
    },
  ];

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuiz(quizId);
    setQuizStarted(true);
  };

  const handleBackToSelection = () => {
    setSelectedQuiz(null);
    setQuizStarted(false);
  };

  const currentQuiz = quizOptions.find(q => q.id === selectedQuiz);

  if (quizStarted && currentQuiz) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SEO 
          title={`Quiz: ${currentQuiz.title} - Algo de Fisica lab 1`}
          description={`Pon a prueba tus conocimientos sobre ${currentQuiz.title}. ${currentQuiz.description}`}
        />
        <Navigation />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Button 
              variant="outline" 
              onClick={handleBackToSelection}
              className="mb-6"
            >
              ← Volver a selección de quiz
            </Button>

            <Quiz
              questions={currentQuiz.questions}
              title={currentQuiz.title}
              description={currentQuiz.description}
            />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Quiz Interactivo - Algo de Fisica lab 1"
        description="Pon a prueba tus conocimientos con quizzes interactivos de física. Fuerzas, momentos, máquinas simples y más."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Quiz Interactivo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pon a prueba tus conocimientos sobre sistemas de fuerzas y máquinas simples. 
              Recibe feedback instantáneo y repasa los conceptos que necesites mejorar.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <Card className="border-2 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{physicsQuizQuestions.length}</p>
                <p className="text-sm text-muted-foreground">Preguntas Totales</p>
              </CardContent>
            </Card>

            <Card className="border-2 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {Object.keys(quizByTopic).length}
                </p>
                <p className="text-sm text-muted-foreground">Temas Cubiertos</p>
              </CardContent>
            </Card>

            <Card className="border-2 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">A+</p>
                <p className="text-sm text-muted-foreground">Calificación Máxima</p>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Selecciona un Quiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizOptions.map((quiz) => (
                <Card 
                  key={quiz.id} 
                  className="hover:shadow-lg transition-all border-2 hover:border-primary/50 cursor-pointer group"
                  onClick={() => handleStartQuiz(quiz.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg ${quiz.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <quiz.icon className={`w-6 h-6 ${quiz.color}`} />
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {quiz.count} preguntas
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {quiz.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full group-hover:bg-primary/90" asChild>
                      <div>Comenzar Quiz</div>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">💡 Cómo funcionan los quizzes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">✅ Feedback Instantáneo</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe explicaciones detalladas inmediatamente después de cada respuesta
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">📊 Seguimiento de Progreso</h4>
                  <p className="text-sm text-muted-foreground">
                    Visualiza tu puntaje y las preguntas correctas/incorrectas en tiempo real
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">🎯 Niveles de Dificultad</h4>
                  <p className="text-sm text-muted-foreground">
                    Preguntas clasificadas en fácil, medio y difícil para adaptar el desafío
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">📚 Modo Repaso</h4>
                  <p className="text-sm text-muted-foreground">
                    Revisa las preguntas incorrectas al final con explicaciones completas
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