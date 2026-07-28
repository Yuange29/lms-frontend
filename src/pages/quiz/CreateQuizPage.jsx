import {
    QuestionBox,
    QuizCreateWrapper,
    QuizFormWrapper,
    QuizHeader,
    QuizWrapper,
} from "./quiz.style";
import { getIdsFromPath, navigate, navigateBack } from "../../utils/navigate";
import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";
import CourseItemSkeleton from "../course/components/CourseLoading";
import { FormContainer } from "../../components/ui/form_ui/FormContainer";
import FormGroup from "../../components/ui/form_ui/FormGroup";
import { QuizInpuFrom as FormInput } from "./quiz.style";
import FormLabel from "../../components/ui/form_ui/FormLabel";
import FormTitle from "../../components/ui/form_ui/FormTitle";
import { Text } from "../../components/ui/Text";
import answerService from "../../services/answer.service";
import questionService from "../../services/question.service";
import quizService from "../../services/quiz.service";
import { useConfirm } from "../../hooks/confirmHook";
import { useCourse } from "../../hooks/courseHook";
import { useToast } from "../../hooks/toastHook";

export default function CreateQuizPage() {
    const id = getIdsFromPath("course");

    const { course, getCourseDetail } = useCourse();
    const { toast } = useToast();
    const { confirm } = useConfirm();

    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timeLimit, setTimeLimit] = useState(60);
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
            if (!id.course) return;
            try {
                await getCourseDetail(id.course);
                if (!mounted) return;
            } catch (err) {
                navigateBack();
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [getCourseDetail, toast]);

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
                course.id,
                title,
                description,
                timeLimit || undefined,
            );

            if (!quiz.id)
                throw new Error("Không lấy được quiz_id sau khi tạo quiz");

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
                const quizDetail = await quizService.getQuiz(
                    course?.id,
                    quiz?.id,
                );
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
                    const is_correct = j === 0;
                    await answerService.createAnswer(
                        questionId,
                        text,
                        is_correct,
                    );
                }
            }

            navigate(`/course/${course.id}`);
            toast.success("Tạo quiz thành công!");
        } catch (err) {
            console.log(err);
            toast.error("Tạo quiz thất bại!");
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
        <QuizCreateWrapper>
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
                            placeholder="Bài kiểm tra thường kì"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Mô tả</FormLabel>
                        <FormInput
                            as="textarea"
                            placeholder="Bài kiểm tra 60' thường kì"
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
                            placeholder="60"
                            required
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
        </QuizCreateWrapper>
    );
}
