import styled from "styled-components";

const FormTitle = styled.h1`
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-text);
    text-align: ${({ $align }) => $align || "center"};
    margin: 0.5rem;
`;

export default FormTitle;
