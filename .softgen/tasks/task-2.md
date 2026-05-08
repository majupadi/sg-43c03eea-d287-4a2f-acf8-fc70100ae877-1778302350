---
title: Simulación de fuerzas colineales
status: done
priority: high
type: feature
tags: [simulation, colinear-forces, canvas]
created_by: agent
created_at: 2026-05-08T21:12:56Z
position: 1
---

## Notes
Simulación interactiva del primer ejercicio (problema 17-18): sistema de fuerzas colineales con 6 fuerzas en una línea horizontal. Usuario puede modificar valores y ver resultante calculada en tiempo real.

## Checklist
- [x] Crear componente SimulacionColineales con canvas HTML5
- [x] Renderizar línea horizontal con 6 vectores de fuerza
- [x] Implementar inputs para modificar magnitudes (Kgf, N, Dinas, grf)
- [x] Calcular resultante automáticamente: R = ΣF (suma algebraica)
- [x] Mostrar escala utilizada en el gráfico
- [x] Añadir controles para mostrar/ocultar componentes
- [x] Indicar dirección de la resultante con flecha destacada

## Acceptance
- Usuario puede modificar las 6 fuerzas y ver resultante actualizada
- Escala se calcula y muestra automáticamente
- Cálculos coinciden con ejemplos del material (R=17 Kgf)