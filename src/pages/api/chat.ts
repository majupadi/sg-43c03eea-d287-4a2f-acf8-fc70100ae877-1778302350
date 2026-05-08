import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type ChatRequest = {
  messages: Message[];
};

type ChatResponse = {
  message: string;
  error?: string;
};

const SYSTEM_PROMPT = `Eres un asistente experto en Física, especializado en:

1. Sistemas de Fuerzas:
   - Fuerzas colineales (suma algebraica, equilibrio)
   - Fuerzas paralelas (resultante, centro de fuerzas)
   - Fuerzas concurrentes (descomposición rectangular, resultante analítica)
   - Métodos gráficos (paralelogramo, polígono)

2. Momentos y Equilibrio:
   - Momento de fuerza (M = F × d)
   - Cuplas o pares de fuerzas
   - Condiciones de equilibrio (ΣFx=0, ΣFy=0, ΣM=0)
   - Diagrama de cuerpo libre

3. Máquinas Simples:
   - Palancas (1°, 2°, 3° género) - Ley de la palanca
   - Poleas (fija, móvil, aparejos) - Ventaja mecánica
   - Plano inclinado - Descomposición de fuerzas

Instrucciones:
- Responde EN ESPAÑOL de forma clara y educativa
- Usa ejemplos prácticos cuando sea apropiado
- Incluye fórmulas cuando sea necesario (usa notación LaTeX simple entre $...$)
- Explica paso a paso cuando resuelvas problemas
- Si el usuario pregunta algo fuera de física, redirige amablemente al tema
- Sé conciso pero completo
- Usa analogías para conceptos complejos`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "", error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "", error: "Invalid messages format" });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Modo de desarrollo: respuesta simulada
      const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
      
      let simulatedResponse = "";

      if (lastUserMessage.includes("palanca")) {
        simulatedResponse = `Las palancas son máquinas simples que permiten multiplicar la fuerza aplicada. Se clasifican en 3 géneros según la posición del fulcro, la potencia y la resistencia:

**1° Género (Fulcro en el centro):**
- Ejemplo: balancín, tijeras, alicate
- Ley: P × Bp = R × Br
- Puede ganar o perder fuerza según los brazos

**2° Género (Resistencia en el centro):**
- Ejemplo: carretilla, cascanueces
- Siempre hay ganancia mecánica (VM > 1)
- La potencia recorre más distancia

**3° Género (Potencia en el centro):**
- Ejemplo: pinzas, caña de pescar
- Hay pérdida mecánica pero ganancia en velocidad
- Útil para movimientos rápidos y precisos

¿Quieres que te explique algún tipo en particular o resolver un problema?`;
      } else if (lastUserMessage.includes("polea")) {
        simulatedResponse = `Las poleas son ruedas con una ranura por donde pasa una cuerda. Hay tres tipos principales:

**Polea Fija:**
- Está sujeta a un punto fijo
- VM = 1 (no hay ventaja mecánica)
- Solo cambia la dirección de la fuerza
- F = W (la fuerza aplicada es igual al peso)

**Polea Móvil:**
- Se mueve junto con la carga
- VM = 2 (el peso se reparte entre 2 ramales)
- F = W/2 (reduces la fuerza a la mitad)
- Debes jalar el doble de distancia

**Aparejo o Polipasto:**
- Combinación de poleas fijas y móviles
- VM = número de ramales que soportan el peso
- Con 4 ramales: F = W/4
- Ideal para cargas muy pesadas

La fórmula general es: **VM = Carga / Esfuerzo**

¿Quieres ver un ejemplo de cálculo?`;
      } else if (lastUserMessage.includes("momento") || lastUserMessage.includes("torque")) {
        simulatedResponse = `El momento de fuerza (también llamado torque) es la tendencia de una fuerza a producir rotación alrededor de un punto.

**Fórmula:**
M = F × d

Donde:
- M = Momento (N·m)
- F = Fuerza aplicada (N)
- d = Distancia perpendicular al eje de rotación (m)

**Convención de signos:**
- Momento positivo (+): rotación antihoraria
- Momento negativo (-): rotación horaria

**Condición de equilibrio rotacional:**
ΣM = 0 (la suma de todos los momentos debe ser cero)

**Ejemplo práctico:**
Si aplicas 20N en el extremo de una llave de 0.3m:
M = 20N × 0.3m = 6 N·m

¿Quieres que resolvamos un problema de equilibrio?`;
      } else if (lastUserMessage.includes("colineal")) {
        simulatedResponse = `Las fuerzas colineales son aquellas que actúan sobre la misma línea recta. Pueden tener:
- **Mismo sentido**: Se suman
- **Sentidos opuestos**: Se restan

**Convención de signos:**
- Fuerzas hacia la derecha (+)
- Fuerzas hacia la izquierda (-)

**Resultante:**
R = ΣF = F₁ + F₂ + F₃ + ...

**Ejemplo:**
F₁ = +50N (derecha)
F₂ = -30N (izquierda)
R = 50 + (-30) = +20N (hacia la derecha)

**Equilibrio:**
Si R = 0, el sistema está en equilibrio (no hay movimiento neto).

¿Necesitas ayuda con algún problema específico?`;
      } else if (lastUserMessage.includes("plano inclinado")) {
        simulatedResponse = `El plano inclinado es una superficie plana que forma un ángulo θ con la horizontal. Permite levantar objetos pesados con menos fuerza.

**Descomposición del peso:**
- **Componente paralela**: W∥ = W·sen(θ) - empuja el objeto hacia abajo
- **Componente normal**: W⊥ = W·cos(θ) - presiona contra el plano

**Ventaja mecánica:**
VM = L / h

Donde:
- L = longitud del plano
- h = altura

**Con fricción:**
F = W·sen(θ) + μ·W·cos(θ)

Donde μ es el coeficiente de fricción.

**Ejemplo:**
Si θ = 30° y W = 100N:
- W∥ = 100·sen(30°) = 50N
- W⊥ = 100·cos(30°) = 86.6N

¿Quieres resolver un problema con fricción?`;
      } else {
        simulatedResponse = `Entiendo tu pregunta. Te puedo ayudar con estos temas de Física:

📚 **Sistemas de Fuerzas:**
- Colineales, paralelas, concurrentes
- Métodos gráficos (paralelogramo, polígono)

⚖️ **Equilibrio y Momentos:**
- Momentos de fuerza (torque)
- Condiciones de equilibrio
- Diagrama de cuerpo libre

🔧 **Máquinas Simples:**
- Palancas (1°, 2°, 3° género)
- Poleas (fija, móvil, aparejos)
- Plano inclinado

Por favor, reformula tu pregunta o dime qué tema te gustaría explorar en detalle.`;
      }

      return res.status(200).json({ message: simulatedResponse });
    }

    // Modo producción: usar OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return res.status(200).json({ message: assistantMessage });

  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      message: "",
      error: "Error al procesar la solicitud. Por favor, intenta de nuevo."
    });
  }
}