import styled from "styled-components";

const FormInput = styled.input`
    width: 100%;
    min-height: 46px;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    color: var(--color-text);
    font-size: 0.95rem;
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }

    &::placeholder {
        color: var(--color-text-muted);
    }

    &:disabled {
        background-color: var(--color-secondary);
        cursor: not-allowed;
        opacity: 0.65;
    }
`;

export default FormInput;
