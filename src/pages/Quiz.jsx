import React, { useState, useRef } from 'react';
import QuizHeader from '../components/quiz/QuizHeader';
import ProgressBar from '../components/quiz/ProgressBar';
import AnswerOption from '../components/quiz/AnswerOption';
import QuestionNavigator from '../components/quiz/QuestionNavigator';
import QuestionMapPanel from '../components/quiz/QuestionMapPanel';
import SubmitConfirmModal from '../components/quiz/SubmitConfirmModal';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { animateQuestionChange } from '../animations/quizAnimations';

export default function Quiz({
  session,
  currentIndex,
  currentQuestion,
  userAnswers,
  progressMetrics,
  onSelectAnswer,
  onGoTo,
  onNext,
  onPrev,
  onSubmitQuiz
}) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const cardContainerRef = useRef(null);

  const handleStepQuestion = (direction, action) => {
    if (cardContainerRef.current) {
      animateQuestionChange(cardContainerRef.current, direction, () => {
        action();
      });
    } else {
      action();
    }
  };

  const handleNextWithAnim = () => {
    handleStepQuestion('next', onNext);
  };

  const handlePrevWithAnim = () => {
    handleStepQuestion('prev', onPrev);
  };

  const handleGoToWithAnim = (idx) => {
    const dir = idx > currentIndex ? 'next' : 'prev';
    handleStepQuestion(dir, () => onGoTo(idx));
    // Nhảy xa (vd câu 66 về câu 1) thì kéo lên đầu để thấy ngay câu hỏi
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useKeyboardNav({
    enabled: true,
    answersCount: currentQuestion?.answers?.length || 4,
    onSelectOption: (optionIndex) => {
      if (currentQuestion && currentQuestion.answers[optionIndex]) {
        onSelectAnswer(currentQuestion.id, currentQuestion.answers[optionIndex].id);
      }
    },
    onPrev: handlePrevWithAnim,
    onNext: handleNextWithAnim,
    canPrev: currentIndex > 0,
    canNext: currentIndex < session.totalQuestions - 1,
    onSubmitPrompt: () => setIsConfirmModalOpen(true)
  });

  if (!currentQuestion) return null;

  const currentSelectedId = userAnswers[currentQuestion.id];

  return (
    <div className="w-full px-4 py-8">
      {/* Mobile / tablet: bản đồ câu hỏi dạng thu gọn, hiện trên câu hỏi */}
      <div className="max-w-2xl mx-auto xl:hidden mb-4">
        <QuestionMapPanel
          collapsible
          defaultOpen={false}
          currentIndex={currentIndex}
          totalQuestions={session.totalQuestions}
          sessionQuestions={session.questions}
          userAnswers={userAnswers}
          answeredCount={progressMetrics.answered}
          onGoTo={handleGoToWithAnim}
        />
      </div>

      {/* Quiz luôn ở giữa */}
      <div className="max-w-2xl w-full mx-auto">
          <QuizHeader
            currentIndex={currentIndex}
            totalQuestions={session.totalQuestions}
            answeredCount={progressMetrics.answered}
            quizTitle={session.title}
          />

          <ProgressBar
            current={currentIndex}
            total={session.totalQuestions}
          />

          <div
            ref={cardContainerRef}
            className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-sm mb-6 dark:bg-neutral-900 dark:border-neutral-800"
          >
            <h2 className="text-base sm:text-lg font-semibold text-neutral-900 mb-6 leading-relaxed dark:text-white">
              {currentQuestion.question}
            </h2>

            <div className="space-y-2.5">
              {currentQuestion.answers.map((answer, aIdx) => (
                <AnswerOption
                  key={answer.id}
                  answer={answer}
                  index={aIdx}
                  isSelected={currentSelectedId === answer.id}
                  onSelect={(ansId) => onSelectAnswer(currentQuestion.id, ansId)}
                />
              ))}
            </div>
          </div>

          <QuestionNavigator
            currentIndex={currentIndex}
            totalQuestions={session.totalQuestions}
            sessionQuestions={session.questions}
            userAnswers={userAnswers}
            onPrev={handlePrevWithAnim}
            onNext={handleNextWithAnim}
            onGoTo={handleGoToWithAnim}
            onSubmitPrompt={() => setIsConfirmModalOpen(true)}
          />
        </div>

        {/* Desktop: Qmap dính hẳn bên phải viewport */}
        <aside className="hidden xl:block fixed right-6 2xl:right-10 top-20 w-[288px] z-30">
          <QuestionMapPanel
            currentIndex={currentIndex}
            totalQuestions={session.totalQuestions}
            sessionQuestions={session.questions}
            userAnswers={userAnswers}
            answeredCount={progressMetrics.answered}
            onGoTo={handleGoToWithAnim}
          />
        </aside>

      <SubmitConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={onSubmitQuiz}
        totalQuestions={session.totalQuestions}
        answeredCount={progressMetrics.answered}
      />
    </div>
  );
}
