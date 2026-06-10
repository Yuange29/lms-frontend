import { FormGroup, FormInput, FormLabel } from "../form_ui";

import Button from "../ui/Button";
import styled from "styled-components";
import { useCourse } from "../../hooks/courseHook";
import { useState } from "react";

export function CreateCourseForm() {
    const { createCourse, loading } = useCourse();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [price, setPrice] = useState("");

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setThumbnailUrl("");
        setPrice("");
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await createCourse(title, description, thumbnailUrl, Number(price));
        handleClose();
    };

    return (
        <>
            <Button type="button" onClick={() => setOpen(true)}>
                Thêm khóa học
            </Button>

            {open ? (
                <Overlay>
                    <Dialog onClick={(event) => event.stopPropagation()}>
                        <DialogHeader>
                            <DialogTitle>Tạo khóa học mới</DialogTitle>
                            <CloseButton
                                type="button"
                                onClick={handleClose}
                                aria-label="Đóng dialog"
                            >
                                ×
                            </CloseButton>
                        </DialogHeader>

                        <DialogForm onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel htmlFor="course-title">
                                    Tiêu đề
                                </FormLabel>
                                <FormInput
                                    id="course-title"
                                    type="text"
                                    placeholder="Nhập tiêu đề khóa học"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="course-description">
                                    Mô tả
                                </FormLabel>
                                <FormInput
                                    as="textarea"
                                    id="course-description"
                                    rows={5}
                                    placeholder="Nhập mô tả ngắn gọn"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="course-thumbnail">
                                    URL ảnh đại diện
                                </FormLabel>
                                <FormInput
                                    id="course-thumbnail"
                                    type="url"
                                    placeholder="https://..."
                                    value={thumbnailUrl}
                                    onChange={(event) =>
                                        setThumbnailUrl(event.target.value)
                                    }
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="course-price">
                                    Giá
                                </FormLabel>
                                <FormInput
                                    id="course-price"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={price}
                                    onChange={(event) =>
                                        setPrice(event.target.value)
                                    }
                                    required
                                />
                            </FormGroup>

                            <DialogActions>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setOpen(false)}
                                >
                                    Hủy
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Đang lưu..." : "Lưu khóa học"}
                                </Button>
                            </DialogActions>
                        </DialogForm>
                    </Dialog>
                </Overlay>
            ) : null}
        </>
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: grid;
    place-items: center;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(3px);
`;

const Dialog = styled.div`
    width: min(600px, calc(100% - 32px));
    border-radius: 24px;
    padding: 24px;
    background: var(--color-surface);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.24);
    color: var(--color-text);
`;

const DialogHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
`;

const DialogTitle = styled.h2`
    margin: 0;
    font-size: 1.25rem;
    color: var(--color-text);
`;

const CloseButton = styled.button`
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background: var(--color-background);
    color: var(--color-text);
    cursor: pointer;
    font-size: 1.25rem;

    &:hover {
        background: var(--color-secondary);
    }
`;

const DialogForm = styled.form`
    display: grid;
    gap: 18px;
`;

const DialogActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 8px;
`;
