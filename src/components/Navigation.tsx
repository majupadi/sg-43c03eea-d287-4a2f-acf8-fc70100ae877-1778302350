import Link from "next/link";
import { Book, FlaskConical, Calculator, Bot } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-mono font-bold text-xl text-primary hover:text-primary/80 transition-colors">
            <span>Algo de Fisica lab 1</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/teoria"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Book className="w-4 h-4" />
              <span className="hidden sm:inline">Teoría</span>
            </Link>
            <Link
              href="/simulaciones"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <FlaskConical className="w-4 h-4" />
              <span className="hidden sm:inline">Simulaciones</span>
            </Link>
            <Link
              href="/ejercicios"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Ejercicios</span>
            </Link>
            <Link
              href="/asistente"
              className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Asistente IA</span>
            </Link>
            <ThemeSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}