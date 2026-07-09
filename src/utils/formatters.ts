import { ThemeColors } from '../types';

export const lightTheme: ThemeColors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  primary: '#2196F3',
  accent: '#FF9800',
  border: '#E0E0E0',
  error: '#F44336',
  success: '#4CAF50',
};

export const darkTheme: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  primary: '#64B5F6',
  accent: '#FFB74D',
  border: '#333333',
  error: '#EF5350',
  success: '#66BB6A',
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + '...';
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    all: 'Todas',
    personal: 'Pessoal',
    work: 'Trabalho',
    ideas: 'Ideias',
    todo: 'Tarefas',
  };

  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    all: '#2196F3',
    personal: '#9C27B0',
    work: '#2196F3',
    ideas: '#FF9800',
    todo: '#4CAF50',
  };

  return colors[category] || '#757575';
}
