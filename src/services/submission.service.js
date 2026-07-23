import api from "../services/api";

export const submissionService = {
    async submit(quizId, answers) {
        const res = await api.post(`/submissions/${quizId}`, { answers });
        return res.data.data || res.data;
    },

    async getDetailSubmission(quizId) {
        const res = await api.get(`/submissions/${quizId}/my`);
        return res.data.data || res.data;
    },
};
