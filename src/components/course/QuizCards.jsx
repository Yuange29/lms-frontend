import { CourseCardWrapper, QuizWrapper } from "./quiz-style";
import {
    Dialog,
    DialogActions,
    DialogBody,
    DialogHeader,
    Overlay,
} from "./courses-style";
import { memo, useCallback, useMemo, useState } from "react";

import Button from "../ui/Button";
import { GreyDialogContent } from "../InfomationLabel";
import { Text } from "../ui/Text";
import { navigate } from "../../utils/navigate";

function QuizzesInfo({ quizzes, children }) {
    const [selectedQuizId, setSelectedQuizId] = useState(null);

    const selectedQuiz = useMemo(() => {
        if (!selectedQuizId || !quizzes?.length) return null;
        return quizzes.find((quiz) => quiz.id === selectedQuizId) ?? null;
    }, [quizzes, selectedQuizId]);

    const isOpen = Boolean(selectedQuiz);

    const handleClick = useCallback((quiz) => {
        setSelectedQuizId((prevId) => (prevId === quiz.id ? null : quiz.id));
    }, []);

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
                                    x
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
                            </DialogBody>
                            <DialogActions>
                                <Button
                                    variant="secondary"
                                    $width="200px"
                                    onClick={handleClose}
                                >
                                    Chưa làm
                                </Button>
                                <Button
                                    $width="200px"
                                    onClick={() => handleDoQuiz()}
                                >
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
