import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext.js";
import { authService } from "../services/auth.service";
import { clearAccessToken } from "../services/api.js";
import { setAccessToken } from "../services/api.js";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    async function initAuth() {
        setLoading(true);
        try {
            const res = await authService.refresh();
            setAccessToken(res.accessToken);

            const resMe = await authService.me();
            setUser(resMe.user);
        } catch (err) {
            console.log("Error: ", err.message);
            clearAccessToken();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
