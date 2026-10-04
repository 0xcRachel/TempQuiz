import { useState, useCallback, useMemo } from 'react';
import { createShuffledSession } from '../utils/shuffle';
import { calculateQuizResults } from '../utils/scoreCalculator';

export function useQuiz() {
  const [screen, setScreen] = useState('home'); // 'home' | 'quiz' | 'result'
  const [rawQuiz, setRawQuiz] = useState(null);
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Start new quiz session from validated quiz data
  const startQuiz = useCallback((quizData) => {
    if (!quizData || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
      showToast('Dữ liệu bài thi không hợp lệ để bắt đầu.', 'error');
      return;
    }

    const newSession = createShuffledSession(quizData);
    setRawQuiz(quizData);
    setSession(newSession);
    setCurrentIndex(0);
    setUserAnswers({});
    setResults(null);
    setScreen('quiz');
  }, [showToast]);

  // Select an answer for a question
  const selectAnswer = useCallback((questionId, answerId) => {
    setUserAnswers((prev) => {
      // Toggle if already selected or overwrite
      if (prev[questionId] === answerId) {
        const next = { ...prev };
        delete next[questionId];
        return next;
      }
      return {
        ...prev,
        [questionId]: answerId
      };
    });
  }, []);

  // Navigation handlers
  const goToQuestion = useCallback((index) => {
    if (!session) return;
    if (index >= 0 && index < session.questions.length) {
      setCurrentIndex(index);
    }
  }, [session]);

  const nextQuestion = useCallback(() => {
    if (!session) return;
    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [session, currentIndex]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Submit quiz and calculate results
  const submitQuiz = useCallback(() => {
    if (!session) return;
    const finalResults = calculateQuizResults(session, userAnswers);
    setResults(finalResults);
    setScreen('result');
  }, [session, userAnswers]);

  // Retry with a fresh re-shuffle
  const retrySession = useCallback(() => {
    if (!rawQuiz) return;
    const freshSession = createShuffledSession(rawQuiz);
    setSession(freshSession);
    setCurrentIndex(0);
    setUserAnswers({});
    setResults(null);
    setScreen('quiz');
  }, [rawQuiz]);

  // Build a practice session from a subset of question ids (giữ nguyên rawQuiz gốc)
  const retryWithIds = useCallback((ids, label) => {
    if (!rawQuiz) return;
    const idSet = new Set(ids.map((id) => String(id)));
    const filtered = rawQuiz.questions.filter((q) => idSet.has(String(q.id)));
    if (filtered.length === 0) {
      showToast('Không có câu nào trong nhóm này để luyện.', 'info');
      return;
    }
    const practiceSession = createShuffledSession({
      ...rawQuiz,
      title: `${rawQuiz.title} · ${label}`,
      questions: filtered
    });
    setSession(practiceSession);
    setCurrentIndex(0);
    setUserAnswers({});
    setResults(null);
    setScreen('quiz');
  }, [rawQuiz, showToast]);

  // Làm lại những câu sai (gồm cả câu bỏ trống)
  const retryIncorrect = useCallback(() => {
    if (!results) return;
    const ids = (results.incorrectQuestions || []).map((item) => item.questionId);
    if (ids.length === 0) {
      showToast('Bạn không sai câu nào, khỏi cần luyện câu sai nha.', 'success');
      return;
    }
    retryWithIds(ids, `Luyện ${ids.length} câu sai`);
  }, [results, retryWithIds, showToast]);

  // Làm lại những câu đúng
  const retryCorrect = useCallback(() => {
    if (!results) return;
    const ids = (results.correctQuestions || []).map((item) => item.questionId);
    if (ids.length === 0) {
      showToast('Chưa có câu đúng nào để luyện lại.', 'info');
      return;
    }
    retryWithIds(ids, `Luyện ${ids.length} câu đúng`);
  }, [results, retryWithIds, showToast]);

  // Reset back to home screen
  const resetToHome = useCallback(() => {
    setRawQuiz(null);
    setSession(null);
    setCurrentIndex(0);
    setUserAnswers({});
    setResults(null);
    setScreen('home');
  }, []);

  // Progress metrics
  const progressMetrics = useMemo(() => {
    if (!session) return { answered: 0, total: 0, percentage: 0 };
    const total = session.questions.length;
    const answered = Object.keys(userAnswers).length;
    const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;
    return { answered, total, percentage };
  }, [session, userAnswers]);

  const currentQuestion = useMemo(() => {
    if (!session || !session.questions[currentIndex]) return null;
    return session.questions[currentIndex];
  }, [session, currentIndex]);

  return {
    screen,
    setScreen,
    rawQuiz,
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
    retryIncorrect,
    retryCorrect,
    resetToHome
  };
}
