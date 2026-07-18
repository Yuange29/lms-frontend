import styled from "styled-components";

function Section({ id, children }) {
    return (
        <SectionStyle id={id}>
            <MainContent>{children}</MainContent>
        </SectionStyle>
    );
}

function MainContent({ children }) {
    return <ContentStyle>{children}</ContentStyle>;
}

const SectionStyle = styled.section`
    width: 100%;
    margin-top: 1em;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    border: 0;
    background-color: var(--color-section);
`;

const ContentStyle = styled.div`
    padding: 0.5em;
`;

export { Section };
