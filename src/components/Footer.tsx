import Link from "next/link";
import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-mono font-semibold text-sm mb-3">Sistema de Fuerzas</h3>
            <p className="text-sm text-muted-foreground">
              Plataforma educativa interactiva para el estudio de sistemas de fuerzas en física.
            </p>
          </div>

          <div>
            <h3 className="font-mono font-semibold text-sm mb-3">Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/teoria" className="hover:text-foreground transition-colors">
                  Teoría Completa
                </Link>
              </li>
              <li>
                <Link href="/simulaciones" className="hover:text-foreground transition-colors">
                  Simulaciones Interactivas
                </Link>
              </li>
              <li>
                <Link href="/ejercicios" className="hover:text-foreground transition-colors">
                  Ejercicios Resueltos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono font-semibold text-sm mb-3">Contacto</h3>
            <div className="flex gap-4">
              <a
                href="mailto:contacto@sistemafuerzas.edu"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Correo electrónico"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 Sistema de Fuerzas. Plataforma educativa de física.</p>
        </div>
      </div>
    </footer>
  );
}