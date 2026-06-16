import { create } from 'zustand';
import { Note, ChecklistNote, IdeaNote, AnyNote } from '../types';
import * as api from '../lib/api';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  isLoading: boolean;
  error: string | null;

  fetchNotes: () => Promise<void>;
  fetchArchivedNotes: () => Promise<void>;

  addNote: (note: Note) => Promise<void>;
  addChecklist: (checklist: ChecklistNote) => Promise<void>;
  addIdea: (idea: IdeaNote) => Promise<void>;

  updateNote: (id: string, data: Partial<Note>) => Promise<void>;
  updateChecklist: (id: string, data: Partial<ChecklistNote>) => Promise<void>;
  updateIdea: (id: string, data: Partial<IdeaNote>) => Promise<void>;

  archiveNote: (id: string) => Promise<void>;
  archiveChecklist: (id: string) => Promise<void>;
  archiveIdea: (id: string) => Promise<void>;

  restoreNote: (id: string) => Promise<void>;
  restoreChecklist: (id: string) => Promise<void>;
  restoreIdea: (id: string) => Promise<void>;

  deleteNote: (id: string) => Promise<void>;
  deleteChecklist: (id: string) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;

  toggleChecklistItem: (checklistId: string, itemId: string) => Promise<void>;
}

// Distribuye un array mixto de la API a los tres arrays separados del store.
// La API devuelve todo junto con type, el store los separa por tipo.
function distributeNotes(allNotes: AnyNote[]) {
  const notes = allNotes.filter((n): n is Note => n.type === 'note');
  const checklists = allNotes.filter((n): n is ChecklistNote => n.type === 'checklist');
  const ideas = allNotes.filter((n): n is IdeaNote => n.type === 'idea');
  return { notes, checklists, ideas };
}

