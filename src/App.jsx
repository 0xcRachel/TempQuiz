import React, { useState, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { useQuiz } from './hooks/useQuiz';
import { useLenis } from './hooks/useLenis';
import { transitionPages } from './animations/pageTransitions';

export default function App() {
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);
  const containerRef = useRef(null);

  useLenis();

  const {
    screen,
    session,
    currentIndex,
    currentQuestion,
    userAnswers,
    results,
    toast,
    progressMetrics,
    showToast,
    hideToast,
    startQuiz,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    retrySession,
    resetToHome
  } = useQuiz();

  const handleTransitionTo = (nextScreen, callback) => {
    if (containerRef.current) {
      transitionPages(containerRef.current, callback, '#view-container');
    } else {
      if (callback) callback();
    }
  };

  const handleStartQuiz = (quizData) => {
    handleTransitionTo('quiz', () => startQuiz(quizData));
  };

  const handleSubmitQuiz = () => {
    handleTransitionTo('result', () => submitQuiz());
  };

  const handleRetrySession = () => {
    handleTransitionTo('quiz', () => retrySession());
  };

  const handleResetToHome = () => {
    handleTransitionTo('home', () => resetToHome());
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col relative">
      <Navbar
        screen={screen}
        quizTitle={session?.title}
        onReset={handleResetToHome}
        onRetry={handleRetrySession}
        onOpenSchema={() => setIsSchemaOpen(true)}
      />

      <main
        id="view-container"
        ref={containerRef}
        className="flex-1 relative z-10"
      >
        {screen === 'home' && (
          <Home
            onStartQuiz={handleStartQuiz}
            onShowToast={showToast}
            isSchemaOpen={isSchemaOpen}
            onCloseSchema={() => setIsSchemaOpen(false)}
          />
        )}

        {screen === 'quiz' && session && (
          <Quiz
            session={session}
            currentIndex={currentIndex}
            currentQuestion={currentQuestion}
            userAnswers={userAnswers}
            progressMetrics={progressMetrics}
            onSelectAnswer={selectAnswer}
            onGoTo={goToQuestion}
            onNext={nextQuestion}
            onPrev={prevQuestion}
            onSubmitQuiz={handleSubmitQuiz}
          />
        )}

        {screen === 'result' && results && (
          <Result
            results={results}
            quizTitle={session?.title}
            onRetry={handleRetrySession}
            onReset={handleResetToHome}
          />
        )}
      </main>

      <Footer onOpenSchema={() => setIsSchemaOpen(true)} />
      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}
