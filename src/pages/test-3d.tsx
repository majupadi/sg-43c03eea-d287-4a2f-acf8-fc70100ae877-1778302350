import { Navigation } from "@/components/Navigation";
import dynamic from "next/dynamic";

const Simple3DTest = dynamic(
  () => import("@/components/simulations/Simple3DTest").then((mod) => mod.Simple3DTest),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] flex items-center justify-center bg-slate-100">Cargando simulación 3D...</div>
  }
);

export default function Test3DPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Test de Simulación 3D</h1>
        <p className="text-muted-foreground mb-6">
          Esta es una prueba simple para verificar que Three.js funciona correctamente.
        </p>
        
        <div className="border-4 border-primary/50 rounded-lg overflow-hidden">
          <Simple3DTest />
        </div>
        
        <div className="mt-6 p-4 bg-amber-100 dark:bg-amber-950 rounded-lg">
          <p className="text-sm">
            Si ves un cubo azul girando, Three.js está funcionando correctamente.
            Si no ves nada o hay un error, por favor copia el mensaje de error de la consola del navegador.
          </p>
        </div>
      </main>
    </div>
  );
}