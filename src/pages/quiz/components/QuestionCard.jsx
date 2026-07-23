import { StyledQuestionCard } from "../quiz.style";
import { Text } from "../../../components/ui/Text";
import { formatFirstLetter } from "../../../utils/format";
import { memo } from "react";

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

export { QuestionCard };
