import { me, signin } from "../services/auth.service.js";

import { AuthContext } from "./AuthContext.js";
import { setAccessToken } from "../services/api.js";
import { useState } from "react";
import { useToast } from "./ToastContext.jsx";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const { toast } = useToast();

    const handleLogin = async (data) => {
        try {
            const response = await signin(data.email, data.password);
            setAccessToken(response.accessToken);

            const userData = await me();
            setUser(userData);
        } catch (error) {
            toast.error("Đăng nhập thất bại");
            console.error("Login error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
