import CourseInfo from "../components/course/course";
import { CoursesSkeleton } from "../components/loading/CourseItemSkeleton";
import { H } from "../components/ui/text";
import { LoadingLine } from "../components/loading/loading-style";
import { Section } from "../components/ui/Secttion";
import { useAuth } from "./../hooks/authHook";
import { useCourse } from "../hooks/courseHook";
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
                        <CourseInfo courses={courses} />
                    </>
                )}
            </Section>
        </>
    );
}
