import React from 'react';

export default function StatsOverview({ results, containerRef }) {
  const { correctCount, incorrectCount, unansweredCount, percentage } = results;

  const stats = [
    { label: 'Đúng', value: correctCount, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Sai', value: incorrectCount, color: 'text-red-600 dark:text-red-400' },
    { label: 'Bỏ trống', value: unansweredCount, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Chính xác', value: `${percentage}%`, color: 'text-neutral-900 dark:text-white' }
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="stat-badge-item bg-white border border-neutral-200 rounded-xl p-4 text-center shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
        >
          <div className="text-xs text-neutral-500 mb-1 dark:text-neutral-400">{stat.label}</div>
          <div className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
