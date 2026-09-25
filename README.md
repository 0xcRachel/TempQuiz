# QuizFlow — World-Class Interactive Local JSON Quiz Platform

> **Được thiết kế theo tiêu chuẩn sản phẩm công nghệ cao cấp (Apple × Linear × Vercel × Stripe)**  
> Trải nghiệm làm bài trắc nghiệm mượt mà 60 FPS với React 18, Vite, Tailwind CSS, Lenis và GSAP.

---

## 1. Điểm nổi bật & Triết lý thiết kế (Design Philosophy)

- **100% Local-First & Privacy**: Toàn bộ quá trình đọc file JSON, trích xuất dữ liệu, xáo trộn câu hỏi và chấm điểm diễn ra trực tiếp trong RAM của trình duyệt. Không có bất kỳ dữ liệu nào được đẩy lên server.
- **Thuật toán Fisher-Yates hai tầng**: Xáo trộn hoàn toàn ngẫu nhiên thứ tự các câu hỏi và hoán vị các phương án lựa chọn (A, B, C, D) mà không làm biến đổi (mutate) mảng dữ liệu gốc.
- **GSAP & Lenis Fluidity**: Tích hợp công nghệ cuộn trang mượt mà qua Lenis kết hợp với timeline GSAP tăng tốc GPU, hiệu ứng chuyển cảnh mượt mà khi chuyển câu và bảng tổng kết điểm số tự động count-up.
- **Chẩn đoán câu sai chuyên sâu**: Bảng kết quả tổng hợp chi tiết số câu đúng/sai, đối chiếu phương án bạn chọn với đáp án chuẩn và phân tích nguyên nhân kèm lời giải.
- **Hỗ trợ phím tắt Desktop**: Phím số `1`, `2`, `3`, `4` (hoặc `A`, `B`, `C`, `D`) để chọn đáp án; phím mũi tên `←` `→` để lùi/tiến câu; phím `Enter` để xác nhận nộp bài.

---

## 2. Cấu trúc thư mục (Component-Driven Architecture)

```text
d:\Mobsycho\
├── src/
│   ├── animations/
│   │   ├── pageTransitions.js     # GSAP timeline chuyển cảnh giữa Home, Quiz và Result
│   │   ├── quizAnimations.js      # Hiệu ứng chuyển câu hỏi, stagger đáp án, micro-bounce
│   │   └── resultAnimations.js    # Hiệu ứng count-up điểm số, reveal thống kê, lọc câu sai
│   ├── components/
│   │   ├── home/                  # Hero, How It Works, Feature Grid
│   │   ├── layout/                # Navbar thương hiệu, Footer Local-first
│   │   ├── quiz/                  # QuizHeader, ProgressBar, AnswerOption, QuestionNavigator, SubmitModal
│   │   ├── result/                # ScoreHero, StatsOverview, WrongAnswersReview, ReviewCard
│   │   ├── ui/                    # Button, Badge, Modal, Toast, CustomCursor
│   │   └── upload/                # UploadDropzone, FilePreviewCard, SchemaGuideModal
│   ├── data/
│   │   └── defaultQuiz.js         # Bộ đề mẫu chuyên sâu về Frontend Architecture
│   ├── hooks/
│   │   ├── useQuiz.js             # Quản lý state điều phối toàn bộ vòng đời bài thi
│   │   ├── useLenis.js            # Khởi tạo và cleanup Lenis smooth scroll
│   │   ├── useKeyboardNav.js      # Bắt sự kiện phím số và phím điều hướng
│   │   └── useMediaQuery.js       # Nhận diện kích thước màn hình và thiết bị cảm ứng
│   ├── pages/
│   │   ├── Home.jsx               # Màn hình trang chủ & nạp file JSON
│   │   ├── Quiz.jsx               # Màn hình làm bài thi tập trung
│   │   └── Result.jsx             # Màn hình chấm điểm và phân tích câu sai
│   ├── utils/
│   │   ├── quizParser.js          # Đọc file FileReader và bẫy lỗi cú pháp
│   │   ├── quizValidator.js       # Kiểm tra cấu trúc câu hỏi, đáp án, single-choice
│   │   ├── scoreCalculator.js     # Tính điểm, tỉ lệ %, danh sách câu sai
│   │   └── shuffle.js             # Thuật toán Fisher-Yates thuần khiết (pure function)
│   ├── App.jsx                    # Root App component kết nối State & Transition
│   ├── index.css                  # Directives Tailwind CSS & Lenis overrides
│   └── main.jsx                   # Entry point React 18
├── public/
│   └── sample-quiz.json           # File đề thi mẫu có sẵn
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 3. Định dạng JSON chuẩn (Schema Specification)

QuizFlow hỗ trợ cấu trúc Object tiêu chuẩn hoặc Mảng trực tiếp:

```json
{
  "title": "Java Fundamentals & JVM Core",
  "description": "Bài kiểm tra kiến trúc máy ảo Java và quản lý bộ nhớ",
  "questions": [
    {
      "id": 1,
      "question": "Java Virtual Machine (JVM) có nhiệm vụ chính là gì?",
      "answers": [
        {
          "id": "a",
          "text": "Thực thi mã bytecode của Java độc lập với nền tảng phần cứng bên dưới",
          "correct": true
        },
        {
          "id": "b",
          "text": "Trình soạn thảo văn bản phục vụ viết code Java",
          "correct": false
        },
        {
          "id": "c",
          "text": "Hệ điều hành nhúng dành riêng cho thiết bị IoT",
          "correct": false
        },
        {
          "id": "d",
          "text": "Hệ quản trị cơ sở dữ liệu quan hệ",
          "correct": false
        }
      ],
      "explanation": "JVM là thành phần cốt lõi của Java Platform, chịu trách nhiệm nạp class, xác thực mã và thực thi bytecode trên hệ điều hành thực tế."
    }
  ]
}
```

*Hệ thống cũng tự động tương thích với các định dạng đơn giản có trường `options: [...]` và `answer: "A"` hoặc `answer: 0`.*

---

## 4. Hướng dẫn chạy dự án

### Khởi động môi trường phát triển (Development):
```bash
npm run dev
```
Trình duyệt sẽ mở tại `http://localhost:3000` với đầy đủ tính năng Hot Module Replacement (HMR).

### Kiểm tra bản dựng Production (Build & Preview):
```bash
npm run build
npm run preview
```
Bản build tĩnh tối ưu hóa được xuất tại thư mục `/dist/` với dung lượng siêu nhẹ (gzip ~120KB cho toàn bộ React, GSAP, Lenis và Icons).
