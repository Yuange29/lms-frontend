import styled from "styled-components";

import Button from "../components/ui/Button";

export default function HomePage() {
    return (
        <HomePageStyle>
            <Button onClick={() => {}} navigate="/setting" isDanger={true}>
                Click me
            </Button>
        </HomePageStyle>
    );
}

const HomePageStyle = styled.div``;
