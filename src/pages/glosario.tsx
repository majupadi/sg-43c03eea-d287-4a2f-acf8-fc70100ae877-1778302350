import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";
import { useState, useMemo } from "react";

interface GlossaryTerm {
  term: string;
  definition: string;
  formula?: string;
  category: string;
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Aceleración",
    definition: "Cambio en la velocidad de un objeto con respecto al tiempo. Se mide en m/s².",
    formula: "a = Δv/Δt",
    category: "Cinemática",
    relatedTerms: ["Velocidad", "Fuerza"]
  },
  {
    term: "Aparejo Factorial",
    definition: "Sistema de poleas móviles dispuestas en paralelo sobre una barra horizontal. La ventaja mecánica es VM = 2·n, donde n es el número de poleas móviles.",
    formula: "VM = 2·n",
    category: "Máquinas Simples",
    relatedTerms: ["Polea", "Aparejo Potencial", "Ventaja Mecánica"]
  },
  {
    term: "Aparejo Potencial",
    definition: "Sistema de poleas móviles dispuestas en cadena vertical (una colgando de la otra). La ventaja mecánica es VM = 2ⁿ, donde n es el número de poleas móviles.",
    formula: "VM = 2ⁿ",
    category: "Máquinas Simples",
    relatedTerms: ["Polea", "Aparejo Factorial", "Ventaja Mecánica"]
  },
  {
    term: "Brazo de Palanca",
    definition: "Distancia perpendicular desde el eje de rotación (fulcro) hasta la línea de acción de la fuerza. Determina la magnitud del momento.",
    formula: "d = distancia perpendicular",
    category: "Momentos",
    relatedTerms: ["Momento", "Torque", "Palanca"]
  },
  {
    term: "Centro de Gravedad",
    definition: "Punto donde se considera concentrado todo el peso de un objeto. Para cuerpos simétricos coincide con el centro geométrico.",
    category: "Equilibrio",
    relatedTerms: ["Peso", "Equilibrio", "Momento"]
  },
  {
    term: "Coeficiente de Fricción (μ)",
    definition: "Número adimensional que representa la resistencia al deslizamiento entre dos superficies. Varía según los materiales (μ ≈ 0.2 para madera, μ ≈ 0.8 para caucho).",
    formula: "Fr = μ·N",
    category: "Fuerzas",
    relatedTerms: ["Fricción", "Fuerza Normal", "Plano Inclinado"]
  },
  {
    term: "Componente de Fuerza",
    definition: "Proyección de una fuerza sobre un eje específico. Permite descomponer fuerzas anguladas en direcciones perpendiculares (x, y).",
    formula: "Fx = F·cos(θ), Fy = F·sin(θ)",
    category: "Fuerzas",
    relatedTerms: ["Fuerza", "Plano Inclinado", "Vector"]
  },
  {
    term: "Equilibrio Estático",
    definition: "Estado donde un objeto permanece en reposo porque la suma de todas las fuerzas y momentos aplicados es cero.",
    formula: "ΣF = 0, ΣM = 0",
    category: "Equilibrio",
    relatedTerms: ["Fuerza", "Momento", "Resultante"]
  },
  {
    term: "Fricción",
    definition: "Fuerza de resistencia que se opone al movimiento relativo entre dos superficies en contacto. Siempre actúa paralela a la superficie.",
    formula: "Fr = μ·N",
    category: "Fuerzas",
    relatedTerms: ["Coeficiente de Fricción", "Fuerza Normal", "Plano Inclinado"]
  },
  {
    term: "Fuerza",
    definition: "Interacción que puede cambiar el movimiento de un objeto. Vector con magnitud, dirección y sentido. Se mide en Newtons (N).",
    formula: "F = m·a",
    category: "Fuerzas",
    relatedTerms: ["Vector", "Newton", "Masa"]
  },
  {
    term: "Fuerza Motriz (Fm)",
    definition: "Fuerza aplicada por una persona o motor para mover o sostener una carga en una máquina simple. En sistemas ideales, Fm × distancia = R × altura.",
    category: "Máquinas Simples",
    relatedTerms: ["Resistencia", "Ventaja Mecánica", "Trabajo"]
  },
  {
    term: "Fuerza Normal (N)",
    definition: "Fuerza perpendicular ejercida por una superficie sobre un objeto que descansa sobre ella. Reacciona al componente del peso perpendicular a la superficie.",
    formula: "N = W·cos(θ)",
    category: "Fuerzas",
    relatedTerms: ["Peso", "Plano Inclinado", "Fricción"]
  },
  {
    term: "Fuerzas Colineales",
    definition: "Fuerzas que actúan sobre una misma línea recta. Pueden tener el mismo sentido (se suman) o sentidos opuestos (se restan).",
    category: "Sistemas de Fuerzas",
    relatedTerms: ["Resultante", "Vector", "Equilibrio"]
  },
  {
    term: "Fuerzas Concurrentes",
    definition: "Sistema de fuerzas cuyas líneas de acción se cruzan en un mismo punto. Se resuelven usando métodos gráficos o componentes rectangulares.",
    category: "Sistemas de Fuerzas",
    relatedTerms: ["Resultante", "Paralelogramo", "Polígono"]
  },
  {
    term: "Fuerzas Paralelas",
    definition: "Sistema de fuerzas con líneas de acción paralelas entre sí. Pueden ser del mismo sentido o de sentidos opuestos. Producen momento alrededor de un punto.",
    category: "Sistemas de Fuerzas",
    relatedTerms: ["Momento", "Resultante", "Cupla"]
  },
  {
    term: "Fulcro",
    definition: "Punto de apoyo o eje de rotación de una palanca. Su posición determina el tipo de palanca y la ventaja mecánica.",
    category: "Máquinas Simples",
    relatedTerms: ["Palanca", "Momento", "Brazo de Palanca"]
  },
  {
    term: "Masa",
    definition: "Cantidad de materia contenida en un objeto. Propiedad intrínseca que no cambia con la ubicación. Se mide en kilogramos (kg).",
    formula: "m = W/g",
    category: "Cinemática",
    relatedTerms: ["Peso", "Inercia", "Fuerza"]
  },
  {
    term: "Método del Paralelogramo",
    definition: "Método gráfico para sumar dos fuerzas concurrentes. Se construye un paralelogramo con las fuerzas como lados; la diagonal representa la resultante.",
    category: "Métodos Gráficos",
    relatedTerms: ["Resultante", "Fuerzas Concurrentes", "Polígono"]
  },
  {
    term: "Método del Polígono",
    definition: "Método gráfico para sumar múltiples fuerzas. Se colocan las fuerzas punta-cola en secuencia; el vector del origen al final es la resultante.",
    category: "Métodos Gráficos",
    relatedTerms: ["Resultante", "Fuerzas Concurrentes", "Paralelogramo"]
  },
  {
    term: "Momento (M o τ)",
    definition: "Tendencia de una fuerza a producir rotación alrededor de un punto. Es el producto de la fuerza por su brazo de palanca.",
    formula: "M = F·d",
    category: "Momentos",
    relatedTerms: ["Torque", "Palanca", "Brazo de Palanca"]
  },
  {
    term: "Newton (N)",
    definition: "Unidad de fuerza en el Sistema Internacional. 1 N es la fuerza necesaria para acelerar 1 kg a 1 m/s². 1 N ≈ 0.102 kgf ≈ 0.225 lbf.",
    formula: "1 N = 1 kg·m/s²",
    category: "Unidades",
    relatedTerms: ["Fuerza", "Masa", "Aceleración"]
  },
  {
    term: "Palanca",
    definition: "Máquina simple consistente en una barra rígida que gira alrededor de un fulcro. Existen tres tipos según la posición relativa de fulcro, fuerza motriz y resistencia.",
    formula: "Fm·dm = R·dr",
    category: "Máquinas Simples",
    relatedTerms: ["Fulcro", "Momento", "Ventaja Mecánica"]
  },
  {
    term: "Peso (W)",
    definition: "Fuerza gravitacional que actúa sobre un objeto. Producto de la masa por la aceleración de la gravedad. Varía con la ubicación.",
    formula: "W = m·g",
    category: "Fuerzas",
    relatedTerms: ["Masa", "Gravedad", "Fuerza"]
  },
  {
    term: "Plano Inclinado",
    definition: "Superficie plana elevada a un ángulo respecto a la horizontal. Máquina simple que reduce la fuerza necesaria para elevar objetos a cambio de mayor distancia.",
    formula: "Wx = W·sin(θ), Wy = W·cos(θ)",
    category: "Máquinas Simples",
    relatedTerms: ["Componente de Fuerza", "Ventaja Mecánica", "Fricción"]
  },
  {
    term: "Polea Fija",
    definition: "Polea cuyo eje permanece en una posición fija. No ofrece ventaja mecánica (VM = 1) pero cambia la dirección de la fuerza aplicada.",
    formula: "Fm = R, VM = 1",
    category: "Máquinas Simples",
    relatedTerms: ["Polea Móvil", "Ventaja Mecánica"]
  },
  {
    term: "Polea Móvil",
    definition: "Polea cuyo eje se desplaza junto con la carga. Ofrece ventaja mecánica de 2 (VM = 2), reduciendo la fuerza necesaria a la mitad.",
    formula: "Fm = R/2, VM = 2",
    category: "Máquinas Simples",
    relatedTerms: ["Polea Fija", "Aparejo", "Ventaja Mecánica"]
  },
  {
    term: "Resistencia (R)",
    definition: "Carga o peso que se desea mover o sostener en una máquina simple. La fuerza que se opone al movimiento deseado.",
    category: "Máquinas Simples",
    relatedTerms: ["Fuerza Motriz", "Ventaja Mecánica", "Peso"]
  },
  {
    term: "Resultante",
    definition: "Fuerza única que produce el mismo efecto que un sistema de fuerzas. Se obtiene por suma vectorial de todas las fuerzas del sistema.",
    formula: "R = ΣF",
    category: "Sistemas de Fuerzas",
    relatedTerms: ["Vector", "Equilibrio", "Componente"]
  },
  {
    term: "Torque",
    definition: "Sinónimo de momento. Efecto rotacional producido por una fuerza aplicada a una distancia del eje de rotación.",
    formula: "τ = F·d·sin(θ)",
    category: "Momentos",
    relatedTerms: ["Momento", "Rotación", "Brazo de Palanca"]
  },
  {
    term: "Vector",
    definition: "Cantidad física que tiene magnitud, dirección y sentido. Se representa gráficamente como una flecha. Ejemplos: fuerza, velocidad, aceleración.",
    category: "Fundamentos",
    relatedTerms: ["Fuerza", "Resultante", "Componente"]
  },
  {
    term: "Velocidad",
    definition: "Cambio en la posición de un objeto con respecto al tiempo. Cantidad vectorial con magnitud (rapidez) y dirección.",
    formula: "v = Δx/Δt",
    category: "Cinemática",
    relatedTerms: ["Aceleración", "Desplazamiento", "Rapidez"]
  },
  {
    term: "Ventaja Mecánica (VM)",
    definition: "Relación entre la resistencia (carga) y la fuerza motriz en una máquina simple. Indica cuántas veces se reduce el esfuerzo necesario.",
    formula: "VM = R/Fm",
    category: "Máquinas Simples",
    relatedTerms: ["Fuerza Motriz", "Resistencia", "Eficiencia"]
  }
];

