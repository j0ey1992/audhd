import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = Object.freeze({
  WHITE: 'white',
  DARK: 'dark',
  ADHD: 'adhd',
  AUTISM: 'autism',
  DYSLEXIA: 'dyslexia'
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme-preference');
    return savedTheme || THEMES.WHITE;
  });

  useEffect(() => {
    const applyTheme = () => {
      // Always set the theme attribute
      document.documentElement.setAttribute('data-theme', theme);
      
      // Save theme preference
      localStorage.setItem('theme-preference', theme);

      // Apply theme-specific styles
      const themeStyles = {
        [THEMES.WHITE]: {
          lineHeight: '1.5',
          letterSpacing: '0',
          fontWeight: '400'
        },
        [THEMES.DARK]: {
          lineHeight: '1.5',
          letterSpacing: '0',
          fontWeight: '400'
        },
        [THEMES.ADHD]: {
          lineHeight: '2',
          letterSpacing: '0.05em',
          fontWeight: '400'
        },
        [THEMES.AUTISM]: {
          lineHeight: '1.8',
          letterSpacing: '0',
          fontWeight: '400'
        },
        [THEMES.DYSLEXIA]: {
          lineHeight: '1.8',
          letterSpacing: '0.1em',
          fontWeight: '500'
        }
      };

      const currentStyles = themeStyles[theme];
      document.documentElement.style.setProperty('--line-height', currentStyles.lineHeight);
      document.documentElement.style.setProperty('--letter-spacing', currentStyles.letterSpacing);
      document.documentElement.style.setProperty('--font-weight', currentStyles.fontWeight);
    };

    applyTheme();

    // Clean up function
    return () => {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.style.removeProperty('--line-height');
      document.documentElement.style.removeProperty('--letter-spacing');
      document.documentElement.style.removeProperty('--font-weight');
    };
  }, [theme]);

  const toggleTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
