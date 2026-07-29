import { ROLENAME, ROLE as roleContants } from "../constants/role.js";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AuthContext } from "./AuthContext.js";
import { authService } from "../services/auth.service";
import { clearAccessToken } from "../services/api.js";
import { setAccessToken } from "../services/api.js";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(null);

    const ROLE = {
        "fd4546e4-bf5c-4d4d-8a88-f62a8b43e832": roleContants.admin,
        "151a0ceb-af16-4e7f-8d7c-f40f415dfb26": roleContants.instructor,
    };

    const canManage = useCallback(() => {
        return role === roleContants.instructor || role === roleContants.admin;
    }, [role]);

    const getRole = (roleId) => {
        if (ROLE[roleId] === roleContants.admin) return ROLENAME.admin;
        if (ROLE[roleId] === roleContants.instructor)
            return ROLENAME.instructor;
        if (ROLE[roleId] === roleContants.student) return ROLENAME.student;
        return "Khách";
    };

    async function initAuth() {
        setLoading(true);
        try {
            const res = await authService.refresh();
            setAccessToken(res.accessToken);

            const resMe = await authService.me();
            setUser(resMe.user);
            setRole(getRole(resMe.user.role_id));
            // console.log(resMe);
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

    const value = useMemo(
        () => ({ user, canManage, setUser, loading, role, setRole }),
        [user, canManage, setUser, loading, role, setRole],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
