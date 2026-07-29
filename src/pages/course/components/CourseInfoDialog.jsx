import {
    CloseButton,
    Dialog,
    DialogActions,
    DialogBody,
    DialogHeader,
} from "../../../styles/Dialog";

import Button from "./../../../components/ui/Button";
import { CourseDialogSkeleton } from "./CourseLoading";
import { GreyDialogContent } from "./../../../components/InfomationLabel";
import { Overlay } from "./../../../styles/Overlay";
import { Text } from "../../../components/ui/Text";
import { useAuth } from "./../../../hooks/authHook";
import { useToast } from "./../../../hooks/toastHook";

const countLessons = (sections) => {
    let count = 0;
    sections?.forEach((section) => {
        count += section?.lessons?.length;
    });
    return count;
};

function CourseInfoDialog({ course, quiz, courseId, loading, error, onClose }) {
    const { toast } = useToast();
    const { role } = useAuth();

    const publish = course?.published ? "Đã đăng" : "Chưa đăng";
    const sectionTotal = course?.sections?.length | 0;
    const lessonTotal = countLessons(course?.sections) | 0;

    const quizTotal = quiz?.length | 0;

    const viewDetailPath = course?.id
        ? `/course/${course.id}`
        : courseId
          ? `/course/${courseId}`
          : null;

    return (
        <Overlay onClick={onClose}>
            <Dialog onClick={(event) => event.stopPropagation()}>
                <DialogHeader>
                    <Text> </Text>
                    <CloseButton type="button" onClick={onClose}>
                        <Text>
                            <i className="fa-solid fa-xmark"></i>
                        </Text>
                    </CloseButton>
                </DialogHeader>

                <DialogBody>
                    {loading ? (
                        <CourseDialogSkeleton />
                    ) : error ? (
                        toast.error("Không thể tải được khóa học!")
                    ) : (
                        <>
                            <Text color="muted">Tên khóa học: </Text>
                            <Text align="center" size="xl" weight="extrabold">
                                {course?.title}
                            </Text>

                            <GreyDialogContent
                                label="Mô tả khóa học"
                                content={course?.description}
                            />
                            <GreyDialogContent
                                style={{ display: role === "Giáo viên" }}
                                label="publish"
                                content={publish}
                            />
                            <GreyDialogContent
                                label="Số chương"
                                content={sectionTotal}
                            />
                            <GreyDialogContent
                                label="Số bài học"
                                content={lessonTotal}
                            />
                            <GreyDialogContent
                                label="Số quiz"
                                content={quizTotal}
                            />
                        </>
                    )}
                </DialogBody>

                <DialogActions>
                    <Button $width="30%" variant="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                    <Button
                        $width="30%"
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
