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
    margin-bottom: ${({ $bottom }) => $bottom || "0"};
    margin-left: ${({ $left }) => $left || "0"};
    margin-right: ${({ $right }) => $right || "0"};
    background: var(--color-surface-soft);
    border-radius: 0.5em;
    animation: ${blink} 1.2s ease-in-out infinite;
`;

// use for letter
export const LoadingLine = styled.div`
    height: 10px;
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
    height: ${({ $width }) => $width || "100%"};
    ${baseCss}
`;
