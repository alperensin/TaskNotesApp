import { useState, useEffect } from 'react';

import { Note, NoteCategory } from '../types';

interface FilterConfig {
  category: NoteCategory | 'all';
  onlyFavorites: boolean;
  searchQuery: string;
}

interface UseNoteFilterReturn {
  filteredNotes: Note[];
  filterConfig: FilterConfig;
  setCategory: (category: NoteCategory | 'all') => void;
  setOnlyFavorites: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export function useNoteFilter(notes: Note[]): UseNoteFilterReturn {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const [category, setCategory] = useState<NoteCategory | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filterConfig: FilterConfig = {
    category,
    onlyFavorites,
    searchQuery,
  };

  useEffect(() => {
    let result = [...notes];

    if (filterConfig.category !== 'all') {
      result = result.filter(note => note.category === filterConfig.category);
    }

    if (filterConfig.onlyFavorites) {
      result = result.filter(note => note.isFavorite);
    }

    if (filterConfig.searchQuery.trim()) {
      const query = filterConfig.searchQuery.toLowerCase();
      result = result.filter(
        note =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query),
      );
    }

    setFilteredNotes(result);
  }, [notes, filterConfig]);

  return {
    filteredNotes,
    filterConfig,
    setCategory,
    setOnlyFavorites,
    setSearchQuery,
  };
}
