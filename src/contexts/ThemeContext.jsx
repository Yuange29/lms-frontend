import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyle";
import { darkTheme, lightTheme } from "../styles/theme";

const ThemeContext = createContext(null);
const THEME_STORAGE_KEY = "lms-theme-mode";

export function AppThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem(THEME_STORAGE_KEY) || "light";
    });

    const theme = themeMode === "dark" ? darkTheme : lightTheme;

    const value = useMemo(
        () => ({
            themeMode,
            isDarkMode: themeMode === "dark",
            setThemeMode,
            toggleTheme: () => {
                setThemeMode((currentTheme) =>
                    currentTheme === "dark" ? "light" : "dark",
                );
            },
        }),
        [themeMode],
    );

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={value}>
            <StyledThemeProvider theme={theme}>
                <GlobalStyle />
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside AppThemeProvider");
    }

    return context;
}
