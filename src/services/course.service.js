import api from "./api";

export const courseService = {
    // Path: /courses - Method: GET
    // Description: Lấy danh sách courses đã publish (paging)
    // Query params: page, limit
    // Request body: none
    // Response 200: { courses: [ { id, title, price, thumbnail_url, created_at, instructor: { id, full_name, avatar_url } } ] }
    // Error: 401
    async getAllCourse() {
        const res = await api.get("/courses");
        return res.data.data;
    },

    // Path: /courses/my - Method: GET
    // Description: Instructor lấy course của mình
    // Request body: none
    // Response 200: { courses: [...] }
    // Error: 401, 403
    async getMyCourse() {
        const res = await api.get("/courses/my");
        return res.data.data.courses || res.data.data;
    },

    // Path: /courses/:id - Method: GET
    // Description: Lấy chi tiết course (nội dung, sections, lessons). Nếu chưa publish kiểm tra role/owner.
    // Request body: none
    // Response 200: { course: { id, title, description, published, instructor, sections: [ ... ] } }
    // Error: 401, 403, 404
    async getCourseInfo(courseId) {
        const res = await api.get(`/courses/${courseId}`);
        return res.data.data.course || res.data;
    },

    // Path: /courses - Method: POST
    // Description: Tạo course (instructor)
    // Request body: CreateCourseDto { title, description, thumbnail_url?, price }
    // Response 200: { course }
    // Error: 400, 401, 403
    async createCourse(title, description, thumbnail_url, price) {
        await api.post(`/courses`, {
            title,
            description,
            thumbnail_url,
            price,
        });
    },

    // Path: /courses/:id - Method: PATCH
    // Description: Cập nhật course (owner/instructor)
    // Request body: UpdateCourseDto { title?, description?, thumbnail_url?, price? }
    // Response 200: { course }
    // Error: 400, 401, 403, 404
    async updateCourse(courseId, title, description, thumbnail_url, price) {
        const res = await api.patch(
            `/courses/${courseId}`,
            title,
            description,
            thumbnail_url,
            price,
        );
        return res.data.data;
    },

    // Path: /courses/:id/publish - Method: PATCH
    // Description: Toggle publish course (owner/admin)
    // Request body: none
    // Response 200: { course }
    // Error: 401, 403, 404
    async publishCourse(courseId) {
        const res = await api.patch(`/courses/${courseId}/publish`);
        return res.data.data;
    },

    // Path: /courses/:id - Method: DELETE

    // Description: Xóa course (owner/admin). Từ chối nếu có enrollments
    // Request body: none
    // Response 200: { course } (deleted)
    // Error: 400 (has enrollments), 401, 403, 404
    async deleteCourse(courseId) {
        const res = await api.delete(`/courses/${courseId}`);
        return res.data.data;
    },
};
