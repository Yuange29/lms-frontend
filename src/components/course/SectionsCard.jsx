import { Dialog, Overlay } from "./courses-style";
import { FormGroup, FormInput, FormLabel } from "../ui/form_ui";
import { H, Text } from "../ui/Text";
import { memo, useState } from "react";

import Button from "../ui/Button";
import { formatFirstLetter } from "./../../utils/format";
import { sectionService } from "./../../services/section.service";
import styled from "styled-components";
import { useConfirm } from "./../../hooks/confirmHook";
import { useLesson } from "./../../hooks/lessonHook";
import { useToast } from "../../hooks/toastHook";

function AddSectionCard({ isHide, courseId }) {
    const { toast } = useToast();

    const [error, setError] = useState(false);
    const [sectionName, setSectionName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        try {
            await sectionService.createSection(courseId, sectionName);
            toast.success("Chương đã được thêm thành công");
            setSectionName("");
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại");
            console.log("Add Section Error: ", error);
            setError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AddSectionWrapper $isHide={isHide}>
            <form onSubmit={handleSubmit}>
                <FormLabel htmlFor="section-name">Tên chương</FormLabel>
                <FormInput
                    type="text"
                    id="section-name"
                    placeholder="Chương 1: Giới thiệu về ..."
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang thêm..." : "Thêm"}
                </Button>
                <Button type="button" onClick={() => setSectionName("")}>
                    x
                </Button>
            </form>
            {error && (
                <Text color="danger" align="center">
                    Tên section không hợp lệ
                </Text>
            )}
        </AddSectionWrapper>
    );
}

const AddSectionWrapper = styled.div`
    width: 100%;
    display: ${({ $isHide }) => ($isHide ? "none" : "flex")};

    flex-direction: column;

    & > form {
        margin-top: 1em;
        width: 100%;
        display: flex;
        align-items: center;
    }
`;

function SectionsCard({ sections = [] }) {
    const { confirm } = useConfirm();
    const { selectedSection, setSelectedSection, createLesson, loading } =
        useLesson();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [video_url, setVideo_url] = useState("");
    const [duration, setDuration] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const openDialog = (id, title) => {
        setSelectedSection({ id, title });
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setSelectedSection(null);
    };

    const handleCancel = async () => {
        let isOk = await confirm({
            title: "Hủy tạo bài học!",
            desc: "bạn chắc chắn muốn hủy tạo bài học này chứ!",
        });

        if (!isOk) return;

        closeDialog();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSection?.id) return;

        await createLesson(
            selectedSection.id,
            title,
            content,
            video_url,
            Number(duration),
            false,
        );

        setTitle("");
        setContent("");
        setVideo_url("");
        setDuration("");
        closeDialog();
    };

    return (
        <SectionsCardWrapper>
            {sections?.map((section) => (
                <SectionCard
                    section={section}
                    key={section?.id}
                    btnClick={() => openDialog(section.id, section.title)}
                />
            ))}

            {isOpen && (
                <Overlay onClick={closeDialog}>
                    <Dialog onClick={(e) => e.stopPropagation()}>
                        <div className="dialog-header">
                            <div>
                                <H>Tạo bài học mới</H>
                                <Text color="muted">
                                    Chương: {selectedSection?.title}
                                </Text>
                            </div>

                            <button onClick={handleCancel}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <FormSectionWrapper onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel htmlFor="lesson-title">
                                    tiêu đề
                                </FormLabel>
                                <FormInput
                                    id="lesson-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="lesson-content">
                                    nội dung
                                </FormLabel>
                                <FormInput
                                    id="lesson-content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="lesson-video">
                                    vid url
                                </FormLabel>
                                <FormInput
                                    id="lesson-video"
                                    value={video_url}
                                    onChange={(e) =>
                                        setVideo_url(e.target.value)
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="lesson-duration">
                                    thời gian
                                </FormLabel>
                                <FormInput
                                    id="lesson-duration"
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                />
                            </FormGroup>

                            <Button
                                type="submit"
                                $width="200px"
                                disabled={loading}
                            >
                                {loading ? "đang tạo..." : "tạo"}
                            </Button>
                        </FormSectionWrapper>
                    </Dialog>
                </Overlay>
            )}
        </SectionsCardWrapper>
    );
}

const FormSectionWrapper = styled.form`
    margin-top: 0.5em;
`;

function SectionCard({ section, btnClick }) {
    const { loading: isAdd } = useLesson();

    const [showLessons, setShowLessons] = useState(false);

    return (
        <div key={section?.id} className="card-wrapper">
            <div className="header">
                <div>
                    <Text weight="bold">{section?.title}</Text>
                    <Text color="muted" size="sm">
                        Số bài học: {section?.lessons?.length ?? 0}
                    </Text>
                </div>

                <div>
                    <button onClick={btnClick}>
                        {isAdd ? (
                            "đang tạo..."
                        ) : (
                            <i className="fa-solid fa-plus"></i>
                        )}
                    </button>

                    <button onClick={() => setShowLessons((p) => !p)}>
                        {showLessons ? (
                            <i className="fa-solid fa-angle-up"></i>
                        ) : (
                            <i className="fa-solid fa-angle-down"></i>
                        )}
                    </button>
                </div>
            </div>

            <div>
                {section?.lessons && (
                    <LessonList
                        lessons={section?.lessons}
                        isHide={showLessons}
                    />
                )}
            </div>
        </div>
    );
}

const SectionsCardWrapper = styled.div`
    width: 100%;

    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .card-wrapper {
        margin-top: 1em;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-surface);
        padding: 0.8em 1.2em;
        border-radius: 0.5em;
    }

    button {
        width: 45px;
        height: 30px;
        margin-right: 0.4em;
        border: 0;
        border-radius: 4em;
        color: white;
        background-color: var(--color-primary);
    }

    .add-section-dialog {
        position: absolute;
        width: 200px;
        height: 200px;
        background-color: #fff;
    }
`;

function LessonList({ lessons, isHide }) {
    return (
        <LessonListWrapper $isHide={isHide}>
            {lessons?.length === 0 ? (
                <Text>Chưa có bài học nào.</Text>
            ) : (
                lessons?.map((lesson, l) => (
                    <div className="lesson" key={lesson?.id}>
                        <Text>
                            {l + 1}. {formatFirstLetter(lesson?.title)}
                        </Text>
                        <Text>
                            <i className="fa-solid fa-caret-right"></i>
                        </Text>
                    </div>
                ))
            )}
        </LessonListWrapper>
    );
}

const LessonListWrapper = styled.div`
    max-height: 200px;
    margin: 0 0 0 0.5em;
    padding: 0.5em 1em;
    border-left: 3px solid var(--color-surface);
    border-radius: 0 8px 8px 0;
    background-color: var(--color-surface-soft);
    display: ${({ $isHide }) => (!$isHide ? "none" : "flex")};
    flex-direction: column;
    align-items: center;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;

    .lesson {
        width: 100%;
        margin-top: 6px;
        padding: 0.5em 1em;
        border: 0;
        border-radius: 8px;
        background-color: var(--color-surface);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.2s ease-in;

        &:hover {
            background-color: #c9d0f9;
            transform: translateY(-2px);
            scale: 1.01;
        }
    }
`;

export { LessonList, AddSectionCard };
export default memo(SectionsCard);
