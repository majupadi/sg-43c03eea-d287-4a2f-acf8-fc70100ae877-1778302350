"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy,
  Share2,
  Download
} from "lucide-react";

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface QuizProps {
  questions: QuizQuestion[];
  title: string;
  description?: string;
}

export function Quiz({ questions, title, description }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const correctAnswers = userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
  const incorrectAnswers = userAnswers.filter((answer, index) => answer !== null && answer !== questions[index].correctAnswer).length;

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(optionIndex);
      setShowExplanation(true);

      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = optionIndex;
      setUserAnswers(newAnswers);

      if (optionIndex === question.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers(Array(questions.length).fill(null));
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 95) return { grade: "A+", color: "text-green-600 dark:text-green-400" };
    if (percentage >= 90) return { grade: "A", color: "text-green-600 dark:text-green-400" };
    if (percentage >= 80) return { grade: "B", color: "text-blue-600 dark:text-blue-400" };
    if (percentage >= 70) return { grade: "C", color: "text-yellow-600 dark:text-yellow-400" };
    if (percentage >= 60) return { grade: "D", color: "text-orange-600 dark:text-orange-400" };
    return { grade: "F", color: "text-red-600 dark:text-red-400" };
  };

  const percentage = (score / questions.length) * 100;
  const gradeInfo = getGrade(percentage);

  const generateSocialCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size for social media (1200x630 is optimal for most platforms)
    canvas.width = 1200;
    canvas.height = 630;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#1e3a8a"); // navy
    gradient.addColorStop(1, "#1e40af"); // blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 60, 0);
      ctx.lineTo(canvas.width, canvas.height - i * 60);
      ctx.stroke();
    }

    // White overlay for content area
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.roundRect(60, 60, canvas.width - 120, canvas.height - 120, 20);
    ctx.fill();

    // Border
    ctx.strokeStyle = "#f59e0b"; // amber accent
    ctx.lineWidth = 8;
    ctx.roundRect(60, 60, canvas.width - 120, canvas.height - 120, 20);
    ctx.stroke();

    // Logo/Brand
    ctx.fillStyle = "#1e3a8a";
    ctx.font = "bold 48px 'JetBrains Mono', monospace";
    ctx.fillText("⚡ Algo de Fisica", 120, 150);

    // Title
    ctx.fillStyle = "#374151";
    ctx.font = "600 36px 'IBM Plex Sans', sans-serif";
    const titleText = "Resultado del Quiz";
    ctx.fillText(titleText, 120, 220);

    // Quiz topic
    ctx.fillStyle = "#6b7280";
    ctx.font = "500 28px 'IBM Plex Sans', sans-serif";
    ctx.fillText(title, 120, 270);

    // Score circle - large and prominent
    const centerX = canvas.width - 300;
    const centerY = 280;
    const radius = 120;

    // Circle background
    ctx.fillStyle = "#f3f4f6";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Progress arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * percentage) / 100;
    
    ctx.strokeStyle = percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 8, startAngle, endAngle);
    ctx.stroke();

    // Percentage text
    ctx.fillStyle = "#1e3a8a";
    ctx.font = "bold 64px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${Math.round(percentage)}%`, centerX, centerY + 10);

    // Grade
    ctx.font = "bold 36px 'JetBrains Mono', monospace";
    ctx.fillStyle = percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444";
    ctx.fillText(gradeInfo.grade, centerX, centerY + 60);

    // Statistics boxes
    ctx.textAlign = "left";
    const statsY = 380;
    const boxWidth = 280;
    const boxHeight = 120;
    const boxSpacing = 40;

    // Correct answers box
    ctx.fillStyle = "#dcfce7";
    ctx.roundRect(120, statsY, boxWidth, boxHeight, 12);
    ctx.fill();
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 3;
    ctx.roundRect(120, statsY, boxWidth, boxHeight, 12);
    ctx.stroke();

    ctx.fillStyle = "#166534";
    ctx.font = "600 24px 'IBM Plex Sans', sans-serif";
    ctx.fillText("Correctas", 150, statsY + 40);
    ctx.font = "bold 48px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#10b981";
    ctx.fillText(`${correctAnswers}`, 150, statsY + 90);

    // Incorrect answers box
    const box2X = 120 + boxWidth + boxSpacing;
    ctx.fillStyle = "#fee2e2";
    ctx.roundRect(box2X, statsY, boxWidth, boxHeight, 12);
    ctx.fill();
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.roundRect(box2X, statsY, boxWidth, boxHeight, 12);
    ctx.stroke();

    ctx.fillStyle = "#991b1b";
    ctx.font = "600 24px 'IBM Plex Sans', sans-serif";
    ctx.fillText("Incorrectas", box2X + 30, statsY + 40);
    ctx.font = "bold 48px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#ef4444";
    ctx.fillText(`${incorrectAnswers}`, box2X + 30, statsY + 90);

    // Total questions box
    const box3X = box2X + boxWidth + boxSpacing;
    ctx.fillStyle = "#dbeafe";
    ctx.roundRect(box3X, statsY, boxWidth, boxHeight, 12);
    ctx.fill();
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.roundRect(box3X, statsY, boxWidth, boxHeight, 12);
    ctx.stroke();

    ctx.fillStyle = "#1e3a8a";
    ctx.font = "600 24px 'IBM Plex Sans', sans-serif";
    ctx.fillText("Total", box3X + 30, statsY + 40);
    ctx.font = "bold 48px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#2563eb";
    ctx.fillText(`${questions.length}`, box3X + 30, statsY + 90);

    // Footer
    ctx.fillStyle = "#9ca3af";
    ctx.font = "500 20px 'IBM Plex Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Plataforma de Física Interactiva • majupadi@gmail.com", canvas.width / 2, canvas.height - 40);
  };

  const downloadSocialCard = () => {
    generateSocialCard();
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `quiz-resultado-${percentage.toFixed(0)}pct.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    if (quizCompleted) {
      generateSocialCard();
    }
  }, [quizCompleted]);

  if (quizCompleted) {
    return (
      <div className="space-y-6">
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-amber-500" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">¡Quiz Completado!</CardTitle>
            <CardDescription className="text-base">
              Has terminado el quiz de <strong>{title}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border-2 border-primary/20">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Tu Puntuación</p>
                <p className="text-5xl md:text-6xl font-bold font-mono">
                  {score}/{questions.length}
                </p>
                <p className="text-2xl md:text-3xl font-bold">
                  {percentage.toFixed(1)}%
                </p>
                <Badge variant="outline" className={`text-lg px-4 py-1 ${gradeInfo.color}`}>
                  Calificación: {gradeInfo.grade}
                </Badge>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{correctAnswers}</p>
                  <p className="text-sm text-muted-foreground">Correctas</p>
                </CardContent>
              </Card>

              <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                <CardContent className="pt-6 text-center">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{incorrectAnswers}</p>
                  <p className="text-sm text-muted-foreground">Incorrectas</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6 text-center">
                  <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{questions.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </CardContent>
              </Card>
            </div>

            {/* Social Share Card Preview */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Comparte tu Resultado
                </CardTitle>
                <CardDescription>
                  Descarga una imagen para compartir en redes sociales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Canvas preview (hidden but rendered) */}
                <div className="hidden">
                  <canvas ref={canvasRef} />
                </div>
                
                {/* Preview of the generated image */}
                <div className="relative rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
                  <canvas 
                    ref={canvasRef}
                    className="w-full h-auto"
                    style={{ maxHeight: "315px" }}
                  />
                </div>

                <Button 
                  onClick={downloadSocialCard}
                  className="w-full"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Imagen (1200x630 PNG)
                </Button>
              </CardContent>
            </Card>

            {/* Performance Message */}
            <Alert className={percentage >= 80 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : 
                             percentage >= 60 ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800" :
                             "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"}>
              <AlertDescription className="text-sm leading-relaxed">
                {percentage >= 90 && "¡Excelente trabajo! Dominas este tema completamente. 🎉"}
                {percentage >= 80 && percentage < 90 && "¡Muy bien! Tienes un buen entendimiento del tema. 👏"}
                {percentage >= 70 && percentage < 80 && "Buen trabajo. Repasa algunos conceptos para mejorar. 📚"}
                {percentage >= 60 && percentage < 70 && "Aprobado. Te recomendamos revisar la teoría y practicar más. 📖"}
                {percentage < 60 && "Necesitas más práctica. Revisa la teoría y vuelve a intentarlo. 💪"}
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reintentar Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="font-mono font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="border-2 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <Badge variant="outline" className="w-fit">
              {question.topic}
            </Badge>
            <Badge 
              variant={
                question.difficulty === "easy" ? "default" : 
                question.difficulty === "medium" ? "secondary" : 
                "destructive"
              }
              className="w-fit"
            >
              {question.difficulty === "easy" ? "Fácil" : 
               question.difficulty === "medium" ? "Medio" : "Difícil"}
            </Badge>
          </div>
          <CardTitle className="text-xl md:text-2xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = showExplanation;

              const buttonVariant: "outline" | "default" | "secondary" = "outline";
              let buttonClass = "";

              if (showResult) {
                if (isCorrect) {
                  buttonClass = "border-green-500 bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900";
                } else if (isSelected && !isCorrect) {
                  buttonClass = "border-red-500 bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900";
                }
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full justify-start text-left h-auto py-4 px-4 ${buttonClass}`}
                >
                  <span className="flex items-center gap-3 w-full">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    )}
                  </span>
                </Button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <Alert className={selectedAnswer === question.correctAnswer ? 
              "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : 
              "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
            }>
              <AlertDescription className="text-sm leading-relaxed">
                <p className="font-semibold mb-2">
                  {selectedAnswer === question.correctAnswer ? "✓ ¡Correcto!" : "✗ Incorrecto"}
                </p>
                <p>{question.explanation}</p>
              </AlertDescription>
            </Alert>
          )}

          {/* Next Button */}
          {showExplanation && (
            <Button onClick={handleNextQuestion} className="w-full" size="lg">
              {currentQuestion < questions.length - 1 ? (
                <>
                  Siguiente Pregunta
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  Ver Resultados
                  <Trophy className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}