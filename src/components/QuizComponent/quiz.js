import styled from "styled-components";

export const QuizWrapper = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
`;

export const QuizHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export const QuizFormWrapper = styled.form`
    width: 100%;
`;

export const QuizForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const FieldRow = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
`;

export const Label = styled.label`
    min-width: 140px;
    color: var(--color-text-soft);
`;

export const Input = styled.input`
    flex: 1;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--color-surface-soft);
    background: var(--color-card);
    color: var(--color-text);
`;

export const TextArea = styled.textarea`
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--color-surface-soft);
    background: var(--color-card);
    color: var(--color-text);
`;

export const QuestionBox = styled.div`
    margin-top: 1em;
    padding: 0.75rem;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const AnswerRow = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

export const SmallInput = styled.input`
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    border: 1px solid var(--color-surface-soft);
    background: var(--color-card);
    color: var(--color-text);
`;

export const QuizInpuFrom = styled.input`
    width: 100%;
    min-height: 46px;
    margin-top: 1em;
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

export default {};
