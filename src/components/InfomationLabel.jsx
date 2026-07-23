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

export function InfomationCard({ label, content, size, spacing = true }) {
    return (
        <InfoCardWrapper>
            <Text color="muted">{label}</Text>
            <div
                className="indent"
                style={{ textAlign: spacing ? "end" : "inherit" }}
            >
                <Text weight="bold" size={size || "md"}>
                    {content || "***"}
                </Text>
            </div>
        </InfoCardWrapper>
    );
}

const InfoCardWrapper = styled.div`
    display: grid;
    padding: 0.5em 1em;
    margin: 0.5em 0.25em;
    border: 0;
    border-radius: 0.5em;
    grid-template-columns: 1fr 3fr;
    background-color: var(--color-surface);

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;
