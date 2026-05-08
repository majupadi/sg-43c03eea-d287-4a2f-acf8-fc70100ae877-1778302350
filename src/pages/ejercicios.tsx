import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EjerciciosPage() {
  const exercises = [
    {
      id: "17",
      title: "Problema 17 - Sistema de Fuerzas Colineales",
      category: "Fuerzas Colineales",
      statement: "Determinar gráfica y analíticamente la resultante del siguiente sistema de fuerzas colineales: F₁=10 Kgf →, F₂=7 Kgf →, F₃=8 Kgf ←, F₄=15 Kgf ←, F₅=20 Kgf →, F₆=3 Kgf ←",
      solution: `**Solución:**

**Paso 1:** Asignar signos según convención (→ positivo, ← negativo)
- F₁ = +10 Kgf
- F₂ = +7 Kgf
- F₃ = -8 Kgf
- F₄ = -15 Kgf
- F₅ = +20 Kgf
- F₆ = -3 Kgf

**Paso 2:** Calcular la resultante
R = F₁ + F₂ + F₃ + F₄ + F₅ + F₆
R = 10 + 7 - 8 - 15 + 20 - 3
R = 37 - 26
R = 11 Kgf →

**Paso 3:** Solución gráfica
Escala: 1 cm = 2 Kgf
Se trazan los vectores consecutivamente sobre una línea horizontal, respetando sentidos.
La resultante mide 5.5 cm en la escala, lo que equivale a 11 Kgf.

**Respuesta:** R = 11 Kgf hacia la derecha`
    },
    {
      id: "18",
      title: "Problema 18 - Conversión de Unidades",
      category: "Conversión",
      statement: "Expresar la resultante del problema 17 en: a) Newtons, b) Dinas, c) gramos fuerza",
      solution: `**Solución:**

Resultante: R = 11 Kgf

**a) En Newtons:**
1 Kgf = 9.8 N
R = 11 × 9.8 = 107.8 N

**b) En Dinas:**
1 Kgf = 980,000 Dinas
R = 11 × 980,000 = 10,780,000 Dinas = 1.078 × 10⁷ Dinas

**c) En gramos fuerza:**
1 Kgf = 1000 grf
R = 11 × 1000 = 11,000 grf

**Respuestas:**
- a) 107.8 N
- b) 1.078 × 10⁷ Dinas
- c) 11,000 grf`
    },
    {
      id: "19",
      title: "Problema 19 - Método del Paralelogramo (Caso 1)",
      category: "Métodos Gráficos",
      statement: "Dos fuerzas de 30 N y 40 N actúan sobre un punto formando un ángulo de 60°. Determinar la resultante gráfica y analíticamente.",
      solution: `**Solución:**

Datos: F₁ = 30 N, F₂ = 40 N, θ = 60°

**Método Analítico:**
Usando la fórmula del paralelogramo:
R = √(F₁² + F₂² + 2·F₁·F₂·cos(θ))
R = √(30² + 40² + 2·30·40·cos(60°))
R = √(900 + 1600 + 2400·0.5)
R = √(900 + 1600 + 1200)
R = √3700
R ≈ 60.83 N

**Ángulo α (respecto a F₁):**
tan(α) = (F₂·sen(θ)) / (F₁ + F₂·cos(θ))
tan(α) = (40·sen(60°)) / (30 + 40·cos(60°))
tan(α) = (40·0.866) / (30 + 20)
tan(α) = 34.64 / 50 = 0.693
α ≈ 34.7°

**Método Gráfico:**
Escala: 1 cm = 10 N
- Trazar F₁ = 3 cm
- Desde el origen, trazar F₂ = 4 cm a 60°
- Completar el paralelogramo
- La diagonal mide aproximadamente 6.08 cm = 60.8 N

**Respuesta:** R ≈ 60.83 N a 34.7° de F₁`
    },
    {
      id: "20",
      title: "Problema 20 - Método del Paralelogramo (Caso 2)",
      category: "Métodos Gráficos",
      statement: "Dos fuerzas de 50 Kgf y 80 Kgf forman un ángulo de 90°. Hallar la resultante.",
      solution: `**Solución:**

Datos: F₁ = 50 Kgf, F₂ = 80 Kgf, θ = 90°

**Método Analítico:**
Para θ = 90°, la fórmula se simplifica:
R = √(F₁² + F₂²)
R = √(50² + 80²)
R = √(2500 + 6400)
R = √8900
R ≈ 94.34 Kgf

**Ángulo α:**
tan(α) = F₂/F₁ = 80/50 = 1.6
α = arctan(1.6) ≈ 58°

**Método Gráfico:**
Escala: 1 cm = 10 Kgf
- Trazar F₁ = 5 cm horizontal
- Trazar F₂ = 8 cm vertical (90°)
- La diagonal mide 9.43 cm = 94.3 Kgf

**Respuesta:** R ≈ 94.34 Kgf a 58° de F₁`
    },
    {
      id: "21",
      title: "Problema 21 - Método del Polígono (3 fuerzas)",
      category: "Métodos Gráficos",
      statement: "Tres fuerzas concurrentes: F₁=20 N a 0°, F₂=30 N a 60°, F₃=25 N a 135°. Hallar la resultante por el método del polígono.",
      solution: `**Solución:**

**Método del Polígono:**
Escala: 1 cm = 5 N

**Construcción paso a paso:**
1. Trazar F₁ = 4 cm horizontal (0°)
2. Desde el extremo de F₁, trazar F₂ = 6 cm a 60°
3. Desde el extremo de F₂, trazar F₃ = 5 cm a 135°
4. La resultante R va del origen al extremo de F₃

**Medición gráfica:**
R ≈ 9.2 cm en escala = 46 N
Ángulo ≈ 48° respecto a la horizontal

**Verificación por componentes:**
Rx = 20·cos(0°) + 30·cos(60°) + 25·cos(135°)
Rx = 20 + 15 - 17.68 = 17.32 N

Ry = 20·sen(0°) + 30·sen(60°) + 25·sen(135°)
Ry = 0 + 25.98 + 17.68 = 43.66 N

R = √(Rx² + Ry²) = √(17.32² + 43.66²) ≈ 46.97 N
α = arctan(Ry/Rx) = arctan(43.66/17.32) ≈ 68.3°

**Respuesta:** R ≈ 47 N a 68° (método del polígono)`
    },
    {
      id: "22",
      title: "Problema 22 - Sistema en Equilibrio",
      category: "Equilibrio",
      statement: "Un sistema está en equilibrio bajo la acción de tres fuerzas: F₁=50 N horizontal →, F₂=60 N a 120°, F₃=? Determinar F₃.",
      solution: `**Solución:**

Para el equilibrio: ΣF = 0, lo que significa R = 0

**Condiciones:**
ΣFx = 0 y ΣFy = 0

**Paso 1:** Componentes de las fuerzas conocidas
F₁x = 50 N, F₁y = 0 N
F₂x = 60·cos(120°) = -30 N
F₂y = 60·sen(120°) = 51.96 N

**Paso 2:** Para equilibrio
F₃x = -(F₁x + F₂x) = -(50 - 30) = -20 N
F₃y = -(F₁y + F₂y) = -(0 + 51.96) = -51.96 N

**Paso 3:** Magnitud de F₃
F₃ = √(F₃x² + F₃y²)
F₃ = √((-20)² + (-51.96)²)
F₃ = √(400 + 2699.84)
F₃ ≈ 55.67 N

**Paso 4:** Dirección de F₃
α = arctan(|F₃y|/|F₃x|) = arctan(51.96/20) ≈ 69°
Dirección: 180° + 69° = 249° (tercer cuadrante)

**Respuesta:** F₃ ≈ 55.67 N a 249° (o 69° bajo la horizontal izquierda)`
    },
    {
      id: "23",
      title: "Problema 23 - Fuerzas Paralelas del Mismo Sentido",
      category: "Fuerzas Paralelas",
      statement: "Tres fuerzas paralelas verticales hacia abajo actúan sobre una viga: F₁=100 N a 2 m del origen, F₂=150 N a 5 m, F₃=80 N a 8 m. Hallar la resultante y su posición.",
      solution: `**Solución:**

**Paso 1:** Magnitud de la resultante
R = F₁ + F₂ + F₃
R = 100 + 150 + 80 = 330 N ↓

**Paso 2:** Posición de la resultante (Teorema de Varignon)
R·d = F₁·d₁ + F₂·d₂ + F₃·d₃
330·d = 100·2 + 150·5 + 80·8
330·d = 200 + 750 + 640
330·d = 1590
d = 1590/330 = 4.82 m

**Verificación:**
El centro de gravedad del sistema está a 4.82 m del origen,
entre F₁ y F₃, más cerca de F₂ (la fuerza mayor).

**Respuesta:**
- Resultante: R = 330 N ↓
- Posición: d = 4.82 m desde el origen`
    },
    {
      id: "24",
      title: "Problema 24 - Fuerzas Paralelas de Distinto Sentido",
      category: "Fuerzas Paralelas",
      statement: "Dos fuerzas paralelas: F₁=200 N ↑ a x=0, F₂=120 N ↓ a x=6 m. Determinar la resultante y su ubicación.",
      solution: `**Solución:**

**Paso 1:** Magnitud de la resultante
R = F₁ - F₂ (sentidos opuestos)
R = 200 - 120 = 80 N ↑

**Paso 2:** Posición de la resultante
Tomando momentos respecto al origen (x=0):
R·d = F₁·0 + (-F₂)·6
80·d = 0 - 120·6
80·d = -720
d = -9 m

El signo negativo indica que la resultante se encuentra a 9 m
a la izquierda del origen (fuera del segmento entre F₁ y F₂).

**Interpretación física:**
La resultante de fuerzas paralelas opuestas puede ubicarse fuera
del segmento que une sus puntos de aplicación.

**Respuesta:**
- Resultante: R = 80 N ↑
- Posición: 9 m a la izquierda del origen`
    },
    {
      id: "25",
      title: "Problema 25 - Par de Fuerzas",
      category: "Fuerzas Paralelas",
      statement: "Dos fuerzas paralelas de 50 N cada una, en sentidos opuestos, separadas 0.8 m. Calcular el momento del par.",
      solution: `**Solución:**

**Definición de Par:**
Un par es un sistema de dos fuerzas paralelas de igual magnitud
y sentidos opuestos. Produce rotación pura sin traslación.

**Datos:**
F₁ = 50 N ↑
F₂ = 50 N ↓
d = 0.8 m (distancia perpendicular)

**Momento del Par:**
M = F · d
M = 50 · 0.8
M = 40 N·m

**Propiedades del par:**
- La resultante R = F₁ - F₂ = 0 (no hay traslación)
- El momento es constante respecto a cualquier punto
- Produce solo rotación

**Respuesta:** M = 40 N·m (momento del par)`
    },
    {
      id: "26",
      title: "Problema 26 - Equilibrio de Viga",
      category: "Equilibrio",
      statement: "Una viga de 6 m apoyada en sus extremos soporta cargas de 300 N a 2 m y 200 N a 5 m del extremo izquierdo. Calcular las reacciones en los apoyos.",
      solution: `**Solución:**

**Diagrama:**
- Apoyo A en x=0 (reacción RA ↑)
- Carga F₁=300 N ↓ en x=2 m
- Carga F₂=200 N ↓ en x=5 m
- Apoyo B en x=6 m (reacción RB ↑)

**Condición 1: Equilibrio de fuerzas (ΣF=0)**
RA + RB = F₁ + F₂
RA + RB = 300 + 200
RA + RB = 500 N ... (ecuación 1)

**Condición 2: Equilibrio de momentos (ΣM=0)**
Tomando momentos respecto a A:
RB·6 = F₁·2 + F₂·5
RB·6 = 300·2 + 200·5
RB·6 = 600 + 1000
RB·6 = 1600
RB = 266.67 N

**De la ecuación 1:**
RA = 500 - 266.67 = 233.33 N

**Verificación (momentos respecto a B):**
RA·6 = F₁·4 + F₂·1
233.33·6 ≈ 300·4 + 200·1
1400 ≈ 1400 ✓

**Respuesta:**
- RA = 233.33 N
- RB = 266.67 N`
    },
    {
      id: "27",
      title: "Problema 27 - Centro de Gravedad",
      category: "Centro de Gravedad",
      statement: "Tres masas puntuales: m₁=5 kg en (0,0), m₂=8 kg en (4,0), m₃=3 kg en (2,3). Hallar el centro de gravedad del sistema.",
      solution: `**Solución:**

**Fórmulas del centro de gravedad:**
xG = (Σmi·xi) / (Σmi)
yG = (Σmi·yi) / (Σmi)

**Datos:**
- m₁ = 5 kg en (0, 0)
- m₂ = 8 kg en (4, 0)
- m₃ = 3 kg en (2, 3)

**Masa total:**
M = m₁ + m₂ + m₃ = 5 + 8 + 3 = 16 kg

**Coordenada x del CG:**
xG = (m₁·x₁ + m₂·x₂ + m₃·x₃) / M
xG = (5·0 + 8·4 + 3·2) / 16
xG = (0 + 32 + 6) / 16
xG = 38/16 = 2.375 m

**Coordenada y del CG:**
yG = (m₁·y₁ + m₂·y₂ + m₃·y₃) / M
yG = (5·0 + 8·0 + 3·3) / 16
yG = (0 + 0 + 9) / 16
yG = 9/16 = 0.5625 m

**Interpretación:**
El centro de gravedad está más cerca de m₂ (la masa mayor)
y ligeramente desplazado hacia m₃.

**Respuesta:** CG en (2.375 m, 0.5625 m)`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                ← Volver al inicio
              </Button>
            </Link>
            <h1 className="font-mono text-4xl font-bold mb-4">
              Ejercicios Resueltos
            </h1>
            <p className="text-lg text-muted-foreground">
              11 problemas con soluciones paso a paso
            </p>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Cada ejercicio incluye el enunciado completo y la solución detallada.
              Intenta resolver primero por tu cuenta antes de ver la respuesta.
            </AlertDescription>
          </Alert>

          <div className="grid gap-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-sm">Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full">
                    Fuerzas Colineales (2)
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-mono rounded-full">
                    Métodos Gráficos (3)
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full">
                    Fuerzas Paralelas (3)
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-mono rounded-full">
                    Equilibrio (2)
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full">
                    Centro de Gravedad (1)
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {exercises.map((exercise) => (
              <AccordionItem key={exercise.id} value={exercise.id} className="border rounded-lg">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex items-start gap-4 text-left w-full">
                    <span className="font-mono text-2xl font-bold text-muted-foreground">
                      {exercise.id}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-mono font-semibold text-base">
                        {exercise.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exercise.category}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-4 border-t border-border">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          ?
                        </span>
                        <h4 className="font-semibold">Enunciado</h4>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed pl-8">
                        {exercise.statement}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <h4 className="font-semibold">Solución</h4>
                      </div>
                      <div className="bg-muted/30 p-6 rounded-lg space-y-4 pl-8">
                        {exercise.solution.split('\n\n').map((paragraph, idx) => (
                          <div key={idx}>
                            {paragraph.startsWith('**') ? (
                              <p className="font-mono text-sm font-semibold">
                                {paragraph.replace(/\*\*/g, '')}
                              </p>
                            ) : (
                              <p className="text-sm leading-relaxed font-mono whitespace-pre-line">
                                {paragraph}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-mono font-semibold mb-2">¿Necesitas más práctica?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Prueba las simulaciones interactivas para experimentar con diferentes valores
              y visualizar los conceptos en tiempo real.
            </p>
            <Button asChild>
              <Link href="/simulaciones">
                Ir a Simulaciones
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}