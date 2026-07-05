import api from "./api";

export const sectionService = {
    async createSection(courseId, title) {
        const res = await api.post(`/courses/${courseId}/sections`, { title });
        return res.data.section || res.data.data;
    },

    async getSection(courseId, sectionId) {
        const res = await api.get(`/courses/${courseId}/sections/${sectionId}`);
        return res.data.section || res.data.data;
    },

    async updateSection(courseId, sectionId, title) {
        const res = await api.patch(
            `/courses/${courseId}/sections/${sectionId}`,
            { title },
        );
        return res.data.section || res.data.data;
    },

    async deleteSection(courseId, sectionId) {
        const res = await api.delete(
            `/courses/${courseId}/sections/${sectionId}`,
        );
        return res.data;
    },
};
