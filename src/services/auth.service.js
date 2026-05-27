import api from "./api";

export const authService = {
    async signin(email, password) {
        const res = await api.post("/auth/signin", { email, password });
        return res.data.data;
    },
    async signup(email, password, full_name, avatar_url) {
        const res = await api.post("/auth/signup", {
            email,
            password,
            full_name,
            avatar_url,
        });
        return res.data.data;
    },

    async refresh() {
        const res = await api.post("/auth/refresh");
        return res.data.data;
    },

    async me() {
        const res = await api.get("/auth/me");
        return res.data.data;
    },

    async signout() {
        await api.post("/auth/signout");
    },
};
