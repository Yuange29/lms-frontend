export const lightTheme = {
    colors: {
        primary: "#0B3FC1",
        primaryHover: "#082F91",
        primaryActive: "#0B3FC1",
        primarySoft: "#EFF6FF",
        onPrimary: "#FFFFFF",

        secondary: "#CFDCFC",
        secondaryHover: "#9FB8F9", // 200
        secondaryActive: "#6E95F7", // 100
        onSecondary: "#031030",

        background: "#f4f4f4", // 50
        section: "#ebebeb8a",
        card: "#CFDCFC",
        surface: "#E2E8F0",
        surfaceSoft: "#F1F5F9",

        text: "#061F60", // 900
        textSoft: "rgb(65, 85, 112)",
        textMuted: "#64748B",

        border: "#bcbcbc",
        error: "#EF4444",
        errorHover: "#DC2626",
        errorActive: "#B91C1C",
        errorSoft: "#FEE2E2",
        onError: "#FFFFFF",
        success: "#10B981",
        warning: "#F59E0B",
        focusRing: "#3B82F6",
    },
};

// --color-royal-blue-50: #e7edfe;
// --color-royal-blue-100: #cfdcfc;
// --color-royal-blue-200: #9fb8f9;
// --color-royal-blue-300: #6e95f7;
// --color-royal-blue-400: #3e72f4;
// --color-royal-blue-500: #0e4ef1;
// --color-royal-blue-600: #0b3fc1;
// --color-royal-blue-700: #082f91;
// --color-royal-blue-800: #061f60;
// --color-royal-blue-900: #031030;
// --color-royal-blue-950: #020b22;

export const darkTheme = {
    colors: {
        // 10% Điểm nhấn (Chuyển sang tông sáng hơn ở darkmode để nổi bật)
        primary: "#3B82F6", // Blue 500
        primaryHover: "#60A5FA", // Blue 400
        primaryActive: "#2563EB", // Blue 600
        primarySoft: "#1E3A8A", // Blue 900
        onPrimary: "#FFFFFF",

        // 30% Cấu trúc (Sidebar, Header)
        secondary: "#1E293B", // Slate 800
        secondaryHover: "#334155", // Slate 700
        secondaryActive: "#475569", // Slate 600
        onSecondary: "#F8FAFC",

        // 60% Không gian học tập ban đêm
        background: "#0F172A", // Slate 900 - Nền tối sâu giảm mỏi mắt tuyệt đối
        card: "#1E293B", // Slate 800 - Block bài học nổi lên
        surface: "#111827", // Gray 900 - Phân vùng phụ sâu hơn
        surfaceSoft: "#1F2937", // Gray 800

        // Chữ bài học ban đêm
        text: "#F8FAFC", // Slate 50 - Trắng sáng rõ để đọc text
        textSoft: "#E2E8F0", // Slate 200
        textMuted: "#94A3B8", // Slate 400

        // Các trạng thái hệ thống (Được tinh chỉnh lại độ sáng cho hợp nền tối)
        border: "#334155",
        error: "#F87171",
        errorHover: "#EF4444",
        errorActive: "#DC2626",
        errorSoft: "#451A1A",
        onError: "#FFFFFF",
        success: "#34D399",
        warning: "#FBBF24",
        focusRing: "#60A5FA",
    },
};
// Thanh Sidebar chứa danh sách bài học: Dùng màu secondary (ở bản Light nó sẽ là màu tối ngầu, giúp cô lập menu điều hướng gọn gàng sang một bên).

// Nền đọc tài liệu / Xem Video: Dùng màu background và bọc nội dung bằng card. Sự chênh lệch giữa #F8FAFC (nền) và #FFFFFF (card) sẽ tạo hiệu ứng thị giác rất "sạch" và cao cấp.

// Nút "Nộp bài" hoặc "Bài học tiếp theo": Ép cứng mã primary. Đảm bảo học viên liếc mắt một cái là thấy nút cần bấm liền.
