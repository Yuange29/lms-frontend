import styled from "styled-components";

const FormInput = styled.input`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-surface);
    color: var(--color-text);
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-soft);
    }

    &::placeholder {
        color: var(--color-text-muted);
    }

    &:disabled {
        background-color: var(--color-secondary);
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

export default FormInput;
