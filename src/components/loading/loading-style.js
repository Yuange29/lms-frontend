import styled, { css, keyframes } from "styled-components";

const blink = keyframes`
    0%, 100% {
        opacity: 0.75;
    }
    
    25%, 75% {
        opacity: 0.5;
    }

    50% {
        opacity: 0.25;
    }
`;

const baseCss = css`
    width: ${({ $width }) => $width || "100%"};
    margin-top: ${({ $top }) => $top || "0"};
    margin-bottom: ${({ $bottom }) => $bottom || "10px"};
    margin-left: ${({ $left }) => $left || "0"};
    margin-right: ${({ $right }) => $right || "0"};
    background: #cfdcfc;
    border-radius: 0.5em;
    animation: ${blink} 1.2s ease-in-out infinite;
`;

// use for letter
export const LoadingLine = styled.div`
    height: 1em;
    border-radius: 999px;
    ${baseCss}
`;

// use for img / icon
export const LoadingSquare = styled.div`
    height: ${({ $width }) => $width || "100%"};
    ${baseCss}
`;

export const LoadingRectangle = styled.div`
    height: ${({ $height }) => $height || "100%"};
    ${baseCss}
`;

// use for avata
export const LoadingCircle = styled.div`
    ${baseCss}
    height: ${({ $width }) => $width || "100%"};
    border-radius: 50%;
`;

export const LoadingDivWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
    border: 2px solid rgba(0, 0, 0, 0.044);
    border-radius: 8px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.305);
`;

export const LoadingQuestionCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const LoadingQuestionTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
