import React from 'react';
import { Check, X, Lightbulb } from 'lucide-react';

export default function QuestionCard({ question, selectedAnswer, isSubmitted, onSelectOption }) {
  const userSelected = selectedAnswer;
  const isCorrect = userSelected && userSelected.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

  let cardBorder = 'border-white/5';
  if (isSubmitted) {
    cardBorder = isCorrect ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-rose-500/40 bg-rose-950/10';
  }

  return (
    <div className={`question-card glass-panel rounded-2xl p-6 transition-all duration-300 border ${cardBorder} relative`}>
      {/* Top indicator bar */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center">
            {question.displayIndex}
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Câu hỏi {question.displayIndex}
          </span>
        </div>

        {isSubmitted && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              isCorrect
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}
          >
            {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            {isCorrect ? 'Chính xác' : 'Sai'}
          </span>
        )}
      </div>

      {/* Question Text */}
      <h4 className="text-base sm:text-lg font-bold text-white mb-5 leading-snug">
        {question.question}
      </h4>

      {/* Options List */}
      <div className="space-y-2.5">
        {question.shuffledOptions.map((opt, optIdx) => {
          const isThisSelected = userSelected === opt;
          const isThisCorrectAnswer = opt.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

          let optionStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300';

          if (!isSubmitted) {
            if (isThisSelected) {
              optionStyle = 'border-indigo-500 bg-indigo-600/20 text-white font-semibold ring-1 ring-indigo-500';
            }
          } else {
            if (isThisCorrectAnswer) {
              optionStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold ring-1 ring-emerald-500/50';
            } else if (isThisSelected && !isThisCorrectAnswer) {
              optionStyle = 'border-rose-500 bg-rose-500/20 text-rose-200 font-bold ring-1 ring-rose-500/50 line-through';
            } else {
              optionStyle = 'border-slate-800/60 bg-slate-900/40 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={optIdx}
              type="button"
              disabled={isSubmitted}
              onClick={() => onSelectOption(question.id, opt)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between gap-3 ${optionStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-800/90 text-xs font-mono font-bold flex items-center justify-center text-slate-300 shrink-0">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="leading-relaxed">{opt}</span>
              </div>

              <div className="shrink-0 text-sm">
                {!isSubmitted ? (
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                      isThisSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                    }`}
                  >
                    {isThisSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                ) : (
                  <>
                    {isThisCorrectAnswer && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1 text-xs">
                        <Check className="w-3.5 h-3.5" /> Đáp án đúng
                      </span>
                    )}
                    {isThisSelected && !isThisCorrectAnswer && (
                      <span className="text-rose-400 font-semibold flex items-center gap-1 text-xs">
                        <X className="w-3.5 h-3.5" /> Bạn chọn sai
                      </span>
                    )}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Review details */}
      {isSubmitted && (
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-xs space-y-2">
          <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400">Đáp án chuẩn:</span>
            <span className="font-bold text-emerald-400">{question.correctAnswer}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Bạn đã chọn:</span>
            <span className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
              {userSelected || '(Bỏ trống)'}
            </span>
          </div>

          {question.explanation && (
            <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-indigo-200 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-indigo-300 mr-1">Giải thích:</strong>
                {question.explanation}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
