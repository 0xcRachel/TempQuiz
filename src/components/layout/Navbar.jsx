import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import DarkModeToggle from '../ui/DarkModeToggle';

export default function Navbar({ screen, quizTitle, onReset, onRetry, onOpenSchema, isDark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-neutral-200 py-3 px-4 sm:px-8 dark:bg-neutral-950/80 dark:border-neutral-800">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div
          onClick={screen !== 'home' ? onReset : undefined}
          className={`flex items-center gap-2 ${screen !== 'home' ? 'cursor-pointer' : ''}`}
        >
          <span className="font-semibold text-base text-neutral-900 tracking-tight dark:text-white">QuizFlow</span>
        </div>

        {screen !== 'home' && quizTitle && (
          <span className="hidden md:block text-sm text-neutral-400 truncate max-w-xs dark:text-neutral-500">
            {quizTitle}
          </span>
        )}

        <div className="flex items-center gap-1.5">
          <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
          {screen === 'home' && (
            <button onClick={onOpenSchema} className="text-xs text-neutral-500 hover:text-neutral-700 transition dark:text-neutral-400 dark:hover:text-neutral-200">
              JSON Schema
            </button>
          )}
          {screen === 'quiz' && (
            <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={onReset}>
              Thoát
            </Button>
          )}
          {screen === 'result' && (
            <>
              <Button variant="primary" size="sm" icon={RotateCcw} onClick={onRetry}>Làm lại</Button>
              <Button variant="secondary" size="sm" onClick={onReset}>Đề khác</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
