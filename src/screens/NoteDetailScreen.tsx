import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, Note } from '../types';
import { Header, Button, EmptyState } from '../components';

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

type NoteDetailContentProps = {
  note: Note;
  noteId: string;
  navigation: Props['navigation'];
};

export function NoteDetailScreen({ route, navigation }: Props) {
  const { noteId } = route.params;
  const { getNoteById } = useNotes();
  const { colors } = useTheme();

  const note = getNoteById(noteId);

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header
          title="Detalhes"
          showBackButton
          onBackPress={() => navigation.goBack()}
          onSettingsPress={() => {}}
        />
        <EmptyState
          title="Nota não encontrada"
          description="Esta nota pode ter sido excluída ou não existe mais."
          icon="🔍"
        />
        <View style={styles.notFoundAction}>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </View>
    );
  }

  return (
    <NoteDetailContent note={note} noteId={noteId} navigation={navigation} />
  );
}

function NoteDetailContent({ note, noteId, navigation }: NoteDetailContentProps) {
  const { deleteNote, toggleFavorite, updateNote } = useNotes();
  const { colors } = useTheme();

  const {
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
  } = useNoteEditor({ note, updateNote });

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

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Descartar alterações?',
        'As mudanças não salvas serão perdidas.',
        [
          { text: 'Continuar editando', style: 'cancel' },
          { text: 'Descartar', style: 'destructive', onPress: cancelEditing },
        ],
      );
      return;
    }

    cancelEditing();
  };

  const dateLabel =
    note.updatedAt !== note.createdAt
      ? `Editado em ${formatDate(note.updatedAt)} às ${formatTime(note.updatedAt)}`
      : `${formatDate(note.createdAt)} às ${formatTime(note.createdAt)}`;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Detalhes"
        showBackButton
        onBackPress={() => navigation.goBack()}
        onSettingsPress={() => {}}
        rightIcon={note.isFavorite ? '⭐' : '☆'}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.metaRow}>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(note.category) },
            ]}>
            <Text style={styles.categoryText}>
              {getCategoryLabel(note.category)}
            </Text>
          </View>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {dateLabel}
          </Text>
        </View>

        {isEditing ? (
          <>
            <Text style={[styles.label, { color: colors.text }]}>Título</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Digite o título..."
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <Text style={[styles.label, { color: colors.text }]}>Conteúdo</Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Digite o conteúdo da nota..."
              placeholderTextColor={colors.textSecondary}
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </>
        ) : (
          <>
            <Text style={[styles.title, { color: colors.text }]}>
              {note.title}
            </Text>

            <Text style={[styles.contentText, { color: colors.text }]}>
              {note.content}
            </Text>
          </>
        )}

        {isEditing ? (
          <View style={styles.actions}>
            <Button
              title="Salvar"
              onPress={saveEditing}
              disabled={!canSave}
            />
            <Button
              title="Cancelar"
              onPress={handleCancel}
              variant="secondary"
            />
          </View>
        ) : (
          <View style={styles.actions}>
            <Button title="✏ Editar" onPress={startEditing} />

            <Button
              title={note.isFavorite ? '★ Favorita' : '☆ Favoritar'}
              onPress={handleToggleFavorite}
              variant="secondary"
            />

            <View style={styles.spacer} />

            <Button title="🗑 Excluir" onPress={handleDelete} variant="danger" />
          </View>
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
  },
  textArea: {
    minHeight: 160,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
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
  notFoundAction: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
