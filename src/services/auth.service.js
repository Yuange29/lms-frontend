import api from "./api";

export const signin = async (email, password) => {
    const response = await api.post("/auth/signin", { email, password });
    return response.data.accessToken;
};

export const signup = async (email, password, full_name) => {
    const response = await api.post("/auth/signup", {
        email,
        password,
        full_name,
    });
    return response.data;
};

export const me = async () => {
    const response = await api.get("/auth/me");
    return response.data.user;
};
