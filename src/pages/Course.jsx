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
    const { courses, loading, getOwnerCourse } = useCourse();

    useEffect(() => {
        if (!courses && role === "Giáo Viên") getOwnerCourse();
        else {
            // func get own student course
        }
    }, [courses, getOwnerCourse, role]);

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