export const useNotesStore = create<NotesStore>()((set, get) => ({
  notes: [],
  checklists: [],
  ideas: [],
  isLoading: false,
  error: null,

  // Carga todas las notas activas desde la API y las distribuye por tipo.
  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const allNotes = await api.getNotes();
      set({ ...distributeNotes(allNotes), isLoading: false });
    } catch (e) {
      set({ error: 'No se pudieron cargar las notas', isLoading: false });
    }
  },

  // Carga las notas archivadas y las mezcla con las activas en el store.
  fetchArchivedNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const archived = await api.getArchivedNotes();
      const { notes, checklists, ideas } = distributeNotes(archived);
      set((state) => ({
        notes: [...state.notes.filter(n => !n.isArchived), ...notes],
        checklists: [...state.checklists.filter(c => !c.isArchived), ...checklists],
        ideas: [...state.ideas.filter(i => !i.isArchived), ...ideas],
        isLoading: false,
      }));
    } catch (e) {
      set({ error: 'No se pudieron cargar las notas archivadas', isLoading: false });
    }
  },

  // ── Crear ────────────────────────────────────────────────────────────────

  addNote: async (note) => {
    try {
      await api.createNote(note);
      set((state) => ({ notes: [...state.notes, note] }));
    } catch (e) {
      set({ error: 'No se pudo crear la nota' });
    }
  },

  addChecklist: async (checklist) => {
    try {
    // 1. Crear la nota en la API
    await api.createNote(checklist);

    // 2. Crear cada item en la API
    for (const item of checklist.items) {
      await api.createChecklistItem(checklist.id, item);
    }

    // 3. Actualizar el store local
    set((state) => ({ checklists: [...state.checklists, checklist] }));
  } catch (e) {
    set({ error: 'No se pudo crear el checklist' });
  }
  },

  addIdea: async (idea) => {
    try {
      await api.createNote(idea);
      set((state) => ({ ideas: [...state.ideas, idea] }));
    } catch (e) {
      set({ error: 'No se pudo crear la idea' });
    }
  },

  // ── Actualizar ───────────────────────────────────────────────────────────

  updateNote: async (id, data) => {
    try {
      await api.updateNote(id, data);
      set((state) => ({
        notes: state.notes.map((n) =>
          n.id === id ? { ...n, ...data, updatedAt: new Date() } : n
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo actualizar la nota' });
    }
  },

  updateChecklist: async (id, data) => {
    try {
      await api.updateNote(id, data);
      set((state) => ({
        checklists: state.checklists.map((c) =>
          c.id === id ? { ...c, ...data, updatedAt: new Date() } : c
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo actualizar el checklist' });
    }
  },

  updateIdea: async (id, data) => {
    try {
      await api.updateNote(id, data);
      set((state) => ({
        ideas: state.ideas.map((i) =>
          i.id === id ? { ...i, ...data, updatedAt: new Date() } : i
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo actualizar la idea' });
    }
  },

  // ── Archivar ─────────────────────────────────────────────────────────────

  archiveNote: async (id) => {
    try {
      await api.archiveNote(id);
      set((state) => ({
        notes: state.notes.map((n) =>
          n.id === id ? { ...n, isArchived: true } : n
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo archivar la nota' });
    }
  },

  archiveChecklist: async (id) => {
    try {
      await api.archiveNote(id);
      set((state) => ({
        checklists: state.checklists.map((c) =>
          c.id === id ? { ...c, isArchived: true } : c
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo archivar el checklist' });
    }
  },

  archiveIdea: async (id) => {
    try {
      await api.archiveNote(id);
      set((state) => ({
        ideas: state.ideas.map((i) =>
          i.id === id ? { ...i, isArchived: true } : i
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo archivar la idea' });
    }
  },

  // ── Restaurar ────────────────────────────────────────────────────────────

  restoreNote: async (id) => {
    try {
      await api.archiveNote(id); // toggle: si está archivada, la desarchiva
      set((state) => ({
        notes: state.notes.map((n) =>
          n.id === id ? { ...n, isArchived: false, updatedAt: new Date() } : n
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo restaurar la nota' });
    }
  },

  restoreChecklist: async (id) => {
    try {
      await api.archiveNote(id);
      set((state) => ({
        checklists: state.checklists.map((c) =>
          c.id === id ? { ...c, isArchived: false, updatedAt: new Date() } : c
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo restaurar el checklist' });
    }
  },

  restoreIdea: async (id) => {
    try {
      await api.archiveNote(id);
      set((state) => ({
        ideas: state.ideas.map((i) =>
          i.id === id ? { ...i, isArchived: false, updatedAt: new Date() } : i
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo restaurar la idea' });
    }
  },

  // ── Eliminar ─────────────────────────────────────────────────────────────

  deleteNote: async (id) => {
    try {
      await api.deleteNote(id);
      set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    } catch (e) {
      set({ error: 'No se pudo eliminar la nota' });
    }
  },

  deleteChecklist: async (id) => {
    try {
      await api.deleteNote(id);
      set((state) => ({ checklists: state.checklists.filter((c) => c.id !== id) }));
    } catch (e) {
      set({ error: 'No se pudo eliminar el checklist' });
    }
  },

  deleteIdea: async (id) => {
    try {
      await api.deleteNote(id);
      set((state) => ({ ideas: state.ideas.filter((i) => i.id !== id) }));
    } catch (e) {
      set({ error: 'No se pudo eliminar la idea' });
    }
  },

  // ── Checklist items ──────────────────────────────────────────────────────

  // Llama a la API para hacer toggle y luego actualiza el item en el store local.
  toggleChecklistItem: async (checklistId, itemId) => {
    try {
      await api.toggleChecklistItem(itemId);
      set((state) => ({
        checklists: state.checklists.map((c) =>
          c.id !== checklistId ? c : {
            ...c,
            updatedAt: new Date(),
            items: c.items.map((item) =>
              item.id === itemId
                ? { ...item, isCompleted: !item.isCompleted }
                : item
            ),
          }
        ),
      }));
    } catch (e) {
      set({ error: 'No se pudo actualizar el item' });
    }
  },
}));