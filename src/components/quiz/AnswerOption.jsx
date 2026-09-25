import React, { useRef } from 'react';
import { animateAnswerSelect } from '../../animations/quizAnimations';

export default function AnswerOption({
  answer,
  index,
  isSelected,
  onSelect
}) {
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (buttonRef.current) {
      animateAnswerSelect(buttonRef.current);
    }
    onSelect(answer.id);
  };

  const keyboardKey = index + 1;
  const letterKey = answer.displayKey || String.fromCharCode(65 + index);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-pressed={isSelected}
      className={`answer-option-item w-full text-left p-3.5 sm:p-4 rounded-xl border transition-colors duration-150 flex items-center justify-between gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${
        isSelected
          ? 'bg-neutral-50 border-neutral-900 text-neutral-900'
          : 'bg-white hover:bg-neutral-50/60 border-neutral-200 text-neutral-700 hover:border-neutral-300'
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <span
          className={`w-6 h-6 rounded text-xs font-mono font-medium flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-500 group-hover:text-neutral-700'
          }`}
        >
          {letterKey}
        </span>

        <span className="text-sm leading-relaxed select-text">
          {answer.text}
        </span>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 opacity-60 group-hover:opacity-100">
          [{keyboardKey}]
        </span>

        <div
          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
            isSelected
              ? 'border-neutral-900 bg-neutral-900'
              : 'border-neutral-300 group-hover:border-neutral-400'
          }`}
        >
          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
      </div>
    </button>
  );
}
