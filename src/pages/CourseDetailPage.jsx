import {
    CourseDetailContainer,
    CourseDetailHeader,
    CourseDetailMeta,
    CourseDetailThumbnail,
} from "../components/course/courses-style";
import { formatDate, formatPrice } from "../utils/format";
import { useEffect, useState } from "react";

import { AddInfoCard } from "../components/course/course";
import Button from "../components/ui/Button";
import { CourseDetailPageSkeleton } from "../components/loading/CourseItemSkeleton";
import { H } from "../components/ui/text";
import { InfomationCard } from "../components/course/course";
import QuizCards from "../components/course/QuizCards";
import { Section } from "../components/ui/Secttion";
import { courseService } from "../services/course.service";
import defaultImg from "../assets/defaultImg.png";
import { navigateBack } from "../utils/navigate";
import { useConfirm } from "../hooks/confirmHook";
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
    const { getQuiz, quiz, courses, setCourses } = useCourse();
    const { confirm } = useConfirm();

    const [courseId, setCourseId] = useState(getCourseIdFromPath());
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRemove, setIsRemove] = useState(false);

    const handleRemove = async (courseId) => {
        setIsRemove(true);
        const isOk = await confirm({
            title: "Xóa khóa học",
            content: "Bạn chắc chắn muốn xóa khóa học này chứ",
            confirmText: "Chắc chắn",
            cancelText: "Hủy",
        });

        if (!isOk) return;

        try {
            await courseService.deleteCourse(courseId);

            toast.success("Xóa thành công");
            navigateBack();

            setCourses(courses.filter((i) => i.id != courseId));
        } catch (error) {
            toast.error("Xóa thất bại");
            console.log("Delete Course Error: ", error);
        } finally {
            setIsRemove(false);
        }
    };

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

    const publish = course?.publish ? "Đã đăng" : "Chưa đăng";
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
                <CourseDetailPageSkeleton />
            ) : (
                <CourseDetailContainer>
                    <Section id={"course-header"}>
                        <CourseDetailHeader>
                            <div style={{ flex: 1 }}>
                                <InfomationCard
                                    label={"Tên khóa học:"}
                                    content={course.title || "***"}
                                    size={"xl"}
                                    spacing={false}
                                />

                                <InfomationCard
                                    label={"Mô tả:"}
                                    content={course.description || "***"}
                                    spacing={false}
                                />
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
                            <InfomationCard
                                label={"Giá"}
                                content={formatPrice(course.price)}
                            />

                            <InfomationCard
                                label={"Giáo viên"}
                                content={course.instructor.full_name}
                            />
                            <InfomationCard
                                label={"Trạng thái"}
                                content={publish}
                            />
                            <InfomationCard
                                label={"Ngày tạo: "}
                                content={formatDate(course.created_at)}
                            />
                        </CourseDetailMeta>
                    </Section>

                    <Section id={"course-sections"}>
                        <H size="h3">Số chương, bài, quiz: </H>

                        <CourseDetailMeta>
                            <AddInfoCard
                                label={"Số chương:"}
                                content={totalSections}
                                courseId={courseId}
                                add={""}
                            />
                            <AddInfoCard
                                label={"Số bài học:"}
                                content={totalLessons}
                                courseId={courseId}
                                add={""}
                            />
                            <AddInfoCard
                                label={"Số quiz:"}
                                content={totalQuizzes}
                                courseId={courseId}
                                add={
                                    courseId
                                        ? `/course-info/${courseId}/quiz`
                                        : undefined
                                }
                            />
                        </CourseDetailMeta>
                    </Section>

                    <Section id={"course-quiz"}>
                        <QuizCards quizzes={quiz} />
                    </Section>

                    <Section>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button
                                variant="danger"
                                disabled={isRemove}
                                onClick={() => handleRemove(courseId)}
                            >
                                Xóa khóa học
                            </Button>
                        </div>
                    </Section>
                </CourseDetailContainer>
            )}
        </>
    );
}
