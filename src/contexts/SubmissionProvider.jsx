import { useMemo, useState } from "react";

import { SubmissionContext } from "./SubmissionContext";
import { submissionService } from "../services/submission.service";
import { useCallback } from "react";
import { useToast } from "../hooks/toastHook";

export const SubmissionProvider = ({ children }) => {
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [submission, setSubmission] = useState(null);

    const getSubmission = useCallback(
        async (quizId) => {
            if (!quizId) return;

            setLoading(true);
            try {
                const res = await submissionService.getDetailSubmission(quizId);
                setSubmission(res);
            } catch (error) {
                const message = error.response.data.message.message;
                if (message === "Submission not found") {
                    setSubmission(null);
                } else {
                    toast.error("Có lỗi xảy ra!");
                    console.error("fetch quiz: ", error);
                }
            } finally {
                setLoading(false);
            }
        },
        [toast],
    );

    const value = useMemo(
        () => ({ loading, submission, getSubmission, setSubmission }),
        [loading, submission, getSubmission],
    );

    return (
        <SubmissionContext.Provider value={value}>
            {children}
        </SubmissionContext.Provider>
    );
};
