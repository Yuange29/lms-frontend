import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppThemeProvider } from "./contexts/ThemeContext.jsx";
import { GlobalStyle } from "./styles/GlobalStyle.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppThemeProvider>
            <GlobalStyle />
            <App />
        </AppThemeProvider>
    </StrictMode>,
);
