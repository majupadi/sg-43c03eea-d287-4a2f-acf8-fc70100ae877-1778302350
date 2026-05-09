import Link from "next/link";
import { Book, FlaskConical, Calculator, Brain } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <FlaskConical className="h-6 w-6 text-primary" />
            <span className="font-mono font-bold text-lg hidden sm:inline">Algo de Fisica</span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="/teoria"
              className="px-3 md:px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
            >
              <Book className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Teoría</span>
            </Link>

            <Link
              href="/simulaciones"
              className="px-3 md:px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
            >
              <FlaskConical className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Simulaciones</span>
            </Link>

            <Link
              href="/ejercicios"
              className="px-3 md:px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Ejercicios</span>
            </Link>

            <Link
              href="/quiz"
              className="px-3 md:px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Quiz</span>
            </Link>

            <ThemeSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}