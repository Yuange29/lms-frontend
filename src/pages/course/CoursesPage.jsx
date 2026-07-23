import CoursesDisplay from "./components/CoursesDisplay";
import { CoursesSkeleton } from "./components/CourseLoading";
import { H } from "../../components/ui/Text";
import { LoadingLine } from "../../components/loading/loading-style";
import { Section } from "../../components/ui/Section";
import { useAuth } from "../../hooks/authHook";
import { useCourse } from "../../hooks/courseHook";
import { useEffect } from "react";

export default function Course() {
    const { role, loading: auth } = useAuth();
    const { courses, loading, getOwnerCourses } = useCourse();

    useEffect(() => {
        const fetchCourses = async () => await getOwnerCourses();
        fetchCourses();
    }, [getOwnerCourses, role]);

    return (
        <>
            <Section>
                <H size="h1">Khóa học</H>
            </Section>

            <Section>
                {loading || auth ? (
                    <>
                        <LoadingLine $width="50%" />
                        <CoursesSkeleton />
                    </>
                ) : (
                    <>
                        <H>
                            Các khóa học
                            {role === "Giáo Viên" ? " đã tạo" : " đã tham gia"}
                        </H>
                        <CoursesDisplay courses={courses} />
                    </>
                )}
            </Section>
        </>
    );
}
