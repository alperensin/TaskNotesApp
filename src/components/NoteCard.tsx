import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {
  formatDate,
  truncateText,
  getCategoryLabel,
  getCategoryColor,
} from '../utils/formatters';
import { Note } from '../types';

import { useTheme } from '../context/ThemeContext';

interface NoteCardProps {
  note: Note;
  onPress: (id: number) => void;
  onFavoritePress: (id: string) => void;
}

export function NoteCard({ note, onPress, onFavoritePress }: NoteCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
      onPress={() => onPress(note.id)}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: getCategoryColor(note.category) },
          ]}>
          <Text style={styles.categoryText}>
            {getCategoryLabel(note.category)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onFavoritePress(note.id as unknown as string)}>
          <Text style={styles.favoriteIcon}>
            {note.isFavorite ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
        {note.title}
      </Text>

      <Text
        style={[styles.content, { color: colors.textSecondary }]}
        numberOfLines={2}>
        {truncateText(note.content, 100)}
      </Text>

      <Text style={[styles.date, { color: colors.textSecondary }]}>
        {formatDate(note.createdAt)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
});
