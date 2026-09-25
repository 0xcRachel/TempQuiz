import React, { useEffect, useRef } from 'react';
import ScoreHero from '../components/result/ScoreHero';
import StatsOverview from '../components/result/StatsOverview';
import WrongAnswersReview from '../components/result/WrongAnswersReview';
import Button from '../components/ui/Button';
import { RotateCcw, FolderOpen } from 'lucide-react';
import { animateResultReveal } from '../animations/resultAnimations';

export default function Result({
  results,
  quizTitle,
  onRetry,
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

      <div className="mb-8">
        <WrongAnswersReview
          results={results}
          cardsContainerRef={cardsContainerRef}
        />
      </div>

      <div className="sticky bottom-5 z-30">
        <div className="bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-xl p-2.5 sm:p-3 shadow-sm flex items-center justify-center gap-2 max-w-md mx-auto">
          <Button
            variant="primary"
            size="sm"
            icon={RotateCcw}
            onClick={onRetry}
            className="flex-1"
          >
            Làm lại bài
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
