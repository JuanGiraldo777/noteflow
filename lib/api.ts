import { Note, ChecklistNote, IdeaNote, AnyNote, ChecklistItem } from '../types';

// URL base de la API. En desarrollo apunta a localhost, en producción a Vercel.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

// Helper privado que lanza un error si la respuesta no es exitosa.
// Centraliza el manejo de errores HTTP para no repetirlo en cada función.
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Error ${res.status}`);
  }
  // 204 No Content no tiene body, devolvemos undefined casteado a T
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Notas ────────────────────────────────────────────────────────────────────

export async function getNotes(): Promise<AnyNote[]> {
  const res = await fetch(`${BASE_URL}/notes`);
  return handleResponse<AnyNote[]>(res);
}

export async function getArchivedNotes(): Promise<AnyNote[]> {
  const res = await fetch(`${BASE_URL}/notes/archived`);
  return handleResponse<AnyNote[]>(res);
}

export async function createNote(data: AnyNote): Promise<AnyNote> {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<AnyNote>(res);
}

export async function updateNote(id: string, data: Partial<AnyNote>): Promise<AnyNote> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<AnyNote>(res);
}

export async function archiveNote(id: string): Promise<AnyNote> {
  const res = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: 'PATCH',
  });
  return handleResponse<AnyNote>(res);
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(res);
}

// ── Checklist items ───────────────────────────────────────────────────────────

export async function getChecklistItems(noteId: string): Promise<ChecklistItem[]> {
  const res = await fetch(`${BASE_URL}/notes/${noteId}/checklist-items`);
  return handleResponse<ChecklistItem[]>(res);
}

export async function createChecklistItem(noteId: string, item: ChecklistItem): Promise<ChecklistItem> {
  const res = await fetch(`${BASE_URL}/notes/${noteId}/checklist-items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return handleResponse<ChecklistItem>(res);
}

export async function toggleChecklistItem(itemId: string): Promise<ChecklistItem> {
  const res = await fetch(`${BASE_URL}/checklist-items/${itemId}`, {
    method: 'PATCH',
  });
  return handleResponse<ChecklistItem>(res);
}