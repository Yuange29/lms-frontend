import {
    AddInfoCardWrapper,
    CourseDetailMetaItem,
    CourseDetailMetaLabel,
    CourseDetailMetaValue,
} from "./courses-style";
import { memo, useCallback, useState } from "react";

import Button from "../ui/Button";
import { CourseCard } from "./CourseCard";
import { CourseInfoDialog } from "./CourseInfoDialog";
import { CoursesWrapper } from "./courses-style";
import { InfoCardWrapper } from "./courses-style";
import { Text } from "../ui/text";
import { courseService } from "./../../services/course.service";
import { navigate } from "./../../utils/navigate";
import { useCourse } from "../../hooks/courseHook";
import { useToast } from "./../../hooks/toastHook";

function CoursesInfo({ courses = [] }) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseInfo, setCourseInfo] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { quiz, getQuiz } = useCourse();
    const { toast } = useToast();

    const handleClick = useCallback(async (courseId) => {
        setOpen(true);
        setSelectedCourse(courseId);
        setCourseInfo(null);
        setLoading(true);

        try {
            const res = await courseService.getCourseInfo(courseId);
            setCourseInfo(res?.course || res);

            await getQuiz(courseId);
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
                    quiz={quiz}
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

// use in CourseDetailPage
export function InfomationCard({ label, content, size, spacing = true }) {
    return (
        <InfoCardWrapper>
            <Text color="muted">{label}</Text>
            <div
                className="indent"
                style={{ textAlign: spacing ? "end" : "inherit" }}
            >
                <Text weight="bold" size={size || "md"}>
                    {content || "***"}
                </Text>
            </div>
        </InfoCardWrapper>
    );
}

export function AddInfoCard({ label, content, add, check, courseId }) {
    return (
        <AddInfoCardWrapper>
            <div className="text-group">
                <Text color="muted">{label}</Text>
                <Text weight="bold">{content | "***"}</Text>
            </div>
            <div className="btn-group">
                <Button disabled={!courseId} onClick={() => navigate(check)}>
                    Xem
                </Button>
                <Button disabled={!courseId} onClick={() => navigate(add)}>
                    Thêm
                </Button>
            </div>
        </AddInfoCardWrapper>
    );
}

const CourseItemMemo = memo(CourseCard);

export default memo(CoursesInfo);
