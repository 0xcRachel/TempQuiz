import React, { useEffect, useRef } from 'react';
import ScoreHero from '../components/result/ScoreHero';
import StatsOverview from '../components/result/StatsOverview';
import WrongAnswersReview from '../components/result/WrongAnswersReview';
import Button from '../components/ui/Button';
import { RotateCcw, FolderOpen, XCircle, CheckCircle2 } from 'lucide-react';
import { animateResultReveal } from '../animations/resultAnimations';

export default function Result({
  results,
  quizTitle,
  onRetry,
  onRetryIncorrect,
  onRetryCorrect,
  onReset
}) {
  const counterRef = useRef(null);
  const percentageRef = useRef(null);
  const statsContainerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (results) {
      animateResultReveal({
        counterElement: counterRef.current,
        targetScore: results.score,
        percentageElement: percentageRef.current,
        targetPercentage: results.percentage,
        statsContainer: statsContainerRef.current,
        cardsContainer: cardsContainerRef.current
      });
    }
  }, [results]);

  if (!results) return null;

  const incorrectCount = results.incorrectQuestions?.length ?? results.incorrectCount ?? 0;
  const correctCount = results.correctQuestions?.length ?? results.correctCount ?? 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <ScoreHero
        results={results}
        counterRef={counterRef}
        percentageRef={percentageRef}
      />

      <StatsOverview
        results={results}
        containerRef={statsContainerRef}
      />

      <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 shadow-sm mb-8 dark:bg-neutral-900 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
          Luyện tập thêm
        </h3>
        <p className="text-xs text-neutral-500 mb-3 leading-relaxed dark:text-neutral-400">
          Làm lại riêng từng nhóm, thứ tự câu và đáp án sẽ xáo trộn lại.
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={XCircle}
            onClick={onRetryIncorrect}
            disabled={incorrectCount === 0}
            className="w-full"
          >
            Luyện {incorrectCount} câu sai
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCircle2}
            onClick={onRetryCorrect}
            disabled={correctCount === 0}
            className="w-full"
          >
            Luyện {correctCount} câu đúng
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <WrongAnswersReview
          results={results}
          cardsContainerRef={cardsContainerRef}
        />
      </div>

      <div className="sticky bottom-5 z-30">
        <div className="bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-xl p-2.5 sm:p-3 shadow-sm flex items-center justify-center gap-2 max-w-md mx-auto dark:bg-neutral-900/90 dark:border-neutral-700">
          <Button
            variant="primary"
            size="sm"
            icon={RotateCcw}
            onClick={onRetry}
            className="flex-1"
          >
            Làm lại toàn bộ
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={FolderOpen}
            onClick={onReset}
            className="flex-1"
          >
            Đề khác
          </Button>
        </div>
      </div>
    </div>
  );
}
