import React from 'react';

import { NotesProvider } from './src/context/NotesContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <NotesProvider>
        <AppNavigator />
      </NotesProvider>
    </ThemeProvider>
  );
}

export default App;
