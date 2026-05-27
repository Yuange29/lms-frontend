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
let refreshSubscribers = [];

function onRefreshed(token) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

function addRefreshSubscriber(cb) {
    refreshSubscribers.push(cb);
}

async function refreshAccessToken() {
    try {
        const resp = await authApi.post("/auth/refresh");
        const token = resp?.data?.accessToken;
        if (token) {
            accessToken = token;
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        return token;
    } catch (err) {
        accessToken = null;
        delete api.defaults.headers.common.Authorization;
        throw err;
    }
}

api.interceptors.request.use(
    async (config) => {
        if (!config.headers) config.headers = {};

        if (config.url && config.url.includes("/auth/refresh")) return config;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        }

        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const token = await refreshAccessToken();
                onRefreshed(token);
            } catch (err) {
                onRefreshed(null);
                isRefreshing = false;
                throw err;
            }
            isRefreshing = false;
        }

        return new Promise((resolve, reject) => {
            addRefreshSubscriber((token) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                    resolve(config);
                } else {
                    reject(new Error("Unable to refresh access token"));
                }
            });
        });
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const token = await refreshAccessToken();
                if (token) {
                    originalRequest.headers = originalRequest.headers || {};
                    api.defaults.headers.common.Authorization = `Bearer ${token}`;
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    },
);

function setAccessToken(token) {
    accessToken = token;
    if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete api.defaults.headers.common.Authorization;
}

function clearAccessToken() {
    accessToken = null;
    delete api.defaults.headers.common.Authorization;
}

function getAccessToken() {
    return accessToken;
}

export { setAccessToken, clearAccessToken, getAccessToken };
export default api;
