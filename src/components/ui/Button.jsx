import { navigate as nav } from "./../../utils/navigate";
import styled from "styled-components";

function Button({
    children,
    navigate,
    onClick = () => {},
    variant = "primary",
    size = "md",
    fullWidth = false,
    danger = false,
    isDanger = false,
    type = "button",
    ...props
}) {
    const handleClick = (event) => {
        onClick?.(event);

        if (!navigate || event.defaultPrevented) {
            return;
        }

        nav(navigate);
    };

    return (
        <ButtonStyle
            type={type}
            onClick={handleClick}
            $variant={danger || isDanger ? "danger" : variant}
            $size={size}
            $fullWidth={fullWidth}
            {...props}
        >
            {children}
        </ButtonStyle>
    );
}

const variants = {
    primary: {
        background: "var(--color-primary)",
        color: "var(--color-on-primary)",
        hover: "var(--color-primary-hover)",
        active: "var(--color-primary-active)",
        border: "var(--color-primary)",
        shadow: "rgba(37, 99, 235, 0.22)",
    },
    secondary: {
        background: "var(--color-secondary)",
        color: "var(--color-on-secondary)",
        hover: "var(--color-secondary-hover)",
        active: "var(--color-secondary-active)",
        border: "var(--color-secondary)",
        shadow: "rgba(15, 23, 42, 0.12)",
    },
    danger: {
        background: "var(--color-error)",
        color: "var(--color-on-error)",
        hover: "var(--color-error-hover)",
        active: "var(--color-error-active)",
        border: "var(--color-error)",
        shadow: "rgba(220, 38, 38, 0.22)",
    },
    ghost: {
        background: "transparent",
        color: "var(--color-text-soft)",
        hover: "var(--color-surface)",
        active: "var(--color-border)",
        border: "transparent",
        shadow: "transparent",
    },
};

const sizes = {
    sm: {
        padding: "6px 10px",
        fontSize: "0.875rem",
        minHeight: "32px",
    },
    md: {
        padding: "9px 16px",
        fontSize: "0.9375rem",
        minHeight: "40px",
    },
    lg: {
        padding: "12px 20px",
        fontSize: "1rem",
        minHeight: "46px",
    },
};

const getVariant = ({ $variant } = {}) =>
    variants[$variant] || variants.primary;
const getSize = ({ $size } = {}) => sizes[$size] || sizes.md;

const ButtonStyle = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
    min-height: ${({ $size }) => getSize({ $size }).minHeight};
    margin: 0.6em;
    padding: ${({ $size }) => getSize({ $size }).padding};
    border: 1px solid ${({ $variant }) => getVariant({ $variant }).border};
    border-radius: 8px;
    background-color: ${({ $variant }) => getVariant({ $variant }).background};
    color: ${({ $variant }) => getVariant({ $variant }).color};
    box-shadow: 0 8px 18px ${({ $variant }) => getVariant({ $variant }).shadow};
    cursor: pointer;
    font-size: ${({ $size }) => getSize({ $size }).fontSize};
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    transition:
        background-color 160ms ease,
        border-color 160ms ease,
        box-shadow 160ms ease,
        color 160ms ease,
        transform 160ms ease;

    &:hover:not(:disabled) {
        border-color: ${({ $variant }) => getVariant({ $variant }).hover};
        background-color: ${({ $variant }) => getVariant({ $variant }).hover};
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        border-color: ${({ $variant }) => getVariant({ $variant }).active};
        background-color: ${({ $variant }) => getVariant({ $variant }).active};
        box-shadow: none;
        transform: translateY(0);
    }

    &:focus-visible {
        outline: 3px solid var(--color-focus-ring);
        outline-offset: 2px;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.58;
        box-shadow: none;
        transform: none;
    }
`;

export default Button;
