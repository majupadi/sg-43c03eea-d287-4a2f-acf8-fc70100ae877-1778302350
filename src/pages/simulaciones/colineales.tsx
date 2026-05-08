import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ColinealesSimulation } from "@/components/simulations/ColinealesSimulation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ColinealesSimulationPage() {
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
              Simulación: Fuerzas Colineales
            </h1>
            <p className="text-lg text-muted-foreground">
              Experimenta con diferentes magnitudes y direcciones de fuerzas
            </p>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Modifica los valores de las fuerzas para ver cómo cambia la resultante en tiempo real.
              Los vectores azules apuntan a la derecha (+), los rojos a la izquierda (-).
            </AlertDescription>
          </Alert>

          <ColinealesSimulation />

          <div className="mt-8 flex gap-4">
            <Button asChild variant="outline">
              <Link href="/teoria/colineales">
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