import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NoteCategory } from '../types';
import { getCategoryLabel, getCategoryColor } from '../utils/formatters';
import { useTheme } from '../context/ThemeContext';

interface NoteFormProps {
  title: string;
  setTitle: (t: string) => void;
  content: string;
  setContent: (c: string) => void;
  category: NoteCategory;
  setCategory: (c: NoteCategory) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function NoteForm({ title, setTitle, content, setContent, category, setCategory, onSave, onCancel }: NoteFormProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>Título</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]} 
        value={title} onChangeText={setTitle} placeholder="Título da nota..." placeholderTextColor={colors.textSecondary}
      />

      <Text style={[styles.label, { color: colors.textSecondary }]}>Categoria</Text>
      <View style={styles.categoryContainer}>
        {(['personal', 'work', 'ideas', 'todo'] as NoteCategory[]).map((cat) => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.categoryButton, category === cat && { backgroundColor: getCategoryColor(cat), borderColor: getCategoryColor(cat) }]}
            onPress={() => setCategory(cat)}
          >
            <Text style={{ color: category === cat ? '#FFF' : colors.textSecondary }}>{getCategoryLabel(cat)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: colors.textSecondary }]}>Conteúdo</Text>
      <TextInput 
        style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]} 
        value={content} onChangeText={setContent} multiline placeholder="Conteúdo..." placeholderTextColor={colors.textSecondary}
      />

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={onSave}><Text style={styles.btnText}>Salvar</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border }]} onPress={onCancel}><Text style={{ color: colors.text }}>Cancelar</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { height: 44, borderRadius: 8, paddingHorizontal: 12, borderWidth: 1, marginBottom: 12 },
  categoryContainer: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  categoryButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  textArea: { minHeight: 160, borderRadius: 8, padding: 12, borderWidth: 1, marginBottom: 24 },
  actions: { gap: 12 },
  btn: { padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});
