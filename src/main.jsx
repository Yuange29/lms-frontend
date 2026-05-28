import App from "./App.jsx";
import { AppThemeProvider } from "./contexts/ThemeProvider.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { ConfirmProvider } from "./contexts/ConfirmProvider.jsx";
import { StrictMode } from "react";
import { ToastProvider } from "./contexts/ToastProvider.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppThemeProvider>
            <ToastProvider>
                <ConfirmProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </ConfirmProvider>
            </ToastProvider>
        </AppThemeProvider>
    </StrictMode>,
);
