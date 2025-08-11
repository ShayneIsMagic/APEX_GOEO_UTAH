import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import OpportunitiesPage from './components/OpportunitiesPage';

// Create a theme instance with Utah colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#071D49', // Utah Blue
    },
    secondary: {
      main: '#AA0200', // Utah Red
    },
    warning: {
      main: '#FFB81D', // Utah Gold
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#071D49',
    },
    h5: {
      fontWeight: 600,
      color: '#071D49',
    },
    h6: {
      fontWeight: 600,
      color: '#071D49',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(7, 29, 73, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OpportunitiesPage />
    </ThemeProvider>
  );
}

export default App; 