import { useState, useMemo } from 'react';
import { Note } from '../types';

export enum SortMode {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
  TITLE_AZ = 'TITLE_AZ',
}

export function useNoteSort(initialNotes: Note[]) {
  const [sortMode, setSortMode] = useState<SortMode>(SortMode.NEWEST);

  const sortedNotes = useMemo(() => {
    if (!initialNotes) return [];
    const result = [...initialNotes];

    switch (sortMode) {
      case SortMode.NEWEST:
        return result.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case SortMode.OLDEST:
        return result.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
      case SortMode.TITLE_AZ:
        return result.sort((a, b) => {
          const titleA = a.title || '';
          const titleB = b.title || '';
          return titleA.localeCompare(titleB);
        });
      default:
        return result;
    }
  }, [initialNotes, sortMode]);

  return {
    sortedNotes,
    sortMode,
    setSortMode,
  };
}
