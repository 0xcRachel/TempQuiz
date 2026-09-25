import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, LayoutGrid } from 'lucide-react';
import Button from '../ui/Button';

export default function QuestionNavigator({
  currentIndex,
  totalQuestions,
  sessionQuestions = [],
  userAnswers,
  onPrev,
  onNext,
  onGoTo,
  onSubmitPrompt
}) {
  const [showGrid, setShowGrid] = useState(false);
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="sticky bottom-5 z-30 mt-8">
      <div className="bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-xl p-2.5 sm:p-3 shadow-sm flex items-center justify-between gap-3 max-w-xl mx-auto">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentIndex === 0}
          onClick={onPrev}
          icon={ArrowLeft}
        >
          <span className="hidden sm:inline">Trước</span>
        </Button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>
              {currentIndex + 1} / {totalQuestions}
            </span>
          </button>

          {showGrid && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white border border-neutral-200 rounded-xl p-3 shadow-lg z-50">
              <div className="text-xs font-medium text-neutral-500 mb-2">Danh sách câu hỏi</div>
              <div className="grid grid-cols-5 gap-1.5 max-h-44 overflow-y-auto">
                {Array.from({ length: totalQuestions }).map((_, i) => {
                  const isCurrent = i === currentIndex;
                  const qId = sessionQuestions[i]?.id;
                  const isAnswered = qId && userAnswers[qId] !== undefined;

                  let style = 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200';
                  if (isCurrent) {
                    style = 'bg-neutral-900 text-white font-semibold';
                  } else if (isAnswered) {
                    style = 'bg-neutral-200 text-neutral-900 font-medium';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        onGoTo(i);
                        setShowGrid(false);
                      }}
                      className={`h-8 rounded-lg text-xs font-mono transition-colors ${style}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {isLast ? (
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmitPrompt}
            iconRight={Check}
          >
            <span>Nộp bài</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            iconRight={ArrowRight}
          >
            <span>Tiếp</span>
          </Button>
        )}
      </div>
    </div>
  );
}
