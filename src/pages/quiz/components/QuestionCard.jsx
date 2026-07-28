import { StyledQuestionCard } from "../quiz.style";
import { SubmissionCardWrapper } from "../quiz.style";
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

const SubmissionCard = memo(function SubmissionCard({
    question,
    isTrue,
    correct_ans,
    sub_ans,
}) {
    return (
        <SubmissionCardWrapper $isTrue={isTrue}>
            <Text size="sm" color="muted">
                Câu hỏi
            </Text>
            <div className="question-box">
                <Text size="lg">{question}</Text>
            </div>

            {isTrue ? (
                <>
                    <div className="ans">
                        <div className="rightIcon">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <Text className="right" size="lg">
                            {formatFirstLetter(correct_ans)}
                        </Text>
                    </div>
                </>
            ) : (
                <>
                    <Text size="sm" color="muted">
                        Đáp án án đúng
                    </Text>
                    <div className="ans">
                        <div class="rightIcon">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <Text className="right" size="lg">
                            {formatFirstLetter(correct_ans)}
                        </Text>
                    </div>

                    <Text size="sm" color="muted">
                        Đáp án bạn chọn
                    </Text>
                    <div className="ans">
                        <div class="falseIcon">
                            <i className="fa-solid fa-x"></i>
                        </div>
                        <Text className="false" size="lg">
                            {formatFirstLetter(sub_ans)}
                        </Text>
                    </div>
                </>
            )}
        </SubmissionCardWrapper>
    );
});

export { QuestionCard, SubmissionCard };
