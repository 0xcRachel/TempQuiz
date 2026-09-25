import React, { useState, useRef } from 'react';
import { Upload, Zap } from 'lucide-react';
import { parseQuizFile } from '../../utils/quizParser';

export default function UploadDropzone({ onQuizReady, onLoadDefault, onError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleProcessFile = async (file) => {
    if (!file) return;
    setIsLoading(true);
    try {
      const result = await parseQuizFile(file);
      if (result.success) {
        onQuizReady(result.data, result.fileName);
      } else {
        onError?.(result.errors.join(' '));
      }
    } catch (err) {
      onError?.(err.message || 'Lỗi xử lý file.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={(e) => {
          handleProcessFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleProcessFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`w-full bg-white rounded-xl p-10 text-center cursor-pointer border-2 border-dashed transition-colors ${
          isDragging ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'
        }`}
      >
        <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-3" />
        <p className="text-sm font-medium text-neutral-700 mb-1">
          {isLoading ? 'Đang đọc file...' : 'Kéo thả file JSON vào đây'}
        </p>
        <p className="text-xs text-neutral-400">
          hoặc bấm để chọn file từ máy tính
        </p>
      </div>

      <button
        onClick={onLoadDefault}
        className="mt-4 text-xs text-neutral-400 hover:text-neutral-600 transition inline-flex items-center gap-1"
      >
        <Zap className="w-3 h-3" />
        Dùng thử đề mẫu
      </button>
    </div>
  );
}
