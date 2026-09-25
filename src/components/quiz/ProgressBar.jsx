import React, { useEffect, useRef } from 'react';
import { animateProgressBar } from '../../animations/quizAnimations';

export default function ProgressBar({ current, total }) {
  const barRef = useRef(null);
  const percentage = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  useEffect(() => {
    if (barRef.current) {
      animateProgressBar(barRef.current, percentage);
    }
  }, [percentage]);

  return (
    <div className="w-full mb-6">
      <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-neutral-900 rounded-full transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
