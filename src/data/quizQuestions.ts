import type { QuizQuestion } from "@/components/Quiz";

export const physicsQuizQuestions: QuizQuestion[] = [
  // Fuerzas Colineales
  {
    id: "col-1",
    topic: "Fuerzas Colineales",
    question: "Si tres fuerzas actúan sobre una línea recta: F₁ = 50N (→), F₂ = 30N (←), F₃ = 20N (→). ¿Cuál es la resultante?",
    options: [
      "40N hacia la derecha",
      "100N hacia la derecha",
      "40N hacia la izquierda",
      "10N hacia la izquierda"
    ],
    correctAnswer: 0,
    explanation: "La resultante se calcula sumando algebraicamente: R = 50N - 30N + 20N = 40N hacia la derecha. Las fuerzas hacia la derecha son positivas y hacia la izquierda negativas.",
    difficulty: "easy"
  },
  {
    id: "col-2",
    topic: "Fuerzas Colineales",
    question: "¿Qué condición debe cumplirse para que un sistema de fuerzas colineales esté en equilibrio?",
    options: [
      "La suma de todas las fuerzas debe ser cero",
      "Todas las fuerzas deben tener la misma magnitud",
      "Debe haber al menos tres fuerzas",
      "Las fuerzas deben actuar en diferentes direcciones"
    ],
    correctAnswer: 0,
    explanation: "Para que un sistema esté en equilibrio, la resultante debe ser cero, es decir, ΣF = 0. Esto significa que las fuerzas hacia un lado deben equilibrar exactamente las fuerzas hacia el otro lado.",
    difficulty: "easy"
  },

  // Métodos Gráficos
  {
    id: "graf-1",
    topic: "Métodos Gráficos",
    question: "En el método del paralelogramo, ¿qué representa la diagonal del paralelogramo?",
    options: [
      "La fuerza resultante del sistema",
      "La suma de las magnitudes de las fuerzas",
      "El promedio de las fuerzas",
      "La diferencia entre las fuerzas"
    ],
    correctAnswer: 0,
    explanation: "En el método del paralelogramo, la diagonal que parte del origen representa la resultante vectorial de las dos fuerzas. Esta es la suma vectorial, no algebraica.",
    difficulty: "easy"
  },
  {
    id: "graf-2",
    topic: "Métodos Gráficos",
    question: "¿Cuál es la ventaja principal del método del polígono sobre el del paralelogramo?",
    options: [
      "Permite sumar más de dos fuerzas fácilmente",
      "Es más preciso",
      "Requiere menos cálculos matemáticos",
      "Solo funciona con fuerzas perpendiculares"
    ],
    correctAnswer: 0,
    explanation: "El método del polígono es ideal para sumar múltiples fuerzas (3 o más), ya que simplemente se colocan las fuerzas una tras otra punta-a-cola, mientras que el paralelogramo solo funciona eficientemente con dos fuerzas.",
    difficulty: "medium"
  },

  // Fuerzas Paralelas
  {
    id: "par-1",
    topic: "Fuerzas Paralelas",
    question: "Dos fuerzas paralelas de 40N y 60N actúan en el mismo sentido separadas 2m. ¿A qué distancia del punto de aplicación de la fuerza de 40N se encuentra el punto de aplicación de la resultante?",
    options: [
      "1.2m",
      "0.8m",
      "1.0m",
      "1.5m"
    ],
    correctAnswer: 0,
    explanation: "Usando el teorema de Varignon: F₁·d₁ = F₂·d₂, donde F₁ = 40N, F₂ = 60N, d₁ + d₂ = 2m. Resolviendo: 40·d₁ = 60·(2-d₁), d₁ = 1.2m desde la fuerza de 40N.",
    difficulty: "medium"
  },
  {
    id: "par-2",
    topic: "Fuerzas Paralelas",
    question: "¿Qué caracteriza a un par de fuerzas?",
    options: [
      "Dos fuerzas paralelas de igual magnitud pero sentido opuesto",
      "Dos fuerzas que actúan sobre el mismo punto",
      "Dos fuerzas perpendiculares entre sí",
      "Dos fuerzas que se anulan mutuamente"
    ],
    correctAnswer: 0,
    explanation: "Un par de fuerzas consiste en dos fuerzas paralelas de igual magnitud pero en sentidos opuestos. Aunque su resultante es cero, producen un momento o torque que tiende a rotar el objeto.",
    difficulty: "medium"
  },

  // Momentos y Torque
  {
    id: "mom-1",
    topic: "Momentos y Torque",
    question: "Si una fuerza de 50N se aplica perpendicularmente a 2m del punto de giro, ¿cuál es el momento producido?",
    options: [
      "100 N·m",
      "52 N·m",
      "25 N·m",
      "150 N·m"
    ],
    correctAnswer: 0,
    explanation: "El momento se calcula como M = F × d = 50N × 2m = 100 N·m. Cuando la fuerza es perpendicular al brazo de palanca, no hay que considerar componentes.",
    difficulty: "easy"
  },
  {
    id: "mom-2",
    topic: "Momentos y Torque",
    question: "¿Qué sucede si los momentos en sentido horario y antihorario son iguales?",
    options: [
      "El objeto está en equilibrio rotacional",
      "El objeto gira más rápido",
      "Se produce vibración",
      "El objeto se traslada sin rotar"
    ],
    correctAnswer: 0,
    explanation: "Cuando ΣM = 0 (suma de momentos horarios = suma de momentos antihorarios), el objeto está en equilibrio rotacional y no experimenta aceleración angular.",
    difficulty: "easy"
  },

  // Equilibrio
  {
    id: "eq-1",
    topic: "Equilibrio",
    question: "Para que un cuerpo rígido esté en equilibrio completo, ¿qué condiciones debe cumplir?",
    options: [
      "ΣF = 0 y ΣM = 0",
      "Solo ΣF = 0",
      "Solo ΣM = 0",
      "F₁ = F₂"
    ],
    correctAnswer: 0,
    explanation: "El equilibrio completo requiere dos condiciones: equilibrio de traslación (ΣF = 0) y equilibrio de rotación (ΣM = 0). Ambas deben cumplirse simultáneamente.",
    difficulty: "medium"
  },
  {
    id: "eq-2",
    topic: "Equilibrio",
    question: "¿Qué es el centro de gravedad de un objeto?",
    options: [
      "El punto donde se concentra todo el peso del objeto",
      "El punto más pesado del objeto",
      "El centro geométrico exacto",
      "El punto de mayor densidad"
    ],
    correctAnswer: 0,
    explanation: "El centro de gravedad es el punto donde actúa la resultante del peso de todas las partículas del cuerpo. Para objetos uniformes coincide con el centro geométrico.",
    difficulty: "easy"
  },

  // Palancas
  {
    id: "pal-1",
    topic: "Palancas",
    question: "En una palanca de primer género, si la resistencia es de 100N a 2m del fulcro, ¿qué fuerza se necesita a 5m del fulcro para equilibrarla?",
    options: [
      "40N",
      "50N",
      "250N",
      "100N"
    ],
    correctAnswer: 0,
    explanation: "Por equilibrio de momentos: F₁·d₁ = F₂·d₂, entonces F₁·5m = 100N·2m, F₁ = 200/5 = 40N. La ventaja mecánica es 5/2 = 2.5.",
    difficulty: "medium"
  },
  {
    id: "pal-2",
    topic: "Palancas",
    question: "¿Cuál es la característica distintiva de una palanca de segundo género?",
    options: [
      "La resistencia está entre el fulcro y la potencia",
      "La potencia está entre el fulcro y la resistencia",
      "El fulcro está en el centro",
      "No tiene ventaja mecánica"
    ],
    correctAnswer: 0,
    explanation: "En las palancas de segundo género (como la carretilla), la carga (resistencia) está ubicada entre el punto de apoyo (fulcro) y el punto donde se aplica la fuerza (potencia). Siempre proporcionan ventaja mecánica.",
    difficulty: "easy"
  },
  {
    id: "pal-3",
    topic: "Palancas",
    question: "¿Qué tipo de palanca representa el antebrazo humano al levantar un peso con la mano?",
    options: [
      "Tercer género",
      "Primer género",
      "Segundo género",
      "Ninguna"
    ],
    correctAnswer: 0,
    explanation: "El antebrazo es una palanca de tercer género donde el codo es el fulcro, el bíceps aplica la fuerza (entre el fulcro y la carga), y la mano sostiene la resistencia. Sacrifica fuerza para ganar velocidad y rango de movimiento.",
    difficulty: "medium"
  },

  // Poleas
  {
    id: "pol-1",
    topic: "Poleas",
    question: "¿Cuál es la ventaja mecánica de un sistema de poleas móviles (polipasto) con 4 poleas móviles?",
    options: [
      "4",
      "8",
      "2",
      "16"
    ],
    correctAnswer: 0,
    explanation: "En un sistema de poleas móviles, la ventaja mecánica es igual al número de segmentos de cuerda que soportan la carga móvil. Con 4 poleas móviles, VM = 4, permitiendo levantar 400N aplicando solo 100N.",
    difficulty: "medium"
  },
  {
    id: "pol-2",
    topic: "Poleas",
    question: "¿Cuál es la función principal de una polea fija?",
    options: [
      "Cambiar la dirección de la fuerza aplicada",
      "Reducir la fuerza necesaria",
      "Aumentar la velocidad",
      "Multiplicar la distancia"
    ],
    correctAnswer: 0,
    explanation: "Una polea fija no proporciona ventaja mecánica (VM=1), pero permite cambiar la dirección de la fuerza, facilitando aplicarla hacia abajo usando el propio peso, en lugar de tirar hacia arriba.",
    difficulty: "easy"
  },
  {
    id: "pol-3",
    topic: "Poleas",
    question: "En un aparejo con ventaja mecánica de 6, ¿qué distancia debe recorrer la cuerda para elevar la carga 2m?",
    options: [
      "12m",
      "3m",
      "6m",
      "2m"
    ],
    correctAnswer: 0,
    explanation: "En las poleas, la distancia recorrida por el esfuerzo es VM × distancia de la carga. Con VM=6 y elevación de 2m: distancia = 6 × 2m = 12m. Se gana fuerza a cambio de recorrer más distancia.",
    difficulty: "hard"
  },

  // Plano Inclinado
  {
    id: "pi-1",
    topic: "Plano Inclinado",
    question: "Un plano inclinado de 30° y longitud 4m, ¿cuál es su altura?",
    options: [
      "2m",
      "3.46m",
      "4m",
      "1m"
    ],
    correctAnswer: 0,
    explanation: "Usando trigonometría: h = L·sen(θ) = 4m·sen(30°) = 4m·0.5 = 2m. El seno de 30° es exactamente 0.5.",
    difficulty: "easy"
  },
  {
    id: "pi-2",
    topic: "Plano Inclinado",
    question: "¿Cómo afecta el ángulo del plano inclinado a la fuerza paralela necesaria para mover un objeto?",
    options: [
      "A mayor ángulo, mayor fuerza paralela necesaria",
      "A mayor ángulo, menor fuerza paralela necesaria",
      "El ángulo no afecta la fuerza",
      "Solo importa la fricción, no el ángulo"
    ],
    correctAnswer: 0,
    explanation: "La componente paralela del peso es F∥ = mg·sen(θ). A medida que aumenta el ángulo θ, sen(θ) aumenta, por lo tanto aumenta la fuerza paralela. En θ=90° (vertical), F∥=mg (todo el peso).",
    difficulty: "medium"
  },
  {
    id: "pi-3",
    topic: "Plano Inclinado",
    question: "Si un bloque de 50kg está en un plano inclinado de 30° con fricción μ=0.2, ¿cuál es la fuerza normal? (g=10m/s²)",
    options: [
      "433N",
      "500N",
      "250N",
      "375N"
    ],
    correctAnswer: 0,
    explanation: "La fuerza normal es N = mg·cos(θ) = 50kg·10m/s²·cos(30°) = 500N·0.866 = 433N. La normal es menor que el peso total porque parte del peso se dirige paralelo al plano.",
    difficulty: "hard"
  },

  // Tiro Parabólico
  {
    id: "tp-1",
    topic: "Tiro Parabólico",
    question: "¿A qué ángulo de lanzamiento se obtiene el máximo alcance horizontal en el vacío?",
    options: [
      "45°",
      "30°",
      "60°",
      "90°"
    ],
    correctAnswer: 0,
    explanation: "El alcance máximo se logra a 45° porque maximiza el producto sen(2θ). A este ángulo, las componentes horizontal y vertical de la velocidad inicial están balanceadas óptimamente.",
    difficulty: "easy"
  },
  {
    id: "tp-2",
    topic: "Tiro Parabólico",
    question: "En el movimiento parabólico, ¿qué componente de la velocidad permanece constante durante todo el vuelo (sin resistencia del aire)?",
    options: [
      "La componente horizontal (vₓ)",
      "La componente vertical (vᵧ)",
      "Ambas componentes",
      "Ninguna componente"
    ],
    correctAnswer: 0,
    explanation: "La componente horizontal vₓ permanece constante porque no hay aceleración horizontal (ignorando resistencia del aire). La componente vertical vᵧ cambia constantemente debido a la gravedad.",
    difficulty: "easy"
  },
  {
    id: "tp-3",
    topic: "Tiro Parabólico",
    question: "Si un proyectil se lanza con v₀=20m/s a 60°, ¿cuál es su velocidad horizontal? (sen60°≈0.866, cos60°=0.5)",
    options: [
      "10 m/s",
      "17.32 m/s",
      "20 m/s",
      "14.14 m/s"
    ],
    correctAnswer: 0,
    explanation: "La componente horizontal es vₓ = v₀·cos(θ) = 20m/s·cos(60°) = 20m/s·0.5 = 10m/s. Esta velocidad se mantiene constante durante todo el vuelo.",
    difficulty: "medium"
  },

  // Conceptos Generales
  {
    id: "gen-1",
    topic: "Conceptos Generales",
    question: "¿Cuál es la diferencia fundamental entre masa y peso?",
    options: [
      "La masa es una cantidad escalar, el peso es una cantidad vectorial",
      "Son exactamente lo mismo",
      "La masa varía con la gravedad, el peso no",
      "El peso se mide en kilogramos"
    ],
    correctAnswer: 0,
    explanation: "La masa es la cantidad de materia (escalar, en kg), mientras que el peso es la fuerza gravitatoria sobre esa masa (vectorial, en N). El peso cambia según la gravedad (W=mg), pero la masa permanece constante.",
    difficulty: "easy"
  },
  {
    id: "gen-2",
    topic: "Conceptos Generales",
    question: "¿Qué principio establece que la fuerza neta sobre un objeto es igual al producto de su masa por su aceleración?",
    options: [
      "Segunda Ley de Newton",
      "Primera Ley de Newton",
      "Tercera Ley de Newton",
      "Ley de Hooke"
    ],
    correctAnswer: 0,
    explanation: "La Segunda Ley de Newton establece que F = ma. Esta es la ecuación fundamental de la dinámica que relaciona fuerza, masa y aceleración.",
    difficulty: "easy"
  },
];

// Organize by topic for easy filtering
export const quizByTopic = {
  "Fuerzas Colineales": physicsQuizQuestions.filter(q => q.topic === "Fuerzas Colineales"),
  "Métodos Gráficos": physicsQuizQuestions.filter(q => q.topic === "Métodos Gráficos"),
  "Fuerzas Paralelas": physicsQuizQuestions.filter(q => q.topic === "Fuerzas Paralelas"),
  "Momentos y Torque": physicsQuizQuestions.filter(q => q.topic === "Momentos y Torque" || q.topic === "Palancas"),
  "Máquinas Simples": physicsQuizQuestions.filter(q => 
    q.topic === "Poleas" || 
    q.topic === "Plano Inclinado" || 
    q.topic === "Equilibrio"
  ),
  "Conceptos Generales": physicsQuizQuestions.filter(q => q.topic === "Conceptos Generales"),
};