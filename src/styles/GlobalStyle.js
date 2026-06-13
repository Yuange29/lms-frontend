import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-primary-hover: ${({ theme }) => theme.colors.primaryHover};
    --color-primary-active: ${({ theme }) => theme.colors.primaryActive};
    --color-primary-soft: ${({ theme }) => theme.colors.primarySoft};
    --color-on-primary: ${({ theme }) => theme.colors.onPrimary};

    --color-secondary: ${({ theme }) => theme.colors.secondary};
    --color-secondary-hover: ${({ theme }) => theme.colors.secondaryHover};
    --color-secondary-active: ${({ theme }) => theme.colors.secondaryActive};
    --color-on-secondary: ${({ theme }) => theme.colors.onSecondary};

    --color-background: ${({ theme }) => theme.colors.background};
    --color-surface: ${({ theme }) => theme.colors.surface};
    --color-surface-soft: ${({ theme }) => theme.colors.surfaceSoft};
    --color-card: ${({ theme }) => theme.colors.card};

    --color-text: ${({ theme }) => theme.colors.text};
    --color-text-soft: ${({ theme }) => theme.colors.textSoft};
    --color-text-muted: ${({ theme }) => theme.colors.textMuted};

    --color-border: ${({ theme }) => theme.colors.border};
    --color-error: ${({ theme }) => theme.colors.error};
    --color-error-hover: ${({ theme }) => theme.colors.errorHover};
    --color-error-active: ${({ theme }) => theme.colors.errorActive};
    --color-error-soft: ${({ theme }) => theme.colors.errorSoft};
    --color-on-error: ${({ theme }) => theme.colors.onError};
    --color-success: ${({ theme }) => theme.colors.success};
    --color-warning: ${({ theme }) => theme.colors.warning};
    --color-focus-ring: ${({ theme }) => theme.colors.focusRing};
  }

    * {
        box-sizing: border-box;
        margin: 0;
    }

    a {
        text-decoration: none;
    }

`;
