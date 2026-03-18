import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="animate-in fade-in zoom-in duration-300" />
      ) : (
        <Sun size={20} className="animate-in fade-in zoom-in duration-300" />
      )}
    </button>
  );
};
