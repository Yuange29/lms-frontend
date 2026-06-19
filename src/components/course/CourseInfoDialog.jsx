import {
    CloseButton,
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
    Overlay,
    SkeletonBox,
} from "./courses-style";

import Button from "../ui/Button";
import CourseItemSkeleton from "../loading/CourseItemSkeleton";
import { Text } from "../ui/text";
import { formatPrice } from "../../utils/format";
import { useToast } from "./../../hooks/toastHook";

function CourseInfoDialog({ course, courseId, loading, error, onClose }) {
    const { toast } = useToast();

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
                        {/* <FontAwesomeIcon icon={faTimes} size="sm" /> */}
                        <Text>
                            <i className="fa-solid fa-xmark"></i>
                        </Text>
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
                        toast.error("Không thể tải được khóa học!")
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

export { CourseInfoDialog };
