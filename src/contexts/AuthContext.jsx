import { createContext, useState } from "react";
import { signin, me } from "../services/auth.service";
import { setAccessToken } from "../services/api";
import { useToast } from "./ToastContext.jsx";

const AuthContext = createContext();

function AuthProvider({ children }) {
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
}

export { AuthContext, AuthProvider };
