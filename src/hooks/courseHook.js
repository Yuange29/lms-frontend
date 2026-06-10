import { CourseContext } from "../contexts/CourseContext";
import { useContext } from "react";

export function useCourse() {
    const context = useContext(CourseContext);

    if (!context) {
        throw new Error("useCourse must be used inside CourseProvider");
    }
    return context;
}
