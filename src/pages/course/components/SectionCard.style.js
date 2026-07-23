import styled from "styled-components";

export const FormSectionWrapper = styled.form`
    margin-top: 0.5em;
`;

export const AddSectionWrapper = styled.div`
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

export const SectionsCardWrapper = styled.div`
    width: 100%;

    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .card-wrapper {
        margin-top: 1em;
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

    .add-section-dialog {
        position: absolute;
        width: 200px;
        height: 200px;
        background-color: #fff;
    }
`;

export const LessonListWrapper = styled.div`
    max-height: 200px;
    margin: 0 0 0 0.5em;
    padding: 0.5em 1em;
    border-left: 3px solid var(--color-surface);
    border-radius: 0 8px 8px 0;
    background-color: var(--color-surface-soft);
    display: ${({ $isHide }) => (!$isHide ? "none" : "flex")};
    flex-direction: column;
    align-items: center;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;

    .lesson {
        width: 100%;
        margin-top: 6px;
        padding: 0.5em 1em;
        border: 0;
        border-radius: 8px;
        background-color: var(--color-surface);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.2s ease-in;

        &:hover {
            background-color: #c9d0f9;
            transform: translateY(-2px);
            scale: 1.01;
        }
    }
`;
