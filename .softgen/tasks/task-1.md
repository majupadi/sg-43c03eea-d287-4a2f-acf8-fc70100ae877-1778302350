---
title: Diseño y navegación principal
status: in_progress
priority: urgent
type: feature
tags: [ui, navigation, design-system]
created_by: agent
created_at: 2026-05-08T21:12:56Z
position: 0
---

## Notes
Establecer sistema de diseño completo y estructura de navegación. La app necesita:
- Header con navegación entre temas
- Página principal con tarjetas de acceso a cada tema
- Sistema de colores navy + amber + white
- Tipografías JetBrains Mono + IBM Plex Sans

## Checklist
- [x] Configurar CSS variables en globals.css (navy, amber, muted)
- [x] Registrar fuentes en tailwind.config.ts
- [x] Crear componente Navigation con links a: Teoría, Simulaciones, Ejercicios
- [x] Crear página index.tsx con 4 tarjetas de temas principales:
  * Sistemas de Fuerzas Colineales
  * Métodos Gráficos (Paralelogramo y Polígono)
  * Sistemas de Fuerzas Paralelas
  * Peso y Equilibrio
- [x] Diseñar Footer con recursos adicionales

## Acceptance
- Landing page muestra 4 temas principales claramente diferenciados
- Navegación funcional entre secciones
- Diseño técnico pero accesible, colores navy + amber aplicados