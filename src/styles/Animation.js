import styled, { keyframes } from "styled-components";

const blink = keyframes`
    0%, 100% {
        opacity: 1;
    }

    50% {
        opacity: 0.25;
    }
`;

export const AnimationWrapper = styled.div`
    animation: ${blink} 1.2s ease-in-out infinite;
`;
