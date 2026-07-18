import { Text } from "./ui/Text";
import styled from "styled-components";

export const GreyDialogContent = ({ label, content }) => {
    return (
        <ItemContent>
            <Text color="muted">{label}: </Text>
            <Text weight="bold">{content}</Text>
        </ItemContent>
    );
};

const ItemContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5em 1em;
    border: 0;
    border-radius: 0.7em;
    background-color: var(--color-surface);
`;
