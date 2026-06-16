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
    padding: 0.75rem;
    border-radius: 8px;
    background: var(--color-surface);
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

export const Button = styled.button`
    padding: 0.6rem 0.9rem;
    border-radius: 6px;
    border: none;
    background: var(--color-primary);
    color: white;
    cursor: pointer;
`;

export default {};
