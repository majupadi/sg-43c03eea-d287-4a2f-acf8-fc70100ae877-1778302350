"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bot, Send, Loader2, BookOpen, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const exampleQuestions = [
  "¿Cómo sumar dos fuerzas con el método del paralelogramo?",
  "¿Qué es el momento de una fuerza?",
  "Explícame las condiciones de equilibrio",
  "¿Cómo funcionan las poleas compuestas?",
  "¿Qué diferencia hay entre fuerzas colineales y concurrentes?"
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy tu asistente de física 🔬\n\nPuedo ayudarte con:\n- Sistemas de fuerzas\n- Métodos gráficos\n- Momentos y equilibrio\n- Máquinas simples\n- Resolución de problemas\n\n¿En qué puedo ayudarte hoy?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          Asistente de Física IA
          <Sparkles className="w-4 h-4 text-accent ml-auto" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
                <p className="text-xs opacity-60 mt-1">
                  {msg.timestamp.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Pensando...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preguntas de ejemplo */}
        {messages.length === 1 && (
          <div className="p-4 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              Preguntas de ejemplo:
            </p>
            <div className="space-y-2">
              {exampleQuestions.slice(0, 3).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => sendMessage(question)}
                >
                  <span className="text-xs">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <Alert className="mb-3">
            <AlertDescription className="text-xs">
              💡 <strong>Tip:</strong> Pregunta sobre cualquier tema de física de la plataforma. 
              El asistente está especializado en sistemas de fuerzas.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta sobre física..."
              disabled={loading}
              className="flex-1"
            />
            <Button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}