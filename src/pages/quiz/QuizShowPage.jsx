import { useCallback, useEffect, useMemo, useState } from "react";

import Button from "../../components/ui/Button";
import { InfomationBox } from "./quiz.style";
import { QuestionCard } from "./components/QuestionCard";
import QuizQuestionSkeleton from "../../components/loading/QuestionSkeleton";
import { QuizTimer } from "./components/QuizTimer";
import { Section } from "../../components/ui/Section";
import { navigate } from "../../utils/navigate";
import { shuffleQuiz } from "../../utils/format";
import { submissionService } from "../../services/submission.service";
import { useConfirm } from "../../hooks/confirmHook";
import { useQuiz } from "../../hooks/quizHook";
import { useToast } from "../../hooks/toastHook";

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

export default function QuizShowPage() {
    const id = useMemo(() => getIdFromPath(), []);
    const courseId = id?.courseId;
    const quizId = id?.quizId;
    const [questions, setQuestions] = useState(null);

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
                    navigate(`/course/${courseId}`);
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
            const fetchedQuiz = await getQuiz(currentCourseId, currentQuizId);
            const quizQuestions =
                fetchedQuiz?.questions ?? fetchedQuiz?.quiz?.questions ?? [];
            setQuestions(shuffleQuiz(quizQuestions));
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

    const initialTimeSeconds = quiz?.time_limit
        ? Number(quiz.time_limit) * 60
        : null;

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
                    onExpire={() => setIsExpired(true)}
                />
            </InfomationBox>
            <form onSubmit={handleSubmit}>
                {questions?.map((question, index) => (
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
