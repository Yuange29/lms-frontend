import { useCallback, useMemo, useState } from "react";

import { EnrollContext } from "./EnrollContext";
import { enrollService } from "../services/enroll.service";
import { useToast } from "../hooks/toastHook";

export const EnrollProvider = ({ children }) => {
    const { toast } = useToast();

    const [loadingEnrollers, setLoadingEnrollers] = useState(false);

    const getEnrollers = useCallback(
        async (courseId) => {
            setLoadingEnrollers(true);
            try {
                const res = await enrollService.getEnrollers(courseId);
                return res;
            } catch (error) {
                toast.success("Lấy danh sách học viên thất bại!");
                console.error("get Enrollers fail: ", error);
            } finally {
                setLoadingEnrollers(false);
            }
        },
        [toast],
    );

    const value = useMemo(
        () => ({ loadingEnrollers, getEnrollers }),
        [loadingEnrollers, getEnrollers],
    );

    return (
        <EnrollContext.Provider value={value}>
            {children}
        </EnrollContext.Provider>
    );
};
