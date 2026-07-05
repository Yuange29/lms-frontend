import { useCallback, useMemo, useState } from "react";

import { CourseContext } from "./CourseContext";
import { courseService } from "../services/course.service";
import { useAuth } from "../hooks/authHook";
import { useToast } from "./../hooks/toastHook";

export const CourseProvider = ({ children }) => {
    const { toast } = useToast();
    const { role } = useAuth();

    const [loading, setLoading] = useState(false);
    const [loadingCourse, setLoadingCourse] = useState(false);
    const [courseId, setCourseId] = useState("");
    const [course, setCourse] = useState(null | {});
    const [courses, setCourses] = useState(null | []);

    const getCourseDetail = useCallback(
        async (courseId) => {
            if (courseId.trim() === "" || undefined || !courseId) return;

            setLoadingCourse(true);
            try {
                setCourse(await courseService.getCourseInfo(courseId));
            } catch (error) {
                toast.error("Không thể lấy thông tin khóa học");
                console.error("Course Provider:", error);
            } finally {
                setLoadingCourse(false);
            }
        },
        [toast],
    );

    const getOwnerCourses = useCallback(async () => {
        setLoading(true);
        try {
            if (role === "Giáo Viên")
                setCourses(await courseService.getMyCourse());
            if (role === "Học Sinh")
                setCourses(await courseService.getMyCourse());
        } catch (error) {
            toast.error("Không thể lấy các khóa học của bạn");
            console.log("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    }, [toast, role]);

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

                getOwnerCourses();
            } catch (error) {
                toast.error("Tạo khóa học thất bại.");
                console.log("Error creating course:", error);
            } finally {
                setLoading(false);
            }
        },
        [toast, getOwnerCourses],
    );

    // VALUE MANAGER
    const value = useMemo(
        () => ({
            course,
            courses,
            loading,
            loadingCourse,
            courseId,
            setCourseId,
            setCourse,
            setCourses,
            getOwnerCourses,
            createCourse,
            getCourseDetail,
        }),
        [
            course,
            courses,
            loading,
            loadingCourse,
            courseId,
            createCourse,
            getOwnerCourses,
            getCourseDetail,
        ],
    );

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};
