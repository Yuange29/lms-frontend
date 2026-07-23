import { SubmissionContext } from "../contexts/SubmissionContext";
import { useContext } from "react";

export function useSubmisson() {
    const context = useContext(SubmissionContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
