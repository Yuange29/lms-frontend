import { LessonContext } from "../contexts/LessonContext";
import { useContext } from "react";

export function useLesson() {
    const context = useContext(LessonContext);

    if (!context) {
        throw new Error("useLesson must be used within an LessonProvider");
    }

    return context;
}
