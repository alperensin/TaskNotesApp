import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, NoteCategory } from '../types';
import { Header, Button } from '../components';

import {
  formatDate,
  formatTime,
  getCategoryLabel,
  getCategoryColor,
} from '../utils/formatters';

import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import { useNoteEditor } from '../hooks/useNoteEditor';

type Props = NativeStackScreenProps<RootStackParamList, 'NoteDetail'>;

export function NoteDetailScreen({ route, navigation }: Props) {
  const { noteId } = route.params;
  const { getNoteById, deleteNote, toggleFavorite, updateNote } = useNotes();
  const { colors } = useTheme();

  const note = getNoteById(noteId);
  const {
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
  } = useNoteEditor(note, (title, content, category) => {
    updateNote(noteId, { title, content, category });
  });

  useEffect(() => {
    if (!note) {
      navigation.goBack();
    }
  }, [note, navigation]);

  if (!note) return null;

  const handleDelete = () => {
    Alert.alert('Excluir nota', 'Tem certeza que deseja excluir esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteNote(noteId);
          navigation.goBack();
        },
      },
    ]);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(noteId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={isEditing ? 'Editar Nota' : 'Detalhes'}
        showBackButton
        onBackPress={() => (isEditing ? cancelEditing() : navigation.goBack())}
        rightIcon={!isEditing ? (note.isFavorite ? '⭐' : '☆') : undefined}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isEditing ? (
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Título</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
              ]}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Digite o título..."
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={[styles.label, { color: colors.textSecondary }]}>Categoria</Text>
            <View style={styles.categoryContainer}>
              {(['personal', 'work', 'ideas', 'todo'] as NoteCategory[]).map((cat) => {
                const isSelected = editCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      { borderColor: colors.border },
                      isSelected && { 
                        backgroundColor: getCategoryColor(cat), 
                        borderColor: getCategoryColor(cat) 
                      },
                    ]}
                    onPress={() => setEditCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        { color: isSelected ? '#FFFFFF' : colors.textSecondary },
                      ]}
                    >
                      {getCategoryLabel(cat)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Conteúdo</Text>
            <TextInput
              style={[
                styles.textArea,
                { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
              ]}
              value={editContent}
              onChangeText={setEditContent}
              placeholder="Digite o conteúdo da nota..."
              placeholderTextColor={colors.textSecondary}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.actions}>
              <Button title="💾 Salvar Alterações" onPress={handleSave} />
              <Button title="Cancelar" variant="secondary" onPress={cancelEditing} />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.metaRow}>
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: getCategoryColor(note.category) },
                ]}
              >
                <Text style={styles.categoryText}>
                  {getCategoryLabel(note.category)}
                </Text>
              </View>
              <Text style={[styles.date, { color: colors.textSecondary }]}>
                {formatDate(note.createdAt)} às {formatTime(note.createdAt)}
              </Text>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>

            <Text style={[styles.contentText, { color: colors.text }]}>
              {note.content}
            </Text>

            <View style={styles.actions}>
              <Button title="✏️ Editar Nota" onPress={startEditing} />
              
              <Button
                title={note.isFavorite ? '★ Favorita' : '☆ Favoritar'}
                onPress={handleToggleFavorite}
                variant="secondary"
              />

              <View style={styles.spacer} />

              <Button title="🗑 Excluir" onPress={handleDelete} variant="danger" />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  actions: {
    gap: 12,
  },
  spacer: {
    height: 8,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    fontSize: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 6,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textArea: {
    minHeight: 160,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 24,
  },
});