export default function GlosarioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(glossaryTerms.map(t => t.category))).sort();

  const filteredTerms = useMemo(() => {
    return glossaryTerms
      .filter(term => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Glosario de Física - Algo de Fisica lab 1"
        description="Definiciones rápidas de conceptos de física: fuerzas, momentos, máquinas simples, equilibrio y más."
      />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                Glosario de Física
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Definiciones rápidas de {glossaryTerms.length} conceptos fundamentales de física
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar término o definición..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todas ({glossaryTerms.length})
                  </Badge>
                  {categories.map(category => {
                    const count = glossaryTerms.filter(t => t.category === category).length;
                    return (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category} ({count})
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredTerms.length === glossaryTerms.length ? (
              <span>Mostrando todos los {glossaryTerms.length} términos</span>
            ) : (
              <span>
                Encontrados {filteredTerms.length} de {glossaryTerms.length} términos
              </span>
            )}
          </div>

          {/* Terms Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTerms.map((term, index) => (
              <Card 
                key={index}
                className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-accent"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-xl text-primary">
                      {term.term}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {term.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    {term.definition}
                  </p>

                  {term.formula && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Fórmula:</p>
                      <p className="font-mono text-sm font-semibold text-accent">
                        {term.formula}
                      </p>
                    </div>
                  )}

                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Términos relacionados:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {term.relatedTerms.map((related, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-accent/10"
                            onClick={() => setSearchTerm(related)}
                          >
                            {related}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredTerms.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron términos que coincidan con &ldquo;{searchTerm}&rdquo;
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Limpiar búsqueda
              </button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}