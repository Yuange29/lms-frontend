import {
    CourseDetailContainer,
    CourseDetailHeader,
    CourseDetailMeta,
    CourseDetailThumbnail,
} from "../components/course/courses-style";
import { H, Text } from "../components/ui/text";
import { formatDate, formatPrice } from "../utils/format";
import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import CourseItemSkeleton from "../components/loading/CourseItemSkeleton";
import { DetailInfo } from "../components/course/course";
import { Section } from "../components/ui/Secttion";
import { courseService } from "../services/course.service";
import defaultImg from "../assets/defaultImg.png";
import { useCourse } from "./../hooks/courseHook";
import { useToast } from "./../hooks/toastHook";

const getCourseIdFromPath = () => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments[0] !== "course-info") {
        return "";
    }

    return segments.slice(1).join("/");
};

export default function CourseDetailPage() {
    const { toast } = useToast();
    const { getQuiz, quiz } = useCourse();

    const [courseId, setCourseId] = useState(getCourseIdFromPath());
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!courseId) return;

        const fetchCourse = async () => {
            setLoading(true);
            setCourse(null);

            try {
                const res = await courseService.getCourseInfo(courseId);
                await getQuiz(courseId);
                setCourse(res?.course || res);
            } catch (err) {
                toast.error("Không thể tải dữ liệu khóa học!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, toast, getQuiz]);

    useEffect(() => {
        const handleRouteChange = () => {
            setCourseId(getCourseIdFromPath());
        };

        window.addEventListener("popstate", handleRouteChange);
        window.addEventListener("app:navigate", handleRouteChange);

        return () => {
            window.removeEventListener("popstate", handleRouteChange);
            window.removeEventListener("app:navigate", handleRouteChange);
        };
    }, []);

    const totalSections = 0;
    const totalLessons = 0;
    const totalQuizzes = quiz.length | 0;

    return (
        <>
            <Section>
                <H size="h1">Thông tin chi tiết của khóa học</H>
            </Section>
            {!courseId ? (
                toast.error("Đường dẫn bị lỗi!")
            ) : loading ? (
                <CourseItemSkeleton />
            ) : (
                <CourseDetailContainer>
                    <Section id={"course-header"}>
                        <CourseDetailHeader>
                            <div style={{ flex: 1 }}>
                                <H>{course.title}</H>
                                <Text>
                                    {course.description || "Không có mô tả."}
                                </Text>
                            </div>
                            <CourseDetailThumbnail
                                style={{ flex: 1 }}
                                src={course.thumbnail_url || defaultImg}
                                alt={course.title}
                            />
                        </CourseDetailHeader>
                    </Section>

                    <Section id={"basic-info"}>
                        <H size="h3">Thông tin cơ bản</H>
                        <CourseDetailMeta>
                            <DetailInfo title={"ID"} desc={course.id} />
                            <DetailInfo
                                title={"Giá"}
                                desc={formatPrice(course.price)}
                            />
                            <DetailInfo
                                title={"Giáo viên"}
                                desc={course.instructor?.full_name | "-"}
                            />
                            <DetailInfo
                                title={"Trạng thái"}
                                desc={
                                    course.published
                                        ? "Đã publish"
                                        : "Chưa publish"
                                }
                            />
                            <DetailInfo
                                title={"Ngày tạo"}
                                desc={formatDate(course.created_at)}
                            />
                            <DetailInfo
                                title={"Ngày cập nhật"}
                                desc={formatDate(course.updated_at)}
                            />
                        </CourseDetailMeta>
                    </Section>

                    <Section id={"course-sections"}>
                        <H size="h3">Thông tin khóa học</H>

                        <CourseDetailMeta>
                            <DetailInfo
                                title={"Số chương"}
                                desc={totalSections}
                            />
                            <DetailInfo>
                                <Button
                                    size="sm"
                                    navigate={
                                        courseId
                                            ? `/course-info/${courseId}/quiz`
                                            : undefined
                                    }
                                    disabled={!courseId}
                                >
                                    Tạo Quiz
                                </Button>
                            </DetailInfo>
                            <DetailInfo
                                title={"Số bài học"}
                                desc={totalLessons}
                            />
                            <DetailInfo>
                                <Button
                                    size="sm"
                                    navigate={
                                        courseId
                                            ? `/course-info/${courseId}/quiz`
                                            : undefined
                                    }
                                    disabled={!courseId}
                                >
                                    Tạo Quiz
                                </Button>
                            </DetailInfo>
                            <DetailInfo title={"Số quiz"} desc={totalQuizzes} />

                            <DetailInfo>
                                <Button
                                    size="sm"
                                    navigate={
                                        courseId
                                            ? `/course-info/${courseId}/quiz`
                                            : undefined
                                    }
                                    disabled={!courseId}
                                >
                                    Tạo Quiz
                                </Button>
                            </DetailInfo>
                        </CourseDetailMeta>
                    </Section>
                </CourseDetailContainer>
            )}
        </>
    );
}
