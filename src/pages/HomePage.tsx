import styled from "styled-components";

import Button from "../components/ui/Button";
import { H } from "../components/ui/Text";
import { useNotification } from "../contexts/NotificationContext";

export default function HomePage() {
    const { notify } = useNotification();

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
