# Gestión del proyecto — NoteFlow

## Herramienta utilizada

El trabajo se gestiona con un tablero **Jira** organizado en cinco columnas que representan el flujo de una tarea desde que se identifica hasta que se completa.

> 🔗 [\[Enlace al tablero Jira\]](https://focusboard.atlassian.net/jira/software/projects/NOTE/boards/1?atlOrigin=eyJpIjoiMGY3MjA0YTJlZjkyNGFkMmE4ZDA2OGM5NjQzZDBjYTkiLCJwIjoiaiJ9)(#) 

---

## Estructura del tablero

| Columna | Qué contiene |
|---|---|
| **Backlog** | Todo lo que se quiere hacer pero aún no tiene prioridad asignada |
| **Todo** | Tareas priorizadas y listas para empezar en el sprint actual |
| **In Progress** | Lo que se está desarrollando ahora mismo (máximo 2-3 tarjetas) |
| **Review** | Funcionalidades terminadas pendientes de revisión o prueba en dispositivo |
| **Done** | Completado y verificado |

---

## Cómo se organizan las tarjetas

Cada funcionalidad principal del proyecto tiene su propia tarjeta. Dentro de cada tarjeta se añaden subtareas técnicas concretas usando la checklist de Trello.

**Ejemplo — tarjeta "Pantalla de Notas":**
- [x] Crear `app/(tabs)/notas.tsx`
- [x] Instalar FlashList
- [x] Conectar store con la lista
- [x] Añadir estado vacío
- [x] Añadir FAB de creación

---

## Flujo de trabajo

1. Las tareas nuevas entran siempre en **Backlog**.
2. Al inicio de cada sesión de trabajo se mueven a **Todo** las que se van a abordar.
3. Cuando se empieza a trabajar en una tarjeta, pasa a **In Progress**.
4. Al terminar el código, pasa a **Review** — se prueba en el dispositivo físico antes de darla por buena.
5. Si funciona correctamente, pasa a **Done**.

---

## Estado actual del desarrollo

El progreso técnico detallado se mantiene en `.github/copilot-instructions.md` con un checklist actualizado. Este documento refleja el estado a nivel de gestión y planificación, no a nivel de código.

### Completado
- Setup del proyecto (Expo SDK 53, Expo Router, dependencias base)
- Configuración de herramientas de IA (Copilot, Opencode)
- Definición del producto (`docs/idea.md`)
- Sistema de diseño (React Native Paper + tema personalizado)
- Tipos TypeScript (`types/index.ts`)
- Store global (`store/notesStore.ts` con Zustand + AsyncStorage)
- Navegación base (3 pestañas + rutas dinámicas `[id].tsx`)

### En progreso
- Componentes de tarjeta (NoteCard, ChecklistCard, IdeaCard)

### Pendiente
- FlashList en las tres pestañas
- Formularios de creación y edición
- Validación con Zod
- Pantallas de detalle
- Estados vacíos
- Haptics
- Búsqueda y filtrado

---

## Decisiones tomadas durante el desarrollo

| Decisión | Motivo |
|---|---|
| SDK 53 en lugar de 56 | Compatibilidad completa con Expo Go en Android |
| React Native Paper en lugar de Gluestack UI | Menor fricción, foco en arquitectura no en diseño |
| Archivar en lugar de eliminar | Mejor UX, evita pérdida accidental de datos |
| FAB por pestaña en lugar de modal global | Cada pestaña sabe qué tipo de nota crear |
| Zustand en lugar de Context API | Sin re-renders innecesarios, API más simple |