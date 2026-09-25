import React from 'react';

export default function StatsOverview({ results, containerRef }) {
  const { correctCount, incorrectCount, unansweredCount, percentage } = results;

  const stats = [
    { label: 'Đúng', value: correctCount, color: 'text-emerald-600' },
    { label: 'Sai', value: incorrectCount, color: 'text-red-600' },
    { label: 'Bỏ trống', value: unansweredCount, color: 'text-amber-600' },
    { label: 'Chính xác', value: `${percentage}%`, color: 'text-neutral-900' }
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="stat-badge-item bg-white border border-neutral-200 rounded-xl p-4 text-center shadow-sm"
        >
          <div className="text-xs text-neutral-500 mb-1">{stat.label}</div>
          <div className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
