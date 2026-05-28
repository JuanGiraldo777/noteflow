import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, ChecklistNote, IdeaNote } from '../types';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];

  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;

  updateNote: (id: string, data: Partial<Note>) => void;
  updateChecklist: (id: string, data: Partial<ChecklistNote>) => void;
  updateIdea: (id: string, data: Partial<IdeaNote>) => void;

  archiveNote: (id: string) => void;
  archiveChecklist: (id: string) => void;
  archiveIdea: (id: string) => void;

  toggleChecklistItem: (checklistId: string, itemId: string) => void;
  restoreNote: (id: string) => void;
  restoreChecklist: (id: string) => void;
  restoreIdea: (id: string) => void;

  deleteNote: (id: string) => void;
  deleteChecklist: (id: string) => void;
  deleteIdea: (id: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],

      addNote: (note) =>
        set((state) => ({ notes: [...state.notes, note] })),
      addChecklist: (checklist) =>
        set((state) => ({ checklists: [...state.checklists, checklist] })),
      addIdea: (idea) =>
        set((state) => ({ ideas: [...state.ideas, idea] })),

      updateNote: (id, data) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...data, updatedAt: new Date() } : n
          ),
        })),
      updateChecklist: (id, data) =>
        set((state) => ({
          checklists: state.checklists.map((c) =>
            c.id === id ? { ...c, ...data, updatedAt: new Date() } : c
          ),
        })),
      updateIdea: (id, data) =>
        set((state) => ({
          ideas: state.ideas.map((i) =>
            i.id === id ? { ...i, ...data, updatedAt: new Date() } : i
          ),
        })),

      archiveNote: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isArchived: true } : n
          ),
        })),
      archiveChecklist: (id) =>
        set((state) => ({
          checklists: state.checklists.map((c) =>
            c.id === id ? { ...c, isArchived: true } : c
          ),
        })),
      archiveIdea: (id) =>
        set((state) => ({
          ideas: state.ideas.map((i) =>
            i.id === id ? { ...i, isArchived: true } : i
          ),
        })),

      restoreNote: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isArchived: false, updatedAt: new Date() } : n
          ),
        })),
      restoreChecklist: (id) =>
        set((state) => ({
          checklists: state.checklists.map((c) =>
            c.id === id ? { ...c, isArchived: false, updatedAt: new Date() } : c
          ),
        })),
      restoreIdea: (id) =>
        set((state) => ({
          ideas: state.ideas.map((i) =>
            i.id === id ? { ...i, isArchived: false, updatedAt: new Date() } : i
          ),
        })),

      deleteNote: (id) =>
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
      deleteChecklist: (id) =>
        set((state) => ({ checklists: state.checklists.filter((c) => c.id !== id) })),
      deleteIdea: (id) =>
        set((state) => ({ ideas: state.ideas.filter((i) => i.id !== id) })),

      toggleChecklistItem: (checklistId, itemId) =>
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
        })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);