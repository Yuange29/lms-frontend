import {
    CourseDetailContainer,
    CourseDetailHeader,
    CourseDetailMeta,
    CourseDetailThumbnail,
    InfoCardLabel,
} from "../components/course/courses-style";
import { H, HeaderCard } from "../components/ui/Text";
import SectionsCard, {
    AddSectionCard,
} from "../components/course/SectionsCard";
import { formatDate, formatPrice } from "../utils/format";
import { navigate, navigateBack } from "../utils/navigate";
import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import { CourseDetailPageSkeleton } from "../components/loading/CourseItemSkeleton";
import { InfomationCard } from "../components/course/course";
import QuizCards from "../components/course/QuizCards";
import { Section } from "../components/ui/Secttion";
import { courseService } from "../services/course.service";
import defaultImg from "../assets/defaultImg.png";
import { useConfirm } from "../hooks/confirmHook";
import { useCourse } from "./../hooks/courseHook";
import { useQuiz } from "./../hooks/quizHook";
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
    const {
        course,
        courses,
        loadingCourse,
        courseId,
        setCourses,
        setCourseId,
        getCourseDetail,
    } = useCourse();
    const { confirm } = useConfirm();
    const { quizzes, getQuizzes, loading: loadingQuizzes } = useQuiz();

    const [isRemove, setIsRemove] = useState(false);
    const [isPublish, setIsPublish] = useState(false);
    const [isHideAddSection, setIsHideAddSection] = useState(true);

    const handlePublish = async (courseId) => {
        const isOk = await confirm({
            title: "Đăng khóa học",
            content: `Bạn chắc chắn muốn ${course?.publish ? "hủy đăng" : "đăng"} khóa học này chứ`,
            confirmText: `${!course?.publish ? "Đăng" : "Gỡ"}`,
            cancelText: "Chờ đã",
        });

        if (!isOk) return;

        setIsPublish(true);

        try {
            await courseService.publishCourse(courseId);
            toast.success("Cập nhật trạng thái thành công");
            await getCourseDetail(courseId);
            console.log("Publish Course Success: ", course);
        } catch (error) {
            toast.error("Cập nhật trạng thái thất bại");
            console.log("Publish Course Error: ", error);
        } finally {
            setIsPublish(false);
        }
    };

    const handleRemove = async (courseId) => {
        const isOk = await confirm({
            title: "Xóa khóa học",
            content: "Bạn chắc chắn muốn xóa khóa học này chứ",
            confirmText: "Chắc chắn",
            cancelText: "Hủy",
        });

        if (!isOk) return;

        setIsRemove(true);
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

    useEffect(() => setCourseId(getCourseIdFromPath()), [setCourseId]);

    useEffect(() => {
        if (!courseId) return;

        const fetchCourseAndQuizzes = async (courseId) => {
            await getCourseDetail(courseId);
            await getQuizzes(courseId);
        };

        fetchCourseAndQuizzes(courseId);
    }, [courseId, getQuizzes, getCourseDetail]);

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
    }, [setCourseId]);

    const publish = course?.publish ? "Đã đăng" : "Chưa đăng";

    return (
        <>
            <Section>
                <HeaderCard title={"Thông tin chi tiết của khóa học"} />
            </Section>
            {!courseId ? (
                <Section>
                    <H size="h3">Đang có lỗi xảy ra</H>
                </Section>
            ) : loadingCourse || loadingQuizzes ? (
                <CourseDetailPageSkeleton />
            ) : (
                <CourseDetailContainer>
                    <Section id={"course-header"}>
                        <CourseDetailHeader>
                            <div style={{ flex: 1 }}>
                                <InfomationCard
                                    label={"Tên khóa học:"}
                                    content={course?.title || "***"}
                                    size={"xl"}
                                    spacing={false}
                                />

                                <InfomationCard
                                    label={"Mô tả:"}
                                    content={course?.description || "***"}
                                    spacing={false}
                                />
                            </div>
                            <CourseDetailThumbnail
                                style={{ flex: 1 }}
                                src={course?.thumbnail_url || defaultImg}
                                alt={course?.title}
                            />
                        </CourseDetailHeader>
                    </Section>

                    <Section id={"basic-info"}>
                        <H size="h3">Thông tin cơ bản</H>
                        <CourseDetailMeta>
                            <InfomationCard
                                label={"Giá"}
                                content={formatPrice(course?.price)}
                            />

                            <InfomationCard
                                label={"Giáo viên"}
                                content={course?.instructor?.full_name}
                            />
                            <InfomationCard
                                label={"Trạng thái"}
                                content={publish}
                            />
                            <InfomationCard
                                label={"Ngày tạo: "}
                                content={formatDate(course?.created_at)}
                            />
                        </CourseDetailMeta>
                    </Section>

                    <Section id={"course-sections"}>
                        <InfoCardLabel>
                            <H>Các chương</H>
                            <Button
                                onClick={() =>
                                    setIsHideAddSection(!isHideAddSection)
                                }
                            >
                                <i className="fa-solid fa-plus"></i>
                            </Button>
                        </InfoCardLabel>
                        <AddSectionCard
                            isHide={isHideAddSection}
                            courseId={course?.id}
                        />
                        <SectionsCard sections={course?.sections} />
                    </Section>

                    <Section id={"course-quiz"}>
                        <InfoCardLabel>
                            <H>Các quiz</H>
                            <Button
                                onClick={() =>
                                    navigate(
                                        courseId
                                            ? `/course-info/${courseId}/quiz`
                                            : undefined,
                                    )
                                }
                            >
                                <i className="fa-solid fa-plus"></i>
                            </Button>
                        </InfoCardLabel>
                        <QuizCards quizzes={quizzes} />
                    </Section>

                    <Section>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                $width="200px"
                                variant="secondary"
                                disabled={isPublish}
                                onClick={() => handlePublish(course.id)}
                            >
                                {course?.publish ? "Đã đăng" : "Chưa đăng"}
                            </Button>
                            <Button
                                $width="200px"
                                variant="danger"
                                disabled={isRemove}
                                onClick={() => handleRemove(course.id)}
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
