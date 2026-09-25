export const DEFAULT_QUIZ = {
  title: "Frontend Engineering & High-Performance Web Architecture",
  description: "Bộ câu hỏi trắc nghiệm chuyên sâu về React 18 Concurrent Model, V8 Engine, GSAP 60fps Animation, Lenis Smooth Scroll và Tối ưu hóa UI/UX.",
  questions: [
    {
      "id": "fe_01",
      "question": "Trong React 18, hook `useDeferredValue` hoạt động như thế nào và phục vụ mục đích gì chính?",
      "answers": [
        {
          "id": "ans_01_a",
          "text": "Trì hoãn việc cập nhật một phần của UI để ưu tiên các tương tác khẩn cấp hơn (như typing/clicking)",
          "correct": true
        },
        {
          "id": "ans_01_b",
          "text": "Tự động memoize kết quả tính toán giống như useMemo nhưng chạy trên Web Worker",
          "correct": false
        },
        {
          "id": "ans_01_c",
          "text": "Lưu trữ dữ liệu vào IndexedDB để tránh re-render khi reload trang",
          "correct": false
        },
        {
          "id": "ans_01_d",
          "text": "Ngắt kết nối websocket khi component bị unmount khỏi cây DOM",
          "correct": false
        }
      ],
      "explanation": "`useDeferredValue` nhận vào một giá trị và trả về phiên bản hoãn lại của giá trị đó, cho phép React ưu tiên các tác vụ có tính phản hồi tức thì (urgent updates) trước khi render các UI tốn kém."
    },
    {
      "id": "fe_02",
      "question": "Tại sao GSAP lại được đánh giá vượt trội hơn CSS transitions trong các animation phức tạp và timeline đa tầng?",
      "answers": [
        {
          "id": "ans_02_a",
          "text": "GSAP tự động biên dịch sang mã Assembly chạy trực tiếp trên GPU shader",
          "correct": false
        },
        {
          "id": "ans_02_b",
          "text": "Hỗ trợ ticker đồng bộ requestAnimationFrame, sequence timeline lồng ghép, kiểm soát play/pause/reverse mượt mà và xử lý cross-browser transform matrix chính xác",
          "correct": true
        },
        {
          "id": "ans_02_c",
          "text": "GSAP chạy ngầm trên Node.js server và streaming khung hình về client qua WebRTC",
          "correct": false
        },
        {
          "id": "ans_02_d",
          "text": "CSS transitions hoàn toàn không hỗ trợ thuộc tính transform và opacity",
          "correct": false
        }
      ],
      "explanation": "GSAP sở hữu kiến trúc Timeline đa tầng cực mạnh, đồng bộ hóa qua Global RAF Ticker, giải quyết triệt để vấn đề sub-pixel rounding và cho phép điều khiển dòng thời gian animation chính xác tuyệt đối."
    },
    {
      "id": "fe_03",
      "question": "Thư viện Lenis hoạt động theo cơ chế nào để mang lại trải nghiệm Smooth Scrolling mà vẫn giữ trọn vẹn khả năng tiếp cận (Accessibility)?",
      "answers": [
        {
          "id": "ans_03_a",
          "text": "Chặn hoàn toàn sự kiện scroll mặc định và tự tạo thanh cuộn ảo bằng canvas 2D",
          "correct": false
        },
        {
          "id": "ans_03_b",
          "text": "Thay đổi vị trí phần tử cha bằng CSS transform translateY liên tục trên toàn bộ body",
          "correct": false
        },
        {
          "id": "ans_03_c",
          "text": "Chuẩn hóa delta bánh xe chuột và nội suy vị trí cuộn tự nhiên (LERP) trên chính native window scroll mà không phá vỡ DOM structure",
          "correct": true
        },
        {
          "id": "ans_03_d",
          "text": "Ép trình duyệt chạy ở chế độ full-screen hardware video rendering",
          "correct": false
        }
      ],
      "explanation": "Lenis không dùng fake scrollbar hay transform body như các thư viện cũ. Nó hoạt động trực tiếp trên window native scroll bằng thuật toán nội suy làm mượt, giữ nguyên native links (#hash), SEO và khả năng tiếp cận."
    },
    {
      "id": "fe_04",
      "question": "Thuật toán Fisher-Yates (Knuth Shuffle) có ưu điểm cốt lõi nào so với việc dùng `array.sort(() => Math.random() - 0.5)`?",
      "answers": [
        {
          "id": "ans_04_a",
          "text": "Độ phức tạp O(N), đảm bảo xác suất xuất hiện của mọi hoán vị là hoàn toàn đồng đều (unbiased uniform distribution)",
          "correct": true
        },
        {
          "id": "ans_04_b",
          "text": "Giúp mảng tự động sắp xếp theo thứ tự bảng chữ cái alphabet",
          "correct": false
        },
        {
          "id": "ans_04_c",
          "text": "Không tiêu tốn bộ nhớ RAM vì chỉ tráo đổi trên thanh ghi CPU",
          "correct": false
        },
        {
          "id": "ans_04_d",
          "text": "Chỉ hoạt động được trên mảng các chuỗi ký tự mà không hỗ trợ số nguyên",
          "correct": false
        }
      ],
      "explanation": "`sort(() => Math.random() - 0.5)` bị thiên vị xác suất nghiêm trọng do thuật toán sort của V8 (TimSort) không đối xứng. Fisher-Yates duyệt tuyến tính O(N) và chứng minh toán học được tính ngẫu nhiên đều 100%."
    },
    {
      "id": "fe_05",
      "question": "Để tối ưu hiệu năng render (Rendering Pipeline 60fps) trong CSS & JavaScript, thuộc tính nào sau đây an toàn nhất để animate vì chỉ kích hoạt giai đoạn 'Composite'?",
      "answers": [
        {
          "id": "ans_05_a",
          "text": "width, height, margin, padding",
          "correct": false
        },
        {
          "id": "ans_05_b",
          "text": "top, left, right, bottom",
          "correct": false
        },
        {
          "id": "ans_05_c",
          "text": "transform và opacity",
          "correct": true
        },
        {
          "id": "ans_05_d",
          "text": "box-shadow, border-radius và filter",
          "correct": false
        }
      ],
      "explanation": "`transform` và `opacity` có thể được xử lý trực tiếp bởi GPU compositor thread mà không gây ra Layout (Reflow) hay Paint (Repaint), tránh được nghẽn CPU và giật khung hình."
    }
  ]
};
