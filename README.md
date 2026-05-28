# 📝 NoteFlow

> App móvil para capturar, organizar y recuperar notas, checklists e ideas desde una sola interfaz.

NoteFlow es una aplicación desarrollada con Expo y React Native para centralizar tres tipos de contenido mental: notas de texto, listas de tareas e ideas con etiquetas. El proyecto usa navegación por pestañas, persistencia local y una experiencia visual diferenciada para cada tipo de contenido.

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/-React_Native-05122A?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![Zustand](https://img.shields.io/badge/Zustand-FFB300?style=for-the-badge&logoColor=000)
![React Native Paper](https://img.shields.io/badge/React%20Native%20Paper-6200EE?style=for-the-badge&logo=react&logoColor=white)
![Expo Router](https://img.shields.io/badge/Expo%20Router-000020?style=for-the-badge&logo=expo&logoColor=white)
![FlashList](https://img.shields.io/badge/FlashList-111827?style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-4B5563?style=for-the-badge)
![Haptics](https://img.shields.io/badge/Haptics-111827?style=for-the-badge)

| Despliegue | URL |
|------------|-----|
| Frontend | Desarrollo local con Expo Go |

---

## Características

- Tres tipos de contenido: notas, checklists e ideas.
- Navegación por pestañas con rutas dinámicas para detalle de cada elemento.
- Creación de contenido desde un botón flotante por pestaña.
- Búsqueda en tiempo real dentro de notas, tareas e ideas.
- Archivado y restauración de elementos sin perder información.
- Eliminación permanente con confirmación previa mediante Alert.
- Persistencia local con AsyncStorage para conservar los datos al cerrar la app.
- Feedback háptico en acciones clave como restaurar y eliminar.
- Estados vacíos personalizados cuando una sección no tiene contenido.

---

## Tecnologías

| Frontend | Uso |
|----------|-----|
| Expo | Plataforma base para la app móvil |
| React Native | UI nativa multiplataforma |
| TypeScript | Tipado estático en todo el proyecto |
| Expo Router | Navegación por rutas y pestañas |
| React Native Paper | Componentes de interfaz |
| FlashList | Renderizado eficiente de listas |

| Backend | Uso |
|---------|-----|
| No aplica todavía | El proyecto no tiene backend en esta fase |
| Persistencia local | Guardado de datos con AsyncStorage |
| Zustand | Estado global de notas, listas e ideas |

| Auxiliares | Uso |
|------------|-----|
| Zod | Validación de formularios |
| expo-haptics | Vibración háptica en acciones |
| @expo/vector-icons | Iconografía |
| react-native-reanimated | Animaciones y transiciones |
| react-native-safe-area-context | Ajustes de área segura |

---

## Estructura del proyecto

```text
noteflow/
├── app/
│   ├── _layout.tsx
│   ├── nueva-nota.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── notas.tsx
│       ├── checklists.tsx
│       ├── ideas.tsx
│       ├── archivadas.tsx
│       ├── notas/[id].tsx
│       ├── checklists/[id].tsx
│       └── ideas/[id].tsx
├── components/
│   ├── EmptyState.tsx
│   ├── SearchBar.tsx
│   └── items/
│       ├── NoteCard.tsx
│       ├── ChecklistCard.tsx
│       └── IdeaCard.tsx
├── constants/
│   └── theme.ts
├── store/
│   └── notesStore.ts
├── types/
│   └── index.ts
├── docs/
│   ├── idea.md
│   ├── project-management.md
│   └── ai-setup.md
└── README.md
```

---

## Descargar y ejecutar

```bash
git clone <URL-del-repositorio>
cd noteflow
npm install
npm run start
```

---

## Estado actual del proyecto

### Completado

- Base del proyecto con Expo SDK 54 y Expo Router.
- Pantallas principales para notas, checklists, ideas y archivadas.
- Formulario de creación para los tres tipos de contenido.
- Store global con Zustand y persistencia local.
- Tipado centralizado en TypeScript.
- Componentes reutilizables de tarjeta, búsqueda y estado vacío.
- Validación de formularios con Zod.

### En desarrollo

- Segunda y tercera fase funcional del producto.
- Mejoras de edición y refinamiento de UX.
- Ampliación de comportamiento avanzado para organización y productividad.

---

## Observaciones

Este README documenta únicamente lo que ya está implementado en el proyecto. Las secciones de despliegue final, backend y funcionalidades futuras se completarán cuando terminen las siguientes fases.

---

*Desarrollado durante las prácticas en NoteFlow — 2026*
