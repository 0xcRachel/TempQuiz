import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function SubmitConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  answeredCount
}) {
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nộp bài thi"
      maxWidth="max-w-sm"
    >
      <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
        <p className="leading-relaxed">
          Xác nhận kết thúc bài làm để xem kết quả và đáp án chi tiết.
        </p>

        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1.5 text-xs dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">Tổng số câu:</span>
            <span className="font-semibold text-neutral-900 dark:text-white">{totalQuestions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">Đã trả lời:</span>
            <span className="font-semibold text-neutral-900 dark:text-white">{answeredCount}</span>
          </div>
          {unansweredCount > 0 && (
            <div className="flex justify-between text-amber-700">
            <span>Chưa chọn:</span>
            <span className="font-semibold">{unansweredCount}</span>
          </div>
          )}
        </div>

        {unansweredCount > 0 && (
          <p className="text-xs text-amber-600">
            Lưu ý: Bạn còn {unansweredCount} câu chưa trả lời.
          </p>
        )}

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Làm tiếp
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            Nộp bài
          </Button>
        </div>
      </div>
    </Modal>
  );
}
