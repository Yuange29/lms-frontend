import { ScoreBox, ScoreInfo, ScoreLabel, ScoreWrapper } from "./quiz.style";
import { memo, useEffect, useMemo, useRef } from "react";

import { Section } from "../../components/ui/Section";
import { Text } from "../../components/ui/Text";
import { getIdsFromPath } from "../../utils/navigate";
import { useQuiz } from "./../../hooks/quizHook";
import { useSubmisson } from "../../hooks/submissonHook";

function QuizResultPage() {
    const { submission, getSubmission } = useSubmisson();
    const { quiz, getQuiz } = useQuiz();
    const hasFetchedRef = useRef(false);

    console.log("quiz", quiz);
    console.log("sub", submission);

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
        <Section>
            <ScoreWrapper $tone={scoreMeta.tone}>
                <ScoreInfo>
                    <Text weight="bold" size="xl">
                        {`${correctAns} / ${totalQuestions} câu đúng`}
                    </Text>
                    <ScoreLabel>{scoreMeta.label}</ScoreLabel>
                </ScoreInfo>

                <ScoreBox $tone={scoreMeta.tone}>
                    <span>{submission?.score ?? 0}</span> điểm
                </ScoreBox>
            </ScoreWrapper>
        </Section>
    );
}

export default memo(QuizResultPage);
