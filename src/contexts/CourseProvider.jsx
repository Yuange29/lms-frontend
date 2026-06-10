import { useCallback, useMemo, useState } from "react";

import { CourseContext } from "./CourseContext";
import { courseService } from "../services/course.service";
import { useToast } from "./../hooks/toastHook";

export const CourseProvider = ({ children }) => {
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    const getOwnerCourse = useCallback(async () => {
        setLoading(true);
        try {
            const res = await courseService.getMyCourse();
            setCourses(res.courses);
        } catch (error) {
            toast.error("Không thể lấy các course của bạn");
            console.log("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    }, [toast]);

    const createCourse = useCallback(
        async (title, description, thumbnail_url, price) => {
            setLoading(true);
            try {
                await courseService.createCourse(
                    title,
                    description,
                    thumbnail_url,
                    price,
                );

                toast.success("Khóa học đã được tạo thành công!");

                getOwnerCourse();
            } catch (error) {
                toast.error("Tạo khóa học thất bại.");
                console.log("Error creating course:", error);
            } finally {
                setLoading(false);
            }
        },
        [toast, getOwnerCourse],
    );

    const value = useMemo(
        () => ({
            courses,
            getOwnerCourse,
            createCourse,
            loading,
        }),
        [courses, loading, getOwnerCourse, createCourse],
    );

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};
