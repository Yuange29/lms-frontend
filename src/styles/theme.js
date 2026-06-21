export const lightTheme = {
    colors: {
        // 10% Điểm nhấn (Nút hành động chính, CTA, Tiến độ)
        primary: "#1E40AF", // Xanh dương đậm chuyên nghiệp, uy tín
        primaryHover: "#1D4ED8", // Sáng hơn một chút khi hover
        primaryActive: "#1E3A8A", // Đậm lại khi click
        primarySoft: "#EFF6FF", // Nền text highlight hoặc badge nhẹ
        onPrimary: "#FFFFFF", // Chữ trên nền primary phải là trắng tinh để dễ đọc

        // 30% Cấu trúc (Sidebar, Header, Menu điều hướng)
        secondary: "#0F172A", // Slate 900 - tạo khối điều hướng cực rõ ràng
        secondaryHover: "#1E293B", // Slate 800
        secondaryActive: "#334155", // Slate 700
        onSecondary: "#F8FAFC", // Chữ trên menu điều hướng

        // 60% Không gian học tập (Nền web, Khung bài học, Khung tài liệu)
        background: "#F8FAFC", // Slate 50 - Nền web dịu mắt, không bị chói như trắng tinh
        card: "#F4F4F4", // Trắng tinh để các block bài học nổi lên trên nền background
        surface: "#E2E8F0", // Slate 200
        surfaceSoft: "#F1F5F9", // Slate 100 - Dùng cho các phân vùng phụ

        // Chữ và nội dung bài học
        text: "#0F172A", // Slate 900 - Chữ chính đọc sách, làm quiz
        textSoft: "#334155", // Slate 700 - Chữ mô tả ngắn, thông tin phụ
        textMuted: "#64748B", // Slate 500 - Subtitle, ngày tháng

        // Các trạng thái hệ thống
        border: "#E2E8F0", // Đường kẻ phân chia các bài học
        error: "#EF4444", // Đỏ - Khi làm sai quiz, rớt môn
        errorHover: "#DC2626",
        errorActive: "#B91C1C",
        errorSoft: "#FEE2E2",
        onError: "#FFFFFF",
        success: "#10B981", // Xanh lá - Khi hoàn thành bài học, qua môn
        warning: "#F59E0B", // Cam - Cảnh báo deadline, bài tập sắp hạn
        focusRing: "#3B82F6", // Viền khi tab bằng bàn phím
    },
};

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
