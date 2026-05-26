export const pageList = [
    {
        label: "Trang chủ",
        paths: "/",
        icon: "fa-solid fa-house",
    },
    {
        label: "Khóa học",
        paths: [
            {
                name: "Khóa học của tôi",
                path: "/my-courses",
            },
            {
                name: "Tìm kiếm",
                path: "/courses/search",
            },
        ],
        icon: "fa-solid fa-graduation-cap",
    },
    {
        label: "Cài đặt",
        paths: [
            {
                name: "Thông tin cá nhân",
                path: "/settings/profile",
            },
            {
                name: "Bảo mật",
                path: "/settings/security",
            },
        ],
        icon: "fa-solid fa-gear",
    },
];
