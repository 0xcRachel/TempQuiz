import React from 'react';
import Badge from '../ui/Badge';

export default function ReviewCard({ item }) {
  const {
    sessionIndex,
    questionText,
    selectedAnswerText,
    selectedAnswerKey,
    correctAnswerText,
    correctAnswerKey,
    isCorrect,
    isUnanswered,
    explanation
  } = item;

  return (
    <div className="review-card-item bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500">
          Câu {sessionIndex}
        </span>
        <Badge variant={isCorrect ? 'success' : 'error'}>
          {isCorrect ? 'Đúng' : 'Sai'}
        </Badge>
      </div>

      <h4 className="text-sm sm:text-base font-semibold text-neutral-900 mb-4 leading-relaxed dark:text-white">
        {questionText}
      </h4>

      <div className="space-y-2 text-xs sm:text-sm mb-3">
        {/* Selected answer */}
        <div
          className={`p-3 rounded-lg border ${
            isCorrect
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
              : 'bg-red-50/70 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200'
          }`}
        >
          <span className="text-xs opacity-75 block mb-0.5">Bạn chọn:</span>
          <span className="font-medium">
            {isUnanswered ? (
              <span className="italic text-neutral-400 font-normal dark:text-neutral-500">Chưa trả lời</span>
            ) : (
              <span>[{selectedAnswerKey}] {selectedAnswerText}</span>
            )}
          </span>
        </div>

        {/* Correct answer if user was wrong */}
        {!isCorrect && (
          <div className="p-3 rounded-lg border bg-emerald-50/70 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200">
            <span className="text-xs opacity-75 block mb-0.5">Đáp án đúng:</span>
            <span className="font-medium">[{correctAnswerKey}] {correctAnswerText}</span>
          </div>
        )}
      </div>

      {explanation && (
        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-600 leading-relaxed dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
          <strong className="text-neutral-800 mr-1 dark:text-neutral-100">Giải thích:</strong>
          {explanation}
        </div>
      )}
    </div>
  );
}
