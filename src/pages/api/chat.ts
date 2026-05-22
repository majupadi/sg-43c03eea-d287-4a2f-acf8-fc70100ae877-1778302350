import type { NextApiRequest, NextApiResponse } from "next";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "OpenRouter API key not configured" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Sistema de prompts especializado en física
    const systemPrompt = `Eres un asistente educativo experto en FÍSICA, especializado en:

**TEMAS PRINCIPALES:**
1. Sistemas de Fuerzas Colineales (fuerzas en línea recta)
2. Métodos Gráficos (Paralelogramo y Polígono)
3. Sistemas de Fuerzas Paralelas
4. Fuerzas Concurrentes (punto común de aplicación)
5. Momentos de Fuerza y Torque
6. Equilibrio de Cuerpos Rígidos
7. Máquinas Simples (Palancas, Poleas, Plano Inclinado)

**TU ENFOQUE:**
- Explicaciones claras, precisas y educativas
- Usa fórmulas matemáticas cuando sea necesario (formato LaTeX si es posible)
- Da ejemplos prácticos y cotidianos
- Paso a paso para resolver problemas
- Relaciona conceptos entre sí

**CONTEXTO DE LA PLATAFORMA:**
Esta es una plataforma educativa de física con:
- 42 ejercicios resueltos organizados por tema
- Simulaciones interactivas 2D y 3D
- Teoría completa con diagramas
- Calculadoras de resultantes
- Quiz interactivo

**ESTILO DE RESPUESTA:**
1. Breve introducción conceptual
2. Fórmulas relevantes
3. Pasos de resolución
4. Ejemplo numérico si es pertinente
5. Consejo práctico

**IMPORTANTE:**
- No inventes datos o fórmulas incorrectas
- Si no estás seguro, admítelo y sugiere recursos
- Usa unidades del SI (Newton, metros, segundos)
- Explica conversiones cuando uses kgf (1 kgf = 9.8 N)

Responde en español de forma amigable pero técnicamente precisa.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Algo de Fisica lab 1"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      return res.status(response.status).json({ 
        error: "Error al procesar la solicitud",
        details: errorData 
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({ error: "No se recibió respuesta del asistente" });
    }

    return res.status(200).json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}