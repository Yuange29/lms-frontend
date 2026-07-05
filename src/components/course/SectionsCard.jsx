import { Dialog, Overlay } from "./courses-style";
import { FormInput, FormLabel, FormWrapper } from "../ui/form_ui";
import { H, Text } from "../ui/text";
import { memo, useState } from "react";

import Button from "../ui/Button";
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
            const res = await sectionService.createSection(
                courseId,
                sectionName,
            );
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

function SectionsCard({ sections }) {
    return (
        <SectionsCardWrapper>
            {sections?.map((section) => (
                <SectionCard section={section} key={section?.id} />
            ))}
        </SectionsCardWrapper>
    );
}

function SectionCard({ section }) {
    const { loading: isAdd, selectedSection, createLesson } = useLesson();
    const { confirm } = useConfirm();

    const [isOpen, setIsOpen] = useState(false);
    const [showLessons, setShowLessons] = useState(false);

    const handleCancel = async () => {
        let isOk = await confirm({
            title: "Hủy tạo bài học!",
            desc: "bạn chắc chắn muốn hủy tạo bài học này chứ!",
        });

        if (!isOk) return;

        setIsOpen(false);
    };

    return (
        <div key={section?.id} className="card-wrapper">
            <div class="header">
                <div>
                    <Text weight="bold">{section?.title}</Text>
                    <Text color="muted" size="sm">
                        Số bài học: {section?.lessons?.lenght | 0}
                    </Text>
                </div>

                <div>
                    <button onClick={() => setIsOpen((p) => !p)}>
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

            <div class="lesson-wrapper">
                {section?.lessons && (
                    <LessonList
                        lessons={section?.lessons}
                        isHide={showLessons}
                    />
                )}
            </div>

            {isOpen && (
                <Overlay>
                    <Dialog>
                        <div class="dialog-header">
                            <div>
                                <H>Tạo bài học mới</H>
                                <Text color="muted">
                                    Chương: {selectedSection?.title}
                                </Text>
                            </div>

                            <button onClick={() => handleCancel()}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <FormWrapper>thêm inout</FormWrapper>
                    </Dialog>
                </Overlay>
            )}
        </div>
    );
}

const SectionsCardWrapper = styled.div`
    width: 100%;

    .card-wrapper {
        margin-top: 1em;

        .dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
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

    .lesson-wrapper {
        margin-left: 1em;
    }

    .add-section-dialog {
        position: absolute;
        width: 200px;
        height: 200px;
        background-color: #fff;
    }
`;

// sections => [ {
//  courseid, create at, id, order_index, title, lessons
//  lessons => [ { courseid, create at, id, order_index, title } ]
// }, {},...]

function LessonList({ lessons, isHide }) {
    return (
        <LessonListWrapper $isHide={isHide}>
            {lessons?.length === 1 ? (
                <Text>Chưa có bài học nào.</Text>
            ) : (
                lessons?.map((lesson) => <div className="lesson">Tiêu đề</div>)
            )}
        </LessonListWrapper>
    );
}

const LessonListWrapper = styled.div`
    max-height: 400px;
    margin: 0.5em 0 0 0.5em;
    padding: 0.5em 1em;
    border-radius: 8px;
    background-color: var(--color-surface-soft);
    display: ${({ $isHide }) => (!$isHide ? "none" : "flex")};
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .lesson {
        color: black;
    }
`;

export { LessonList, AddSectionCard };
export default memo(SectionsCard);
