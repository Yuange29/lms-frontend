import { CourseCardWrapper, QuizWrapper } from "./quiz-style";
import { H, Text } from "../ui/text";

import { memo } from "react";
import { navigate } from "./../../utils/navigate";

function QuizzesInfo({ quizzes, children }) {
    return (
        <>
            <H>Các quiz</H>
            <QuizWrapper>
                {quizzes?.map((quiz) => (
                    <QuizCard quiz={quiz} key={quiz.id} />
                ))}
                {children}
            </QuizWrapper>
        </>
    );
}

export function QuizCard({ quiz }) {
    return (
        <CourseCardWrapper onClick={() => navigate(`quiz/${quiz?.id}`)}>
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
}

export default memo(QuizzesInfo);
