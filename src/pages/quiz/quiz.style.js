import { CourseWrapper, CoursesWrapper } from "../course/course.style";

import { baseFlex } from "./../../styles/CommonStyles";
import styled from "styled-components";

export const QuizWrapper = styled(CoursesWrapper)`
    cursor: pointer;
`;

export const CourseCardWrapper = styled(CourseWrapper)`
    .indent {
        text-indent: 1em;
    }
`;

//Quiz Create Page
export const QuizCreateWrapper = styled.div`
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

// Quiz Display ( Do Quiz page)
export const InfomationBox = styled.div`
    padding: 0.5em 1em;
    border: 0;
    border-radius: 0.5em;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #d1d2d6;
    z-index: 999;

    & > div {
        padding: 0;
        background-color: transparent;
    }

    @media (max-width: 768px) {
        top: 60px;
    }
`;

export const TimerBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25em;

    .timer-value {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1f2937;
    }

    .timer-meta {
        font-size: 0.85rem;
        color: #4b5563;
    }
`;

export const StyledQuestionCard = styled.div`
    .question {
        padding: 0.5em 1em;
        border: 0;
        border-radius: 0.5em;
        background-color: var(--color-surface);
    }

    .answers {
        ${baseFlex}
        flex-direction: column;
        gap: 0.5em;

        .radio-input {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .radio-input .label {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 0px 1em;

            cursor: pointer;
            height: 50px;
            margin-top: 0.5em;
            position: relative;
            z-index: 0;
        }

        .radio-input .label::before {
            position: absolute;
            content: "";
            inset: 0;
            z-index: -1;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-radius: 10px;
            border: 2px solid transparent;
        }
        .radio-input .label:hover::before {
            transition: all 0.2s ease;
            background-color: #dde3f8;
        }

        .radio-input .label.checked::before {
            background-color: #ced8ef;
            border-color: #a0aef7;
            height: 45px;
        }
        .radio-input .label .text {
            color: #fff;
        }

        .radio-input .label input[type="radio"] {
            background-color: #373750;
            appearance: none;
            width: 17px;
            height: 17px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .radio-input .label input[type="radio"]:checked {
            background-color: #435dd8;
            -webkit-animation: puls 0.7s forwards;
            animation: pulse 0.7s forwards;
        }

        .radio-input .label input[type="radio"]:before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
            background-color: #fff;
            transform: scale(0);
        }

        .radio-input .label input[type="radio"]:checked::before {
            transform: scale(1);
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
            }
            70% {
                box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
        }
    }
`;

// Quiz result Page

const scoreToneStyles = {
    weak: {
        background: "#fee2e2",
        border: "#fca5a5",
        accent: "#ef4444",
        text: "#991b1b",
    },
    average: {
        background: "#fef3c7",
        border: "#fcd34d",
        accent: "#f59e0b",
        text: "#92400e",
    },
    good: {
        background: "#dcfce7",
        border: "#86efac",
        accent: "#22c55e",
        text: "#166534",
    },
};

export const ScoreWrapper = styled.div`
    width: 100%;
    padding: 1rem 1.25rem;
    border-radius: 16px;
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    align-items: center;
    gap: 1rem;
    border: 1px solid
        ${({ $tone }) =>
            scoreToneStyles[$tone]?.border || scoreToneStyles.good.border};
    background-color: ${({ $tone }) =>
        scoreToneStyles[$tone]?.background || scoreToneStyles.good.background};
    color: ${({ $tone }) =>
        scoreToneStyles[$tone]?.text || scoreToneStyles.good.text};
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    transition: all 0.25s ease;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ScoreInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

export const ScoreLabel = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    opacity: 0.9;
`;

export const ScoreBox = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    font-weight: 700;
    background-color: ${({ $tone }) =>
        scoreToneStyles[$tone]?.accent || scoreToneStyles.good.accent};
    color: #fff;

    & > span {
        font-weight: 1000;
        font-size: 1.8em;
        margin-right: 0.25em;
    }

    @media (max-width: 768px) {
        width: calc(100% - 120px);
        margin: 0 auto;
    }
`;
