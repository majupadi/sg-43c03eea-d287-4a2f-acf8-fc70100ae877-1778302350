import Link from "next/link";
import { Book, FlaskConical, Calculator } from "lucide-react";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-mono font-bold text-lg">F</span>
          </div>
          <span className="font-mono font-semibold text-lg hidden sm:inline-block">
            Sistema de Fuerzas
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/teoria"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Teoría</span>
          </Link>
          <Link
            href="/simulaciones"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            <FlaskConical className="h-4 w-4" />
            <span className="hidden sm:inline">Simulaciones</span>
          </Link>
          <Link
            href="/ejercicios"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Ejercicios</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}