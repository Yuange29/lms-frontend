import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import Button from "../components/ui/Button";
import QuizQuestionSkeleton from "../components/loading/QuestionSkeleton";
import { Section } from "../components/ui/Secttion";
import { Text } from "../components/ui/Text";
import { baseFlex } from "./../styles/CommonStyles";
import { formatFirstLetter } from "./../utils/format";
import { navigate } from "../utils/navigate";
import styled from "styled-components";
import { submissionService } from "../services/submission.service";
import { useConfirm } from "./../hooks/confirmHook";
import { useQuiz } from "./../hooks/quizHook";
import { useToast } from "./../hooks/toastHook";

// course/courseId/quiz/quizId/show`
const getIdFromPath = () => {
    let pathName = window.location.pathname.split("/").filter(Boolean);
    if (
        pathName[0] !== "course" ||
        pathName[2] !== "quiz" ||
        pathName[4] != "show"
    )
        return "";

    return { courseId: pathName[1], quizId: pathName[3] };
};

const formatTimeLeft = (seconds) => {
    if (seconds === null || seconds === undefined || Number.isNaN(seconds)) {
        return "00:00";
    }

    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60)
        .toString()
        .padStart(2, "0");
    const remainingSeconds = (safeSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
};

const QuizTimer = memo(function QuizTimer({
    initialSeconds,
    remainingQuestions,
    onExpire,
}) {
    const [timeLeft, setTimeLeft] = useState(() => initialSeconds);
    const [isExpired, setIsExpired] = useState(false);
    const autoSubmitAttemptedRef = useRef(false);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;

        const timer = window.setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsExpired(true);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (!isExpired || autoSubmitAttemptedRef.current) return;

        autoSubmitAttemptedRef.current = true;
        onExpire?.();
    }, [isExpired, onExpire]);

    return (
        <TimerBox>
            <div className="timer-value">{formatTimeLeft(timeLeft)}</div>
            <div className="timer-meta">{remainingQuestions} câu còn lại</div>
        </TimerBox>
    );
});

const QuestionCard = memo(function QuestionCard({
    question,
    index,
    selectedAnswers,
    onChange,
}) {
    return (
        <StyledQuestionCard>
            <Text color="muted">Câu {index + 1}:</Text>
            <div className="question">
                <Text size="lg">
                    {formatFirstLetter(question.question_text)}
                </Text>
            </div>

            <div className="answers">
                {question?.answers.map((answer) => (
                    <div className="radio-input" key={answer.id}>
                        <label
                            className={`label${
                                selectedAnswers?.includes(answer.id)
                                    ? " checked"
                                    : ""
                            }`}
                        >
                            <input
                                type="radio"
                                name={question.id}
                                checked={
                                    selectedAnswers?.includes(answer.id) ??
                                    false
                                }
                                onChange={() =>
                                    onChange(question.id, answer.id)
                                }
                            />

                            <Text>{formatFirstLetter(answer.answer_text)}</Text>
                        </label>
                    </div>
                ))}
            </div>
        </StyledQuestionCard>
    );
});

