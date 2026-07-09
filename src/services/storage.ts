import AsyncStorage from '@react-native-async-storage/async-storage';

import { Note } from '../types';

const NOTES_STORAGE_KEY = '@tasknotes:notes';

export async function loadNotes(): Promise<Note[]> {
  try {
    const data = await AsyncStorage.getItem(NOTES_STORAGE_KEY);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  } catch (error) {
    console.error('Erro ao carregar notas:', error);
    return [];
  }
}

export async function saveNotes(notes: Note[]): Promise<void> {
  try {
    const data = JSON.stringify(notes);
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, data);
  } catch (error) {
    console.error('Erro ao salvar notas:', error);
  }
}

export async function clearStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(NOTES_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar storage:', error);
  }
}
