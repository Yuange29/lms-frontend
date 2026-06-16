import api from "./api";

export const answerService = {
    // Path: /questions/:questionId/answers - Method: POST
    async createAnswer(questionId, answer_text, is_correct = false) {
        const res = await api.post(`/questions/${questionId}/answers`, {
            answer_text,
            is_correct,
        });

        return res.data.data.answer || res.data;
    },

    async updateAnswer(questionId, answerId, payload) {
        const res = await api.patch(
            `/questions/${questionId}/answers/${answerId}`,
            payload,
        );

        return res.data.data.answer || res.data;
    },

    async deleteAnswer(questionId, answerId) {
        const res = await api.delete(
            `/questions/${questionId}/answers/${answerId}`,
        );

        return res.data.data || res.data;
    },
};

export default answerService;
