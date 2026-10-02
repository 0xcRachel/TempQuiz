import React from 'react';

export default function Hero() {
  return (
    <section className="text-center pt-16 pb-10 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-3 dark:text-white">
        Làm bài trắc nghiệm từ file JSON
      </h1>
      <p className="text-base text-neutral-500 max-w-md mx-auto leading-relaxed dark:text-neutral-400">
        Tải file lên, câu hỏi và đáp án sẽ được xáo trộn ngẫu nhiên. Làm bài xong xem ngay kết quả chi tiết.
      </p>
    </section>
  );
}
