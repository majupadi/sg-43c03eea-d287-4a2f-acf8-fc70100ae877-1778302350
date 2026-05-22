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
    // FUERZAS COLINEALES (1-8)
    {
      id: 1,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Dos fuerzas",
      description: "Ejercicio 1: Calcular la resultante de dos fuerzas colineales del mismo sentido",
      datos: [
        "F₁ = 50 N hacia la derecha",
        "F₂ = 30 N hacia la derecha",
        "Hallar R"
      ],
      solucion: {
        pasos: [
          "Ambas fuerzas tienen el mismo sentido (→)",
          "R = F₁ + F₂",
          "R = 50 N + 30 N",
          "R = 80 N hacia la derecha"
        ],
        respuesta: "R = 80 N →"
      }
    },
    {
      id: 2,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Sentidos opuestos",
      description: "Ejercicio 2: Resultante de dos fuerzas en sentidos opuestos",
      datos: [
        "F₁ = 100 N hacia la derecha",
        "F₂ = 60 N hacia la izquierda",
        "Hallar R"
      ],
      solucion: {
        pasos: [
          "Fuerzas en sentidos opuestos (→ ←)",
          "R = F₁ - F₂",
          "R = 100 N - 60 N",
          "R = 40 N hacia la derecha (sentido de la mayor)"
        ],
        respuesta: "R = 40 N →"
      }
    },
    {
      id: 3,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Tres fuerzas",
      description: "Ejercicio 3: Tres fuerzas colineales en diferentes sentidos",
      datos: [
        "F₁ = 80 N →",
        "F₂ = 50 N ←",
        "F₃ = 30 N →",
        "Hallar R"
      ],
      solucion: {
        pasos: [
          "Sumar las fuerzas hacia la derecha: 80 + 30 = 110 N",
          "Restar las fuerzas hacia la izquierda: 110 - 50",
          "R = 60 N",
          "Sentido: derecha (suma mayor)"
        ],
        respuesta: "R = 60 N →"
      }
    },
    {
      id: 4,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Equilibrio",
      description: "Ejercicio 4: Sistema en equilibrio, encontrar fuerza desconocida",
      datos: [
        "F₁ = 120 N →",
        "F₂ = 80 N ←",
        "F₃ = ? →",
        "Sistema en equilibrio (R = 0)"
      ],
      solucion: {
        pasos: [
          "Para equilibrio: ΣF = 0",
          "F₁ - F₂ + F₃ = 0",
          "120 - 80 + F₃ = 0",
          "F₃ = -40 N",
          "F₃ = 40 N hacia la izquierda"
        ],
        respuesta: "F₃ = 40 N ←"
      }
    },
    {
      id: 5,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Cuatro fuerzas",
      description: "Ejercicio 5: Cuatro fuerzas colineales",
      datos: [
        "F₁ = 200 N →",
        "F₂ = 150 N ←",
        "F₃ = 100 N →",
        "F₄ = 80 N ←"
      ],
      solucion: {
        pasos: [
          "ΣF→ = 200 + 100 = 300 N",
          "ΣF← = 150 + 80 = 230 N",
          "R = 300 - 230 = 70 N",
          "Sentido: → (positivo)"
        ],
        respuesta: "R = 70 N →"
      }
    },
    {
      id: 6,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Conversión kgf a N",
      description: "Ejercicio 6: Fuerzas en kgf, convertir y calcular resultante",
      datos: [
        "F₁ = 10 kgf →",
        "F₂ = 5 kgf ←",
        "F₃ = 8 kgf →",
        "Convertir a N y hallar R (1 kgf = 9.8 N)"
      ],
      solucion: {
        pasos: [
          "Convertir: F₁ = 10 × 9.8 = 98 N",
          "F₂ = 5 × 9.8 = 49 N",
          "F₃ = 8 × 9.8 = 78.4 N",
          "R = (98 + 78.4) - 49 = 127.4 N →"
        ],
        respuesta: "R = 127.4 N → (13 kgf →)"
      }
    },
    {
      id: 7,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Cinco fuerzas",
      description: "Ejercicio 7: Sistema complejo con cinco fuerzas",
      datos: [
        "F₁ = 300 N →",
        "F₂ = 200 N ←",
        "F₃ = 150 N →",
        "F₄ = 100 N ←",
        "F₅ = 50 N →"
      ],
      solucion: {
        pasos: [
          "ΣF→ = 300 + 150 + 50 = 500 N",
          "ΣF← = 200 + 100 = 300 N",
          "R = 500 - 300 = 200 N",
          "Dirección: → (positivo)"
        ],
        respuesta: "R = 200 N →"
      }
    },
    {
      id: 8,
      topic: "colineales",
      title: "Sistema de Fuerzas Colineales - Aplicación práctica",
      description: "Ejercicio 8: Tracción de un vehículo",
      datos: [
        "Motor ejerce 5000 N →",
        "Fricción del aire: 800 N ←",
        "Fricción del suelo: 600 N ←",
        "Hallar fuerza neta"
      ],
      solucion: {
        pasos: [
          "Fuerza motriz: 5000 N →",
          "Fuerzas resistivas: 800 + 600 = 1400 N ←",
          "R = 5000 - 1400",
          "R = 3600 N → (fuerza neta de aceleración)"
        ],
        respuesta: "Fuerza neta = 3600 N →"
      }
    },

    // MÉTODOS GRÁFICOS (9-16)
    {
      id: 9,
      topic: "graficos",
      title: "Método del Paralelogramo - Dos fuerzas perpendiculares",
      description: "Ejercicio 9: Dos fuerzas en ángulo recto",
      datos: [
        "F₁ = 30 N horizontal →",
        "F₂ = 40 N vertical ↑",
        "Usar método del paralelogramo"
      ],
      solucion: {
        pasos: [
          "Teorema de Pitágoras (fuerzas perpendiculares)",
          "R = √(F₁² + F₂²)",
          "R = √(30² + 40²) = √(900 + 1600)",
          "R = √2500 = 50 N",
          "θ = arctan(40/30) = 53.1°"
        ],
        respuesta: "R = 50 N a 53.1° desde horizontal"
      }
    },
    {
      id: 10,
      topic: "graficos",
      title: "Método del Paralelogramo - Ley del coseno",
      description: "Ejercicio 10: Dos fuerzas con ángulo de 60°",
      datos: [
        "F₁ = 50 N",
        "F₂ = 40 N",
        "Ángulo entre ellas: 60°"
      ],
      solucion: {
        pasos: [
          "Ley del coseno: R² = F₁² + F₂² - 2·F₁·F₂·cos(θ)",
          "θ = 180° - 60° = 120° (ángulo opuesto en paralelogramo)",
          "R² = 50² + 40² - 2(50)(40)cos(120°)",
          "R² = 2500 + 1600 - 4000(-0.5) = 6100",
          "R = 78.1 N"
        ],
        respuesta: "R = 78.1 N"
      }
    },
    {
      id: 11,
      topic: "graficos",
      title: "Método del Polígono - Tres fuerzas",
      description: "Ejercicio 11: Tres vectores consecutivos",
      datos: [
        "F₁ = 20 N a 0°",
        "F₂ = 30 N a 90°",
        "F₃ = 25 N a 180°"
      ],
      solucion: {
        pasos: [
          "Componentes X: Rx = 20·cos(0°) + 30·cos(90°) + 25·cos(180°)",
          "Rx = 20 + 0 - 25 = -5 N",
          "Componentes Y: Ry = 20·sin(0°) + 30·sin(90°) + 25·sin(180°)",
          "Ry = 0 + 30 + 0 = 30 N",
          "R = √((-5)² + 30²) = 30.4 N",
          "θ = arctan(30/-5) + 180° = 99.5°"
        ],
        respuesta: "R = 30.4 N a 99.5°"
      }
    },
    {
      id: 12,
      topic: "graficos",
      title: "Método del Polígono - Cuatro fuerzas",
      description: "Ejercicio 12: Sistema de cuatro vectores",
      datos: [
        "F₁ = 40 N a 0°",
        "F₂ = 30 N a 45°",
        "F₃ = 50 N a 135°",
        "F₄ = 20 N a 270°"
      ],
      solucion: {
        pasos: [
          "Rx = 40·cos(0°) + 30·cos(45°) + 50·cos(135°) + 20·cos(270°)",
          "Rx = 40 + 21.2 - 35.4 + 0 = 25.8 N",
          "Ry = 40·sin(0°) + 30·sin(45°) + 50·sin(135°) + 20·sin(270°)",
          "Ry = 0 + 21.2 + 35.4 - 20 = 36.6 N",
          "R = √(25.8² + 36.6²) = 44.7 N",
          "θ = arctan(36.6/25.8) = 54.8°"
        ],
        respuesta: "R = 44.7 N a 54.8°"
      }
    },
    {
      id: 13,
      topic: "graficos",
      title: "Método del Paralelogramo - Fuerzas iguales",
      description: "Ejercicio 13: Dos fuerzas iguales con ángulo",
      datos: [
        "F₁ = F₂ = 60 N",
        "Ángulo entre ellas: 90°"
      ],
      solucion: {
        pasos: [
          "Para fuerzas iguales perpendiculares:",
          "R = F√2",
          "R = 60√2 = 84.9 N",
          "θ = 45° (bisectriz del ángulo)"
        ],
        respuesta: "R = 84.9 N a 45°"
      }
    },
    {
      id: 14,
      topic: "graficos",
      title: "Método del Polígono - Cinco fuerzas",
      description: "Ejercicio 14: Sistema complejo con cinco vectores",
      datos: [
        "F₁ = 50 N a 0°",
        "F₂ = 40 N a 72°",
        "F₃ = 35 N a 144°",
        "F₄ = 30 N a 216°",
        "F₅ = 25 N a 288°"
      ],
      solucion: {
        pasos: [
          "Rx = 50 + 40·cos(72°) + 35·cos(144°) + 30·cos(216°) + 25·cos(288°)",
          "Rx = 50 + 12.4 - 28.3 - 24.3 + 7.7 = 17.5 N",
          "Ry = 0 + 40·sin(72°) + 35·sin(144°) + 30·sin(216°) + 25·sin(288°)",
          "Ry = 38.0 + 20.6 - 18.0 - 23.8 = 16.8 N",
          "R = √(17.5² + 16.8²) = 24.3 N",
          "θ = arctan(16.8/17.5) = 43.8°"
        ],
        respuesta: "R = 24.3 N a 43.8°"
      }
    },
    {
      id: 15,
      topic: "graficos",
      title: "Método Gráfico - Escala y medición",
      description: "Ejercicio 15: Construcción gráfica con escala",
      datos: [
        "F₁ = 80 N a 30°",
        "F₂ = 60 N a 120°",
        "Escala: 1 cm = 10 N",
        "Dibujar y medir R"
      ],
      solucion: {
        pasos: [
          "F₁: 8 cm a 30° desde horizontal",
          "F₂: 6 cm a 120° desde horizontal",
          "Método analítico para verificar:",
          "Rx = 80·cos(30°) + 60·cos(120°) = 69.3 - 30 = 39.3 N",
          "Ry = 80·sin(30°) + 60·sin(120°) = 40 + 52.0 = 92.0 N",
          "R = √(39.3² + 92.0²) = 100.1 N ≈ 10 cm",
          "θ = arctan(92.0/39.3) = 66.9°"
        ],
        respuesta: "R = 100.1 N a 66.9° (medir ~10 cm en diagrama)"
      }
    },
    {
      id: 16,
      topic: "graficos",
      title: "Comparación de Métodos",
      description: "Ejercicio 16: Resolver con ambos métodos",
      datos: [
        "F₁ = 70 N a 0°",
        "F₂ = 50 N a 60°",
        "Aplicar paralelogramo Y polígono"
      ],
      solucion: {
        pasos: [
          "Método del Paralelogramo (ley del coseno):",
          "R² = 70² + 50² - 2(70)(50)cos(120°) = 10400",
          "R = 102.0 N",
          "Método del Polígono (componentes):",
          "Rx = 70 + 50·cos(60°) = 70 + 25 = 95 N",
          "Ry = 0 + 50·sin(60°) = 43.3 N",
          "R = √(95² + 43.3²) = 104.5 N",
          "Ambos métodos dan resultados equivalentes"
        ],
        respuesta: "R ≈ 103 N (ambos métodos coinciden)"
      }
    },

    // FUERZAS PARALELAS (17-24)
    {
      id: 17,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Mismo sentido",
      description: "Ejercicio 17: Dos fuerzas paralelas del mismo sentido",
      datos: [
        "F₁ = 100 N ↓ en x = 2 m",
        "F₂ = 60 N ↓ en x = 6 m",
        "Hallar R y posición"
      ],
      solucion: {
        pasos: [
          "R = F₁ + F₂ = 100 + 60 = 160 N ↓",
          "Para hallar posición (momento nulo):",
          "F₁·d₁ = F₂·d₂",
          "100(x - 2) = 60(6 - x)",
          "100x - 200 = 360 - 60x",
          "160x = 560",
          "x = 3.5 m"
        ],
        respuesta: "R = 160 N ↓ en x = 3.5 m"
      }
    },
    {
      id: 18,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Sentidos opuestos",
      description: "Ejercicio 18: Dos fuerzas paralelas de sentidos opuestos",
      datos: [
        "F₁ = 150 N ↑ en x = 1 m",
        "F₂ = 100 N ↓ en x = 5 m",
        "Hallar R y posición"
      ],
      solucion: {
        pasos: [
          "R = F₁ - F₂ = 150 - 100 = 50 N ↑",
          "Momento respecto al origen:",
          "R·x = F₁·1 - F₂·5",
          "50·x = 150·1 - 100·5",
          "50x = 150 - 500 = -350",
          "x = -7 m (a la izquierda del origen)"
        ],
        respuesta: "R = 50 N ↑ en x = -7 m"
      }
    },
    {
      id: 19,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Tres fuerzas",
      description: "Ejercicio 19: Sistema de tres fuerzas paralelas",
      datos: [
        "F₁ = 80 N ↓ en x = 0 m",
        "F₂ = 120 N ↓ en x = 3 m",
        "F₃ = 60 N ↓ en x = 7 m"
      ],
      solucion: {
        pasos: [
          "R = 80 + 120 + 60 = 260 N ↓",
          "Momento respecto al origen:",
          "260·x = 80(0) + 120(3) + 60(7)",
          "260x = 0 + 360 + 420 = 780",
          "x = 3 m"
        ],
        respuesta: "R = 260 N ↓ en x = 3 m"
      }
    },
    {
      id: 20,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Viga con cargas",
      description: "Ejercicio 20: Viga horizontal con cargas puntuales",
      datos: [
        "Viga de 8 m",
        "P₁ = 200 N en x = 2 m",
        "P₂ = 300 N en x = 5 m",
        "Hallar reacciones en apoyos (x=0 y x=8)"
      ],
      solucion: {
        pasos: [
          "ΣF = 0: RA + RB = 200 + 300 = 500 N",
          "ΣM₀ = 0: RB·8 = 200·2 + 300·5",
          "8RB = 400 + 1500 = 1900",
          "RB = 237.5 N",
          "RA = 500 - 237.5 = 262.5 N"
        ],
        respuesta: "RA = 262.5 N, RB = 237.5 N"
      }
    },
    {
      id: 21,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Centro de gravedad",
      description: "Ejercicio 21: Encontrar centro de gravedad",
      datos: [
        "Tres masas:",
        "m₁ = 5 kg en (0, 0)",
        "m₂ = 8 kg en (4, 0)",
        "m₃ = 3 kg en (6, 0)"
      ],
      solucion: {
        pasos: [
          "Masa total: M = 5 + 8 + 3 = 16 kg",
          "Centro de gravedad:",
          "xCG = (m₁·x₁ + m₂·x₂ + m₃·x₃) / M",
          "xCG = (5·0 + 8·4 + 3·6) / 16",
          "xCG = (0 + 32 + 18) / 16 = 50/16",
          "xCG = 3.125 m"
        ],
        respuesta: "Centro de gravedad en x = 3.125 m"
      }
    },
    {
      id: 22,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Cuatro fuerzas",
      description: "Ejercicio 22: Sistema con cuatro fuerzas paralelas",
      datos: [
        "F₁ = 50 N ↓ en x = 1 m",
        "F₂ = 80 N ↓ en x = 3 m",
        "F₃ = 60 N ↓ en x = 5 m",
        "F₄ = 40 N ↓ en x = 8 m"
      ],
      solucion: {
        pasos: [
          "R = 50 + 80 + 60 + 40 = 230 N ↓",
          "ΣM₀: 230·x = 50(1) + 80(3) + 60(5) + 40(8)",
          "230x = 50 + 240 + 300 + 320 = 910",
          "x = 910/230 = 3.96 m"
        ],
        respuesta: "R = 230 N ↓ en x = 3.96 m"
      }
    },
    {
      id: 23,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Carga distribuida",
      description: "Ejercicio 23: Viga con carga uniformemente distribuida",
      datos: [
        "Viga de 6 m",
        "Carga uniforme: w = 100 N/m",
        "Apoyos en extremos",
        "Hallar reacciones"
      ],
      solucion: {
        pasos: [
          "Carga total: W = w·L = 100·6 = 600 N",
          "Actúa en el centro: x = 3 m",
          "Por simetría: RA = RB",
          "RA + RB = 600 N",
          "RA = RB = 300 N"
        ],
        respuesta: "RA = RB = 300 N"
      }
    },
    {
      id: 24,
      topic: "paralelas",
      title: "Fuerzas Paralelas - Aplicación práctica",
      description: "Ejercicio 24: Balancín con niños",
      datos: [
        "Balancín de 4 m (fulcro al centro)",
        "Niño A: 40 kg a 1.5 m de fulcro",
        "Niño B: ? kg a 2 m del fulcro (lado opuesto)",
        "Hallar masa de B para equilibrio"
      ],
      solucion: {
        pasos: [
          "Peso A: PA = 40·9.8 = 392 N",
          "Para equilibrio: MA = MB",
          "PA·dA = PB·dB",
          "392·1.5 = PB·2",
          "PB = 588/2 = 294 N",
          "mB = 294/9.8 = 30 kg"
        ],
        respuesta: "Niño B debe pesar 30 kg"
      }
    },

    // MOMENTOS (25-32)
    {
      id: 25,
      topic: "momentos",
      title: "Momento de una Fuerza",
      description: "Ejercicio 25: Calcular momento respecto a un punto",
      datos: [
        "F = 80 N perpendicular",
        "Brazo de palanca d = 0.5 m",
        "Hallar M respecto al punto O"
      ],
      solucion: {
        pasos: [
          "M = F × d",
          "M = 80 N × 0.5 m",
          "M = 40 N·m",
          "Sentido: según regla de mano derecha"
        ],
        respuesta: "M = 40 N·m"
      }
    },
    {
      id: 26,
      topic: "momentos",
      title: "Momento con Ángulo",
      description: "Ejercicio 26: Fuerza no perpendicular",
      datos: [
        "F = 100 N a 30° del brazo",
        "Distancia al punto: r = 0.8 m",
        "Hallar momento"
      ],
      solucion: {
        pasos: [
          "M = F·r·sen(θ)",
          "M = 100·0.8·sen(30°)",
          "M = 100·0.8·0.5",
          "M = 40 N·m"
        ],
        respuesta: "M = 40 N·m"
      }
    },
    {
      id: 27,
      topic: "momentos",
      title: "Sistema de Momentos",
      description: "Ejercicio 27: Dos fuerzas produciendo momentos opuestos",
      datos: [
        "F₁ = 60 N a 0.4 m (sentido horario)",
        "F₂ = 40 N a 0.6 m (sentido antihorario)",
        "Hallar momento resultante"
      ],
      solucion: {
        pasos: [
          "M₁ = 60·0.4 = 24 N·m (horario) = -24 N·m",
          "M₂ = 40·0.6 = 24 N·m (antihorario) = +24 N·m",
          "MR = M₁ + M₂ = -24 + 24 = 0",
          "Sistema en equilibrio rotacional"
        ],
        respuesta: "MR = 0 (equilibrio)"
      }
    },
    {
      id: 28,
      topic: "momentos",
      title: "Momento Neto de Tres Fuerzas",
      description: "Ejercicio 28: Tres momentos sobre una barra",
      datos: [
        "M₁ = +50 N·m (antihorario)",
        "M₂ = -30 N·m (horario)",
        "M₃ = +20 N·m (antihorario)",
        "Hallar momento neto"
      ],
      solucion: {
        pasos: [
          "Convención: (+) antihorario, (-) horario",
          "ΣM = M₁ + M₂ + M₃",
          "ΣM = 50 - 30 + 20",
          "ΣM = 40 N·m (antihorario)"
        ],
        respuesta: "Momento neto = 40 N·m (antihorario)"
      }
    },
    {
      id: 29,
      topic: "momentos",
      title: "Palanca en Equilibrio",
      description: "Ejercicio 29: Encontrar fuerza desconocida",
      datos: [
        "Palanca con fulcro en centro",
        "F₁ = 200 N a 0.3 m del fulcro",
        "F₂ = ? a 0.5 m del fulcro (lado opuesto)",
        "Sistema en equilibrio"
      ],
      solucion: {
        pasos: [
          "Para equilibrio: ΣM = 0",
          "M₁ = M₂",
          "200·0.3 = F₂·0.5",
          "F₂ = 60/0.5",
          "F₂ = 120 N"
        ],
        respuesta: "F₂ = 120 N"
      }
    },
    {
      id: 30,
      topic: "momentos",
      title: "Momento Respecto a Diferentes Puntos",
      description: "Ejercicio 30: Calcular momento respecto a dos puntos",
      datos: [
        "F = 50 N vertical en x = 4 m",
        "Calcular momento respecto a:",
        "a) Origen (x=0)",
        "b) Punto x=2 m"
      ],
      solucion: {
        pasos: [
          "a) M₀ = F·d = 50·4 = 200 N·m",
          "b) M₂ = F·(4-2) = 50·2 = 100 N·m",
          "El momento depende del punto de referencia",
          "Ambos en el mismo sentido de rotación"
        ],
        respuesta: "a) M₀ = 200 N·m, b) M₂ = 100 N·m"
      }
    },
    {
      id: 31,
      topic: "momentos",
      title: "Cupla o Par de Fuerzas",
      description: "Ejercicio 31: Momento producido por una cupla",
      datos: [
        "Dos fuerzas paralelas opuestas",
        "F = 30 N cada una",
        "Separación d = 0.6 m",
        "Hallar momento de la cupla"
      ],
      solucion: {
        pasos: [
          "Momento de cupla: M = F·d",
          "M = 30·0.6",
          "M = 18 N·m",
          "La cupla produce rotación pura (independiente del punto)"
        ],
        respuesta: "M = 18 N·m (cupla)"
      }
    },
    {
      id: 32,
      topic: "momentos",
      title: "Sistema Complejo de Momentos",
      description: "Ejercicio 32: Barra con múltiples fuerzas",
      datos: [
        "Barra de 5 m con fulcro en x = 2 m",
        "F₁ = 40 N en x = 0",
        "F₂ = 60 N en x = 3 m",
        "F₃ = 30 N en x = 5 m",
        "Hallar momento neto respecto al fulcro"
      ],
      solucion: {
        pasos: [
          "M₁ = 40·(2-0) = 80 N·m (antihorario)",
          "M₂ = 60·(3-2) = 60 N·m (horario) = -60 N·m",
          "M₃ = 30·(5-2) = 90 N·m (horario) = -90 N·m",
          "ΣM = 80 - 60 - 90 = -70 N·m",
          "Momento neto: 70 N·m horario"
        ],
        respuesta: "MR = 70 N·m (horario)"
      }
    },

    // EQUILIBRIO (33-37)
    {
      id: 33,
      topic: "equilibrio",
      title: "Equilibrio de Traslación",
      description: "Ejercicio 33: Verificar equilibrio de fuerzas concurrentes",
      datos: [
        "F₁ = 50 N a 0°",
        "F₂ = 40 N a 120°",
        "F₃ = 40 N a 240°",
        "¿Está en equilibrio?"
      ],
      solucion: {
        pasos: [
          "ΣFx = 50 + 40·cos(120°) + 40·cos(240°)",
          "ΣFx = 50 - 20 - 20 = 10 N ≠ 0",
          "ΣFy = 0 + 40·sin(120°) + 40·sin(240°)",
          "ΣFy = 34.6 - 34.6 = 0 ✓",
          "NO está en equilibrio (Fx ≠ 0)"
        ],
        respuesta: "NO está en equilibrio. Falta 10 N en -x"
      }
    },
    {
      id: 34,
      topic: "equilibrio",
      title: "Equilibrio Estático - Viga",
      description: "Ejercicio 34: Viga horizontal en equilibrio",
      datos: [
        "Viga de 80 kg, 6 m de largo",
        "Carga de 50 kg en x = 4 m",
        "Apoyos en x = 1 m y x = 5 m",
        "Hallar reacciones"
      ],
      solucion: {
        pasos: [
          "Peso viga: Wv = 80·9.8 = 784 N en x = 3 m",
          "Peso carga: Wc = 50·9.8 = 490 N en x = 4 m",
          "ΣF = 0: RA + RB = 784 + 490 = 1274 N",
          "ΣM₁ = 0: RB·4 = 784·2 + 490·3",
          "4RB = 1568 + 1470 = 3038",
          "RB = 759.5 N, RA = 514.5 N"
        ],
        respuesta: "RA = 514.5 N, RB = 759.5 N"
      }
    },
    {
      id: 35,
      topic: "equilibrio",
      title: "Equilibrio de Cuerpo Rígido",
      description: "Ejercicio 35: Barra apoyada en pared y piso",
      datos: [
        "Barra de 10 kg, 4 m",
        "Apoyada a 60° de la horizontal",
        "Sin fricción en contactos",
        "Hallar fuerzas de reacción"
      ],
      solucion: {
        pasos: [
          "Peso: W = 10·9.8 = 98 N en centro (2 m)",
          "Reacción pared: Rp (horizontal)",
          "Reacción piso: Rf (vertical)",
          "ΣFx = 0: Rp = 0 (no hay componente horizontal)",
          "ΣFy = 0: Rf = 98 N",
          "ΣM₀ = 0: Verifica que sistema está en equilibrio"
        ],
        respuesta: "Rf = 98 N vertical, Rp depende de fricción"
      }
    },
    {
      id: 36,
      topic: "equilibrio",
      title: "Equilibrio con Tensiones",
      description: "Ejercicio 36: Masa suspendida por dos cables",
      datos: [
        "Masa: 50 kg",
        "Cable A a 30° de horizontal",
        "Cable B a 45° de horizontal",
        "Hallar tensiones"
      ],
      solucion: {
        pasos: [
          "Peso: W = 50·9.8 = 490 N",
          "ΣFx = 0: TA·cos(30°) = TB·cos(45°)",
          "ΣFy = 0: TA·sin(30°) + TB·sin(45°) = 490",
          "De primera ecuación: TA = TB·cos(45°)/cos(30°) = 0.816TB",
          "Sustituyendo: 0.816TB·0.5 + TB·0.707 = 490",
          "1.115TB = 490",
          "TB = 439.5 N, TA = 358.7 N"
        ],
        respuesta: "TA = 358.7 N, TB = 439.5 N"
      }
    },
    {
      id: 37,
      topic: "equilibrio",
      title: "Equilibrio Completo",
      description: "Ejercicio 37: Sistema en equilibrio completo (traslación + rotación)",
      datos: [
        "Viga de 100 kg, 8 m",
        "Masas: 60 kg en x=2m, 80 kg en x=6m",
        "Apoyo izquierdo fijo, apoyo derecho móvil",
        "Hallar todas las reacciones"
      ],
      solucion: {
        pasos: [
          "Wv = 980 N en x=4m, W1 = 588 N, W2 = 784 N",
          "Total: 2352 N",
          "ΣFy = 0: RA + RB = 2352 N",
          "ΣM₀ = 0: RB·8 = 588·2 + 980·4 + 784·6",
          "8RB = 1176 + 3920 + 4704 = 9800",
          "RB = 1225 N, RA = 1127 N",
          "ΣFx = 0: No hay fuerzas horizontales ✓"
        ],
        respuesta: "RA = 1127 N, RB = 1225 N (equilibrio completo)"
      }
    },

    // FUERZAS CONCURRENTES (38-42)
    {
      id: 38,
      topic: "concurrentes",
      title: "Fuerzas Concurrentes - Método Gráfico",
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
      title: "Fuerzas Concurrentes - Método Gráfico",
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
      title: "Fuerzas Concurrentes - Método Gráfico",
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
      title: "Fuerzas Concurrentes - Verificación de Equilibrio",
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
      title: "Fuerzas Concurrentes - Hallar Fuerza Desconocida",
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
              42 problemas paso a paso organizados por tema: Colineales (1-8), Métodos Gráficos (9-16), Paralelas (17-24), Momentos (25-32), Equilibrio (33-37), Concurrentes (38-42)
            </p>
          </div>

          {/* Sección de Ejercicios Interactivos */}
          {!showInteractive && interactiveEjercicios.length > 0 && (
            <Alert className="mb-8 bg-accent/10 border-accent cursor-pointer hover:bg-accent/20 transition-colors" onClick={() => setShowInteractive(true)}>
              <PlayCircle className="w-5 h-5" />
              <AlertDescription>
                <p className="font-semibold">✨ Ejercicios 38-42: Versión Interactiva Disponible</p>
                <p className="text-sm mt-1">
                  Modifica magnitudes y ángulos en tiempo real. Visualiza diagramas vectoriales con métodos Paralelogramo y Polígono.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {showInteractive && (
            <div className="mb-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">Ejercicios Interactivos - Fuerzas Concurrentes</h2>
                <Button variant="outline" onClick={() => setShowInteractive(false)}>
                  Ver Todos los Ejercicios
                </Button>
              </div>
              
              {interactiveEjercicios.map((ejercicio) => (
                <InteractiveExercise
                  key={ejercicio.id}
                  exerciseNumber={ejercicio.id}
                  title={ejercicio.title}
                  initialForces={ejercicio.initialForces!}
                />
              ))}

              <Alert>
                <AlertDescription>
                  <p className="text-sm">
                    💡 <strong>Tip:</strong> Modifica las magnitudes y ángulos usando los sliders o inputs numéricos.
                    Alterna entre kgf y N haciendo clic en el botón de unidades. Observa cómo cambia la resultante en tiempo real.
                    Los métodos Paralelogramo y Polígono se visualizan simultáneamente en diferentes tabs.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Filtros */}
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
                  Colineales 1-8 ({ejercicios.filter(e => e.topic === "colineales").length})
                </Button>
                <Button 
                  variant={selectedTopic === "graficos" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("graficos")}
                  className={selectedTopic === "graficos" ? "bg-primary" : ""}
                >
                  Métodos Gráficos 9-16 ({ejercicios.filter(e => e.topic === "graficos").length})
                </Button>
                <Button 
                  variant={selectedTopic === "paralelas" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("paralelas")}
                  className={selectedTopic === "paralelas" ? "bg-primary" : ""}
                >
                  Paralelas 17-24 ({ejercicios.filter(e => e.topic === "paralelas").length})
                </Button>
                <Button 
                  variant={selectedTopic === "momentos" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("momentos")}
                  className={selectedTopic === "momentos" ? "bg-primary" : ""}
                >
                  Momentos 25-32 ({ejercicios.filter(e => e.topic === "momentos").length})
                </Button>
                <Button 
                  variant={selectedTopic === "equilibrio" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("equilibrio")}
                  className={selectedTopic === "equilibrio" ? "bg-primary" : ""}
                >
                  Equilibrio 33-37 ({ejercicios.filter(e => e.topic === "equilibrio").length})
                </Button>
                <Button 
                  variant={selectedTopic === "concurrentes" ? "default" : "outline"}
                  onClick={() => setSelectedTopic("concurrentes")}
                  className={selectedTopic === "concurrentes" ? "bg-primary" : ""}
                >
                  Concurrentes 38-42 ({ejercicios.filter(e => e.topic === "concurrentes").length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Ejercicios */}
          <div className="space-y-4">
            {filteredEjercicios.map((ejercicio) => (
              <Card key={ejercicio.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-mono font-bold text-primary">
                            {ejercicio.id}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{ejercicio.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {ejercicio.description}
                          </CardDescription>
                        </div>
                      </div>
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
                  <Accordion type="single" collapsible>
                    <AccordionItem value="datos">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Datos del Problema
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 mt-2">
                          {ejercicio.datos.map((dato, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-accent mt-1">•</span>
                              <span>{dato}</span>
                            </li>
                          ))}
                        </ul>
                        {ejercicio.interactive && (
                          <Alert className="mt-4 bg-accent/5 border-accent">
                            <PlayCircle className="w-4 h-4" />
                            <AlertDescription>
                              <p className="text-sm font-semibold">
                                Este ejercicio tiene versión interactiva.{" "}
                                <button 
                                  onClick={() => setShowInteractive(true)}
                                  className="underline hover:text-accent"
                                >
                                  Ver ejercicios interactivos
                                </button>
                              </p>
                            </AlertDescription>
                          </Alert>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="solucion">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Solución Paso a Paso
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 mt-2">
                          <ol className="space-y-3">
                            {ejercicio.solucion.pasos.map((paso, idx) => (
                              <li key={idx} className="flex gap-3 text-sm">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                  {idx + 1}
                                </span>
                                <span className="flex-1 pt-0.5">{paso}</span>
                              </li>
                            ))}
                          </ol>
                          <div className="mt-6 p-4 bg-accent/10 border-2 border-accent rounded-lg">
                            <p className="text-sm font-semibold text-accent mb-1">Respuesta Final:</p>
                            <p className="text-lg font-mono font-bold">{ejercicio.solucion.respuesta}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEjercicios.length === 0 && (
            <Alert>
              <AlertDescription>
                No se encontraron ejercicios para esta categoría.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}