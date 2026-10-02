import React from 'react';
import Badge from '../ui/Badge';

export default function ScoreHero({
  results,
  counterRef,
  percentageRef
}) {
  const { total, gradeLevel, gradeBadgeColor } = results;

  const badgeVariantMap = {
    emerald: 'success',
    indigo: 'default',
    blue: 'default',
    amber: 'warning'
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl py-8 px-4 text-center shadow-sm mb-6 dark:bg-neutral-900 dark:border-neutral-800">
      <div className="mb-2">
        <Badge variant={badgeVariantMap[gradeBadgeColor] || 'default'}>
          {gradeLevel}
        </Badge>
      </div>

      <div className="flex items-baseline justify-center gap-1.5 mb-1">
        <span
          ref={counterRef}
          className="text-5xl sm:text-6xl font-bold text-neutral-900 tracking-tight dark:text-white"
        >
          0
        </span>
        <span className="text-xl sm:text-2xl text-neutral-400 font-normal dark:text-neutral-500">
          / {total}
        </span>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Độ chính xác: <span ref={percentageRef} className="font-semibold text-neutral-800 dark:text-neutral-100">0%</span>
      </p>
    </div>
  );
}
