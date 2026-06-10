import { useRef, useState } from "react";

import styled from "styled-components";

export default function FormFileInput({
    id,
    name,
    onChange,
    disabled = false,
    accept = "image/*",
    ...props
}) {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onChange?.(e);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <HiddenInput
                ref={fileInputRef}
                id={id}
                type="file"
                name={name}
                onChange={handleFileChange}
                disabled={disabled}
                accept={accept}
                {...props}
            />
            <FileInputButton
                type="button"
                onClick={handleClick}
                disabled={disabled}
            >
                {fileName || "Chọn file"}
            </FileInputButton>
        </>
    );
}

const HiddenInput = styled.input`
    display: none;
`;

const FileInputButton = styled.button`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;

    &:hover:not(:disabled) {
        border-color: var(--color-primary);
        background-color: var(--color-primary-soft);
    }

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-soft);
    }

    &:disabled {
        background-color: var(--color-secondary);
        cursor: not-allowed;
        opacity: 0.6;
    }
`;
