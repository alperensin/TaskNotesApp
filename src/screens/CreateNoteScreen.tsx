import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, NoteCategory } from '../types';
import { Header, NoteForm } from '../components';
import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateNote'>;

export function CreateNoteScreen({ navigation }: Props) {
  const { addNote } = useNotes();
  const { colors } = useTheme();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<NoteCategory>('personal');

  const handleSave = () => {
    addNote({ title, content, category, isFavorite: false });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Nova Nota" showBackButton onBackPress={() => navigation.goBack()} />
      <NoteForm 
        title={title} setTitle={setTitle}
        content={content} setContent={setContent}
        category={category} setCategory={setCategory}
        onSave={handleSave} onCancel={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  }
});
