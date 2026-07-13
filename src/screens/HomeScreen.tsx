import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Text,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, NoteCategory } from '../types';
import { Header, CategoryFilter } from '../components';

import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import { useNoteSort, SortMode } from '../hooks/useNoteSort';
import { formatDate, getCategoryLabel } from '../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { notes, isLoading, deleteNote } = useNotes();
  const { colors } = useTheme();

  const [category, setCategory] = useState<NoteCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = useMemo(() => {
    if (!notes || notes.length === 0) return [];
    let result = [...notes];

    if (category && category !== 'all') {
      result = result.filter(note => note.category === category);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        note =>
          (note.title && note.title.toLowerCase().includes(query)) ||
          (note.content && note.content.toLowerCase().includes(query))
      );
    }

    return result;
  }, [notes, category, searchQuery]);

  const { sortedNotes, sortMode, setSortMode } = useNoteSort(filteredNotes);

  const handleCreateNote = () => {
    navigation.navigate('CreateNote');
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const renderSortButton = (mode: SortMode, label: string) => {
    const isActive = sortMode === mode;
    return (
      <Pressable
        onPress={() => setSortMode(mode)}
        style={({ hovered }) => [
          styles.sortButton,
          isActive && { backgroundColor: colors.primary + '20' },
          hovered && { backgroundColor: '#2196F3' + '30', borderColor: '#2196F3' }
        ]}
      >
        <Text style={[styles.sortButtonText, { color: isActive ? colors.primary : colors.textSecondary }]}>
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Minhas Notas" />

      <View style={styles.topActionContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="Buscar notas..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        <Pressable
          style={({ hovered }) => [
            styles.inlineButton,
            { 
              backgroundColor: colors.primary + '20', 
              borderColor: colors.primary,
            },
            hovered && { backgroundColor: '#2196F3' + '30', borderColor: '#2196F3' }
          ]}
          onPress={handleCreateNote}
        >
          <Text style={[styles.inlineButtonText, { color: colors.primary }]}>
            + Adicionar nota
          </Text>
        </Pressable>
      </View>

      <View style={styles.sortContainer}>
        {renderSortButton(SortMode.NEWEST, 'Recentes')}
        {renderSortButton(SortMode.OLDEST, 'Antigas')}
        {renderSortButton(SortMode.TITLE_AZ, 'A-Z')}
      </View>

      <CategoryFilter
        selectedCategory={category}
        onSelectCategory={setCategory}
      />

      <View style={styles.listWrapper}>
        <FlatList
          data={sortedNotes}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.diagnosticCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.diagnosticTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={styles.diagnosticMeta}>{formatDate(item.createdAt)}</Text>
                </View>
                <Pressable onPress={() => deleteNote(item.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </Pressable>
              </View>
              <Text style={[styles.diagnosticContent, { color: colors.textSecondary }]}>{item.content}</Text>
              <Text style={styles.diagnosticMeta}>Categoria: {getCategoryLabel(item.category)}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.diagnosticEmpty}>
              <Text style={[styles.diagnosticTitle, { color: colors.text }]}>Nenhuma nota encontrada</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topActionContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  searchInput: { flex: 1, height: 44, borderRadius: 22, paddingHorizontal: 16, fontSize: 15, borderWidth: 1 },
  inlineButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  inlineButtonText: { fontSize: 13, fontWeight: '600' },
  sortContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, marginBottom: 8, marginTop: 4 },
  sortButton: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: 'transparent' },
  sortButtonText: { fontSize: 13, fontWeight: '600' },
  listWrapper: { flex: 1, width: '100%', minHeight: 'auto' },
  list: { flex: 1, width: '100%' },
  listContent: { paddingHorizontal: 16, paddingBottom: 16, flexGrow: 1 },
  diagnosticCard: { padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  deleteButton: { backgroundColor: '#FF4D4D', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12, marginLeft: 8 },
  deleteButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  diagnosticTitle: { fontSize: 16, fontWeight: 'bold' },
  diagnosticContent: { fontSize: 14, marginBottom: 8, lineHeight: 18 },
  diagnosticMeta: { fontSize: 11, color: '#888' },
  diagnosticEmpty: { paddingTop: 32, alignItems: 'center' },
});
