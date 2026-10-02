import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, LayoutGrid } from 'lucide-react';

function getButtonStyle({ isCurrent, isAnswered }) {
  if (isCurrent) {
    return 'bg-neutral-900 text-white border-neutral-900 font-semibold shadow-sm dark:bg-white dark:text-neutral-900 dark:border-white';
  }
  if (isAnswered) {
    return 'bg-neutral-200 text-neutral-900 border-transparent font-medium hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600';
  }
  return 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:text-neutral-100';
}

export default function QuestionMapPanel({
  currentIndex,
  totalQuestions,
  sessionQuestions = [],
  userAnswers = {},
  answeredCount = 0,
  onGoTo,
  collapsible = false,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const gridRef = useRef(null);
  const currentBtnRef = useRef(null);

  // Auto scroll lưới tới câu đang làm để khỏi phải kéo tay khi ở câu 66
  // Chỉ scroll bên trong Qmap, không kéo cả trang
  useEffect(() => {
    if ((!collapsible || open) && gridRef.current && currentBtnRef.current) {
      const container = gridRef.current;
      const btn = currentBtnRef.current;
      const top = btn.offsetTop - container.offsetTop - container.clientHeight / 2 + btn.clientHeight / 2;
      container.scrollTo({ top, behavior: 'smooth' });
    }
  }, [currentIndex, open, collapsible]);

  const renderGrid = () => (
    <>
      <div
        ref={gridRef}
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className={`grid grid-cols-5 gap-1.5 overflow-y-auto overscroll-contain pr-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${collapsible ? 'max-h-80' : 'max-h-[60vh]'}`}
      >
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const isCurrent = i === currentIndex;
          const qId = sessionQuestions[i]?.id;
          const isAnswered = qId != null && userAnswers[qId] !== undefined;

          return (
            <button
              key={i}
              ref={isCurrent ? currentBtnRef : null}
              type="button"
              aria-label={`Đi tới câu ${i + 1}${isAnswered ? ' (đã làm)' : ' (chưa làm)'}`}
              aria-current={isCurrent ? 'true' : undefined}
              onClick={() => {
                onGoTo?.(i);
                if (collapsible) setOpen(false);
              }}
              className={`h-9 rounded-lg text-xs font-mono border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${getButtonStyle({ isCurrent, isAnswered })}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-neutral-900 inline-block dark:bg-white" />
          Đang làm
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-neutral-200 inline-block border border-neutral-200 dark:bg-neutral-700 dark:border-neutral-700" />
          Đã làm
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-white inline-block border border-neutral-300 dark:bg-neutral-900 dark:border-neutral-600" />
          Chưa làm
        </span>
      </div>
    </>
  );

  if (collapsible) {
    return (
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50/60 transition dark:hover:bg-neutral-800/60"
        >
          <span className="flex items-center gap-2 font-medium text-neutral-800 dark:text-neutral-100">
            <LayoutGrid className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            Bản đồ câu hỏi
            <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
              {currentIndex + 1}/{totalQuestions} · Đã làm {answeredCount}/{totalQuestions}
            </span>
          </span>
          <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform dark:text-neutral-400 ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && <div className="px-4 pb-4">{renderGrid()}</div>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900 dark:text-white">
          <LayoutGrid className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          Bản đồ câu hỏi
        </div>
      </div>
      <div className="text-xs text-neutral-500 mb-3 dark:text-neutral-400">
        Đã làm: <span className="font-medium text-neutral-800 dark:text-neutral-100">{answeredCount}/{totalQuestions}</span>
        <span className="text-neutral-400 dark:text-neutral-500"> · Bấm số để nhảy tới câu đó</span>
      </div>
      {renderGrid()}
    </div>
  );
}
