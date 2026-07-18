import { useCallback, useMemo, useState } from "react";

import { LessonContext } from "./LessonContext";
import { lessonService } from "../services/lesson.service";
import { useToast } from "../hooks/toastHook";

export const LessonProvider = ({ children }) => {
    const { toast } = useToast();

    const [selectedSection, setSelectedSection] = useState(null);
    const [lessonId, setLessonId] = useState("");
    const [loading, setLoading] = useState(false);

    const createLesson = useCallback(
        async (sectionId, title, content, video_url, duration, is_preview) => {
            setLoading(true);
            try {
                await lessonService.createLesson(
                    sectionId,
                    title,
                    content,
                    video_url,
                    duration,
                    is_preview,
                );
                toast.success("Tạo thành công");
            } catch (error) {
                toast.error("Thêm khóa học thất bại");
                console.log("Add Lesson error: ", error);
            } finally {
                setLoading(false);
            }
        },
        [toast],
    );

    const value = useMemo(
        () => ({
            selectedSection,
            lessonId,
            loading,
            setLessonId,
            setSelectedSection,
            createLesson,
        }),
        [selectedSection, lessonId, loading, setLessonId, createLesson],
    );
    return (
        <LessonContext.Provider value={value}>
            {children}
        </LessonContext.Provider>
    );
};
