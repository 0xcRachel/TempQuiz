import React from 'react';
import { Lock, Zap, SlidersHorizontal, BarChart3 } from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      title: 'Quyền riêng tư tuyệt đối',
      desc: 'Toàn bộ nội dung đề thi được phân tích tại Client-side. Không một dòng code hay câu hỏi nào được gửi lên server.',
      icon: Lock
    },
    {
      title: 'Hiệu năng 60 FPS mượt mà',
      desc: 'Tích hợp Lenis Smooth Scroll và timeline GSAP tăng tốc phần cứng, loại bỏ hoàn toàn hiện tượng giật xé trang.',
      icon: Zap
    },
    {
      title: 'Xáo trộn kép chuẩn xác',
      desc: 'Ứng dụng hoán vị Fisher-Yates hai tầng: xáo trộn thứ tự các câu hỏi và xáo trộn vị trí các phương án A, B, C, D.',
      icon: SlidersHorizontal
    },
    {
      title: 'Chẩn đoán câu sai thông minh',
      desc: 'Giao diện tổng kết nổi bật các lỗi sai, đối chiếu câu bạn chọn với đáp án chuẩn cùng phần phân tích chi tiết.',
      icon: BarChart3
    }
  ];

  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#111111]/50 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
