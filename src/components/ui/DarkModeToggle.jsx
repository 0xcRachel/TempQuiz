import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
      title={isDark ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
      className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
