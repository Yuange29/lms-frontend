import CourseInfo from "../components/course/course";
import { CoursesSkeleton } from "../components/loading/CourseItemSkeleton";
import { CreateCourseForm } from "../components/course/createCourseFrom";
import { H } from "../components/ui/Text";
import { LoadingLine } from "../components/loading/loading-style";
import { Section } from "../components/ui/Secttion";
import { useAuth } from "./../hooks/authHook";
import { useCourse } from "./../hooks/courseHook";
import { useEffect } from "react";

export default function CourseCreatePage() {
    const { loading: auth } = useAuth();
    const { courses, loading, getOwnerCourse } = useCourse();

    useEffect(() => {
        if (!courses) getOwnerCourse();
    }, [courses, getOwnerCourse]);

    return (
        <>
            <Section id={"create-course"}>
                {loading || auth ? (
                    <>
                        <LoadingLine $width="300px" />
                        <CoursesSkeleton />
                    </>
                ) : (
                    <>
                        <H>Các khóa học đã tạo</H>
                        <CourseInfo courses={courses} />
                    </>
                )}
            </Section>
            <Section id={"create-course"}>
                <H>Tạo khóa học mới</H>

                <CreateCourseForm />
            </Section>
        </>
    );
}
