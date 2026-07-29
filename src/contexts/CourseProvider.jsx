import { useCallback, useMemo, useState } from "react";

import { CourseContext } from "./CourseContext";
import { courseService } from "../services/course.service";
import { navigateBack } from "../utils/navigate";
import { useAuth } from "../hooks/authHook";
import { useConfirm } from "../hooks/confirmHook";
import { useToast } from "./../hooks/toastHook";

export const CourseProvider = ({ children }) => {
    const { toast } = useToast();
    const { role } = useAuth();
    const { confirm } = useConfirm();

    const [loading, setLoading] = useState(false);
    const [loadingCourse, setLoadingCourse] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

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

    const publishCourse = useCallback(
        async (courseId) => {
            const isOk = await confirm({
                title: "Đăng khóa học",
                content: `Bạn chắc chắn muốn ${course?.published ? "hủy đăng" : "đăng"} khóa học này chứ`,
                confirmText: `${!course?.published ? "Đăng" : "Gỡ"}`,
                cancelText: `Hủy`,
            });

            if (!isOk) return;

            setLoadingPublish(true);

            try {
                await courseService.publishCourse(courseId);
                toast.success("Cập nhật trạng thái thành công");
                getCourseDetail(courseId);
            } catch (error) {
                toast.error("Cập nhật trạng thái thất bại");
                console.error("Publish Course Error: ", error);
            } finally {
                setLoadingPublish(false);
            }
        },
        [toast, course?.published, getCourseDetail, confirm],
    );

    const removeCourse = useCallback(
        async (courseId) => {
            const isOk = await confirm({
                title: "Xóa khóa học",
                content: "Bạn chắc chắn muốn xóa khóa học này chứ",
                confirmText: "Chắc chắn",
                cancelText: "Hủy",
            });

            if (!isOk) return;

            setLoadingDelete(true);
            try {
                await courseService.deleteCourse(courseId);

                toast.success("Xóa thành công");
                navigateBack();

                setCourses((prev) =>
                    prev ? prev.filter((i) => i.id != courseId) : prev,
                );
            } catch (error) {
                toast.error("Xóa thất bại");
                console.error("Delete Course Error: ", error);
            } finally {
                setLoadingDelete(false);
            }
        },
        [toast, setCourses, confirm],
    );

    // VALUE MANAGER
    const value = useMemo(
        () => ({
            course,
            courses,
            loading,
            loadingCourse,
            loadingPublish,
            loadingDelete,
            courseId,
            setCourseId,
            setCourse,
            setCourses,
            createCourse,
            getOwnerCourses,
            getCourseDetail,
            publishCourse,
            removeCourse,
        }),
        [
            course,
            courses,
            loading,
            loadingCourse,
            loadingPublish,
            loadingDelete,
            courseId,
            createCourse,
            getOwnerCourses,
            getCourseDetail,
            publishCourse,
            removeCourse,
        ],
    );

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};
