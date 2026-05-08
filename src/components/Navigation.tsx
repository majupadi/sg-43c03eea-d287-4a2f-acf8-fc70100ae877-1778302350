import Link from "next/link";
import { Book, FlaskConical, Calculator } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-mono font-bold text-xl text-primary hover:text-primary/80 transition-colors">
            <FlaskConical className="w-6 h-6" />
            <span className="hidden sm:inline">Sistema de Fuerzas</span>
            <span className="sm:hidden">Fuerzas</span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Link 
                href="/teoria" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/20 transition-colors font-medium"
              >
                <Book className="w-4 h-4" />
                <span className="hidden sm:inline">Teoría</span>
              </Link>

              <Link 
                href="/simulaciones" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/20 transition-colors font-medium"
              >
                <FlaskConical className="w-4 h-4" />
                <span className="hidden sm:inline">Simulaciones</span>
              </Link>

              <Link 
                href="/ejercicios" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/20 transition-colors font-medium"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Ejercicios</span>
              </Link>
            </div>

            <ThemeSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}