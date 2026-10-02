import React from 'react';

export default function QuizHeader({
  currentIndex,
  totalQuestions,
  answeredCount,
  quizTitle
}) {
  return (
    <div className="flex items-center justify-between mb-4 text-xs text-neutral-500 dark:text-neutral-400">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-neutral-900 text-sm dark:text-white">
          Câu {currentIndex + 1}
        </span>
        <span>/ {totalQuestions}</span>
        {quizTitle && (
          <span className="hidden sm:inline text-neutral-400 truncate max-w-xs ml-1 dark:text-neutral-500">
            · {quizTitle}
          </span>
        )}
      </div>

      <div>
        <span>Đã làm: </span>
        <span className="font-medium text-neutral-800 dark:text-neutral-200">{answeredCount}/{totalQuestions}</span>
      </div>
    </div>
  );
}
