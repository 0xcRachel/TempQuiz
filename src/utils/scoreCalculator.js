/**
 * Score Calculator & Breakdown Generator
 */

export function calculateQuizResults(session, userAnswers = {}) {
  if (!session || !Array.isArray(session.questions)) {
    return {
      total: 0,
      answeredCount: 0,
      unansweredCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      percentage: 0,
      score: 0,
      gradeLevel: 'Unranked',
      questionBreakdown: [],
      incorrectQuestions: []
    };
  }

  const total = session.questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let answeredCount = 0;

  const questionBreakdown = session.questions.map((q, idx) => {
    const selectedAnswerId = userAnswers[q.id];
    const isAnswered = selectedAnswerId !== undefined && selectedAnswerId !== null;

    if (isAnswered) {
      answeredCount++;
    }

    const selectedOption = q.answers.find(a => a.id === selectedAnswerId);
    const correctOption = q.answers.find(a => a.correct) || q.answers[0];

    const isCorrect = selectedOption ? Boolean(selectedOption.correct) : false;

    if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    return {
      questionId: q.id,
      sessionIndex: idx + 1,
      questionText: q.question,
      selectedAnswerId: selectedAnswerId || null,
      selectedAnswerText: selectedOption ? selectedOption.text : null,
      selectedAnswerKey: selectedOption ? selectedOption.displayKey : null,
      correctAnswerId: correctOption.id,
      correctAnswerText: correctOption.text,
      correctAnswerKey: correctOption.displayKey,
      isCorrect,
      isUnanswered: !isAnswered,
      explanation: q.explanation || '',
      allOptions: q.answers
    };
  });

  const unansweredCount = total - answeredCount;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const score = correctCount;

  let gradeLevel = 'Cần rèn luyện thêm';
  let gradeBadgeColor = 'amber';
  if (percentage >= 90) {
    gradeLevel = 'Xuất sắc tuyệt đối';
    gradeBadgeColor = 'emerald';
  } else if (percentage >= 75) {
    gradeLevel = 'Nắm vững kiến thức';
    gradeBadgeColor = 'indigo';
  } else if (percentage >= 50) {
    gradeLevel = 'Đạt yêu cầu cơ bản';
    gradeBadgeColor = 'blue';
  }

  const incorrectQuestions = questionBreakdown.filter(item => !item.isCorrect);
  const correctQuestions = questionBreakdown.filter(item => item.isCorrect);

  return {
    total,
    answeredCount,
    unansweredCount,
    correctCount,
    incorrectCount,
    percentage,
    score,
    gradeLevel,
    gradeBadgeColor,
    questionBreakdown,
    incorrectQuestions,
    correctQuestions
  };
}
