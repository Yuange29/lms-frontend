import styled from "styled-components";

export default function AuthLayout({ children }) {
    return <AuthContainer>{children}</AuthContainer>;
}

const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-background);
`;
