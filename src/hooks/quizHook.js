import { QuizContext } from "../contexts/QuizContext";
import { useContext } from "react";

export function useQuiz() {
    const context = useContext(QuizContext);

    if (!context) throw new Error("useQuiz must be use within a quizProvider");

    return context;
}
