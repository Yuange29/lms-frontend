import styled from "styled-components";

export const Dialog = styled.div`
    width: min(600px, calc(100% - 32px));
    border-radius: 1em;
    padding: 1em;
    background: var(--color-primary-soft);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.24);
    color: var(--color-text);
`;

export const DialogHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 12px;
    margin-bottom: 20px;
`;

export const CloseButton = styled.button`
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    font-size: 18px;

    &:hover {
        opacity: 0.8;
        scale: 1.02;
    }
`;

export const DialogForm = styled.form`
    display: grid;
    gap: 18px;
`;

export const DialogBody = styled.div`
    display: grid;
    gap: 0.5em;
`;

export const DialogActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 8px;

    .remove-btn {
        justify-self: start;
    }
`;
