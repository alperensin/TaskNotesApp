import { renderHook, act } from '@testing-library/react-hooks';
import { useNoteSort, SortMode } from './useNoteSort';

const mockNotes = [
  {
    id: '1',
    title: 'Zebra',
    content: 'Nota 1',
    createdAt: new Date('2026-07-10'),
  },
  {
    id: '2',
    title: 'Abacaxi',
    content: 'Nota 2',
    createdAt: new Date('2026-07-12'),
  },
  {
    id: '3',
    title: 'Menta',
    content: 'Nota 3',
    createdAt: new Date('2026-07-08'),
  },
];

describe('useNoteSort', () => {
  it('deve ordenar por mais recente por padrão', () => {
    const { result } = renderHook(() => useNoteSort());
    const sorted = result.current.sortNotes(mockNotes);
    expect(sorted[0].title).toBe('Abacaxi');
  });

  it('deve ordenar em ordem alfabética A-Z', () => {
    const { result } = renderHook(() => useNoteSort());
    act(() => {
      result.current.setSortMode(SortMode.TITLE_AZ);
    });
    const sorted = result.current.sortNotes(mockNotes);
    expect(sorted[0].title).toBe('Abacaxi');
    expect(sorted[1].title).toBe('Menta');
    expect(sorted[2].title).toBe('Zebra');
  });
});
