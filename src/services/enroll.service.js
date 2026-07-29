import api from "./api";

export const enrollService = {
    // join course
    async enrollCourser(courseId) {
        const res = await api.post(`/enrollments/${courseId}`);
        return res.data.data || res.data; // { id, user_id, course_id, enrolled_at }
    },

    //get enrollers
    async getEnrollers(courseId) {
        const res = await api.get(`/enrollments/course/${courseId}`);
        return res.data.data || res.data; //[ { user info, enrolled_at } ]
    },

    // Hủy enroll
    async setEnrollStatus(enrollId) {
        const res = await api.patch(`/enrollments/${enrollId}/status`);
        return res.data.data || res.data; //{ success: true }
    },
};

// - Path: /enrollments/my - Method: GET
//     - Description: Danh sách courses đã enroll của học viên
//     - Request body: none
//     - Response 200: [ { enrollment objects with course info } ]
//     - Error: 401
