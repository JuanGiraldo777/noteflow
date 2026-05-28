# NoteFlow — AI Configuration & Project Context

## Project overview

NoteFlow is a React Native productivity app built with Expo. It manages three types of content: plain text notes, checklists with progress tracking, and idea notes with tags and color coding. This is a learning project developed in a professional internship context.

---

## Tech stack (exact versions matter)

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 53 |
| Language | TypeScript (strict mode) |
| Routing | Expo Router v5 (file-system based) |
| State | Zustand with persist middleware |
| UI library | React Native Paper |
| Lists | @shopify/flash-list (NOT FlatList) |
| Validation | Zod |
| Storage | @react-native-async-storage/async-storage |
| Haptics | expo-haptics |
| Icons | @expo/vector-icons |

---

## Folder structure (enforced)

```
noteflow/
├── app/
│   ├── _layout.tsx          ← root layout, UI provider goes here
│   ├── (tabs)/
│   │   ├── _layout.tsx      ← tab navigator (3 tabs)
│   │   ├── notas.tsx
│   │   ├── notas/[id].tsx
│   │   ├── checklists.tsx
│   │   ├── checklists/[id].tsx
│   │   ├── ideas.tsx
│   │   └── ideas/[id].tsx
│   └── nueva-nota.tsx       ← modal screen
├── components/
│   └── items/
│       ├── NoteCard.tsx
│       ├── ChecklistCard.tsx
│       └── IdeaCard.tsx
├── store/
│   └── notesStore.ts        ← Zustand store only
├── types/
│   └── index.ts             ← all interfaces and types
├── constants/
│   └── theme.ts             ← design tokens, color scheme
└── docs/
    ├── idea.md
    ├── react-native-teoria.md
    ├── project-management.md
    └── ai-setup.md
```

---

## TypeScript interfaces (canonical source of truth)

These are the exact types used across the entire project. Do NOT redefine or modify without updating types/index.ts.

```typescript
interface BaseNote {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Note extends BaseNote {
  content: string;
}

interface ChecklistNote extends BaseNote {
  items: ChecklistItem[];
}

interface IdeaNote extends BaseNote {
  tags: string[];
  color: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

type AnyNote = Note | ChecklistNote | IdeaNote;
```

Type guards to distinguish at runtime:
- `'items' in note` → ChecklistNote
- `'content' in note` → Note
- `'tags' in note` → IdeaNote

---

## Zustand store structure

```typescript
// store/notesStore.ts
interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}
```

The store uses `persist` middleware with `createJSONStorage(() => AsyncStorage)` and key `'noteflow-storage'`.

---

## Architecture rules (hard constraints)

1. **Never use FlatList** — always use FlashList from @shopify/flash-list with `estimatedItemSize`
2. **Never use React Context for app state** — Zustand is the only state manager
3. **Never use useState for shared data** — local state only for UI-only concerns (input focus, modal open/closed)
4. **Never put business logic in components** — components are presentational; logic lives in the store or custom hooks
5. **All navigation via Expo Router file-system** — no manual Stack.Navigator or createBottomTabNavigator calls
6. **All form validation via Zod** — no manual if/else validation
7. **IDs are always generated with** `crypto.randomUUID()` or a uuid library — never Math.random()
8. **Dates are always JavaScript Date objects** — not strings, not timestamps

---

## Naming conventions

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `NoteCard.tsx` |
| Hooks | camelCase with `use` prefix | `useNotesStore` |
| Store actions | camelCase verb + noun | `addNote`, `deleteNote` |
| Route files | kebab-case or camelCase (Expo Router standard) | `nueva-nota.tsx` |
| Constants | SCREAMING_SNAKE_CASE | `DEFAULT_COLOR` |
| Types/interfaces | PascalCase | `ChecklistItem` |
| Props interfaces | ComponentName + Props | `NoteCardProps` |

---

## Zod schemas

```typescript
// Validation schemas for each note type
const baseNoteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
});

const noteSchema = baseNoteSchema.extend({
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

const checklistSchema = baseNoteSchema.extend({
  items: z.array(z.object({
    text: z.string().min(1),
  })).min(1, 'Añade al menos una tarea'),
});

const ideaSchema = baseNoteSchema.extend({
  tags: z.array(z.string()).optional(),
  color: z.string().default('#E1F5EE'),
});
```

---

## Component patterns

### Card components
Every card receives the full note object as a single prop and handles its own display logic:

```typescript
// Example pattern — apply to NoteCard, ChecklistCard, IdeaCard
interface NoteCardProps {
  note: Note;
  onPress: () => void;
}
```

### FlashList usage
```typescript
<FlashList
  data={notes}
  renderItem={({ item }) => <NoteCard note={item} onPress={() => router.push(`/notas/${item.id}`)} />}
  estimatedItemSize={88}
  keyExtractor={(item) => item.id}
/>
```

### Haptic feedback
- Deleting any note: `Haptics.impactAsync(ImpactFeedbackStyle.Light)`
- Completing all checklist items: `Haptics.notificationAsync(NotificationFeedbackType.Success)`

---

## DO NOT generate

- `StyleSheet.create` with hardcoded hex colors — use theme tokens from `constants/theme.ts`
- Class components — functional components only
- `.js` files — TypeScript everywhere, `.tsx` for components, `.ts` for logic
- Default exports in store or types files — named exports only (except route files which require default export for Expo Router)
- `any` type — always type explicitly

---

## Current development status

> Update this section as you progress.

- [x] docs/idea.md
- [x] GitHub repo + first commit
- [x] Trello board
- [x] Expo project setup + dependencies (SDK 53)
- [x] Expo Router config (package.json + app.json)
- [x] UI library installed + provider in _layout.tsx
- [x] constants/theme.ts
- [x] app/_layout.tsx (root layout, Stack)
- [x] app/(tabs)/_layout.tsx (3 tabs: notas, checklists, ideas)
- [x] app/(tabs)/notas.tsx (placeholder)
- [x] app/(tabs)/checklists.tsx (placeholder)
- [x] app/(tabs)/ideas.tsx (placeholder)
- [x] app/nueva-nota.tsx (placeholder)
- [x] Dynamic routes [id].tsx × 3
- [x] types/index.ts
- [x] store/notesStore.ts with Zustand
- [x] FlashList in all 3 tabs
- [x] NoteCard, ChecklistCard, IdeaCard
- [x] Adaptive form in nueva-nota.tsx
- [x] Zod validation
- [x] AsyncStorage + persist middleware
- [x] Haptics
- [x] Detail screen + delete with Alert
- [x] Empty states