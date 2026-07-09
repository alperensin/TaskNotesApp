import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getCategoryLabel, getCategoryColor } from '../utils/formatters';
import { RootStackParamList, NoteCategory } from '../types';
import { Header, Button } from '../components';

import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateNote'>;

const categories: NoteCategory[] = ['personal', 'work', 'ideas', 'todo'];

export function CreateNoteScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<NoteCategory>('personal');

  const { addNote } = useNotes();
  const { colors } = useTheme();

  const handleSave = () => {
    addNote({
      title,
      content,
      category: selectedCategory,
    });

    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Nova Nota"
        showBackButton
        onBackPress={() => navigation.goBack()}
        onSettingsPress={() => {}}
      />

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}>
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

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <View style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === category
                      ? getCategoryColor(category)
                      : 'transparent',
                  borderColor: getCategoryColor(category),
                },
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.categoryChipText,
                  {
                    color:
                      selectedCategory === category
                        ? '#FFFFFF'
                        : getCategoryColor(category),
                  },
                ]}>
                {getCategoryLabel(category)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Salvar Nota" onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 16,
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
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
});
