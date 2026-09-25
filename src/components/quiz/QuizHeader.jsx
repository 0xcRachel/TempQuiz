import React from 'react';

export default function QuizHeader({
  currentIndex,
  totalQuestions,
  answeredCount,
  quizTitle
}) {
  return (
    <div className="flex items-center justify-between mb-4 text-xs text-neutral-500">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-neutral-900 text-sm">
          Câu {currentIndex + 1}
        </span>
        <span>/ {totalQuestions}</span>
        {quizTitle && (
          <span className="hidden sm:inline text-neutral-400 truncate max-w-xs ml-1">
            · {quizTitle}
          </span>
        )}
      </div>

      <div>
        <span>Đã làm: </span>
        <span className="font-medium text-neutral-800">{answeredCount}/{totalQuestions}</span>
      </div>
    </div>
  );
}
