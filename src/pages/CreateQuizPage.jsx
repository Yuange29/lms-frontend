import {
    QuestionBox,
    QuizFormWrapper,
    QuizHeader,
    QuizWrapper,
} from "../components/QuizComponent/quiz";
import { navigate, navigateBack } from "../utils/navigate";
import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import CourseItemSkeleton from "../components/loading/CourseItemSkeleton";
import { FormContainer } from "../components/ui/form_ui/FormContainer";
import FormGroup from "../components/ui/form_ui/FormGroup";
import { QuizInpuFrom as FormInput } from "../components/QuizComponent/quiz";
import FormLabel from "../components/ui/form_ui/FormLabel";
import FormTitle from "../components/ui/form_ui/FormTitle";
import { Text } from "../components/ui/text";
import answerService from "../services/answer.service";
import { courseService } from "../services/course.service";
import questionService from "../services/question.service";
import quizService from "../services/quiz.service";
import { useConfirm } from "./../hooks/confirmHook";

function getCourseIdFromPath() {
    const segments = window.location.pathname.split("/").filter(Boolean);

    if (segments[0] !== "course-info") return "";
    const middle = segments.slice(1, -1);
    return middle.join("/");
}

export default function CreateQuizPage() {
    const courseId = getCourseIdFromPath();

    const { confirm } = useConfirm();
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timeLimit, setTimeLimit] = useState(0);
    const [numQuestions, setNumQuestions] = useState(1);

    const [questions, setQuestions] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const handleCancel = async () => {
        const isOk = await confirm({
            title: "Chắc chắc muốn thoát ?",
            desc: "quiz mẫu sẽ không lưu",
        });

        if (!isOk) return;

        navigateBack();
    };

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const res = await courseService.getCourseInfo(courseId);
                if (!mounted) return;
                setCourse(res.course || res);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [courseId]);

    useEffect(() => {
        setQuestions((prev) => {
            const next = [];
            for (let i = 0; i < numQuestions; i++) {
                if (prev[i]) next.push(prev[i]);
                else
                    next.push({
                        questionText: "",
                        answers: ["", "", "", ""],
                        correctIndex: 0,
                    });
            }
            return next;
        });
    }, [numQuestions]);

    function updateQuestion(idx, patch) {
        setQuestions((prev) => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], ...patch };
            return copy;
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);

        try {
            const quiz = await quizService.createQuiz(
                courseId,
                title,
                description,
                timeLimit || undefined,
            );

            if (!quiz.id)
                throw new Error("Không lấy được quiz_id sau khi tạo quiz");

            // cho id để tránh trùng lặp
            const localQuestionMap = [];

            for (let i = 0; i < questions.length; i++) {
                const q = questions[i];
                const createdQ = await questionService.createQuestion(
                    quiz.id,
                    q.questionText,
                );

                localQuestionMap.push({
                    index: i,
                    id: createdQ.id,
                    text: q.questionText,
                });
            }

            const missing = localQuestionMap.filter((m) => !m.id);
            if (missing.length > 0) {
                const quizDetail = await quizService.getQuiz(courseId, quizId);
                const remoteQuestions =
                    quizDetail.quiz?.questions ||
                    quizDetail.questions ||
                    quizDetail.quiz?.sections?.flatMap(
                        (s) => s.quizzes || s.quiz || [],
                    ) ||
                    [];

                for (const m of missing) {
                    const found = remoteQuestions.find(
                        (rq) =>
                            (rq.question_text || rq.title || rq.text) ===
                            m.text,
                    );
                    if (found)
                        m.id = found.id || found._id || found.question_id;
                }
            }

            for (const m of localQuestionMap) {
                const q = questions[m.index];
                const questionId = m.id;
                if (!questionId) {
                    console.warn(
                        "Skipping answers for question without id:",
                        q.questionText,
                    );
                    continue;
                }

                for (let j = 0; j < q.answers.length; j++) {
                    const text = q.answers[j];
                    const is_correct = j === 0; // first answer is correct
                    await answerService.createAnswer(
                        questionId,
                        text,
                        is_correct,
                    );
                }
            }

            navigate(`/course-info/${courseId}`);
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <QuizWrapper>
                <CourseItemSkeleton />
            </QuizWrapper>
        );
    }

    return (
        <QuizWrapper>
            <QuizHeader>
                <Text color="muted">Khóa học</Text>
                <div>
                    {course ? (
                        <Text weight="bold" size="lg">
                            {course.title || course.name || course.course_title}
                        </Text>
                    ) : (
                        <em>Khóa học không tìm thấy</em>
                    )}
                </div>
            </QuizHeader>

            <FormContainer>
                <QuizFormWrapper onSubmit={handleSubmit}>
                    <FormTitle>Thêm thông tin </FormTitle>

                    <FormGroup>
                        <FormLabel>Tiêu đề</FormLabel>
                        <FormInput
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Mô tả</FormLabel>
                        <FormInput
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Thời gian (phút)</FormLabel>
                        <FormInput
                            type="number"
                            value={timeLimit}
                            onChange={(e) =>
                                setTimeLimit(Number(e.target.value))
                            }
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Số câu trắc nghiệm</FormLabel>
                        <FormInput
                            type="number"
                            min={1}
                            value={numQuestions}
                            onChange={(e) =>
                                setNumQuestions(
                                    Math.max(1, Number(e.target.value) || 1),
                                )
                            }
                        />
                    </FormGroup>

                    {questions.map((q, qi) => (
                        <QuestionBox key={qi}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <strong>Câu {qi + 1}</strong>
                            </div>

                            <FormGroup>
                                <FormLabel>Nội dung câu hỏi</FormLabel>
                                <FormInput
                                    placeholder="Nhập nội dung câu hỏi"
                                    value={q.questionText}
                                    onChange={(e) =>
                                        updateQuestion(qi, {
                                            questionText: e.target.value,
                                        })
                                    }
                                />
                            </FormGroup>

                            <div>
                                {q.answers.map((a, ai) => (
                                    <FormGroup key={ai}>
                                        <FormInput
                                            placeholder={
                                                ai === 0
                                                    ? "câu trả lời đúng"
                                                    : `Đáp án ${ai + 1}`
                                            }
                                            value={a}
                                            onChange={(e) => {
                                                const newAnswers = [
                                                    ...q.answers,
                                                ];
                                                newAnswers[ai] = e.target.value;
                                                updateQuestion(qi, {
                                                    answers: newAnswers,
                                                    correctIndex: 0,
                                                });
                                            }}
                                        />
                                    </FormGroup>
                                ))}
                            </div>
                        </QuestionBox>
                    ))}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <Button
                            type="button"
                            $width="30%"
                            variant="danger"
                            onClick={() => handleCancel()}
                        >
                            Huỷ
                        </Button>
                        <Button
                            $width="30%"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Đang tạo..." : "Tạo Quiz"}
                        </Button>
                    </div>
                </QuizFormWrapper>
            </FormContainer>
        </QuizWrapper>
    );
}
