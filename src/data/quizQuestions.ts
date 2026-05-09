import type { QuizQuestion } from "@/components/Quiz";

export const physicsQuizQuestions: QuizQuestion[] = [
  // Fuerzas Colineales
  {
    id: "col-1",
    topic: "Fuerzas Colineales",
    question: "Dos fuerzas de 50N y 30N actúan en la misma dirección sobre un objeto. ¿Cuál es la resultante?",
    options: ["20N", "80N", "40N", "100N"],
    correctAnswer: 1,
    explanation: "Cuando las fuerzas son colineales y actúan en la misma dirección, la resultante es la suma: 50N + 30N = 80N.",
    difficulty: "easy",
  },
  {
    id: "col-2",
    topic: "Fuerzas Colineales",
    question: "Si dos fuerzas de 60N y 40N actúan en direcciones opuestas, ¿cuál es la fuerza resultante?",
    options: ["100N", "20N", "50N", "0N"],
    correctAnswer: 1,
    explanation: "En direcciones opuestas, se restan: 60N - 40N = 20N en la dirección de la fuerza mayor.",
    difficulty: "easy",
  },

  // Métodos Gráficos
  {
    id: "graf-1",
    topic: "Métodos Gráficos",
    question: "¿Qué método gráfico se usa para sumar dos vectores que forman un ángulo entre sí?",
    options: ["Método del polígono", "Método del paralelogramo", "Método de componentes", "Todos los anteriores"],
    correctAnswer: 3,
    explanation: "Los tres métodos son válidos para sumar vectores. El paralelogramo es útil para dos vectores, el polígono para varios, y componentes es algebraico pero se puede visualizar.",
    difficulty: "medium",
  },
  {
    id: "graf-2",
    topic: "Métodos Gráficos",
    question: "En el método del paralelogramo, ¿dónde se encuentra el vector resultante?",
    options: ["En uno de los lados", "En la diagonal que parte del origen", "En el perímetro", "Fuera del paralelogramo"],
    correctAnswer: 1,
    explanation: "La resultante es la diagonal del paralelogramo que parte del punto de aplicación común de los dos vectores originales.",
    difficulty: "easy",
  },

  // Fuerzas Paralelas
  {
    id: "par-1",
    topic: "Fuerzas Paralelas",
    question: "Dos fuerzas paralelas de 40N y 60N actúan en la misma dirección. ¿Cuál es la resultante?",
    options: ["20N", "100N", "50N", "80N"],
    correctAnswer: 1,
    explanation: "Fuerzas paralelas en la misma dirección se suman directamente: 40N + 60N = 100N.",
    difficulty: "easy",
  },
  {
    id: "par-2",
    topic: "Fuerzas Paralelas",
    question: "¿Qué caracteriza a las fuerzas paralelas?",
    options: ["Tienen el mismo punto de aplicación", "Sus líneas de acción nunca se encuentran", "Forman 90° entre sí", "Siempre son iguales en magnitud"],
    correctAnswer: 1,
    explanation: "Las fuerzas paralelas tienen líneas de acción que son paralelas entre sí, por lo que nunca se intersecan.",
    difficulty: "medium",
  },

  // Momentos y Torque
  {
    id: "mom-1",
    topic: "Momentos",
    question: "Si aplicas una fuerza de 50N a 2m del eje de rotación, ¿cuál es el torque generado?",
    options: ["25 N·m", "52 N·m", "100 N·m", "200 N·m"],
    correctAnswer: 2,
    explanation: "El torque (momento) se calcula como τ = F × d = 50N × 2m = 100 N·m.",
    difficulty: "easy",
  },
  {
    id: "mom-2",
    topic: "Momentos",
    question: "¿Qué sucede con el torque si duplicas la distancia al eje de rotación manteniendo la misma fuerza?",
    options: ["Se reduce a la mitad", "Permanece igual", "Se duplica", "Se cuadruplica"],
    correctAnswer: 2,
    explanation: "El torque es directamente proporcional a la distancia. Si duplicas d, el torque también se duplica.",
    difficulty: "medium",
  },

  // Equilibrio
  {
    id: "eq-1",
    topic: "Equilibrio",
    question: "Para que una viga esté en equilibrio rotacional, ¿qué condición debe cumplirse?",
    options: ["La suma de fuerzas debe ser cero", "La suma de momentos debe ser cero", "Ambas condiciones", "Ninguna es necesaria"],
    correctAnswer: 2,
    explanation: "Para equilibrio completo se necesitan dos condiciones: ΣF = 0 (equilibrio traslacional) y Στ = 0 (equilibrio rotacional).",
    difficulty: "medium",
  },
  {
    id: "eq-2",
    topic: "Equilibrio",
    question: "Si dos personas de 60kg y 80kg se sientan en extremos opuestos de un balancín de 4m, ¿dónde debe estar el fulcro para equilibrio?",
    options: ["En el centro (2m)", "A 1.71m del lado de 80kg", "A 2.29m del lado de 60kg", "No se puede equilibrar"],
    correctAnswer: 1,
    explanation: "Para equilibrio: 60kg × d₁ = 80kg × d₂, donde d₁ + d₂ = 4m. Resolviendo: d₁ = 2.29m y d₂ = 1.71m desde el lado de 80kg.",
    difficulty: "hard",
  },

  // Palancas
  {
    id: "pal-1",
    topic: "Palancas",
    question: "¿Cuál es la característica principal de una palanca de primer género?",
    options: ["El fulcro está entre la potencia y la resistencia", "La resistencia está entre el fulcro y la potencia", "La potencia está entre el fulcro y la resistencia", "No tiene fulcro"],
    correctAnswer: 0,
    explanation: "En palancas de primer género, el fulcro (punto de apoyo) está ubicado entre la fuerza aplicada (potencia) y la carga (resistencia).",
    difficulty: "medium",
  },
  {
    id: "pal-2",
    topic: "Palancas",
    question: "Si una palanca tiene un brazo de potencia de 3m y un brazo de resistencia de 1m, ¿cuál es su ventaja mecánica?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    explanation: "La ventaja mecánica VM = BP/BR = 3m/1m = 3. Esto significa que puedes levantar 3 veces más peso del que aplicas.",
    difficulty: "easy",
  },

  // Poleas
  {
    id: "pol-1",
    topic: "Poleas",
    question: "¿Cuál es la ventaja mecánica de una polea fija?",
    options: ["0", "1", "2", "Variable"],
    correctAnswer: 1,
    explanation: "Una polea fija tiene VM = 1, no multiplica la fuerza, solo cambia la dirección de aplicación.",
    difficulty: "easy",
  },
  {
    id: "pol-2",
    topic: "Poleas",
    question: "En un aparejo con 4 ramales que soportan el peso, ¿cuál es la fuerza necesaria para levantar 200N?",
    options: ["200N", "100N", "50N", "25N"],
    correctAnswer: 2,
    explanation: "En un aparejo, VM = número de ramales = 4. La fuerza necesaria es F = Peso/VM = 200N/4 = 50N.",
    difficulty: "medium",
  },

  // Plano Inclinado
  {
    id: "pi-1",
    topic: "Plano Inclinado",
    question: "Un bloque de 100N está en un plano inclinado a 30°. ¿Cuál es la componente paralela al plano (aproximada)?",
    options: ["50N", "86.6N", "100N", "0N"],
    correctAnswer: 0,
    explanation: "F∥ = W·sen(θ) = 100N·sen(30°) = 100N·0.5 = 50N.",
    difficulty: "medium",
  },
  {
    id: "pi-2",
    topic: "Plano Inclinado",
    question: "¿Qué ángulo de inclinación proporciona la máxima ventaja mecánica en un plano inclinado?",
    options: ["0°", "45°", "90°", "El ángulo más pequeño posible"],
    correctAnswer: 3,
    explanation: "VM = 1/sen(θ). A menor ángulo, menor sen(θ), mayor VM. El ángulo más pequeño da la mayor ventaja (pero requiere mayor distancia).",
    difficulty: "hard",
  },

  // Tiro Parabólico
  {
    id: "tp-1",
    topic: "Tiro Parabólico",
    question: "¿Qué ángulo de lanzamiento proporciona el máximo alcance en tiro parabólico (sin resistencia del aire)?",
    options: ["30°", "45°", "60°", "90°"],
    correctAnswer: 1,
    explanation: "El alcance máximo se obtiene a 45°, donde sen(2θ) alcanza su valor máximo de 1.",
    difficulty: "easy",
  },
  {
    id: "tp-2",
    topic: "Tiro Parabólico",
    question: "En el punto más alto de la trayectoria parabólica, ¿qué velocidad tiene el proyectil?",
    options: ["Cero", "Solo velocidad horizontal", "Solo velocidad vertical", "La velocidad inicial"],
    correctAnswer: 1,
    explanation: "En el punto más alto, la velocidad vertical es cero (vy = 0), pero mantiene la velocidad horizontal constante (vx = v₀·cos(θ)).",
    difficulty: "medium",
  },
  {
    id: "tp-3",
    topic: "Tiro Parabólico",
    question: "Dos proyectiles se lanzan con ángulos de 30° y 60° a la misma velocidad. ¿Qué tienen en común?",
    options: ["Alcanzan la misma altura", "Tienen el mismo alcance", "Tienen el mismo tiempo de vuelo", "Nada"],
    correctAnswer: 1,
    explanation: "Ángulos complementarios (30° y 60°) producen el mismo alcance horizontal porque sen(60°) = sen(120°).",
    difficulty: "hard",
  },

  // Conceptos Generales
  {
    id: "gen-1",
    topic: "Conceptos Generales",
    question: "¿Cuál es la unidad del Sistema Internacional para la fuerza?",
    options: ["Kilogramo (kg)", "Newton (N)", "Joule (J)", "Pascal (Pa)"],
    correctAnswer: 1,
    explanation: "El Newton (N) es la unidad de fuerza en el SI. 1N = 1 kg·m/s².",
    difficulty: "easy",
  },
  {
    id: "gen-2",
    topic: "Conceptos Generales",
    question: "¿Qué representa un vector en física?",
    options: ["Solo una magnitud", "Magnitud y dirección", "Solo una dirección", "Un punto en el espacio"],
    correctAnswer: 1,
    explanation: "Un vector tiene magnitud (tamaño), dirección (ángulo) y sentido (hacia dónde apunta).",
    difficulty: "easy",
  },
  {
    id: "gen-3",
    topic: "Conceptos Generales",
    question: "¿Cuál de estas NO es una máquina simple?",
    options: ["Palanca", "Polea", "Motor eléctrico", "Plano inclinado"],
    correctAnswer: 2,
    explanation: "Las máquinas simples son dispositivos mecánicos básicos (palanca, polea, plano inclinado, cuña, tornillo, rueda). Un motor eléctrico es una máquina compuesta.",
    difficulty: "medium",
  },
];

export const quizzesByTopic: Record<string, QuizQuestion[]> = {
  "Fuerzas Colineales": physicsQuizQuestions.filter(q => q.topic === "Fuerzas Colineales"),
  "Métodos Gráficos": physicsQuizQuestions.filter(q => q.topic === "Métodos Gráficos"),
  "Fuerzas Paralelas": physicsQuizQuestions.filter(q => q.topic === "Fuerzas Paralelas"),
  "Momentos": physicsQuizQuestions.filter(q => q.topic === "Momentos"),
  "Equilibrio": physicsQuizQuestions.filter(q => q.topic === "Equilibrio"),
  "Palancas": physicsQuizQuestions.filter(q => q.topic === "Palancas"),
  "Poleas": physicsQuizQuestions.filter(q => q.topic === "Poleas"),
  "Plano Inclinado": physicsQuizQuestions.filter(q => q.topic === "Plano Inclinado"),
  "Tiro Parabólico": physicsQuizQuestions.filter(q => q.topic === "Tiro Parabólico"),
  "Conceptos Generales": physicsQuizQuestions.filter(q => q.topic === "Conceptos Generales"),
};