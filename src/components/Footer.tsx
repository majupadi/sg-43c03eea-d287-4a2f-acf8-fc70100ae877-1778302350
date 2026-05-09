import Link from "next/link";
import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-3">
            <h3 className="font-mono font-bold text-lg text-primary">Algo de Fisica lab 1</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma educativa interactiva para el estudio de sistemas de fuerzas mediante simulaciones realistas y ejercicios prácticos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono font-semibold mb-4 text-primary">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/teoria" className="text-muted-foreground hover:text-foreground transition-colors">
                  Teoría Completa
                </Link>
              </li>
              <li>
                <Link href="/simulaciones" className="text-muted-foreground hover:text-foreground transition-colors">
                  Simulaciones
                </Link>
              </li>
              <li>
                <Link href="/ejercicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ejercicios Resueltos
                </Link>
              </li>
              <li>
                <Link href="/glosario" className="text-muted-foreground hover:text-foreground transition-colors">
                  Glosario
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">
                  Quiz Interactivo
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <h3 className="font-mono font-semibold text-primary">Temas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/teoria/colineales" className="text-muted-foreground hover:text-primary transition-colors">
                  Fuerzas Colineales
                </Link>
              </li>
              <li>
                <Link href="/teoria/paralelas" className="text-muted-foreground hover:text-primary transition-colors">
                  Fuerzas Paralelas
                </Link>
              </li>
              <li>
                <Link href="/teoria/momentos" className="text-muted-foreground hover:text-primary transition-colors">
                  Momentos y Torque
                </Link>
              </li>
              <li>
                <Link href="/teoria/equilibrio" className="text-muted-foreground hover:text-primary transition-colors">
                  Equilibrio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-mono font-semibold text-primary">Contacto</h3>
            <div className="space-y-2 text-sm">
              <a 
                href="mailto:majupadi@gmail.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>majupadi@gmail.com</span>
              </a>
              <p className="text-muted-foreground mt-4">
                ¿Tienes preguntas o sugerencias? No dudes en contactarnos.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Algo de Fisica lab 1. Plataforma educativa de física.</p>
        </div>
      </div>
    </footer>
  );
}