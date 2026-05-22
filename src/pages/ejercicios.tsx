import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEO } from "@/components/SEO";
import { Calculator, CheckCircle2, BookOpen, PlayCircle } from "lucide-react";
import Link from "next/link";
import { InteractiveExercise } from "@/components/InteractiveExercise";

export default function Ejercicios() {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [showInteractive, setShowInteractive] = useState(false);

  const ejercicios = [
    {
      id: 17,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Problema 17-18",
      description: "Calcular la resultante de 6 fuerzas colineales",
      datos: [
        "F₁ = 20 Kgf (→)",
        "F₂ = 15 Kgf (←)",
        "F₃ = 30 Kgf (→)",
        "F₄ = 12 Kgf (←)",
        "F₅ = 25 Kgf (→)",
        "F₆ = 51 Kgf (←)"
      ],
      solucion: {
        pasos: [
          "Establecer convención de signos: derecha (+), izquierda (-)",
          "Sumar fuerzas hacia la derecha: ΣF(+) = 20 + 30 + 25 = 75 Kgf",
          "Sumar fuerzas hacia la izquierda: ΣF(-) = 15 + 12 + 51 = 78 Kgf",
          "Calcular resultante: R = ΣF(+) - ΣF(-) = 75 - 78 = -3 Kgf",
          "Como el resultado es negativo, la resultante es 3 Kgf hacia la izquierda"
        ],
        respuesta: "R = 3 Kgf hacia la izquierda"
      }
    },
    {
      id: 19,
      topic: "graficos",
      title: "Método del Paralelogramo (60°)",
      description: "Dos fuerzas con ángulo de 60° entre ellas",
      datos: [
        "F₁ = 30 N",
        "F₂ = 40 N",
        "Ángulo θ = 60°",
        "Aplicar R = √(F₁² + F₂² + 2·F₁·F₂·cos(θ))"
      ],
      solucion: {
        pasos: [
          "Sustituir en fórmula: R = √(30² + 40² + 2·30·40·cos(60°))",
          "Calcular: R = √(900 + 1600 + 2400·0.5)",
          "R = √(900 + 1600 + 1200) = √3700",
          "R ≈ 60.83 N",
          "Ángulo: α = arctan[(40·sen(60°))/(30 + 40·cos(60°))] ≈ 34.7°"
        ],
        respuesta: "R ≈ 60.83 N a 34.7° de F₁"
      }
    },
    {
      id: 20,
      topic: "graficos",
      title: "Método del Paralelogramo (90°)",
      description: "Dos fuerzas perpendiculares entre sí",
      datos: [
        "F₁ = 50 Kgf",
        "F₂ = 80 Kgf",
        "Ángulo θ = 90°",
        "Para θ=90°, R = √(F₁² + F₂²)"
      ],
      solucion: {
        pasos: [
          "Como θ = 90°, usar R = √(F₁² + F₂²)",
          "R = √(50² + 80²)",
          "R = √(2500 + 6400) = √8900",
          "R ≈ 94.34 Kgf",
          "Ángulo: α = arctan(80/50) = arctan(1.6) ≈ 58°"
        ],
        respuesta: "R ≈ 94.34 Kgf a 58° de F₁"
      }
    },
    {
      id: 21,
      topic: "graficos",
      title: "Método del Polígono - 3 Fuerzas",
      description: "Sumar tres fuerzas concurrentes",
      datos: [
        "F₁ = 20 N a 0°",
        "F₂ = 30 N a 60°",
        "F₃ = 25 N a 135°",
        "Método: polígono vectorial"
      ],
      solucion: {
        pasos: [
          "Descomponer: Rx = 20·cos(0°) + 30·cos(60°) + 25·cos(135°) = 17.32 N",
          "Ry = 20·sen(0°) + 30·sen(60°) + 25·sen(135°) = 43.66 N",
          "R = √(Rx² + Ry²) = √(17.32² + 43.66²)",
          "R ≈ 46.97 N",
          "α = arctan(Ry/Rx) = arctan(43.66/17.32) ≈ 68.3°"
        ],
        respuesta: "R ≈ 47 N a 68°"
      }
    },
    {
      id: 22,
      topic: "equilibrio",
      title: "Sistema en Equilibrio - Hallar F₃",
      description: "Tres fuerzas concurrentes en equilibrio",
      datos: [
        "F₁ = 50 N horizontal →",
        "F₂ = 60 N a 120°",
        "F₃ = ? (calcular para equilibrio)",
        "Condición: ΣFx = 0, ΣFy = 0"
      ],
      solucion: {
        pasos: [
          "F₁x = 50 N, F₁y = 0 N",
          "F₂x = 60·cos(120°) = -30 N, F₂y = 60·sen(120°) = 51.96 N",
          "Para equilibrio: F₃x = -20 N, F₃y = -51.96 N",
          "F₃ = √(20² + 51.96²) ≈ 55.67 N",
          "Dirección: 249° (tercer cuadrante)"
        ],
        respuesta: "F₃ ≈ 55.67 N a 249°"
      }
    },
    {
      id: 23,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Mismo Sentido",
      description: "Tres fuerzas verticales sobre una viga",
      datos: [
        "F₁ = 100 N a 2 m del origen",
        "F₂ = 150 N a 5 m",
        "F₃ = 80 N a 8 m",
        "Todas hacia abajo"
      ],
      solucion: {
        pasos: [
          "Resultante: R = F₁ + F₂ + F₃ = 100 + 150 + 80 = 330 N ↓",
          "Posición (Teorema de Varignon): R·d = F₁·d₁ + F₂·d₂ + F₃·d₃",
          "330·d = 100·2 + 150·5 + 80·8",
          "330·d = 200 + 750 + 640 = 1590",
          "d = 1590/330 = 4.82 m del origen"
        ],
        respuesta: "R = 330 N a 4.82 m del origen"
      }
    },
    {
      id: 24,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Distinto Sentido",
      description: "Dos fuerzas paralelas opuestas",
      datos: [
        "F₁ = 200 N ↑ en x = 0",
        "F₂ = 120 N ↓ en x = 6 m",
        "Hallar R y su posición"
      ],
      solucion: {
        pasos: [
          "R = F₁ - F₂ = 200 - 120 = 80 N ↑",
          "Momentos respecto al origen: R·d = F₁·0 + (-F₂)·6",
          "80·d = 0 - 120·6 = -720",
          "d = -720/80 = -9 m",
          "La resultante está 9 m a la izquierda del origen"
        ],
        respuesta: "R = 80 N ↑ a 9 m izquierda del origen"
      }
    },
    {
      id: 25,
      topic: "momentos",
      title: "Par de Fuerzas (Cupla)",
      description: "Dos fuerzas iguales y opuestas",
      datos: [
        "F₁ = 50 N ↑",
        "F₂ = 50 N ↓",
        "Separación d = 0.8 m",
        "Calcular momento del par"
      ],
      solucion: {
        pasos: [
          "En un par: R = F₁ - F₂ = 0 (no hay traslación)",
          "Momento del par: M = F · d",
          "M = 50 · 0.8 = 40 N·m",
          "El momento es independiente del punto de referencia",
          "Produce solo rotación pura"
        ],
        respuesta: "M = 40 N·m"
      }
    },
    {
      id: 26,
      topic: "equilibrio",
      title: "Equilibrio de Viga - Reacciones",
      description: "Viga con dos cargas, calcular reacciones en apoyos",
      datos: [
        "Viga de 6 m con apoyos en A (x=0) y B (x=6m)",
        "F₁ = 300 N ↓ en x = 2 m",
        "F₂ = 200 N ↓ en x = 5 m",
        "Calcular RA y RB"
      ],
      solucion: {
        pasos: [
          "ΣFy = 0: RA + RB = 300 + 200 = 500 N",
          "ΣMA = 0: RB·6 = 300·2 + 200·5 = 600 + 1000 = 1600",
          "RB = 1600/6 = 266.67 N",
          "RA = 500 - 266.67 = 233.33 N",
          "Verificar: RA·6 = 300·4 + 200·1 = 1400 ✓"
        ],
        respuesta: "RA = 233.33 N, RB = 266.67 N"
      }
    },
    {
      id: 27,
      topic: "equilibrio",
      title: "Centro de Gravedad - Sistema de Masas",
      description: "Tres masas puntuales en el plano",
      datos: [
        "m₁ = 5 kg en (0, 0)",
        "m₂ = 8 kg en (4, 0)",
        "m₃ = 3 kg en (2, 3)",
        "Hallar centro de gravedad"
      ],
      solucion: {
        pasos: [
          "Masa total: M = 5 + 8 + 3 = 16 kg",
          "xG = (5·0 + 8·4 + 3·2)/16 = (0 + 32 + 6)/16 = 2.375 m",
          "yG = (5·0 + 8·0 + 3·3)/16 = (0 + 0 + 9)/16 = 0.5625 m",
          "El CG está más cerca de m₂ (masa mayor)",
          "Ligeramente desplazado hacia m₃"
        ],
        respuesta: "CG en (2.375 m, 0.5625 m)"
      }
    },
    {
      id: 28,
      topic: "momentos",
      title: "Momento de una Fuerza Perpendicular",
      description: "Calcular el momento producido por una fuerza",
      datos: [
        "Fuerza F = 80 N perpendicular a una barra",
        "Distancia r = 0.6 m",
        "Calcular momento respecto a O"
      ],
      solucion: {
        pasos: [
          "Para fuerza perpendicular: θ = 90°, sin(90°) = 1",
          "Aplicar: M = F × r × sin(θ)",
          "M = 80 × 0.6 × 1",
          "M = 48 N·m",
          "Sentido: antihorario (momento positivo)"
        ],
        respuesta: "M = 48 N·m (antihorario)"
      }
    },
    {
      id: 29,
      topic: "momentos",
      title: "Momento con Ángulo 60°",
      description: "Fuerza formando ángulo con la horizontal",
      datos: [
        "F = 100 N",
        "Distancia r = 0.8 m",
        "Ángulo θ = 60°"
      ],
      solucion: {
        pasos: [
          "Aplicar: M = F × r × sin(θ)",
          "sin(60°) = 0.866",
          "M = 100 × 0.8 × 0.866",
          "M = 69.28 N·m",
          "Redondear: M ≈ 69.3 N·m"
        ],
        respuesta: "M = 69.3 N·m"
      }
    },
    {
      id: 30,
      topic: "momentos",
      title: "Cupla - Momento de Par",
      description: "Calcular momento de una cupla",
      datos: [
        "Dos fuerzas paralelas F = 50 N",
        "Sentidos opuestos",
        "Separación d = 0.4 m"
      ],
      solucion: {
        pasos: [
          "Cupla: M = F × d",
          "M = 50 × 0.4 = 20 N·m",
          "Produce rotación pura (no traslación)",
          "Momento independiente del punto de referencia",
          "Útil en mecanismos de transmisión"
        ],
        respuesta: "M = 20 N·m"
      }
    },
    {
      id: 31,
      topic: "equilibrio",
      title: "Equilibrio de Viga - Dos Fuerzas",
      description: "Calcular reacción en apoyo simple",
      datos: [
        "Viga de 6 m, apoyo en A (x=0)",
        "F₁ = 40 N a 2 m de A",
        "F₂ = 60 N a 5 m de A"
      ],
      solucion: {
        pasos: [
          "ΣFy = 0: RA - F₁ - F₂ = 0",
          "RA = 40 + 60 = 100 N ↑",
          "Verificar con momentos: ΣMA = 0",
          "-40(2) - 60(5) = -80 - 300 = -380 N·m",
          "Equilibrado por reacción en A"
        ],
        respuesta: "RA = 100 N ↑"
      }
    },
    {
      id: 32,
      topic: "equilibrio",
      title: "Equilibrio con Momento Externo",
      description: "Viga con fuerzas y momento aplicado",
      datos: [
        "Viga de 4 m, apoyos en A y B",
        "F = 80 N a 1.5 m de A",
        "Momento M = 100 N·m en el centro"
      ],
      solucion: {
        pasos: [
          "ΣFy = 0: RA + RB - 80 = 0",
          "ΣMA = 0: -80(1.5) - 100 + RB(4) = 0",
          "-120 - 100 + 4RB = 0",
          "4RB = 220 → RB = 55 N",
          "RA = 80 - 55 = 25 N"
        ],
        respuesta: "RA = 25 N, RB = 55 N"
      }
    },
    {
      id: 33,
      topic: "equilibrio",
      title: "Viga en Voladizo (Empotrada)",
      description: "Calcular reacciones en empotramiento",
      datos: [
        "Viga empotrada en A, longitud 3 m",
        "Carga uniforme w = 20 N/m",
        "Calcular MA y RA"
      ],
      solucion: {
        pasos: [
          "Carga total: W = w × L = 20 × 3 = 60 N",
          "Actúa en el centro: a 1.5 m de A",
          "MA = W × 1.5 = 60 × 1.5 = 90 N·m",
          "RA = 60 N ↑ (equilibrio vertical)",
          "MA equilibra la rotación"
        ],
        respuesta: "MA = 90 N·m, RA = 60 N"
      }
    },
    {
      id: 34,
      topic: "momentos",
      title: "Suma de Momentos - Sistema Completo",
      description: "Múltiples fuerzas - momento total",
      datos: [
        "Respecto a O:",
        "F₁ = 30 N a 0.5 m (antihorario)",
        "F₂ = 20 N a 0.8 m (horario)",
        "F₃ = 40 N a 0.3 m (antihorario)"
      ],
      solucion: {
        pasos: [
          "M₁ = +30 × 0.5 = +15 N·m",
          "M₂ = -20 × 0.8 = -16 N·m",
          "M₃ = +40 × 0.3 = +12 N·m",
          "ΣM = 15 - 16 + 12 = 11 N·m",
          "Positivo → rotación antihoraria"
        ],
        respuesta: "ΣM = 11 N·m (antihorario)"
      }
    },
    {
      id: 35,
      topic: "equilibrio",
      title: "Equilibrio - Tres Fuerzas Concurrentes",
      description: "Encontrar fuerza desconocida para equilibrio",
      datos: [
        "Tres fuerzas concurrentes en equilibrio",
        "F₁ = 50 N a 0°",
        "F₂ = 40 N a 120°",
        "Hallar F₃"
      ],
      solucion: {
        pasos: [
          "F₁x = 50, F₁y = 0",
          "F₂x = 40·cos(120°) = -20, F₂y = 40·sin(120°) = 34.64",
          "Para equilibrio: F₃x = -30, F₃y = -34.64",
          "F₃ = √(30² + 34.64²) = 45.8 N",
          "θ₃ = arctan(34.64/30) + 180° = 229°"
        ],
        respuesta: "F₃ = 45.8 N a 229°"
      }
    },
    {
      id: 36,
      topic: "momentos",
      title: "Palanca Simple - Ley de la Palanca",
      description: "Equilibrio de palanca",
      datos: [
        "Fulcro en el centro",
        "F₁ = 200 N a 0.3 m del fulcro",
        "¿F₂ necesaria a 1.2 m?"
      ],
      solucion: {
        pasos: [
          "Ley de la palanca: F₁ × d₁ = F₂ × d₂",
          "200 × 0.3 = F₂ × 1.2",
          "60 = F₂ × 1.2",
          "F₂ = 60/1.2 = 50 N",
          "Ventaja mecánica: 200/50 = 4"
        ],
        respuesta: "F₂ = 50 N"
      }
    },
    {
      id: 37,
      topic: "equilibrio",
      title: "Viga con Carga Distribuida",
      description: "Carga uniformemente distribuida",
      datos: [
        "Viga de 8 m, apoyos en extremos A y B",
        "Carga uniforme w = 30 N/m",
        "Calcular RA y RB"
      ],
      solucion: {
        pasos: [
          "Carga total: W = w × L = 30 × 8 = 240 N",
          "Actúa en el centro (4 m de cada extremo)",
          "Por simetría: RA = RB = W/2 = 120 N",
          "Verificar: -240(4) + RB(8) = 0 → RB = 120 N ✓",
          "Sistema perfectamente simétrico"
        ],
        respuesta: "RA = RB = 120 N"
      }
    },
    {
      id: 38,
      topic: "concurrentes",
      title: "Sistemas de Fuerzas Concurrentes - Método Gráfico",
      description: "Ejercicio 38: Tres fuerzas concurrentes - Hallar R y E",
      datos: [
        "F₁ = 10 kgf a 0° (horizontal derecha)",
        "F₂ = 20 kgf a 135° (segundo cuadrante)",
        "F₃ = 15 kgf a 270° (vertical abajo)",
        "Usar métodos: Paralelogramo y Polígono"
      ],
      interactive: true,
      initialForces: [
        { magnitude: 10, angle: 0, unit: "kgf" as const },
        { magnitude: 20, angle: 135, unit: "kgf" as const },
        { magnitude: 15, angle: 270, unit: "kgf" as const }
      ],
      solucion: {
        pasos: [
          "Convertir a Newtons: F₁ = 98 N, F₂ = 196 N, F₃ = 147 N",
          "Componentes X: 98·cos(0°) + 196·cos(135°) + 147·cos(270°) = 98 - 138.6 + 0 = -40.6 N",
          "Componentes Y: 98·sin(0°) + 196·sin(135°) + 147·sin(270°) = 0 + 138.6 - 147 = -8.4 N",
          "R = √((-40.6)² + (-8.4)²) = √(1648.4 + 70.6) = 41.5 N",
          "θ = arctan(-8.4/-40.6) + 180° = 191.7° (tercer cuadrante)",
          "E = 41.5 N a 11.7° (opuesta a R)"
        ],
        respuesta: "R = 41.5 N a 191.7°, E = 41.5 N a 11.7°"
      }
    },
    {
      id: 39,
      topic: "concurrentes",
      title: "Sistemas de Fuerzas Concurrentes - Método Gráfico",
      description: "Ejercicio 39: Cuatro fuerzas concurrentes - Hallar R y E",
      datos: [
        "F₁ = 30 N a 45°",
        "F₂ = 25 N a 120°",
        "F₃ = 40 N a 225°",
        "F₄ = 20 N a 315°",
        "Aplicar método del polígono"
      ],
      interactive: true,
      initialForces: [
        { magnitude: 30, angle: 45, unit: "N" as const },
        { magnitude: 25, angle: 120, unit: "N" as const },
        { magnitude: 40, angle: 225, unit: "N" as const },
        { magnitude: 20, angle: 315, unit: "N" as const }
      ],
      solucion: {
        pasos: [
          "Componentes X: 30·cos(45°) + 25·cos(120°) + 40·cos(225°) + 20·cos(315°)",
          "Rx = 21.2 - 12.5 - 28.3 + 14.1 = -5.5 N",
          "Componentes Y: 30·sin(45°) + 25·sin(120°) + 40·sin(225°) + 20·sin(315°)",
          "Ry = 21.2 + 21.7 - 28.3 - 14.1 = 0.5 N",
          "R = √((-5.5)² + (0.5)²) = 5.52 N",
          "θ = arctan(0.5/-5.5) + 180° = 174.8°",
          "E = 5.52 N a -5.2° (opuesta)"
        ],
        respuesta: "R = 5.52 N a 174.8°, E = 5.52 N a -5.2°"
      }
    },
    {
      id: 40,
      topic: "concurrentes",
      title: "Sistemas de Fuerzas Concurrentes - Método Gráfico",
      description: "Ejercicio 40: Sistema de cinco fuerzas - Hallar R y E",
      datos: [
        "F₁ = 50 kgf a 0°",
        "F₂ = 30 kgf a 60°",
        "F₃ = 40 kgf a 150°",
        "F₄ = 25 kgf a 240°",
        "F₅ = 35 kgf a 300°"
      ],
      interactive: true,
      initialForces: [
        { magnitude: 50, angle: 0, unit: "kgf" as const },
        { magnitude: 30, angle: 60, unit: "kgf" as const },
        { magnitude: 40, angle: 150, unit: "kgf" as const },
        { magnitude: 25, angle: 240, unit: "kgf" as const },
        { magnitude: 35, angle: 300, unit: "kgf" as const }
      ],
      solucion: {
        pasos: [
          "Convertir: F₁=490N, F₂=294N, F₃=392N, F₄=245N, F₅=343N",
          "Rx = 490 + 147 - 339.4 - 122.5 + 171.5 = 346.6 N",
          "Ry = 0 + 254.6 + 196 - 212.2 - 296.8 = -58.4 N",
          "R = √(346.6² + (-58.4)²) = 351.5 N",
          "θ = arctan(-58.4/346.6) = -9.6° (cuarto cuadrante)",
          "E = 351.5 N a 170.4°"
        ],
        respuesta: "R = 351.5 N a -9.6°, E = 351.5 N a 170.4°"
      }
    },
    {
      id: 41,
      topic: "concurrentes",
      title: "Sistemas de Fuerzas Concurrentes - Método Gráfico",
      description: "Ejercicio 41: Tres fuerzas en equilibrio - Verificación",
      datos: [
        "F₁ = 80 N a 30°",
        "F₂ = 60 N a 150°",
        "F₃ = 70 N a 270°",
        "Verificar si está en equilibrio"
      ],
      interactive: true,
      initialForces: [
        { magnitude: 80, angle: 30, unit: "N" as const },
        { magnitude: 60, angle: 150, unit: "N" as const },
        { magnitude: 70, angle: 270, unit: "N" as const }
      ],
      solucion: {
        pasos: [
          "Rx = 80·cos(30°) + 60·cos(150°) + 70·cos(270°)",
          "Rx = 69.3 - 52.0 + 0 = 17.3 N ≠ 0",
          "Ry = 80·sin(30°) + 60·sin(150°) + 70·sin(270°)",
          "Ry = 40 + 30 - 70 = 0 N ✓",
          "Como Rx ≠ 0, el sistema NO está en equilibrio",
          "Falta una fuerza E = 17.3 N a 180° para equilibrar"
        ],
        respuesta: "NO está en equilibrio. Falta E = 17.3 N a 180°"
      }
    },
    {
      id: 42,
      topic: "concurrentes",
      title: "Sistemas de Fuerzas Concurrentes - Hallar F₄",
      description: "Ejercicio 42: Sistema en equilibrio - Encontrar fuerza desconocida",
      datos: [
        "Tres fuerzas conocidas en equilibrio con F₄",
        "F₁ = 100 N a 0°",
        "F₂ = 80 N a 90°",
        "F₃ = 60 N a 180°",
        "Hallar F₄ para equilibrio"
      ],
      interactive: true,
      initialForces: [
        { magnitude: 100, angle: 0, unit: "N" as const },
        { magnitude: 80, angle: 90, unit: "N" as const },
        { magnitude: 60, angle: 180, unit: "N" as const },
        { magnitude: 80, angle: 270, unit: "N" as const }
      ],
      solucion: {
        pasos: [
          "Para equilibrio: ΣFx = 0 y ΣFy = 0",
          "ΣFx = 100 + 0 - 60 + F₄x = 0 → F₄x = -40 N",
          "ΣFy = 0 + 80 + 0 + F₄y = 0 → F₄y = -80 N",
          "F₄ = √((-40)² + (-80)²) = √(1600 + 6400) = 89.4 N",
          "θ = arctan(-80/-40) + 180° = 243.4° (tercer cuadrante)",
          "Verificación: todas las componentes suman cero ✓"
        ],
        respuesta: "F₄ = 89.4 N a 243.4°"
      }
    }
  ];

  const filteredEjercicios = selectedTopic === "all" 
    ? ejercicios 
    : ejercicios.filter(ej => ej.topic === selectedTopic);

  const interactiveEjercicios = ejercicios.filter(ej => ej.interactive);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Ejercicios Resueltos - Sistema de Fuerzas"
        description="42 ejercicios resueltos paso a paso sobre sistemas de fuerzas, momentos y equilibrio."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary flex items-center gap-3">
              <Calculator className="w-10 h-10" />
              Ejercicios Resueltos
            </h1>
            <p className="text-lg text-muted-foreground">
              42 problemas paso a paso de sistemas de fuerzas, momentos y equilibrio
            </p>
          </div>

          {/* Sección de Ejercicios Interactivos */}
          {!showInteractive && (
            <Alert className="mb-8 bg-accent/10 border-accent cursor-pointer hover:bg-accent/20 transition-colors" onClick={() => setShowInteractive(true)}>
              <PlayCircle className="w-5 h-5" />
              <AlertDescription>
                <p className="font-semibold">✨ Ejercicios 38-42: Versión Interactiva Disponible</p>
                <p className="text-sm mt-1">
                  Modifica magnitudes y ángulos en tiempo real. Visualiza diagramas vectoriales.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {showInteractive && (
            <div className="mb-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">Ejercicios Interactivos - Fuerzas Concurrentes</h2>
                <Button variant="outline" onClick={() => setShowInteractive(false)}>
                  Ver Ejercicios Estáticos
                </Button>
              </div>
              
              <InteractiveExercise
                exerciseNumber={38}
                title="Tres Fuerzas Concurrentes"
                initialForces={[
                  { magnitude: 10, angle: 0, unit: "kgf" },
                  { magnitude: 20, angle: 135, unit: "kgf" },
                  { magnitude: 15, angle: 270, unit: "kgf" }
                ]}
              />

              <InteractiveExercise
                exerciseNumber={39}
                title="Cuatro Fuerzas Concurrentes"
                initialForces={[
                  { magnitude: 30, angle: 45, unit: "N" },
                  { magnitude: 25, angle: 120, unit: "N" },
                  { magnitude: 40, angle: 225, unit: "N" },
                  { magnitude: 20, angle: 315, unit: "N" }
                ]}
              />

              <InteractiveExercise
                exerciseNumber={40}
                title="Cinco Fuerzas Concurrentes"
                initialForces={[
                  { magnitude: 50, angle: 0, unit: "kgf" },
                  { magnitude: 30, angle: 60, unit: "kgf" },
                  { magnitude: 40, angle: 150, unit: "kgf" },
                  { magnitude: 25, angle: 240, unit: "kgf" },
                  { magnitude: 35, angle: 300, unit: "kgf" }
                ]}
              />

              <InteractiveExercise
                exerciseNumber={41}
                title="Verificación de Equilibrio"
                initialForces={[
                  { magnitude: 80, angle: 30, unit: "N" },
                  { magnitude: 60, angle: 150, unit: "N" },
                  { magnitude: 70, angle: 270, unit: "N" }
                ]}
              />

              <InteractiveExercise
                exerciseNumber={42}
                title="Encontrar Fuerza Desconocida"
                initialForces={[
                  { magnitude: 100, angle: 0, unit: "N" },
                  { magnitude: 80, angle: 90, unit: "N" },
                  { magnitude: 60, angle: 180, unit: "N" },
                  { magnitude: 80, angle: 270, unit: "N" }
                ]}
              />

              <Alert>
                <AlertDescription>
                  <p className="text-sm">
                    💡 <strong>Tip:</strong> Modifica las magnitudes y ángulos usando los sliders o inputs numéricos.
                    Alterna entre kgf y N haciendo clic en el botón de unidades. Observa cómo cambia la resultante en tiempo real.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          )}

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant={selectedTopic === "all" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("all")}
                  className={selectedTopic === "all" ? "bg-primary" : ""}
                >
                  Todos ({ejercicios.length})
                </Button>
                <Button 
                  variant={selectedTopic === "colineales" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("colineales")}
                  className={selectedTopic === "colineales" ? "bg-primary" : ""}
                >
                  Colineales ({ejercicios.filter(e => e.topic === "colineales").length})
                </Button>
                <Button 
                  variant={selectedTopic === "graficos" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("graficos")}
                  className={selectedTopic === "graficos" ? "bg-primary" : ""}
                >
                  Métodos Gráficos ({ejercicios.filter(e => e.topic === "graficos").length})
                </Button>
                <Button 
                  variant={selectedTopic === "paralelas" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("paralelas")}
                  className={selectedTopic === "paralelas" ? "bg-primary" : ""}
                >
                  Paralelas ({ejercicios.filter(e => e.topic === "paralelas").length})
                </Button>
                <Button 
                  variant={selectedTopic === "momentos" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("momentos")}
                  className={selectedTopic === "momentos" ? "bg-primary" : ""}
                >
                  Momentos ({ejercicios.filter(e => e.topic === "momentos").length})
                </Button>
                <Button 
                  variant={selectedTopic === "equilibrio" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("equilibrio")}
                  className={selectedTopic === "equilibrio" ? "bg-primary" : ""}
                >
                  Equilibrio ({ejercicios.filter(e => e.topic === "equilibrio").length})
                </Button>
                <Button 
                  variant={selectedTopic === "concurrentes" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("concurrentes")}
                  className={selectedTopic === "concurrentes" ? "bg-primary" : ""}
                >
                  Concurrentes ({ejercicios.filter(e => e.topic === "concurrentes").length})
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {filteredEjercicios.map((ejercicio) => (
              <Card key={ejercicio.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        Ejercicio {ejercicio.id}
                      </CardTitle>
                      <CardDescription className="text-base font-semibold text-foreground">
                        {ejercicio.title}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">
                        {ejercicio.description}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                      ejercicio.topic === "colineales" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" :
                      ejercicio.topic === "graficos" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" :
                      ejercicio.topic === "paralelas" ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" :
                      ejercicio.topic === "momentos" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                      ejercicio.topic === "concurrentes" ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300" :
                      "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                    }`}>
                      {ejercicio.topic}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-mono font-semibold mb-3 text-primary">Datos:</h3>
                    <ul className="space-y-2">
                      {ejercicio.datos.map((dato, idx) => (
                        <li key={idx} className="flex gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{dato}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="solution">
                      <AccordionTrigger className="text-base font-semibold">
                        Ver Solución Paso a Paso
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <ol className="space-y-3">
                            {ejercicio.solucion.pasos.map((paso, idx) => (
                              <li key={idx} className="flex gap-3">
                                <span className="font-mono font-bold text-primary min-w-[2rem]">
                                  {idx + 1}.
                                </span>
                                <span className="text-sm leading-relaxed">{paso}</span>
                              </li>
                            ))}
                          </ol>
                          
                          <Alert className="bg-accent/10 border-accent">
                            <AlertDescription>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                <span className="font-mono font-bold text-lg">
                                  {ejercicio.solucion.respuesta}
                                </span>
                              </div>
                            </AlertDescription>
                          </Alert>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <BookOpen className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold">¿Quieres revisar la teoría?</h3>
                <p className="text-muted-foreground">
                  Repasa los conceptos fundamentales antes de continuar con más ejercicios
                </p>
                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <Link href="/teoria/colineales">
                    <Button variant="outline">Fuerzas Colineales</Button>
                  </Link>
                  <Link href="/teoria/paralelas">
                    <Button variant="outline">Fuerzas Paralelas</Button>
                  </Link>
                  <Link href="/teoria/momentos">
                    <Button variant="outline">Momentos</Button>
                  </Link>
                  <Link href="/teoria/equilibrio">
                    <Button variant="outline">Equilibrio</Button>
                  </Link>
                  <Link href="/simulaciones">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Ir a Simulaciones
                    </Button>
                  </Link>
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