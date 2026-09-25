import React from 'react';
import { Shuffle, RefreshCw, Upload, Sparkles } from 'lucide-react';

export default function Header({ hasQuiz, onReshuffle, onReset }) {
  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-white/5 py-4 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Shuffle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
              Quiz Master
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Lenis + GSAP
              </span>
            </h1>
            <p className="text-xs text-slate-400">Trắc nghiệm xáo trộn câu hỏi & đáp án tự động</p>
          </div>
        </div>

        {hasQuiz && (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onReshuffle}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Xáo trộn lại</span>
            </button>
            <button
              onClick={onReset}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chọn đề khác</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
