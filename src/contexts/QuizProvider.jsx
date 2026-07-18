import { useMemo, useState } from "react";

import { QuizContext } from "./QuizContext";
import quizService from "../services/quiz.service";
import { useCallback } from "react";
import { useToast } from "../hooks/toastHook";

export const QuizProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [loadingQuiz, setLoadingQuiz] = useState(false);
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

    const getQuiz = useCallback(
        async (courseId, quizId) => {
            if (!courseId || !quizId) return;

            setLoadingQuiz(true);
            try {
                const res = await quizService.getQuiz(courseId, quizId);
                setQuiz(res);
            } catch (error) {
                toast.error("Lấy quiz thất bại!");
                console.error("fetch quiz: ", error);
            } finally {
                setLoadingQuiz(false);
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
            loadingQuiz,
            setQuiz,
            setQuizzes,
            setQuizId,
            getQuiz,
            getQuizzes,
        }),
        [quizzes, quiz, quizId, loading, loadingQuiz, getQuizzes, getQuiz],
    );

    return (
        <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
    );
};
