import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';

import { Note, NotesContextType, CreateNotePayload } from '../types';
import { loadNotes, saveNotes as saveNotesToStorage } from '../services/storage';
import { generateId } from '../utils/formatters';

interface ExtendedNotesContextType extends Omit<NotesContextType, 'updateNote'> {
  updateNote: (id: string, payload: Partial<CreateNotePayload>) => void;
}

const NotesContext = createContext<ExtendedNotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialNotes = async () => {
      try {
        setIsLoading(true);
        const savedNotes = await loadNotes();

        if (!savedNotes || savedNotes.length === 0) {
          const defaultNotes = getDefaultNotes();
          setNotes(defaultNotes);
          await saveNotesToStorage(defaultNotes);
        } else {
          setNotes(savedNotes);
        }
      } catch (error) {
        console.error('Erro ao carregar as notas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialNotes();
  }, []);

  const addNote = useCallback((payload: CreateNotePayload) => {
    const newNote: Note = {
      id: generateId(),
      title: payload.title,
      content: payload.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      category: payload.category,
    };

    setNotes(prevNotes => {
      const updated = [newNote, ...prevNotes];
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  const updateNote = useCallback((id: string, payload: Partial<CreateNotePayload>) => {
    setNotes(prevNotes => {
      const updated = prevNotes.map(note =>
        note.id === id
          ? {
              ...note,
              ...payload,
              updatedAt: new Date().toISOString(),
            }
          : note
      );
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prevNotes => {
      const updated = prevNotes.filter(note => note.id !== id);
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setNotes(prevNotes => {
      const updated = prevNotes.map(note =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note,
      );
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  const getNoteById = useCallback((id: string): Note | undefined => {
    return notes.find(note => note.id === id);
  }, [notes]);

  const value = useMemo(() => ({
    notes,
    addNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    getNoteById,
    isLoading,
  }), [notes, addNote, updateNote, deleteNote, toggleFavorite, getNoteById, isLoading]);

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}

function getDefaultNotes(): Note[] {
  return [
    {
      id: '1',
      title: 'Bem-vindo ao TaskNotes',
      content: 'Este é seu aplicativo de notas. Crie, edite e organize suas anotações.',
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z',
      isFavorite: true,
      category: 'personal',
    },
    {
      id: '2',
      title: 'Reunião de Sprint',
      content: 'Discutir o backlog do próximo sprint e definir prioridades com o time.',
      createdAt: '2024-01-16T14:30:00.000Z',
      updatedAt: '2024-01-16T14:30:00.000Z',
      isFavorite: false,
      category: 'work',
    },
    {
      id: '3',
      title: 'Ideia de app',
      content: 'Criar um app de receitas que sugere pratos com base nos ingredientes disponíveis.',
      createdAt: '2024-01-17T09:15:00.000Z',
      updatedAt: '2024-01-17T09:15:00.000Z',
      isFavorite: true,
      category: 'ideas',
    },
    {
      id: '4',
      title: 'Compras da semana',
      content: 'Arroz, feijão, legumes, frutas, pão integral, café, leite.',
      createdAt: '2024-01-18T08:00:00.000Z',
      updatedAt: '2024-01-18T08:00:00.000Z',
      isFavorite: false,
      category: 'todo',
    },
  ];
}
