import styled from "styled-components";

export default function FormLabel({ htmlFor, icon: Icon, children, ...props }) {
    return (
        <Label htmlFor={htmlFor} {...props}>
            {Icon && <IconWrapper>{<Icon />}</IconWrapper>}
            <Text>{children}</Text>
        </Label>
    );
}

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text-soft);
`;

const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    font-size: 1rem;
`;

const Text = styled.span`
    display: flex;
    align-items: center;
`;
