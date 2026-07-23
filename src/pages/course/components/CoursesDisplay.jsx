import { memo, useCallback, useState } from "react";

import { CourseCard } from "./CourseCard";
import { CourseInfoDialog } from "./CourseInfoDialog";
import { CoursesWrapper } from "../course.style";
import { useCourse } from "../../../hooks/courseHook";
import { useQuiz } from "../../../hooks/quizHook";

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

const CourseItemMemo = memo(CourseCard);

export default memo(CoursesInfo);
