import React, { useState } from 'react';
import { FileCode2, CloudUpload, Zap, AlertCircle, Info } from 'lucide-react';

export default function UploadZone({ onFileLoaded, onLoadSample, errorMsg }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        onFileLoaded(parsed, file.name);
      } catch (err) {
        onFileLoaded(null, file.name, 'Cú pháp file JSON không hợp lệ! Vui lòng kiểm tra lại cấu trúc.');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          onFileLoaded(parsed, file.name);
        } catch (err) {
          onFileLoaded(null, file.name, 'Cú pháp file JSON không hợp lệ! Vui lòng kiểm tra lại cấu trúc.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="py-10 flex flex-col items-center justify-center">
      <div className="text-center max-w-xl mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Nạp đề thi <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">JSON</span> của bạn
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Ai-chan sẽ hỗ trợ bạn xáo trộn ngẫu nhiên thứ tự câu hỏi và đáp án, chấm điểm tức thì và tổng hợp chi tiết các câu làm sai nha.
        </p>
      </div>

      {/* Dropzone Container */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full max-w-2xl glass-panel rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 border-2 border-dashed relative overflow-hidden group cursor-pointer ${
          isDragging
            ? 'border-indigo-400 bg-indigo-950/20 scale-[1.01]'
            : 'border-slate-700/80 hover:border-indigo-500/60'
        }`}
        onClick={() => document.getElementById('jsonFileInput').click()}
      >
        <input
          type="file"
          id="jsonFileInput"
          accept=".json,application/json"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:text-indigo-300 transition duration-300 shadow-inner">
          <FileCode2 className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          Kéo & thả file JSON vào đây hoặc bấm để duyệt file
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Hỗ trợ định dạng tiêu chuẩn (question, options, answer)
        </p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/30">
          <CloudUpload className="w-4 h-4" />
          <span>Tải file JSON từ máy</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Sample button */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-400">
        <span>Chưa có file mẫu sẵn sàng?</span>
        <button
          onClick={onLoadSample}
          className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-slate-700/70 font-semibold transition flex items-center gap-2 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          Dùng bộ câu hỏi mẫu (Sample Quiz)
        </button>
      </div>

      {/* JSON structure preview */}
      <div className="mt-10 w-full max-w-2xl text-left">
        <div className="glass-panel rounded-xl p-4 border border-slate-800">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            Cấu trúc file JSON chuẩn:
          </div>
          <pre className="text-[11px] text-slate-400 p-3 bg-slate-950/70 rounded-lg overflow-x-auto border border-slate-800/60 leading-relaxed font-mono">
{`[
  {
    "id": 1,
    "question": "Thủ đô của Việt Nam là gì?",
    "options": ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Huế"],
    "answer": "Hà Nội",
    "explanation": "Hà Nội là thủ đô của Việt Nam."
  }
]`}
          </pre>
        </div>
      </div>
    </div>
  );
}
