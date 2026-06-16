import {
    CourseDetailContainer,
    CourseDetailHeader,
    CourseDetailMeta,
    CourseDetailMetaItem,
    CourseDetailMetaLabel,
    CourseDetailMetaValue,
    CourseDetailRow,
    CourseDetailSection,
    CourseDetailSectionHeader,
    CourseDetailSectionItem,
    CourseDetailSectionList,
    CourseDetailSectionSubtitle,
    CourseDetailSectionTitle,
    CourseDetailStatus,
    CourseDetailThumbnail,
} from "../components/course/courses-style";
import { H, Text } from "../components/ui/text";
import { formatDate, formatPrice } from "../utils/getDay";
import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import CourseItemSkeleton from "../components/loading/CourseItemSkeleton";
import { Section } from "../components/ui/Secttion";
import { courseService } from "../services/course.service";
import quizService from "../services/quiz.service";
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
        <Section>
            <H>Thông tin chi tiết của khóa học</H>

            {!courseId ? (
                toast.error("Đường dẫn bị lỗi!")
            ) : loading ? (
                <CourseItemSkeleton />
            ) : (
                <CourseDetailContainer>
                    <CourseDetailHeader>
                        <div>
                            <H>{course.title}</H>
                            <Text>
                                {course.description || "Không có mô tả."}
                            </Text>
                        </div>
                        <CourseDetailThumbnail
                            src={course.thumbnail_url || null}
                            alt={course.title}
                        />
                    </CourseDetailHeader>

                    <CourseDetailMeta>
                        <CourseDetailMetaItem>
                            <CourseDetailMetaLabel>ID</CourseDetailMetaLabel>
                            <CourseDetailMetaValue>
                                {course.id}
                            </CourseDetailMetaValue>
                        </CourseDetailMetaItem>
                        <CourseDetailMetaItem>
                            <CourseDetailMetaLabel>Giá</CourseDetailMetaLabel>
                            <CourseDetailMetaValue>
                                {formatPrice(course.price)}
                            </CourseDetailMetaValue>
                        </CourseDetailMetaItem>
                        <CourseDetailMetaItem>
                            <CourseDetailMetaLabel>
                                Giảng viên
                            </CourseDetailMetaLabel>
                            <CourseDetailMetaValue>
                                {course.instructor?.full_name || "-"}
                            </CourseDetailMetaValue>
                        </CourseDetailMetaItem>
                        <CourseDetailMetaItem>
                            <CourseDetailMetaLabel>
                                Trạng thái
                            </CourseDetailMetaLabel>
                            <CourseDetailMetaValue>
                                <CourseDetailStatus
                                    published={course.published}
                                >
                                    {course.published
                                        ? "Đã publish"
                                        : "Chưa publish"}
                                </CourseDetailStatus>
                            </CourseDetailMetaValue>
                        </CourseDetailMetaItem>
                        <CourseDetailMetaItem>
                            <CourseDetailMetaLabel>
                                Ngày tạo
                            </CourseDetailMetaLabel>
                            <CourseDetailMetaValue>
                                {formatDate(course.created_at)}
                            </CourseDetailMetaValue>
                        </CourseDetailMetaItem>
                        <CourseDetailMetaItem>
                            <CourseDetailMetaLabel>
                                Cập nhật
                            </CourseDetailMetaLabel>
                            <CourseDetailMetaValue>
                                {formatDate(course.updated_at)}
                            </CourseDetailMetaValue>
                        </CourseDetailMetaItem>
                    </CourseDetailMeta>

                    <CourseDetailSection>
                        <CourseDetailSectionHeader>
                            Thông tin cơ bản
                        </CourseDetailSectionHeader>
                        <CourseDetailMeta>
                            <CourseDetailMetaItem>
                                <CourseDetailMetaLabel>
                                    Số chương
                                </CourseDetailMetaLabel>
                                <CourseDetailMetaValue>
                                    {totalSections}
                                </CourseDetailMetaValue>
                            </CourseDetailMetaItem>
                            <CourseDetailMetaItem>
                                <CourseDetailMetaLabel>
                                    Số bài học
                                </CourseDetailMetaLabel>
                                <CourseDetailMetaValue>
                                    {totalLessons}
                                </CourseDetailMetaValue>
                            </CourseDetailMetaItem>
                            <CourseDetailMetaItem>
                                <CourseDetailMetaLabel>
                                    Số quiz
                                </CourseDetailMetaLabel>
                                <CourseDetailMetaValue>
                                    {totalQuizzes}
                                </CourseDetailMetaValue>
                            </CourseDetailMetaItem>
                            <CourseDetailMetaItem>
                                <CourseDetailMetaLabel />
                                <CourseDetailMetaValue>
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
                                </CourseDetailMetaValue>
                            </CourseDetailMetaItem>
                        </CourseDetailMeta>
                    </CourseDetailSection>

                    <CourseDetailSection>
                        <CourseDetailSectionHeader>
                            Chương và nội dung
                        </CourseDetailSectionHeader>
                        <CourseDetailSectionList>
                            {totalSections === 0 ? (
                                <Text>Khóa học chưa có chương nào.</Text>
                            ) : (
                                course.sections.map((section, index) => {
                                    const lessonCount = Array.isArray(
                                        section.lessons,
                                    )
                                        ? section.lessons.length
                                        : Array.isArray(section.lesson)
                                          ? section.lesson.length
                                          : 0;
                                    const quizCount = Array.isArray(
                                        section.quizzes,
                                    )
                                        ? section.quizzes.length
                                        : Array.isArray(section.quiz)
                                          ? section.quiz.length
                                          : 0;

                                    return (
                                        <CourseDetailSectionItem
                                            key={section.id || index}
                                        >
                                            <div>
                                                <CourseDetailSectionTitle>
                                                    {section.title ||
                                                        `Chương ${index + 1}`}
                                                </CourseDetailSectionTitle>
                                                <CourseDetailSectionSubtitle>
                                                    {section.description ||
                                                        "Không có mô tả chương."}
                                                </CourseDetailSectionSubtitle>
                                            </div>
                                            <CourseDetailRow>
                                                <Text>
                                                    {lessonCount} bài học
                                                </Text>
                                                <Text>{quizCount} quiz</Text>
                                            </CourseDetailRow>
                                        </CourseDetailSectionItem>
                                    );
                                })
                            )}
                        </CourseDetailSectionList>
                    </CourseDetailSection>
                </CourseDetailContainer>
            )}
        </Section>
    );
}
