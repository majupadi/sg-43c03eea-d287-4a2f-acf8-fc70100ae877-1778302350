---
title: Simulación método del paralelogramo
status: todo
priority: high
type: feature
tags: [simulation, vectors, graphical-method]
created_by: agent
created_at: 2026-05-08T21:12:56Z
position: 2
---

## Notes
Simulación interactiva del método del paralelogramo para sumar vectores. Usuario arrastra puntos para modificar ángulos y magnitudes, ve construcción del paralelogramo en tiempo real.

## Checklist
- [x] Crear componente SimulacionParalelogramo con canvas HTML5
- [x] Renderizar dos vectores desde origen común con ángulo ajustable
- [x] Dibujar líneas punteadas para completar el paralelogramo
- [x] Calcular y mostrar resultante: R = √(F₁² + F₂² + 2·F₁·F₂·cos(θ))
- [x] Inputs para F₁, F₂ y ángulo θ
- [x] Mostrar diagonal del paralelogramo como vector resultante
- [x] Fórmulas y casos especiales (θ=0°, 90°, 180°)

## Acceptance
- Usuario arrastra vectores y ve paralelogramo construirse dinámicamente
- Resultante se calcula y visualiza correctamente
- Proceso paso a paso es claro y educativo