const ROLE = {
    "fd4546e4-bf5c-4d4d-8a88-f62a8b43e832": "STUDENT",
    "151a0ceb-af16-4e7f-8d7c-f40f415dfb26": "INSTRUCTOR",
};

export const getRole = (roleId) => {
    if (ROLE[roleId] === "ADMIN") return "Quản lí";
    if (ROLE[roleId] === "INSTRUCTOR") return "Giáo Viên";
    if (ROLE[roleId] === "STUDENT") return "Học sinh";
    return "Khách";
};