export default function QuizShowPage() {
    const id = useMemo(() => getIdFromPath(), []);
    const courseId = id?.courseId;
    const quizId = id?.quizId;

    const { toast } = useToast();
    const { confirm } = useConfirm();
    const { quiz, loadingQuiz, getQuiz } = useQuiz();

    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const [isGuardActive, setIsGuardActive] = useState(true);

    const submitQuiz = useCallback(
        async (shouldConfirm = true) => {
            if (shouldConfirm) {
                let isOk = await confirm({
                    title: "Nộp bài",
                    desc: "Sau khi nộp sẽ không thể sửa được!",
                });

                if (!isOk) return;
            }

            const payload = Object.entries(answers).map(
                ([question_id, answers_id]) => ({
                    question_id,
                    answers_id,
                }),
            );

            setLoading(true);
            try {
                await submissionService.submit(quiz.id, payload);
                setIsGuardActive(false);
                toast.success("Nộp bài thành công");
                setAnswers({});

                if (courseId) {
                    navigate(`/course-info/${courseId}`);
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra. Thử lại sau");
                console.log("Submit error: ", error);
            } finally {
                setLoading(false);
            }
        },
        [answers, confirm, courseId, quiz, toast],
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitQuiz(true);
    };

    const handleLeaveConfirm = useCallback(async () => {
        if (!isGuardActive) return true;

        const shouldLeave = await confirm({
            title: "Rời khỏi bài làm",
            content:
                "Bạn đang làm bài. Nếu rời khỏi trang, quá trình làm bài sẽ bị gián đoạn. Bạn có chắc muốn tiếp tục không?",
            confirmText: "Rời khỏi",
            cancelText: "Ở lại",
        });

        return shouldLeave;
    }, [confirm, isGuardActive]);

    const handleSingleChoice = useCallback((questionId, answerId) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: [answerId],
        }));
    }, []);

    useEffect(() => {
        if (!courseId || !quizId) return;

        const fetchQuiz = async (currentCourseId, currentQuizId) => {
            await getQuiz(currentCourseId, currentQuizId);
        };

        fetchQuiz(courseId, quizId);
    }, [courseId, quizId, getQuiz]);

    useEffect(() => {
        if (!isGuardActive) return;

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";
        };

        const handlePopState = async () => {
            window.history.pushState(null, "", window.location.href);

            const shouldLeave = await handleLeaveConfirm();
            if (!shouldLeave) return;

            setIsGuardActive(false);
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [handleLeaveConfirm, isGuardActive]);

    const initialTimeSeconds = useMemo(() => {
        if (!quiz?.time_limit) return null;
        return Number(quiz.time_limit) * 60;
    }, [quiz?.time_limit]);

    const answeredQuestionsCount = useMemo(
        () => Object.keys(answers).length,
        [answers],
    );

    const remainingQuestions = useMemo(() => {
        const totalQuestions = quiz?.questions?.length ?? 0;
        return Math.max(totalQuestions - answeredQuestionsCount, 0);
    }, [answeredQuestionsCount, quiz?.questions?.length]);

    useEffect(() => {
        if (!quiz?.id || !isExpired) return;

        const timeoutId = window.setTimeout(() => {
            submitQuiz(false);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [isExpired, quiz?.id, submitQuiz]);

    if (loadingQuiz) return <QuizQuestionSkeleton count={3} />;

    return (
        <>
            <InfomationBox>
                <QuizTimer
                    key={`${quiz?.id ?? "quiz"}-${initialTimeSeconds ?? "none"}`}
                    initialSeconds={initialTimeSeconds}
                    remainingQuestions={remainingQuestions}
                    onExpire={() => setIsExpired(true)}
                />
            </InfomationBox>
            <form onSubmit={handleSubmit}>
                {quiz?.questions?.map((question, index) => (
                    <Section key={question.id}>
                        <QuestionCard
                            question={question}
                            index={index}
                            selectedAnswers={answers[question.id] ?? []}
                            onChange={handleSingleChoice}
                        />
                    </Section>
                ))}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" $width="200px" disabled={loading}>
                        Nộp bài
                    </Button>
                </div>
            </form>
        </>
    );
}

const InfomationBox = styled.div`
    width: 150px;
    padding: 0.5em 1em;
    border: 0;
    border-radius: 0.5em;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #d1d2d6;
    z-index: 999;

    & > div {
        padding: 0;
        background-color: transparent;
    }

    @media (max-width: 768px) {
        top: 60px;
    }
`;

const TimerBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25em;

    .timer-value {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1f2937;
    }

    .timer-meta {
        font-size: 0.85rem;
        color: #4b5563;
    }
`;

const StyledQuestionCard = styled.div`
    .question {
        padding: 0.5em 1em;
        border: 0;
        border-radius: 0.5em;
        background-color: var(--color-surface);
    }

    .answers {
        ${baseFlex}
        flex-direction: column;
        gap: 0.5em;

        .radio-input {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .radio-input .label {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 0px 1em;

            cursor: pointer;
            height: 50px;
            margin-top: 0.5em;
            position: relative;
            z-index: 0;
        }

        .radio-input .label::before {
            position: absolute;
            content: "";
            inset: 0;
            z-index: -1;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-radius: 10px;
            border: 2px solid transparent;
        }
        .radio-input .label:hover::before {
            transition: all 0.2s ease;
            background-color: #dde3f8;
        }

        .radio-input .label.checked::before {
            background-color: #ced8ef;
            border-color: #a0aef7;
            height: 45px;
        }
        .radio-input .label .text {
            color: #fff;
        }

        .radio-input .label input[type="radio"] {
            background-color: #373750;
            appearance: none;
            width: 17px;
            height: 17px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .radio-input .label input[type="radio"]:checked {
            background-color: #435dd8;
            -webkit-animation: puls 0.7s forwards;
            animation: pulse 0.7s forwards;
        }

        .radio-input .label input[type="radio"]:before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
            background-color: #fff;
            transform: scale(0);
        }

        .radio-input .label input[type="radio"]:checked::before {
            transform: scale(1);
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
            }
            70% {
                box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
        }
    }
`;
