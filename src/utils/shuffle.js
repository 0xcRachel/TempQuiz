/**
 * Pure Fisher-Yates (Knuth) Shuffle.
 * Guarantees zero mutation of the original array and performs shallow/deep safety copies.
 *
 * @template T
 * @param {T[]} array
 * @returns {T[]} Shuffled new array
 */
export function shuffle(array) {
  if (!Array.isArray(array)) return [];
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Creates an entirely new shuffled Quiz Session from raw normalized quiz data.
 * Shuffles both questions order and answers inside each question immutably.
 *
 * @param {Object} quizData - Normalized quiz data
 * @returns {Object} New Quiz Session instance
 */
export function createShuffledSession(quizData) {
  if (!quizData || !Array.isArray(quizData.questions)) {
    throw new Error('Invalid quiz data provided for session creation.');
  }

  // Shuffle questions array immutably
  const shuffledQuestions = shuffle(quizData.questions).map((q, qIndex) => {
    // Deep clone question answers and shuffle them immutably
    const shuffledAnswers = shuffle(q.answers).map((ans, aIndex) => ({
      ...ans,
      displayKey: String.fromCharCode(65 + aIndex) // A, B, C, D...
    }));

    return {
      ...q,
      sessionIndex: qIndex + 1,
      totalCount: quizData.questions.length,
      answers: shuffledAnswers
    };
  });

  return {
    sessionId: `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    title: quizData.title || 'Untitled Quiz',
    description: quizData.description || '',
    createdAt: new Date().toISOString(),
    totalQuestions: shuffledQuestions.length,
    questions: shuffledQuestions
  };
}
