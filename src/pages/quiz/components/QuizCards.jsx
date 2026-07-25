import { CourseCardWrapper, QuizWrapper } from "../quiz.style";
import {
    Dialog,
    DialogActions,
    DialogBody,
    DialogHeader,
} from "../../../styles/Dialog";
import { useCallback, useMemo, useState } from "react";

import Button from "../../../components/ui/Button";
import { GreyDialogContent } from "../../../components/InfomationLabel";
import { LoadingRectangle } from "./../../../components/loading/loading-style";
import { Overlay } from "../../../styles/Overlay";
import { Text } from "../../../components/ui/Text";
import { memo } from "react";
import { navigate } from "./../../../utils/navigate";
import { useSubmisson } from "./../../../hooks/submissonHook";
import { useToast } from "../../../hooks/toastHook";

function QuizzesInfo({ quizzes, children }) {
    const { toast } = useToast();
    const { submission, getSubmission, loading } = useSubmisson();

    const courseId = quizzes ? quizzes[0]?.course_id : null;
    console.log(courseId);

    const [selectedQuizId, setSelectedQuizId] = useState(null);

    const score = submission ? `${submission?.score} điểm` : "Chưa làm";

    const selectedQuiz = useMemo(() => {
        if (!selectedQuizId || !quizzes?.length) return null;
        return quizzes.find((quiz) => quiz.id === selectedQuizId) ?? null;
    }, [quizzes, selectedQuizId]);

    const isOpen = Boolean(selectedQuiz);

    const handleClick = useCallback(
        async (quiz) => {
            setSelectedQuizId((prevId) =>
                prevId === quiz.id ? null : quiz.id,
            );
            await getSubmission(quiz?.id);
        },
        [getSubmission],
    );

    const handleCheck = useCallback(
        async (courseId, quizId) => {
            if (!quizId) return toast.error("Không tìm thấy khóa học");
            if (!submission) return toast.error("Bạn chưa từng làm bài");
            navigate(`/course/${courseId}/quiz/${quizId}/submission`);
        },
        [submission, toast],
    );

    const handleClose = useCallback(() => {
        setSelectedQuizId(null);
    }, []);

    const handleDoQuiz = useCallback(() => {
        if (!selectedQuiz) return;

        navigate(
            `/course/${selectedQuiz.course_id}/quiz/${selectedQuiz.id}/show`,
        );
    }, [selectedQuiz]);

    return (
        <>
            <QuizWrapper>
                {quizzes?.map((quiz) => (
                    <QuizCard quiz={quiz} key={quiz.id} onClick={handleClick} />
                ))}
                {children}

                {isOpen && (
                    <Overlay>
                        <Dialog>
                            <DialogHeader>
                                <Button variant="ghost" onClick={handleClose}>
                                    <i className="fa-solid fa-x"></i>
                                </Button>
                            </DialogHeader>
                            <DialogBody>
                                <GreyDialogContent
                                    label={"Bài tập"}
                                    content={selectedQuiz?.title}
                                />
                                <GreyDialogContent
                                    label={"Mô tả"}
                                    content={
                                        selectedQuiz?.description ||
                                        "Chưa có mô tả"
                                    }
                                />
                                <GreyDialogContent
                                    label={"Thời gian"}
                                    content={`${selectedQuiz?.time_limit} phút`}
                                />
                                {loading ? (
                                    <LoadingRectangle
                                        $height="2.5em"
                                        $width="100%"
                                    />
                                ) : (
                                    <GreyDialogContent
                                        label={"Điểm số"}
                                        content={score}
                                    />
                                )}
                            </DialogBody>
                            <DialogActions>
                                <Button
                                    variant="secondary"
                                    onClick={() =>
                                        handleCheck(courseId, selectedQuiz.id)
                                    }
                                    disabled={
                                        !submission?.score || loading === true
                                    }
                                >
                                    {submission?.score ? "Xem lại" : "Chưa làm"}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Hủy
                                </Button>
                                <Button onClick={() => handleDoQuiz()}>
                                    Làm bài
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Overlay>
                )}
            </QuizWrapper>
        </>
    );
}

const QuizCard = memo(function QuizCard({ quiz, onClick }) {
    const handleClick = useCallback(() => {
        onClick?.(quiz);
    }, [onClick, quiz]);

    return (
        <CourseCardWrapper onClick={handleClick}>
            <div className="quiz-title">
                <Text color="muted" size="sm">
                    Bài tập:
                </Text>
                <Text size="lg" weight="bold" className="indent">
                    {quiz?.title}
                </Text>
                <Text color="muted" size="sm">
                    Thời gian làm bài: {quiz?.time_limit} phút
                </Text>
            </div>
        </CourseCardWrapper>
    );
});

export { QuizCard };
export default memo(QuizzesInfo);
