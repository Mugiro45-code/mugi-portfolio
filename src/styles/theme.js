import { createTheme } from '@mui/material/styles'

export const getAppTheme = (mode = 'dark') => {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#8b5cf6' : '#4f46e5',
        light: isDark ? '#a78bfa' : '#6366f1',
        dark: isDark ? '#6d28d9' : '#3730a3',
      },
      secondary: {
        main: isDark ? '#22d3ee' : '#0284c7',
      },
      background: {
        default: isDark ? '#050816' : '#eef4ff',
        paper: isDark ? 'rgba(10, 15, 30, 0.72)' : 'rgba(255, 255, 255, 0.82)',
      },
      text: {
        primary: isDark ? '#e2e8f0' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
      },
    },
    shape: {
      borderRadius: 20,
    },
    typography: {
      fontFamily: 'Inter, Space Grotesk, sans-serif',
      h1: {
        fontFamily: 'Space Grotesk, Inter, sans-serif',
        fontWeight: 700,
      },
      h2: {
        fontFamily: 'Space Grotesk, Inter, sans-serif',
        fontWeight: 700,
      },
      h3: {
        fontFamily: 'Space Grotesk, Inter, sans-serif',
        fontWeight: 700,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: isDark ? '#050816' : '#eef4ff',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  })
}