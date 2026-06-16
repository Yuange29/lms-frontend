import api from "./api";

export const questionService = {
    // Path: /quizzes/:quizId/questions - Method: POST
    // Create a question under a quiz
    async createQuestion(quizId, question_text, type = "single-choice") {
        const res = await api.post(`/quizzes/${quizId}/questions`, {
            question_text,
            type,
        });
        return res.data.data.question || res.data;
    },

    // GET questions for quiz
    async getQuestions(quizId) {
        const res = await api.get(`/quizzes/${quizId}/questions`);
        return res.data.data;
    },
};

export default questionService;
