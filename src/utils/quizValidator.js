/**
 * Quiz Validator & Normalizer
 * Validates JSON quiz structures and normalizes them into a unified schema.
 */

export function validateAndNormalizeQuiz(rawJson) {
  const errors = [];
  const warnings = [];

  if (!rawJson || typeof rawJson !== 'object') {
    return {
      valid: false,
      errors: ['File JSON không hợp lệ: Nội dung không phải là một Object hoặc Array.'],
      warnings,
      data: null
    };
  }

  // Determine container structure:
  // Case 1: Direct Array [ { question, ... } ]
  // Case 2: Object { title, description, questions: [...] }
  let title = 'Bộ câu hỏi trắc nghiệm';
  let description = '';
  let rawQuestions = [];

  if (Array.isArray(rawJson)) {
    rawQuestions = rawJson;
    title = 'Bộ đề trắc nghiệm nhập từ file';
  } else if (rawJson && typeof rawJson === 'object') {
    title = rawJson.title?.trim() || 'Bộ câu hỏi trắc nghiệm';
    description = rawJson.description?.trim() || '';
    rawQuestions = rawJson.questions || rawJson.items || rawJson.quiz || [];
  }

  if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
    return {
      valid: false,
      errors: ['Không tìm thấy danh sách câu hỏi trong file (mảng questions trống hoặc không đúng định dạng).'],
      warnings,
      data: null
    };
  }

  const normalizedQuestions = [];

  rawQuestions.forEach((qItem, idx) => {
    const questionIndex = idx + 1;
    const prefix = `Câu hỏi #${questionIndex}:`;

    if (!qItem || typeof qItem !== 'object') {
      errors.push(`${prefix} Dữ liệu câu hỏi phải là một object.`);
      return;
    }

    const questionText = (qItem.question || qItem.title || qItem.content || '').trim();
    if (!questionText) {
      errors.push(`${prefix} Thiếu nội dung câu hỏi (field 'question' bị trống).`);
      return;
    }

    // Answers parsing
    // Format A: qItem.answers = [ { id, text, correct: boolean } ]
    // Format B: qItem.options = [ "A", "B", ... ] & qItem.answer = "A" (or index)
    let answers = [];

    if (Array.isArray(qItem.answers)) {
      answers = qItem.answers.map((ans, aIdx) => {
        if (typeof ans === 'string') {
          return {
            id: `ans_${aIdx + 1}`,
            text: ans.trim(),
            correct: false
          };
        }
        return {
          id: ans.id || `ans_${aIdx + 1}`,
          text: String(ans.text || ans.content || ans.title || '').trim(),
          correct: Boolean(ans.correct || ans.isCorrect)
        };
      });

      // If correct wasn't marked in answers array, check qItem.answer
      const hasAnyCorrect = answers.some(a => a.correct);
      if (!hasAnyCorrect && qItem.answer !== undefined) {
        const rawAns = qItem.answer;
        if (typeof rawAns === 'number' && rawAns >= 0 && rawAns < answers.length) {
          answers[rawAns].correct = true;
        } else if (typeof rawAns === 'string') {
          const match = answers.find(a => a.text.toLowerCase() === rawAns.trim().toLowerCase());
          if (match) {
            match.correct = true;
          } else {
            // Check if letter 'A', 'B', 'C'...
            const letterIdx = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(rawAns.trim().toUpperCase());
            if (letterIdx !== -1 && letterIdx < answers.length) {
              answers[letterIdx].correct = true;
            }
          }
        }
      }
    } else if (Array.isArray(qItem.options) || Array.isArray(qItem.choices)) {
      const opts = qItem.options || qItem.choices;
      const rawAns = qItem.answer ?? qItem.correctAnswer ?? qItem.correct;

      answers = opts.map((opt, aIdx) => {
        const text = String(opt).trim();
        let isCorrect = false;

        if (typeof rawAns === 'number') {
          if (rawAns === aIdx) isCorrect = true;
          else if (rawAns === aIdx + 1) isCorrect = true; // 1-based index support
        } else if (typeof rawAns === 'string') {
          const trimmedAns = rawAns.trim();
          if (text.toLowerCase() === trimmedAns.toLowerCase()) {
            isCorrect = true;
          } else {
            const letterIdx = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(trimmedAns.toUpperCase());
            if (letterIdx === aIdx) isCorrect = true;
          }
        }

        return {
          id: `ans_${aIdx + 1}`,
          text,
          correct: isCorrect
        };
      });
    } else {
      errors.push(`${prefix} Không tìm thấy danh sách đáp án (cần field 'answers' hoặc 'options').`);
      return;
    }

    // Validate minimum answers
    if (answers.length < 2) {
      errors.push(`${prefix} Phải có ít nhất 2 lựa chọn đáp án (hiện có ${answers.length}).`);
      return;
    }

    // Check empty text in answers
    const hasEmptyOption = answers.some(a => !a.text);
    if (hasEmptyOption) {
      errors.push(`${prefix} Có phương án trả lời bị để trống.`);
      return;
    }

    // Check correct answers count
    const correctCount = answers.filter(a => a.correct).length;
    if (correctCount === 0) {
      errors.push(`${prefix} Chưa chỉ định đáp án đúng nào cho câu hỏi này.`);
      return;
    }
    if (correctCount > 1) {
      warnings.push(`${prefix} Có ${correctCount} đáp án được đánh dấu là đúng (hệ thống sẽ chấm theo lựa chọn đầu tiên).`);
    }

    normalizedQuestions.push({
      id: qItem.id ? String(qItem.id) : `q_${questionIndex}`,
      question: questionText,
      answers,
      explanation: (qItem.explanation || qItem.explain || qItem.note || '').trim()
    });
  });

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
      warnings,
      data: null
    };
  }

  return {
    valid: true,
    errors: [],
    warnings,
    data: {
      title,
      description,
      totalQuestions: normalizedQuestions.length,
      questions: normalizedQuestions
    }
  };
}
