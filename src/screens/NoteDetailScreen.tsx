import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { Header, Button } from '../components';

import {
  formatDate,
  formatTime,
  getCategoryLabel,
  getCategoryColor,
} from '../utils/formatters';

import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'NoteDetail'>;

export function NoteDetailScreen({ route, navigation }: Props) {
  const { noteId } = route.params;
  const { getNoteById, deleteNote, toggleFavorite } = useNotes();
  const { colors } = useTheme();

  const note = getNoteById(noteId);

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
            {formatDate(note.createdAt)} às {formatTime(note.createdAt)}
          </Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>

        <Text style={[styles.contentText, { color: colors.text }]}>
          {note.content}
        </Text>

        <View style={styles.actions}>
          <Button
            title={note.isFavorite ? '★ Favorita' : '☆ Favoritar'}
            onPress={handleToggleFavorite}
            variant="secondary"
          />

          <View style={styles.spacer} />

          <Button title="🗑 Excluir" onPress={handleDelete} variant="danger" />
        </View>
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
});
