import styled from "styled-components";

function Footer() {
    return (
        <FooterStyle>
            <ContentStyle>logo</ContentStyle>
            <ContentStyle>
                <Contact>Tên Web: ..............</Contact>
                <Contact>Thời gian tạo: ........</Contact>
                <Contact>sdg</Contact>
            </ContentStyle>
            <ContentStyle>dfgd</ContentStyle>
        </FooterStyle>
    );
}

const FooterStyle = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 56px;
    padding: 0 1.5em;
    border-top: 1px solid var(--color-border);
    background-color: var(--color-card);
    color: var(--color-text-muted);
    font-size: 0.875rem;

    @media (max-width: 400px) {
        flex-direction: column;
        gap: 1em;
    }
`;

const ContentStyle = styled.div`
    padding: 0.5em 1em;
    flex: 1;
`;
const Contact = styled.div`
    padding: 0.5em 1em;
    flex: 1;
`;

export default Footer;
