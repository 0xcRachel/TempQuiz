import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Award, CheckCircle2, XCircle, HelpCircle, Filter } from 'lucide-react';

export default function ScoreSummary({ scoreData, filterMode, setFilterMode, totalQuestions }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }
      );
    }

    if (counterRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: scoreData.correct,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.round(obj.val);
          }
        }
      });
    }
  }, [scoreData.correct]);

  return (
    <div
      ref={containerRef}
      className="glass-panel rounded-2xl p-6 sm:p-8 mb-8 border border-indigo-500/30 shadow-2xl shadow-indigo-950/40 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
        {/* Score Counter */}
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-900/60 to-slate-900 border border-indigo-500/40 flex flex-col items-center justify-center shadow-lg">
            <span ref={counterRef} className="text-4xl font-extrabold text-white tracking-tighter">
              {scoreData.correct}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold">
              / {scoreData.total} Câu
            </span>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Kết Quả Bài Làm
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {scoreData.percentage >= 80
                ? 'Xuất sắc lắm nè!'
                : scoreData.percentage >= 50
                ? 'Khá tốt rồi, cố thêm một chút nha!'
                : 'Cần ôn tập lại các câu sai nhé!'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Đạt tỉ lệ chính xác <span className="text-indigo-300 font-bold">{scoreData.percentage}%</span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-center">
            <div className="text-xl font-black text-emerald-400">{scoreData.correct}</div>
            <div className="text-[11px] text-emerald-200/70 font-semibold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Đúng
            </div>
          </div>
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-center">
            <div className="text-xl font-black text-rose-400">{scoreData.wrong}</div>
            <div className="text-[11px] text-rose-200/70 font-semibold flex items-center justify-center gap-1">
              <XCircle className="w-3 h-3" /> Sai
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-center col-span-2 sm:col-span-1">
            <div className="text-xl font-black text-amber-400">{scoreData.unselected}</div>
            <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-center gap-1">
              <HelpCircle className="w-3 h-3" /> Bỏ trống
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs for Review */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" />
          Bộ lọc xem lại chi tiết:
        </div>

        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả ({totalQuestions})
          </button>
          <button
            onClick={() => setFilterMode('wrong')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              filterMode === 'wrong'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-400 hover:text-rose-300'
            }`}
          >
            <XCircle className="w-3 h-3" /> Chỉ câu sai ({scoreData.wrong})
          </button>
          <button
            onClick={() => setFilterMode('correct')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              filterMode === 'correct'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" /> Chỉ câu đúng ({scoreData.correct})
          </button>
        </div>
      </div>
    </div>
  );
}
