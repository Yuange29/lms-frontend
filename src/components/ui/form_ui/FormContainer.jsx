import styled from "styled-components";

export const FormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 1rem;
`;

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 560px;
    padding: 2rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 24px;
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.16);
`;

export const FormLinkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
`;

export const FormLinkText = styled.span`
    font-size: 0.95rem;
    color: var(--color-text-soft);
`;

export const FormLinkButton = styled.button`
    padding: 0;
    font-size: 0.95rem;
    min-height: auto;
    border: none;
    background: transparent;
    box-shadow: none;
    text-decoration: underline;
    color: var(--color-primary);
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
        color: var(--color-primary-hover);
    }

    &:focus {
        outline: 2px solid var(--color-focus-ring);
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
