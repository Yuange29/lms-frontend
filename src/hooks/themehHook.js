import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside AppThemeProvider");
    }

    return context;
}
