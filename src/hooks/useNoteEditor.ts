import { useState, useCallback } from 'react';
import { Note, NoteCategory } from '../types';

export function useNoteEditor(note: Note | undefined, onSaveCallback: (title: string, content: string, category: NoteCategory) => void) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note?.title || '');
  const [editContent, setEditContent] = useState(note?.content || '');
  const [editCategory, setEditCategory] = useState<NoteCategory>(note?.category || 'personal');

  const startEditing = useCallback(() => {
    if (note) {
      setEditTitle(note.title);
      setEditContent(note.content);
      setEditCategory(note.category);
      setIsEditing(true);
    }
  }, [note]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleSave = useCallback(() => {
    if (!editTitle.trim()) return;
    onSaveCallback(editTitle, editContent, editCategory);
    setIsEditing(false);
  }, [editTitle, editContent, editCategory, onSaveCallback]);

  return {
    isEditing,
    editTitle,
    setEditTitle,
    editContent,
    setEditContent,
    editCategory,
    setEditCategory,
    startEditing,
    cancelEditing,
    handleSave,
  };
}
