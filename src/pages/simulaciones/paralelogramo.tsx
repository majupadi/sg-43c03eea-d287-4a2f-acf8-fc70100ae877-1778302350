import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ParalelogramoSimulation } from "@/components/simulations/ParalelogramoSimulation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ParalelogramoSimulationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                ← Volver al inicio
              </Button>
            </Link>
            <h1 className="font-mono text-4xl font-bold mb-4">
              Simulación: Método del Paralelogramo
            </h1>
            <p className="text-lg text-muted-foreground">
              Visualiza la composición de dos fuerzas concurrentes
            </p>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Ajusta las magnitudes de las fuerzas y el ángulo entre ellas para ver cómo
              cambia la resultante. El paralelogramo completo se muestra con líneas
              punteadas grises, y la diagonal ámbar representa la resultante.
            </AlertDescription>
          </Alert>

          <ParalelogramoSimulation />

          <div className="mt-8 flex gap-4">
            <Button asChild variant="outline">
              <Link href="/teoria/metodos-graficos">
                Ver Teoría
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/ejercicios">
                Ver Ejercicios
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}