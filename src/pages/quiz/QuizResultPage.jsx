import { ScoreBox, ScoreLabel, ScoreWrapper } from "./quiz.style";
import { memo, useEffect, useMemo, useRef } from "react";

import { HeaderCard } from "../../components/ui/Text";
import { InfomationCard } from "../../components/InfomationLabel";
import { Section } from "../../components/ui/Section";
import { SubmissionCard } from "./components/QuestionCard";
import { getIdsFromPath } from "../../utils/navigate";
import { useQuiz } from "./../../hooks/quizHook";
import { useSubmisson } from "../../hooks/submissonHook";

function QuizResultPage() {
    const { submission, getSubmission } = useSubmisson();
    const { quiz, getQuiz } = useQuiz();
    const hasFetchedRef = useRef(false);

    // console.log("quiz", quiz);
    // console.log("sub", submission);

    const scoreValue = Number(submission?.score ?? 0);
    const totalQuestions = Number(submission?.total_questions ?? 0);

    const correctAns = useMemo(() => {
        if (!totalQuestions) return 0;
        return Math.round((scoreValue / 10) * totalQuestions);
    }, [scoreValue, totalQuestions]);

    const scoreMeta = useMemo(() => {
        if (scoreValue < 5) {
            return {
                tone: "weak",
                label: "Yếu",
            };
        }

        if (scoreValue < 8) {
            return {
                tone: "average",
                label: "Trung bình",
            };
        }

        return {
            tone: "good",
            label: "Giỏi",
        };
    }, [scoreValue]);

    useEffect(() => {
        if (hasFetchedRef.current) return;

        hasFetchedRef.current = true;

        const fetchSubmission = async () => {
            const id = getIdsFromPath("course", "quiz");
            await Promise.all([
                getSubmission(id.quiz),
                getQuiz(id.course, id.quiz),
            ]);
        };

        fetchSubmission();
    }, [getSubmission, getQuiz]);

    return (
        <>
            <HeaderCard title={"Thông tin bài tập"} />
            <Section>
                <ScoreWrapper $tone={scoreMeta.tone}>
                    <div class="info">
                        <InfomationCard label="Bài tập" content={quiz?.title} />
                        <InfomationCard
                            label="Thời gian"
                            content={`${quiz?.time_limit} phút`}
                        />
                        <InfomationCard
                            label="Số câu đúng"
                            content={`${correctAns} / ${totalQuestions}`}
                        />
                    </div>

                    <div class="score">
                        <ScoreLabel>{scoreMeta.label}</ScoreLabel>
                        <ScoreBox $tone={scoreMeta.tone}>
                            <span>{submission?.score ?? 0}</span> điểm
                        </ScoreBox>
                    </div>
                </ScoreWrapper>
            </Section>

            <HeaderCard title={"Chi tiết bài tập"} />

            {submission?.detail.map((question) => (
                <SubmissionCard
                    key={question?.submission_id}
                    question={question?.question_text}
                    isTrue={question?.is_correct}
                    correct_ans={question?.correct_answers[0].answer_text}
                    sub_ans={question?.selected_answers[0].answer_text}
                />
            ))}
        </>
    );
}

export default memo(QuizResultPage);
