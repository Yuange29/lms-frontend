import App from "./App.jsx";
import { AppThemeProvider } from "./contexts/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { StrictMode } from "react";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppThemeProvider>
            <ToastProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ToastProvider>
        </AppThemeProvider>
    </StrictMode>,
);
