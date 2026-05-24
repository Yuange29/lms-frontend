import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children }) {
    return (
        <LayoutStyle>
            <Header />
            <Body>{children}</Body>
            <Footer />
        </LayoutStyle>
    );
}

const LayoutStyle = styled.div`
    display: flex;
    min-height: 100svh;
    flex-direction: column;
    background-color: var(--color-background);
`;

export default MainLayout;
