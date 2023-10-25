'use client';
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode
} from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
  enabled: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState('light');
  const [enabled, setEnabled] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('colorScheme', newTheme);
    setTheme(newTheme);
    setEnabled(!enabled);
  };

  useEffect(() => {
    const localColorScheme = localStorage.getItem('colorScheme');
    if (localColorScheme) {
      document.documentElement.classList.add(localColorScheme);
      document.documentElement.dataset.theme = localColorScheme;
      setTheme(localColorScheme);
      setEnabled(localColorScheme === 'dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, enabled }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
