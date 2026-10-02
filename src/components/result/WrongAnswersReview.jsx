import React, { useState, useRef } from 'react';
import ReviewCard from './ReviewCard';
import { animateFilterSwitch } from '../../animations/resultAnimations';

export default function WrongAnswersReview({
  results,
  cardsContainerRef
}) {
  const [filter, setFilter] = useState('all');
  const listRef = useRef(null);

  const { questionBreakdown, incorrectQuestions, correctQuestions } = results;

  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return;
    animateFilterSwitch(listRef.current, () => {
      setFilter(newFilter);
    });
  };

  const displayedList =
    filter === 'incorrect'
      ? incorrectQuestions
      : filter === 'correct'
      ? correctQuestions
      : questionBreakdown;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            Chi tiết bài làm
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Xem lại câu trả lời và đối chiếu đáp án đúng
          </p>
        </div>

        <div className="inline-flex p-1 rounded-lg bg-neutral-100 self-start sm:self-auto text-xs dark:bg-neutral-800">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              filter === 'all'
                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Tất cả ({questionBreakdown.length})
          </button>
          <button
            onClick={() => handleFilterChange('incorrect')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              filter === 'incorrect'
                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Câu sai ({incorrectQuestions.length})
          </button>
          <button
            onClick={() => handleFilterChange('correct')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              filter === 'correct'
                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Câu đúng ({correctQuestions.length})
          </button>
        </div>
      </div>

      <div ref={cardsContainerRef}>
        <div ref={listRef} className="space-y-3">
          {displayedList.length === 0 ? (
            <div className="text-center py-10 bg-white border border-neutral-200 rounded-xl p-6 text-xs text-neutral-500 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400">
              {filter === 'incorrect'
                ? 'Không có câu sai nào, bạn đã trả lời đúng toàn bộ.'
                : 'Chưa có câu hỏi phù hợp với bộ lọc.'}
            </div>
          ) : (
            displayedList.map((item) => (
              <ReviewCard key={item.questionId} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
