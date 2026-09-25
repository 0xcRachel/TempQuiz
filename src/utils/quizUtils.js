/**
 * Thuật toán xáo trộn Fisher-Yates (Knuth shuffle)
 */
export function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Chuẩn hóa câu hỏi từ mọi định dạng JSON phổ biến
 */
export function normalizeQuestion(item, index) {
  let rawOptions = item.options || item.choices || item.answers || [];
  if (!Array.isArray(rawOptions)) {
    rawOptions = Object.values(rawOptions);
  }

  const stringOptions = rawOptions.map(opt => String(opt).trim());

  let rawAnswer = item.answer ?? item.correctAnswer ?? item.correct ?? item.rightAnswer;
  let correctString = '';

  if (typeof rawAnswer === 'number') {
    if (rawAnswer >= 0 && rawAnswer < stringOptions.length) {
      correctString = stringOptions[rawAnswer];
    } else if (rawAnswer > 0 && rawAnswer <= stringOptions.length) {
      correctString = stringOptions[rawAnswer - 1];
    }
  } else if (typeof rawAnswer === 'string') {
    const trimmed = rawAnswer.trim();
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const letterIdx = letters.indexOf(trimmed.toUpperCase());
    if (letterIdx !== -1 && letterIdx < stringOptions.length && !stringOptions.includes(trimmed)) {
      correctString = stringOptions[letterIdx];
    } else {
      correctString = trimmed;
    }
  }

  return {
    id: item.id ? String(item.id) : `q_${index + 1}`,
    rawIndex: index + 1,
    question: item.question || item.title || item.content || `Câu hỏi ${index + 1}`,
    options: stringOptions,
    correctAnswer: correctString,
    explanation: item.explanation || item.note || ''
  };
}

/**
 * Xáo trộn cả danh sách câu hỏi và danh sách đáp án của từng câu
 */
export function prepareShuffledQuiz(rawList) {
  const normalized = rawList.map((item, idx) => normalizeQuestion(item, idx));
  const shuffledQuestions = shuffleArray(normalized);

  return shuffledQuestions.map((q, idx) => ({
    ...q,
    displayIndex: idx + 1,
    shuffledOptions: shuffleArray(q.options)
  }));
}
