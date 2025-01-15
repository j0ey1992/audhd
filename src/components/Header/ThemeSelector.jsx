import React from 'react';
import { useTheme, THEMES } from '../../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme();

  const themeOptions = [
    { value: THEMES.WHITE, label: '☀️', title: 'White Mode' },
    { value: THEMES.DARK, label: '🌙', title: 'Dark Mode' },
    { value: THEMES.ADHD, label: '⚡', title: 'ADHD Mode' },
    { value: THEMES.AUTISM, label: '🧩', title: 'Autism Mode' },
    { value: THEMES.DYSLEXIA, label: '📖', title: 'Dyslexia Mode' },
  ];

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-md rounded-full shadow-md border border-text/10">
      {themeOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => toggleTheme(option.value)}
          className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
            theme === option.value
              ? 'bg-accent text-surface shadow-md scale-110'
              : 'text-text-secondary hover:text-text hover:bg-surface/80'
          }`}
          title={option.title}
          aria-label={option.title}
        >
          <span className="text-lg">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
