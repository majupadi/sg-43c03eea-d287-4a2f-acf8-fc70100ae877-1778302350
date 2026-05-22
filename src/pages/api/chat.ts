import type { NextApiRequest, NextApiResponse } from "next";

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!GOOGLE_GEMINI_API_KEY) {
    return res.status(500).json({ error: "Google Gemini API key not configured" });
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
- Usa fórmulas matemáticas cuando sea necesario
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

    // Google Gemini API endpoint
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt + "\n\nPregunta del usuario: " + message
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topP: 0.95,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Gemini API error:", errorData);
      return res.status(response.status).json({ 
        error: "Error al procesar la solicitud con Gemini",
        details: errorData 
      });
    }

    const data = await response.json();
    
    // Extraer el texto de la respuesta de Gemini
    const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;

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