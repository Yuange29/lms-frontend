import CourseInfo from "../components/course/course";
import { CoursesSkeleton } from "../components/loading/CourseItemSkeleton";
import { CreateCourseForm } from "../components/course/createCourseFrom";
import { H } from "../components/ui/Text";
import { Section } from "../components/ui/Secttion";
import { useCourse } from "./../hooks/courseHook";
import { useEffect } from "react";

export default function CourseCreatePage() {
    const { courses, loading, getOwnerCourse } = useCourse();

    useEffect(() => {
        if (!courses) getOwnerCourse();
    }, [courses, getOwnerCourse]);

    return (
        <>
            <Section id={"create-course"}>
                <H>Các khóa học đã tạo</H>
                {loading ? (
                    <CoursesSkeleton />
                ) : (
                    <CourseInfo courses={courses} />
                )}
            </Section>
            <Section id={"create-course"}>
                <H>Tạo khóa học mới</H>

                <CreateCourseForm />
            </Section>
        </>
    );
}
