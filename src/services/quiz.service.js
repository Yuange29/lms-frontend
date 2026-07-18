import api from "./api";

export const quizService = {
    // Path: /courses/:courseId/quizzes - Method: POST
    // Create a quiz under a course
    async createQuiz(courseId, title, description, time_limit) {
        const res = await api.post(`/courses/${courseId}/quizzes`, {
            title,
            description,
            time_limit,
        });

        return res.data.data.quiz;
    },

    // Path: /courses/:courseId/quizzes - Method: GET
    async getQuizzes(courseId, params) {
        if (!courseId || courseId.includes("/quiz")) return [];
        const res = await api.get(`/courses/${courseId}/quizzes`, { params });
        return res.data?.data?.quizzes || res.data;
    },

    // Path: /courses/:courseId/quizzes/:quizId - Method: GET
    async getQuiz(courseId, quizId) {
        const res = await api.get(`/courses/${courseId}/quizzes/${quizId}`);
        return res.data?.data?.quiz || res.data;
    },
};

export default quizService;
