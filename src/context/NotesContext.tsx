import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

import { Note, NotesContextType, CreateNotePayload, UpdateNotePayload } from '../types';
import { loadNotes, saveNotes } from '../services/storage';
import { generateId } from '../utils/formatters';
import { useTheme } from './ThemeContext';

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isDarkMode } = useTheme();

  useEffect(() => {
    console.log('Theme changed:', isDarkMode ? 'Dark Mode' : 'Light Mode');

    loadInitialNotes();
  }, [isDarkMode]);

  const loadInitialNotes = async () => {
    setIsLoading(true);

    const savedNotes = await loadNotes();

    if (savedNotes.length === 0) {
      setNotes(getDefaultNotes());
    } else {
      setNotes(savedNotes);
    }

    setIsLoading(false);
  };

  const addNote = (payload: CreateNotePayload) => {
    const newNote: Note = {
      id: generateId(),
      title: payload.title,
      content: payload.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      category: payload.category,
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const updateNote = (id: string, payload: UpdateNotePayload) => {
    const updatedNotes = notes.map(note =>
      note.id === id
        ? {
            ...note,
            title: payload.title,
            content: payload.content,
            updatedAt: new Date().toISOString(),
          }
        : note,
    );

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const toggleFavorite = (id: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note,
    );

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const getNoteById = (id: string): Note | undefined => {
    return notes.find(note => note.id === id);
  };

  const value: NotesContextType = {
    notes,
    addNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    getNoteById,
    isLoading,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes(): NotesContextType {
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
      content:
        'Este é seu aplicativo de notas. Crie, edite e organize suas anotações.',
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z',
      isFavorite: true,
      category: 'personal',
    },
    {
      id: '2',
      title: 'Reunião de Sprint',
      content:
        'Discutir o backlog do próximo sprint e definir prioridades com o time.',
      createdAt: '2024-01-16T14:30:00.000Z',
      updatedAt: '2024-01-16T14:30:00.000Z',
      isFavorite: false,
      category: 'work',
    },
    {
      id: '3',
      title: 'Ideia de app',
      content:
        'Criar um app de receitas que sugere pratos com base nos ingredientes disponíveis.',
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
