export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  category: NoteCategory;
}

export type NoteCategory = 'personal' | 'work' | 'ideas' | 'todo';

export interface CreateNotePayload {
  title: string;
  content: string;
  category: NoteCategory;
}

export interface NotesContextType {
  notes: Note[];
  addNote: (payload: CreateNotePayload) => void;
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
  isLoading: boolean;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  accent: string;
  border: string;
  error: string;
  success: string;
}

export type RootStackParamList = {
  Home: undefined;
  NoteDetail: { noteId: string };
  CreateNote: undefined;
};
