import styled from "styled-components";

import Button from "../components/ui/Button";
import { H } from "../components/ui/Text";

export default function HomePage() {
    return (
        <HomePageStyle>
            <H align="center">Home Page</H>

            <Button navigate="/setting" isDanger={true}>
                Click me
            </Button>
        </HomePageStyle>
    );
}

const HomePageStyle = styled.div``;
