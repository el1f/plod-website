import { CssBaseline, GeistProvider, Themes } from '@geist-ui/react';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';

function App() {
  const darkTheme = Themes.createFromDark({ type: "my_dark" });
  const lightTheme = Themes.createFromLight({ type: "my_light" });
  const [themeType] = useState('my_dark')

  return (
    <GeistProvider themeType={themeType} themes={[darkTheme, lightTheme]}>
      <ThemeProvider theme={themeType === "my_dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </GeistProvider>
  );
}

export default App;
