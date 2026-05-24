import styled from "styled-components";

function Footer() {
    return <FooterStyle>Footer</FooterStyle>;
}

const FooterStyle = styled.footer`
    display: flex;
    align-items: center;
    min-height: 56px;
    padding: 0 24px;
    border-top: 1px solid var(--color-border);
    background-color: var(--color-card);
    color: var(--color-text-muted);
    font-size: 0.875rem;
`;

export default Footer;
