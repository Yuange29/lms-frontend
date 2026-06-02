import api from "./api";

export const userService = {
    async getAllUser() {
        const res = await api.get("/users/all");
        return res.data.data;
        // [{ id, email, full_name, role, avatar_url },...]
    },

    async getUserInfo(userId) {
        const res = await api.get(`/users/${userId}`);
        return res.data.data;
        // { id, email, full_name, avatar_url, role }
    },

    async updateUser(userId, password, full_name, avatar_url) {
        const res = await api.patch(`/users/${userId}`, {
            password,
            full_name,
            avatar_url,
        });
        return res.data.data;
        // { id, email, full_name, avatar_url, role }
    },

    async deleteUser(userId) {
        const res = await api.delete(`/users/${userId}`);
        return res.data.data;
        // { success: true }
    },

    async changePassword(userId) {
        const res = await api.patch(`/users/change-password/${userId}`);
        return res.data.data;
        // { success: true }
    },

    async updateRolebyAdmin(userId) {
        const res = await api.patch(`/users/change-role/${userId}`);
        return res.data.data;
        // updated user
    },
};
