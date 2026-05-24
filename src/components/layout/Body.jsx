import styled from "styled-components";

function Body({ children }) {
    return <BodyStyle>{children}</BodyStyle>;
}

const BodyStyle = styled.main`
    flex: 1;
    width: 100%;
    padding: 24px;
    background-color: var(--color-background);
`;

export default Body;
