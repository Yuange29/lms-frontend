import { ToastContext } from "../contexts/ToastContext";
import { useContext } from "react";

export function useToast() {
    const context = useContext(ToastContext);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");

    return context;
}
