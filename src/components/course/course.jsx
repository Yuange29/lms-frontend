import {
    CloseButton,
    CourseDescription,
    CoursePrice,
    CourseTitle,
    CourseWrapper,
    CoursesWrapper,
    Dialog,
    DialogActions,
    DialogBody,
    DialogHeader,
    DialogLabel,
    DialogRow,
    DialogSection,
    DialogText,
    DialogTitle,
    DialogValue,
    IconWrapper,
    InfoWrapper,
    MenuButton,
    MenuWrapper,
    Overlay,
    SkeletonBox,
    ThumbnailImage,
} from "./courses-style";
import {
    faEllipsisVertical,
    faFile,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useState } from "react";

import Button from "../ui/Button";
import CourseItemSkeleton from "../loading/CourseItemSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { courseService } from "./../../services/course.service";
import { formatPrice } from "../../utils/getDay";
import { useToast } from "./../../hooks/toastHook";

function CoursesInfo({ courses = [] }) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseInfo, setCourseInfo] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const handleClick = useCallback(async (courseId) => {
        setOpen(true);
        setSelectedCourse(courseId);
        setCourseInfo(null);
        setError(null);
        setLoading(true);

        try {
            const res = await courseService.getCourseInfo(courseId);
            setCourseInfo(res?.course || res);
        } catch (err) {
            toast.error("Không tìm thấy thông tin khóa học.");
            console.log("Error fetching course info:", err);
            setError("Không thể tải thông tin khóa học. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setSelectedCourse(null);
        setCourseInfo(null);
        setError(null);
        setLoading(false);
    }, []);

    return (
        <>
            <CoursesWrapper>
                {Array.isArray(courses) &&
                    courses.map((course) => (
                        <CourseItemMemo
                            key={course.id}
                            course={course}
                            onClick={() => handleClick(course.id)}
                        />
                    ))}
            </CoursesWrapper>

            {open && (
                <CourseInfoDialog
                    course={courseInfo}
                    courseId={selectedCourse}
                    loading={loading}
                    error={error}
                    onClose={handleClose}
                />
            )}
        </>
    );
}

function CourseItem({ course, onClick }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <CourseWrapper onClick={onClick}>
            <IconWrapper>
                {course.thumbnail_url ? (
                    <ThumbnailImage
                        src={course.thumbnail_url}
                        alt={course.title}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faFile}
                        size="xl"
                        color="var(--color-primary)"
                    />
                )}
            </IconWrapper>

            <InfoWrapper>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>
                    {course.description || "Không có ghi chú"}
                </CourseDescription>
                <CoursePrice>
                    Giá khóa học: {formatPrice(course.price)}
                </CoursePrice>
            </InfoWrapper>

            <MenuWrapper>
                <MenuButton
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowMenu(!showMenu);
                    }}
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                </MenuButton>
            </MenuWrapper>
        </CourseWrapper>
    );
}

export function CourseInfoDialog({
    course,
    courseId,
    loading,
    error,
    onClose,
}) {
    const sectionCount = Array.isArray(course?.sections)
        ? course.sections.length
        : 0;
    const lessonCount = Array.isArray(course?.sections)
        ? course.sections.reduce((sum, section) => {
              const lessons = section.lessons ?? section.lesson ?? [];
              return sum + (Array.isArray(lessons) ? lessons.length : 0);
          }, 0)
        : 0;
    const quizCount = Array.isArray(course?.sections)
        ? course.sections.reduce((sum, section) => {
              const quizzes = section.quizzes ?? section.quiz ?? [];
              return sum + (Array.isArray(quizzes) ? quizzes.length : 0);
          }, 0)
        : 0;

    const viewDetailPath = course?.id
        ? `/course-info/${course.id}`
        : courseId
          ? `/course-info/${courseId}`
          : null;

    return (
        <Overlay onClick={onClose}>
            <Dialog onClick={(event) => event.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>
                        {course?.title || "Thông tin khóa học"}
                    </DialogTitle>
                    <CloseButton type="button" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} size="sm" />
                    </CloseButton>
                </DialogHeader>

                <DialogBody>
                    {loading ? (
                        <>
                            <DialogText>
                                Đang tải thông tin khóa học...
                            </DialogText>
                            <CourseItemSkeleton />
                            <DialogSection>
                                <SkeletonBox height="22px" width="45%" />
                                <SkeletonBox height="22px" width="45%" />
                                <SkeletonBox height="22px" width="45%" />
                            </DialogSection>
                        </>
                    ) : error ? (
                        <DialogText>{error}</DialogText>
                    ) : (
                        <>
                            <DialogText>
                                {course?.description ||
                                    "Chưa có mô tả cho khóa học này."}
                            </DialogText>

                            <DialogSection>
                                <DialogRow>
                                    <DialogLabel>Giá</DialogLabel>
                                    <DialogValue>
                                        {formatPrice(course?.price)}
                                    </DialogValue>
                                </DialogRow>
                                {course?.instructor?.full_name && (
                                    <DialogRow>
                                        <DialogLabel>Giảng viên</DialogLabel>
                                        <DialogValue>
                                            {course.instructor.full_name}
                                        </DialogValue>
                                    </DialogRow>
                                )}
                                {typeof course?.published !== "undefined" && (
                                    <DialogRow>
                                        <DialogLabel>Trạng thái</DialogLabel>
                                        <DialogValue>
                                            {course.published
                                                ? "Đã publish"
                                                : "Chưa publish"}
                                        </DialogValue>
                                    </DialogRow>
                                )}
                            </DialogSection>

                            <DialogSection>
                                <DialogRow>
                                    <DialogLabel>Số chương</DialogLabel>
                                    <DialogValue>{sectionCount}</DialogValue>
                                </DialogRow>
                                <DialogRow>
                                    <DialogLabel>Số bài học</DialogLabel>
                                    <DialogValue>{lessonCount}</DialogValue>
                                </DialogRow>
                                <DialogRow>
                                    <DialogLabel>Số quiz</DialogLabel>
                                    <DialogValue>{quizCount}</DialogValue>
                                </DialogRow>
                            </DialogSection>
                        </>
                    )}
                </DialogBody>

                <DialogActions>
                    <Button variant="ghost" onClick={onClose}>
                        Đóng
                    </Button>
                    <Button
                        navigate={viewDetailPath}
                        onClick={onClose}
                        disabled={loading || !viewDetailPath}
                    >
                        Xem chi tiết
                    </Button>
                </DialogActions>
            </Dialog>
        </Overlay>
    );
}

const CourseItemMemo = memo(CourseItem);

export default memo(CoursesInfo);
