import styled from "styled-components";

function Header() {
    return <HeaderStyle>Header</HeaderStyle>;
}

const HeaderStyle = styled.header`
    display: flex;
    align-items: center;
    min-height: 64px;
    padding: 0 24px;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-card);
    color: var(--color-text);
    font-weight: 700;
`;

export default Header;
