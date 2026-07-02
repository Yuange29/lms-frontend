import { useMemo, useState } from "react";

import { QuizContext } from "./QuizContext";
import quizService from "../services/quiz.service";
import { useCallback } from "react";
import { useToast } from "../hooks/toastHook";

export const QuizProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);
    const [quizzes, setQuizzes] = useState(null);
    const [quizId, setQuizId] = useState("");

    const { toast } = useToast();

    const getQuizzes = useCallback(
        async (courseId) => {
            if (!courseId) return;

            setLoading(true);
            try {
                const res = await quizService.getQuizzes(courseId);
                setQuizzes(res);
            } catch (error) {
                toast.error("Lấy quiz thất bại!");
                console.error("fetch quiz: ", error);
            } finally {
                setLoading(false);
            }
        },
        [toast],
    );

    const value = useMemo(
        () => ({
            quizzes,
            quiz,
            quizId,
            loading,
            setQuiz,
            setQuizzes,
            setQuizId,
            getQuizzes,
        }),
        [quizzes, quiz, quizId, loading, getQuizzes],
    );

    return (
        <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
    );
};
