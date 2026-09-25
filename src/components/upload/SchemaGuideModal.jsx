import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Copy, Check } from 'lucide-react';

export default function SchemaGuideModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  const sample = `{
  "title": "Tiêu đề bài thi",
  "description": "Mô tả ngắn",
  "questions": [
    {
      "id": 1,
      "question": "Nội dung câu hỏi?",
      "answers": [
        { "id": "a", "text": "Phương án A", "correct": true },
        { "id": "b", "text": "Phương án B", "correct": false },
        { "id": "c", "text": "Phương án C", "correct": false },
        { "id": "d", "text": "Phương án D", "correct": false }
      ],
      "explanation": "Giải thích (không bắt buộc)"
    }
  ]
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cấu trúc file JSON" maxWidth="max-w-xl">
      <div className="space-y-3 text-sm text-neutral-600">
        <p>Mỗi câu hỏi cần tối thiểu 2 lựa chọn và đúng 1 đáp án đúng.</p>
        <div className="relative">
          <pre className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg overflow-x-auto text-xs font-mono text-neutral-700 leading-relaxed">
            {sample}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-xs text-neutral-400 hover:text-neutral-600 flex items-center gap-1 transition"
          >
            {copied ? <><Check className="w-3 h-3" /> Đã copy</> : <><Copy className="w-3 h-3" /> Copy</>}
          </button>
        </div>
        <div className="pt-1 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </Modal>
  );
}
