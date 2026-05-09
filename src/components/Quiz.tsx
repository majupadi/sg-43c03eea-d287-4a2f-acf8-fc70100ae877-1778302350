"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, RotateCcw, Award, TrendingUp, Brain } from "lucide-react";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [incorrectQuestions, setIncorrectQuestions] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (answeredQuestions.size / questions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setIsAnswered(true);
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestionIndex);
    setAnsweredQuestions(newAnsweredQuestions);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      const newIncorrectQuestions = new Set(incorrectQuestions);
      newIncorrectQuestions.add(currentQuestionIndex);
      setIncorrectQuestions(newIncorrectQuestions);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setIncorrectQuestions(new Set());
    setShowResults(false);
  };

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const getScoreGrade = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return { grade: "A+", color: "text-green-600 dark:text-green-400", message: "¡Excelente!" };
    if (percentage >= 80) return { grade: "A", color: "text-green-600 dark:text-green-400", message: "¡Muy bien!" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-600 dark:text-blue-400", message: "Buen trabajo" };
    if (percentage >= 60) return { grade: "C", color: "text-amber-600 dark:text-amber-400", message: "Aprobado" };
    return { grade: "D", color: "text-red-600 dark:text-red-400", message: "Necesitas repasar" };
  };

  if (showResults) {
    const scoreData = getScoreGrade();
    return (
      <div className="space-y-6">
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className={`w-32 h-32 rounded-full border-8 ${
                scoreData.grade.startsWith("A") ? "border-green-500" :
                scoreData.grade === "B" ? "border-blue-500" :
                scoreData.grade === "C" ? "border-amber-500" :
                "border-red-500"
              } flex items-center justify-center`}>
                <div className="text-center">
                  <p className={`text-5xl font-bold ${scoreData.color}`}>{scoreData.grade}</p>
                  <p className="text-sm text-muted-foreground mt-1">{getScorePercentage()}%</p>
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">
              {scoreData.message}
            </CardTitle>
            <CardDescription className="text-lg">
              Has completado el quiz de {title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</p>
                  <p className="text-xs text-muted-foreground">Correctas</p>
                </CardContent>
              </Card>

              <Card className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800">
                <CardContent className="p-4 text-center">
                  <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600 dark:text-red-400" />
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{questions.length - score}</p>
                  <p className="text-xs text-muted-foreground">Incorrectas</p>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-2 border-primary/20">
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary">{getScorePercentage()}%</p>
                  <p className="text-xs text-muted-foreground">Puntaje</p>
                </CardContent>
              </Card>
            </div>

            {incorrectQuestions.size > 0 && (
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>Preguntas para repasar:</strong> Tuviste {incorrectQuestions.size} respuesta(s) incorrecta(s). 
                  Te recomendamos revisar la teoría relacionada y las simulaciones correspondientes.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button onClick={handleReset} className="flex-1" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Intentar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Review incorrect answers */}
        {incorrectQuestions.size > 0 && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">📚 Repaso de Respuestas Incorrectas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from(incorrectQuestions).map((qIndex) => {
                const q = questions[qIndex];
                return (
                  <Card key={q.id} className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-2">
                        <Badge variant="destructive" className="mt-1">
                          {q.topic}
                        </Badge>
                        <p className="text-sm font-medium flex-1">{q.question}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="bg-background p-3 rounded-lg border-2 border-green-500">
                        <p className="text-sm mb-2">
                          <strong className="text-green-600 dark:text-green-400">Respuesta correcta:</strong>
                        </p>
                        <p className="text-sm">{q.options[q.correctAnswer]}</p>
                      </div>
                      <div className="mt-3 bg-background p-3 rounded-lg border">
                        <p className="text-xs text-muted-foreground mb-1">
                          <strong>Explicación:</strong>
                        </p>
                        <p className="text-xs">{q.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with progress */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <CardTitle className="text-2xl mb-1">{title}</CardTitle>
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {score}/{answeredQuestions.size}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {currentQuestionIndex + 1}/{questions.length}
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progreso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Question Card */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-3">
            <Badge className={
              currentQuestion.difficulty === "easy" ? "bg-green-500" :
              currentQuestion.difficulty === "medium" ? "bg-amber-500" :
              "bg-red-500"
            }>
              {currentQuestion.topic}
            </Badge>
            <Badge variant="outline">
              {currentQuestion.difficulty === "easy" ? "Fácil" :
               currentQuestion.difficulty === "medium" ? "Medio" : "Difícil"}
            </Badge>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const showCorrect = isAnswered && index === currentQuestion.correctAnswer;
              const showIncorrect = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? "bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-100"
                      : showIncorrect
                      ? "bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-100"
                      : isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-background border-border hover:border-primary/50 hover:bg-accent/50"
                  } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showCorrect
                        ? "bg-green-500 border-green-500"
                        : showIncorrect
                        ? "bg-red-500 border-red-500"
                        : isSelected
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}>
                      {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                      {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                      {!showCorrect && !showIncorrect && isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm md:text-base">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation - shown after answering */}
          {isAnswered && (
            <Alert className={isCorrect ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950"}>
              {isCorrect ? (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
              <AlertDescription>
                <strong className={isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  {isCorrect ? "¡Correcto! " : "Incorrecto. "}
                </strong>
                {currentQuestion.explanation}
              </AlertDescription>
            </Alert>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            {!isAnswered ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="flex-1"
                size="lg"
              >
                Confirmar Respuesta
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex-1"
                size="lg"
              >
                {currentQuestionIndex < questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultados"}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleReset}
              size="lg"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}