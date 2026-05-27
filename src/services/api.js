import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let accessToken = null;
let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
}

export function setAccessToken(token) {
    accessToken = token;

    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
}

export function clearAccessToken() {
    accessToken = null;
    delete api.defaults.headers.common.Authorization;
}

export function getAccessToken() {
    return accessToken;
}

async function refreshAccessToken() {
    const res = await authApi.post("/auth/refresh");

    const newAccessToken = res.data?.accessToken;

    if (!newAccessToken) {
        throw new Error("Refresh response missing accessToken");
    }

    setAccessToken(newAccessToken);

    return newAccessToken;
}

api.interceptors.request.use(
    (config) => {
        if (!config.headers) {
            config.headers = {};
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!error.response || !originalRequest) {
            return Promise.reject(error);
        }

        const status = error.response.status;

        const isAuthRoute =
            originalRequest.url?.includes("/auth/sigin") ||
            originalRequest.url?.includes("/auth/signup") ||
            originalRequest.url?.includes("/auth/refresh") ||
            originalRequest.url?.includes("/auth/logout");

        if (status === 401 && !originalRequest._retry && !isAuthRoute) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((newAccessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                });
            }

            isRefreshing = true;

            try {
                const newAccessToken = await refreshAccessToken();

                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                clearAccessToken();

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default api;
