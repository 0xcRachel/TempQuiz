import { validateAndNormalizeQuiz } from './quizValidator';

/**
 * Reads and parses a local File object into validated Quiz data.
 *
 * @param {File} file
 * @returns {Promise<{ success: boolean, data?: Object, errors?: string[], warnings?: string[], fileName: string, fileSize: number }>}
 */
export function parseQuizFile(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve({
        success: false,
        errors: ['Không có file nào được chọn.'],
        fileName: '',
        fileSize: 0
      });
      return;
    }

    const fileName = file.name;
    const fileSize = file.size;

    // Check extension or MIME type
    if (!fileName.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
      resolve({
        success: false,
        errors: ['Định dạng file không được hỗ trợ. Vui lòng tải lên file định dạng .json.'],
        fileName,
        fileSize
      });
      return;
    }

    // Size limit check: 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (fileSize > MAX_SIZE) {
      resolve({
        success: false,
        errors: ['Dung lượng file vượt quá giới hạn 10MB cho phép.'],
        fileName,
        fileSize
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== 'string') {
          throw new Error('Không thể đọc nội dung văn bản từ file.');
        }

        let parsedJson;
        try {
          parsedJson = JSON.parse(text);
        } catch (syntaxErr) {
          resolve({
            success: false,
            errors: [
              'Cú pháp file JSON bị lỗi (JSON Syntax Error). Vui lòng kiểm tra dấu phẩy, ngoặc nhọn hoặc dấu nháy kép trong file.',
              syntaxErr.message
            ],
            fileName,
            fileSize
          });
          return;
        }

        const validation = validateAndNormalizeQuiz(parsedJson);

        if (!validation.valid) {
          resolve({
            success: false,
            errors: validation.errors,
            warnings: validation.warnings,
            fileName,
            fileSize
          });
          return;
        }

        resolve({
          success: true,
          data: validation.data,
          warnings: validation.warnings,
          fileName,
          fileSize
        });
      } catch (err) {
        resolve({
          success: false,
          errors: [err.message || 'Lỗi không xác định khi xử lý file.'],
          fileName,
          fileSize
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        errors: ['Lỗi khi đọc file từ ổ cứng của bạn.'],
        fileName,
        fileSize
      });
    };

    reader.readAsText(file, 'UTF-8');
  });
}
