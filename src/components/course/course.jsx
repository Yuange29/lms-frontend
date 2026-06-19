import {
    CourseDetailMetaItem,
    CourseDetailMetaLabel,
    CourseDetailMetaValue,
} from "./courses-style";
import { memo, useCallback, useState } from "react";

import { CourseCard } from "./CourseCard";
import { CourseInfoDialog } from "./CourseInfoDialog";
import { CoursesWrapper } from "./courses-style";
import { courseService } from "./../../services/course.service";
import { useToast } from "./../../hooks/toastHook";

function CoursesInfo({ courses = [] }) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseInfo, setCourseInfo] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleClick = useCallback(async (courseId) => {
        setOpen(true);
        setSelectedCourse(courseId);
        setCourseInfo(null);
        setLoading(true);

        try {
            const res = await courseService.getCourseInfo(courseId);
            setCourseInfo(res?.course || res);
        } catch (err) {
            toast.error("Không tìm thấy thông tin khóa học.");
            console.log("Error fetching course info:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setSelectedCourse(null);
        setCourseInfo(null);
        setLoading(false);
    }, []);

    return (
        <>
            <CoursesWrapper>
                {Array.isArray(courses) &&
                    courses.map((course) => (
                        <CourseItemMemo
                            key={course.id}
                            course={course}
                            onClick={() => handleClick(course.id)}
                        />
                    ))}
            </CoursesWrapper>

            {open && (
                <CourseInfoDialog
                    course={courseInfo}
                    courseId={selectedCourse}
                    loading={loading}
                    onClose={handleClose}
                />
            )}
        </>
    );
}

export function DetailInfo({ title, desc, children }) {
    return (
        <CourseDetailMetaItem>
            <CourseDetailMetaLabel>
                {title ? title + ":" : null}
            </CourseDetailMetaLabel>
            <CourseDetailMetaValue>{desc ? desc : null}</CourseDetailMetaValue>
            {children}
        </CourseDetailMetaItem>
    );
}

const CourseItemMemo = memo(CourseCard);

export default memo(CoursesInfo);
