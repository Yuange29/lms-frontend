import api from "./api";

export const lessonService = {
    async getLessons(sectionId) {
        const res = await api.get(`/sections/${sectionId}/lessons`);
        return res.data.lessons || res.data.data;
    },

    async createLesson(
        sectionId,
        title,
        content,
        video_url,
        duration,
        is_preview,
    ) {
        const res = await api.post(
            `/sections/${sectionId}/lessons`,
            title,
            content,
            video_url,
            duration,
            is_preview,
        );
        return res.data.lesson || res.data.data;
    },

    async updateLesson(sectionId, lessonId, lessonData) {
        const res = await api.patch(
            `/sections/${sectionId}/lessons/${lessonId}`,
            lessonData,
        );
        return res.data.lesson || res.data.data;
    },

    async deleteLesson(sectionId, lessonId) {
        const res = await api.delete(
            `/sections/${sectionId}/lessons/${lessonId}`,
        );
        return res.data;
    },
};
