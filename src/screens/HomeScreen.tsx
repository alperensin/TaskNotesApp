import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import {
  Header,
  NoteCard,
  Button,
  EmptyState,
  CategoryFilter,
} from '../components';

import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';

import { useNoteFilter } from '../hooks/useNoteFilter';
import { useDeviceInfo } from '../hooks/useDeviceInfo';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { notes, toggleFavorite, isLoading } = useNotes();
  const { colors } = useTheme();
  const { filteredNotes, filterConfig, setCategory, setSearchQuery } =
    useNoteFilter(notes);

  const { deviceInfo } = useDeviceInfo();

  const handleNotePress = (id: string) => {
    navigation.navigate('NoteDetail', { noteId: id });
  };

  const handleCreateNote = () => {
    navigation.navigate('CreateNote');
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Minhas Notas" />

      {deviceInfo && (
        <View style={styles.deviceBanner}>
          <Text style={[styles.deviceText, { color: colors.textSecondary }]}>
            📱 {deviceInfo.deviceName} • {deviceInfo.systemVersion}
          </Text>
        </View>
      )}

      <View style={styles.searchContainer}>
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
          value={filterConfig.searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <CategoryFilter
        selectedCategory={filterConfig.category}
        onSelectCategory={setCategory}
      />

      {filteredNotes.length === 0 ? (
        <EmptyState
          title="Nenhuma nota encontrada"
          description="Crie sua primeira nota tocando no botão abaixo."
        />
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={handleNotePress}
              onFavoritePress={toggleFavorite}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.fabContainer}>
        <Button title="+ Nova Nota" onPress={handleCreateNote} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  deviceBanner: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: 'center',
  },
  deviceText: {
    fontSize: 11,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
  },
});
