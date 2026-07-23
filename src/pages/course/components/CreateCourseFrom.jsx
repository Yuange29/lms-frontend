import {
    CloseButton,
    Dialog,
    DialogActions,
    DialogForm,
    DialogHeader,
} from "../../../styles/Dialog";
import {
    FormGroup,
    FormInput,
    FormLabel,
} from "../../../components/ui/form_ui";

import Button from "../../../components/ui/Button";
import { Overlay } from "../../../styles/Overlay";
import { useCourse } from "../../../hooks/courseHook";
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="button" onClick={() => setOpen(true)}>
                    Thêm khóa học
                </Button>
            </div>
            {open ? (
                <Overlay>
                    <Dialog onClick={(event) => event.stopPropagation()}>
                        <DialogHeader>
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
