import { useState, useCallback, useEffect } from 'react';

import { Note, UpdateNotePayload } from '../types';

interface UseNoteEditorParams {
  note: Note;
  updateNote: (id: string, payload: UpdateNotePayload) => void;
}

export function useNoteEditor({ note, updateNote }: UseNoteEditorParams) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    if (!isEditing) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note.title, note.content, isEditing]);

  const startEditing = useCallback(() => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
  }, [note.title, note.content]);

  const cancelEditing = useCallback(() => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  }, [note.title, note.content]);

  const saveEditing = useCallback(() => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      return;
    }

    updateNote(note.id, { title: trimmedTitle, content: trimmedContent });
    setIsEditing(false);
  }, [note.id, title, content, updateNote]);

  const hasChanges =
    title.trim() !== note.title || content.trim() !== note.content;
  const canSave = title.trim().length > 0;

  return {
    isEditing,
    title,
    content,
    setTitle,
    setContent,
    startEditing,
    cancelEditing,
    saveEditing,
    hasChanges,
    canSave,
  };
}
