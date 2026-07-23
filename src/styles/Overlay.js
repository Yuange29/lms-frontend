import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: grid;
    place-items: center;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(3px);
`;
