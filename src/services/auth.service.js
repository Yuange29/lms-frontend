import api from "./api";

export const signin = async (email, password) => {
    const response = await api.post("/auth/signin", { email, password });
    return response.data.accessToken;
};

export const me = async () => {
    const response = await api.get("/auth/me");
    return response.data.user;
};
