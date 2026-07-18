import styled, { css } from "styled-components";

import { baseFlex } from "./../../styles/CommonStyles";

const textColors = {
    default: "var(--color-text)",
    soft: "var(--color-text-soft)",
    muted: "var(--color-text-muted)",
    primary: "var(--color-primary)",
    danger: "var(--color-error)",
    error: "var(--color-error)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    inherit: "inherit",
};

const textSizes = {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    sl: "1.5em",
};

const headingSizes = {
    h1: "2rem",
    h2: "1.5rem",
    h3: "1.25rem",
    h4: "1.125rem",
};

const fontWeights = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
};

const getColor = ({ $color }) => textColors[$color] || textColors.default;
const getTextSize = ({ $size }) => textSizes[$size] || textSizes.md;
const getHeadingSize = ({ $size }) => headingSizes[$size] || headingSizes.h2;
const getWeight = ({ $weight }) => fontWeights[$weight] || fontWeights.regular;

const baseTextStyles = css`
    color: ${getColor};
    font-weight: ${getWeight};
    letter-spacing: 0;
    text-align: ${({ $align }) => $align || "inherit"};
`;

const TextStyle = styled.p`
    ${baseTextStyles}
    font-size: ${getTextSize};
    line-height: 1.6;
`;

const HeadingStyle = styled.h2`
    ${baseTextStyles}
    font-size: ${getHeadingSize};
    font-weight: ${({ $weight }) => getWeight({ $weight: $weight || "bold" })};
    line-height: 1.25;
`;

function Text({
    as = "p",
    color = "default",
    size = "md",
    weight = "regular",
    align = "default",
    children,
    ...props
}) {
    return (
        <TextStyle
            as={as}
            $color={color}
            $size={size}
            $weight={weight}
            $align={align}
            {...props}
        >
            {children}
        </TextStyle>
    );
}

function H({
    size = "h2",
    color = "default",
    weight = "bold",
    align = "default",
    children,
    ...props
}) {
    const headingTag = headingSizes[size] ? size : "h2";

    return (
        <HeadingStyle
            as={headingTag}
            $color={color}
            $size={size}
            $weight={weight}
            $align={align}
            {...props}
        >
            {children}
        </HeadingStyle>
    );
}

function HeaderCard({ title }) {
    return (
        <HeaderCardStyle>
            <H>{title}</H>
        </HeaderCardStyle>
    );
}

const HeaderCardStyle = styled.div`
    ${baseFlex}
    background-color: var(--color-focus-ring);
`;

export { H, Text, HeaderCard };
