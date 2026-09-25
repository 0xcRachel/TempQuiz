import { useEffect } from 'react';

/**
 * Hook to manage desktop keyboard shortcuts during quiz sessions:
 * - '1', '2', '3', '4' -> Select corresponding answer option
 * - 'ArrowLeft' -> Previous question
 * - 'ArrowRight' -> Next question
 * - 'Enter' -> Next question or trigger submission if at last question
 */
export function useKeyboardNav({
  enabled = true,
  answersCount = 4,
  onSelectOption,
  onPrev,
  onNext,
  canPrev,
  canNext,
  onSubmitPrompt
}) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      // Ignore if user is focused inside an input/textarea
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        return;
      }

      // Option selection by number: '1', '2', '3', '4'
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= answersCount) {
        e.preventDefault();
        onSelectOption?.(num - 1); // 0-based index
        return;
      }

      // Option selection by letter: 'a', 'b', 'c', 'd'
      const charCode = e.key.toUpperCase().charCodeAt(0);
      if (e.key.length === 1 && charCode >= 65 && charCode < 65 + answersCount) {
        e.preventDefault();
        onSelectOption?.(charCode - 65);
        return;
      }

      // Navigation
      if (e.key === 'ArrowLeft' && canPrev) {
        e.preventDefault();
        onPrev?.();
        return;
      }

      if (e.key === 'ArrowRight' && canNext) {
        e.preventDefault();
        onNext?.();
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (canNext) {
          onNext?.();
        } else {
          onSubmitPrompt?.();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, answersCount, onSelectOption, onPrev, onNext, canPrev, canNext, onSubmitPrompt]);
}
