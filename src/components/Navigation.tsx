import Link from "next/link";
import { Book, FlaskConical, Calculator, BookOpen, MessageSquare } from "lucide-react";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FlaskConical className="w-6 h-6 text-primary" />
            <span className="font-mono font-bold text-lg text-primary">Algo de Fisica</span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="/teoria"
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-md hover:bg-accent/10 transition-colors text-sm md:text-base"
            >
              <Book className="w-4 h-4" />
              <span className="hidden sm:inline">Teoría</span>
            </Link>
            <Link
              href="/simulaciones"
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-md hover:bg-accent/10 transition-colors text-sm md:text-base"
            >
              <FlaskConical className="w-4 h-4" />
              <span className="hidden sm:inline">Simulaciones</span>
            </Link>
            <Link
              href="/ejercicios"
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-md hover:bg-accent/10 transition-colors text-sm md:text-base"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Ejercicios</span>
            </Link>
            <Link
              href="/glosario"
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-md hover:bg-accent/10 transition-colors text-sm md:text-base"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Glosario</span>
            </Link>
            <Link
              href="/asistente"
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-md hover:bg-accent/10 transition-colors text-sm md:text-base"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Asistente IA</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}