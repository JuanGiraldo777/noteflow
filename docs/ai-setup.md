# AI Setup — NoteFlow

Documentación de las herramientas de IA configuradas para el desarrollo de NoteFlow y cómo se han configurado para obtener el máximo contexto del proyecto.

---

## Herramientas utilizadas

| Herramienta | Uso principal | Estado |
|---|---|---|
| GitHub Copilot | Sugerencias inline en VS Code | ✅ Configurado |
| Opencode | Sesiones de chat con contexto de proyecto | ✅ Configurado |

---

## GitHub Copilot

### Configuración aplicada

Copilot lee automáticamente el fichero `.github/copilot-instructions.md` cuando está presente en el repositorio. Este fichero contiene:

- Stack tecnológico exacto con versiones
- Estructura de carpetas enforced
- Interfaces TypeScript (fuente de verdad)
- Reglas de arquitectura que no se pueden violar
- Convenciones de nombre
- Patrones de componentes y store
- Lista de cosas que NO debe generar
- Estado actual del desarrollo (checklist)

### Cómo usarlo correctamente

Copilot aplica las instrucciones de forma automática en VS Code. Para sacar el máximo partido:

- Abre siempre el proyecto desde la raíz (`/noteflow`) para que Copilot encuentre el fichero de instrucciones.
- Cuando Copilot sugiera código que contradiga las reglas (por ejemplo, usando `FlatList` en lugar de `FlashList`), rechaza la sugerencia con `Esc` y escribe el inicio correcto para redirigirle.
- Para generar un componente nuevo, escribe el nombre del fichero y el comentario inicial describiendo qué hace. Copilot usará los patrones definidos en las instrucciones.

### Actualización del contexto

Cada vez que completes un item del desarrollo, actualiza el checklist en `.github/copilot-instructions.md`:

```markdown
- [x] types/index.ts   ← completado
- [ ] store/notesStore.ts   ← pendiente
```

---

## Opencode

### Qué es

Opencode es una herramienta de IA en terminal que permite hacer preguntas, generar código y explorar el proyecto desde la línea de comandos. A diferencia de Copilot, requiere pasar el contexto manualmente al inicio de cada sesión.

### Configuración aplicada

No tiene un fichero de instrucciones persistente como Copilot. El contexto se pasa al inicio de cada sesión usando el contenido de `.github/copilot-instructions.md`.

### Cómo iniciar una sesión con contexto

Al abrir Opencode, pega este mensaje de inicio antes de cualquier pregunta:

```
Eres un asistente de desarrollo para el proyecto NoteFlow.
Aquí está el contexto completo del proyecto:

[pega aquí el contenido de .github/copilot-instructions.md]

A partir de ahora, todas tus respuestas deben respetar
las reglas de arquitectura, convenciones de nombre,
y el stack tecnológico definido en ese contexto.
```

### Cuándo usar Opencode vs Copilot

| Tarea | Herramienta recomendada |
|---|---|
| Completar líneas de código mientras escribes | Copilot |
| Generar un fichero completo desde cero | Opencode |
| Preguntar por qué algo no funciona | Opencode |
| Refactorizar un componente existente | Opencode |
| Entender un concepto técnico | Opencode |
| Sugerencias rápidas sin interrumpir el flujo | Copilot |

---

## Restricciones aplicadas a ambas herramientas

Las siguientes restricciones están definidas en `.github/copilot-instructions.md` y deben respetarse siempre, independientemente de lo que sugiera la IA:

1. Nunca usar `FlatList` — siempre `FlashList` con `estimatedItemSize`
2. Nunca usar React Context para estado global — solo Zustand
3. Nunca usar `StyleSheet.create` con colores hardcodeados — usar tokens de `constants/theme.ts`
4. Nunca usar `any` — siempre tipar explícitamente
5. Nunca crear ficheros `.js` — TypeScript en todo el proyecto
6. Nunca usar `Math.random()` para IDs — usar `crypto.randomUUID()`
7. Nunca poner lógica de negocio en componentes — solo en el store o custom hooks

Si la IA genera código que viola alguna de estas reglas, rechaza la sugerencia y reformula la petición siendo más explícito sobre la restricción.

---

## Lecciones aprendidas

> Actualiza esta sección conforme avances en el desarrollo.

- La New Architecture de React Native está siempre activa en Expo Go para SDK 53, aunque se ponga `newArchEnabled: false` en `app.json`. Ignorar ese warning es seguro durante el desarrollo con Expo Go.
- Usar `npx expo install` en lugar de `npm install` para dependencias nativas garantiza versiones compatibles con el SDK.