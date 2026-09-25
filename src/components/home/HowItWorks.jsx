import React from 'react';
import { UploadCloud, Shuffle, Focus, CheckCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Upload JSON',
      desc: 'Kéo thả file .json từ máy tính hoặc dùng ngay bộ đề mẫu. Toàn bộ dữ liệu nằm lại trong máy bạn.',
      icon: UploadCloud
    },
    {
      num: '02',
      title: 'Auto Shuffle',
      desc: 'Hệ thống dùng thuật toán Fisher-Yates xáo trộn toàn bộ câu hỏi và các phương án trả lời ngẫu nhiên.',
      icon: Shuffle
    },
    {
      num: '03',
      title: 'Take & Focus',
      desc: 'Làm bài với giao diện tối giản kiểu Linear, hỗ trợ phím số 1-4 và các phím mũi tên chuyển câu mượt mà.',
      icon: Focus
    },
    {
      num: '04',
      title: 'Master Mistakes',
      desc: 'Chấm điểm tức thì, thống kê tỉ lệ và phân tích chi tiết từng câu sai kèm phương án chính xác.',
      icon: CheckCheck
    }
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2 block">
            Quy trình vận hành
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Đơn giản, tốc độ và tập trung tối đa
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#111111]/70 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-indigo-400/80 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
