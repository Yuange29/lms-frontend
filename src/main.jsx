import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppThemeProvider } from "./contexts/ThemeContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppThemeProvider>
            <NotificationProvider>
                <App />
            </NotificationProvider>
        </AppThemeProvider>
    </StrictMode>,
);
