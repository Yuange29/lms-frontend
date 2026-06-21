import {
    CloseButton,
    Dialog,
    DialogActions,
    DialogBody,
    DialogHeader,
    ItemContent,
    Overlay,
} from "./courses-style";

import Button from "../ui/Button";
import { CourseDialogSkeleton } from "../loading/CourseItemSkeleton";
import { Text } from "../ui/text";
import { useAuth } from "./../../hooks/authHook";
import { useToast } from "./../../hooks/toastHook";

function CourseInfoDialog({ course, quiz, courseId, loading, error, onClose }) {
    const { toast } = useToast();
    const { role } = useAuth();

    const publish = course?.publish ? "Đã đăng" : "Chưa đăng";
    const sectionTotal = 0;
    const lessonTotal = 0;
    const quizTotal = quiz?.length | 0;

    const viewDetailPath = course?.id
        ? `/course-info/${course.id}`
        : courseId
          ? `/course-info/${courseId}`
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
                            <ItemContent>
                                <Text color="muted">Mô tả khóa học: </Text>
                                <Text weight="bold">{course?.description}</Text>
                            </ItemContent>
                            <ItemContent
                                style={{ display: role === "Giáo viên" }}
                            >
                                <Text color="muted">publish: </Text>
                                <Text weight="bold">{publish}</Text>
                            </ItemContent>
                            <ItemContent>
                                <Text color="muted">Số chương: </Text>
                                <Text weight="bold">{sectionTotal}</Text>
                            </ItemContent>
                            <ItemContent>
                                <Text color="muted">Số bài học: </Text>
                                <Text weight="bold">{lessonTotal}</Text>
                            </ItemContent>
                            <ItemContent>
                                <Text color="muted">Số quiz: </Text>
                                <Text weight="bold">{quizTotal}</Text>
                            </ItemContent>
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
