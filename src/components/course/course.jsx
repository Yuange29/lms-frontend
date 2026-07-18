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
import { Text } from "../ui/Text";
import { navigate } from "./../../utils/navigate";
import { useCourse } from "../../hooks/courseHook";
import { useQuiz } from "./../../hooks/quizHook";

function CoursesInfo({ courses = [] }) {
    const { quizzes } = useQuiz();
    const { course, loadingCourse, getCourseDetail, courseId, setCourseId } =
        useCourse();
    const { getQuizzes } = useQuiz();

    const [open, setOpen] = useState(false);

    const handleClick = useCallback(
        async (courseId) => {
            setOpen(true);
            setCourseId(courseId);

            await getCourseDetail(courseId, true);
            await getQuizzes(courseId);
        },
        [getCourseDetail, getQuizzes, setCourseId],
    );

    const handleClose = useCallback(() => {
        setOpen(false);
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
                    course={course}
                    quiz={quizzes}
                    courseId={courseId}
                    loading={loadingCourse}
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
                <Button
                    variant="secondary"
                    disabled={!courseId}
                    onClick={() => navigate(check)}
                >
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
