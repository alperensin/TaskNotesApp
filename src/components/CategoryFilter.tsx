import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import { getCategoryLabel, getCategoryColor } from '../utils/formatters';
import { NoteCategory } from '../types';

import { useTheme } from '../context/ThemeContext';

interface CategoryFilterProps {
  selectedCategory: NoteCategory | 'all';
  onSelectCategory: (category: NoteCategory | 'all') => void;
}

const categories: (NoteCategory | 'all')[] = [
  'all',
  'personal',
  'work',
  'ideas',
  'todo',
];

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}>
      {categories.map(category => {
        const isSelected = category === selectedCategory;
        const bgColor =
          category === 'all' ? colors.primary : getCategoryColor(category);

        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? bgColor : 'transparent',
                borderColor: bgColor,
              },
            ]}
            onPress={() => onSelectCategory(category)}>
            <Text
              style={[
                styles.chipText,
                { color: isSelected ? '#FFFFFF' : bgColor },
              ]}>
              {category === 'all' ? 'Todas' : getCategoryLabel(category)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
