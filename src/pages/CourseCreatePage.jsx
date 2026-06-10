import { CreateCourseForm } from "../components/course/createCourseFrom";
import { H } from "../components/ui/Text";
import { Section } from "../components/ui/Secttion";
import { useCourse } from "./../hooks/courseHook";
import { useEffect } from "react";

export default function CourseCreatePage() {
    const { courses, getOwnerCourse } = useCourse();

    useEffect(() => {
        getOwnerCourse();
    }, []);

    console.log(courses);

    return (
        <>
            <Section id={"create-course"}>
                <H>Các khóa học đã tạo</H>
            </Section>
            <Section id={"create-course"}>
                <H>Tạo khóa học mới</H>

                <CreateCourseForm />
            </Section>
        </>
    );
}
