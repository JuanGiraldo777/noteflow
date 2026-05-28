# NoteFlow — Definición del producto v1

## El problema que resuelve

Las personas necesitan un único lugar donde capturar tres tipos distintos de contenido mental: pensamientos en texto libre, listas de tareas pendientes e ideas sueltas con contexto visual. Las apps existentes suelen especializarse en uno solo de estos formatos, obligando al usuario a manejar varias herramientas a la vez.

NoteFlow unifica los tres en una sola app móvil, con una interfaz visual donde cada tipo de contenido tiene su propia identidad, sin sacrificar la simplicidad de uso.

---

## Usuario objetivo

Cualquier persona que quiera organizar su vida mental desde el móvil: capturar una idea en segundos, gestionar sus tareas del día y guardar notas con detalle. No requiere conocimientos técnicos ni flujos de trabajo complejos.

**Contexto de uso típico:**
- En el metro, apuntando una idea antes de que se olvide.
- Por la mañana, repasando las tareas del día en un checklist.
- En una reunión, tomando una nota rápida con contexto visual.

---

## Tipos de contenido

### 📝 Notas de texto
Notas con título y cuerpo de texto libre. Fondo de color violeta claro. Para pensamientos, reflexiones o cualquier contenido que necesite espacio para desarrollarse.

### ✅ Checklists
Listas de tareas con items que se pueden marcar como completados. Fondo de color verde claro. Muestran una barra de progreso visual. Para tareas, listas de la compra, pasos de un proceso.

### 💡 Ideas
Notas rápidas con etiquetas y color de fondo personalizable. Para conceptos, inspiraciones o cualquier cosa que necesite contexto visual y categorización.

---

## Funcionalidades de la v1

### Core (obligatorio)
- Crear notas, checklists e ideas desde un botón flotante (FAB) en cada pestaña
- Leer y visualizar el contenido en tarjetas con identidad visual propia
- Editar cualquier nota después de crearla
- Archivar en lugar de eliminar (las notas archivadas se pueden recuperar)
- Persistencia local — los datos se guardan aunque se cierre la app

### Organización
- Búsqueda por texto en tiempo real dentro de cada pestaña
- Etiquetas en las ideas (creación libre, no categorías predefinidas)
- Filtrado por etiquetas en la pestaña de ideas

### UX
- Feedback táctil (haptics) al archivar y al completar un checklist
- Estado vacío ilustrado en cada pestaña cuando no hay contenido
- Confirmación antes de archivar (no se archiva por accidente)
- Soporte para modo oscuro y claro según el sistema

---

## Navegación

```
App
├── Pestaña: Notas
│   ├── Lista de notas (FlashList)
│   ├── FAB → nueva nota (modal)
│   └── Tap en tarjeta → detalle/edición
├── Pestaña: Tareas
│   ├── Lista de checklists (FlashList)
│   ├── FAB → nuevo checklist (modal)
│   └── Tap en tarjeta → detalle/edición
├── Pestaña: Ideas
│   ├── Lista de ideas (FlashList)
│   ├── FAB → nueva idea (modal)
│   └── Tap en tarjeta → detalle/edición
└── Modal: Nueva nota / Checklist / Idea
    └── Formulario adaptado al tipo de la pestaña activa
```

---

## Identidad visual

Cada tipo de contenido tiene su color de fondo en las tarjetas:

| Tipo | Color claro | Color oscuro |
|---|---|---|
| Nota | `#E8DEF8` (violeta suave) | `#4A3F6B` |
| Checklist | `#DCF0DC` (verde suave) | `#2D4A2D` |
| Idea | `#FFF0C2` (amarillo suave) | `#4A3F1A` |

El estilo general es visual y colorido — cada tipo se reconoce de un vistazo sin necesidad de leer el contenido.

---

## Funcionalidades opcionales (v2 o posterior)

- Reordenar notas por drag & drop
- Exportar notas como texto plano o PDF
- Sincronización en la nube
- Recordatorios y notificaciones
- Widgets en la pantalla de inicio del móvil
- Animaciones de entrada y salida en las tarjetas (Reanimated)
- Compartir notas con otras personas