import {
    LoadingLine,
    LoadingQuestionCard,
    LoadingRectangle,
} from "./loading-style";

function QuestionSkeleton() {
    return (
        <LoadingQuestionCard>
            <LoadingLine $width="100px" />
            <LoadingRectangle $width="90%" $height="100px" />
            <LoadingRectangle $width="20%" $height="35px" />
            <LoadingRectangle $width="60%" $height="35px" />
            <LoadingRectangle $width="45%" $height="35px" />
            <LoadingRectangle $width="50%" $height="35px" />
        </LoadingQuestionCard>
    );
}

function QuizQuestionSkeleton({ count = 3 }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {Array.from({ length: count }).map((_, index) => (
                <QuestionSkeleton key={index} />
            ))}
        </div>
    );
}

export default QuizQuestionSkeleton;
export { QuestionSkeleton, QuizQuestionSkeleton };
