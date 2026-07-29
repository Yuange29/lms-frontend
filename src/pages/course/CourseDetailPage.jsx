import {
    CourseDetailContainer,
    CourseDetailHeader,
    CourseDetailMeta,
    CourseDetailThumbnail,
    InfoCardLabel,
} from "./course.style";
import { H, HeaderCard } from "../../components/ui/Text";
import SectionsCard, { AddSectionCard } from "./components/SectionsCard";
import { formatDate, formatPrice } from "../../utils/format";
import { getIdsFromPath, navigate } from "../../utils/navigate";
import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";
import { CourseDetailPageSkeleton } from "./components/CourseLoading";
import EnrollersBox from "./components/EnrollersBox";
import { InfomationCard } from "../../components/InfomationLabel";
import QuizCards from "../quiz/components/QuizCards";
import { Section } from "../../components/ui/Section";
import defaultImg from "../../assets/defaultImg.png";
import { useAuth } from "../../hooks/authHook";
import { useCourse } from "../../hooks/courseHook";
import { useQuiz } from "../../hooks/quizHook";

export default function CourseDetailPage() {
    const { canManage } = useAuth();
    const {
        course,
        loadingCourse,
        courseId,
        setCourseId,
        getCourseDetail,
        loadingPublish,
        publishCourse,
        removeCourse,
        loadingDelete,
    } = useCourse();
    const { quizzes, getQuizzes, loading: loadingQuizzes } = useQuiz();
    const [isHideAddSection, setIsHideAddSection] = useState(true);

    const id = getIdsFromPath("course");

    useEffect(() => setCourseId(id.course), [setCourseId]);

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
            setCourseId(id.course);
        };

        window.addEventListener("popstate", handleRouteChange);
        window.addEventListener("app:navigate", handleRouteChange);

        return () => {
            window.removeEventListener("popstate", handleRouteChange);
            window.removeEventListener("app:navigate", handleRouteChange);
        };
    }, [setCourseId]);

    const publish = course?.published ? "Đã đăng" : "Chưa đăng";

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
                                            ? `/course/${courseId}/quiz`
                                            : undefined,
                                    )
                                }
                            >
                                <i className="fa-solid fa-plus"></i>
                            </Button>
                        </InfoCardLabel>
                        <QuizCards quizzes={quizzes} />
                    </Section>

                    {canManage && (
                        <Section>
                            <HeaderCard title={"Các học viên"} />
                            <EnrollersBox />
                        </Section>
                    )}

                    <Section>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                $width="200px"
                                disabled={loadingPublish}
                                onClick={async () =>
                                    await publishCourse(course.id)
                                }
                            >
                                Tham gia khóa học
                            </Button>
                        </div>
                    </Section>

                    {canManage && (
                        <Section>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Button
                                    $width="200px"
                                    variant={
                                        course?.published ? "safe" : "warn"
                                    }
                                    disabled={loadingPublish}
                                    onClick={async () =>
                                        await publishCourse(course.id)
                                    }
                                >
                                    {course?.published
                                        ? "Đã đăng"
                                        : "Chưa đăng"}
                                </Button>
                                <Button
                                    $width="200px"
                                    variant="danger"
                                    disabled={loadingDelete}
                                    onClick={() => removeCourse(course.id)}
                                >
                                    Xóa khóa học
                                </Button>
                            </div>
                        </Section>
                    )}
                </CourseDetailContainer>
            )}
        </>
    );
}
