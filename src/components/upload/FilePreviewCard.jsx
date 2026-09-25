import React from 'react';
import { FileText, X, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function FilePreviewCard({ quizData, fileName, onStart, onClear }) {
  if (!quizData) return null;

  return (
    <div className="w-full max-w-lg mx-auto bg-white border border-neutral-200 rounded-xl p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-neutral-400 shrink-0" />
          <div>
            <p className="text-sm font-medium text-neutral-900">{quizData.title}</p>
            <p className="text-xs text-neutral-400 font-mono">{fileName}</p>
          </div>
        </div>
        <button onClick={onClear} className="p-1 text-neutral-400 hover:text-neutral-600 transition">
          <X className="w-4 h-4" />
        </button>
      </div>

      {quizData.description && (
        <p className="text-xs text-neutral-500 mb-4 leading-relaxed">{quizData.description}</p>
      )}

      <div className="flex items-center justify-between mb-4 py-2 px-3 bg-neutral-50 rounded-lg text-xs text-neutral-500">
        <span>Số câu hỏi</span>
        <span className="font-semibold text-neutral-900">{quizData.totalQuestions}</span>
      </div>

      <Button variant="primary" size="lg" className="w-full" iconRight={ArrowRight} onClick={onStart}>
        Bắt đầu làm bài
      </Button>
    </div>
  );
}
