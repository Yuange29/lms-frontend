import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppThemeProvider } from "./contexts/ThemeContext.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppThemeProvider>
            <ToastProvider>
                <App />
            </ToastProvider>
        </AppThemeProvider>
    </StrictMode>,
);
