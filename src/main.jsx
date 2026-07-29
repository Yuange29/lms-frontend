import App from "./App.jsx";
import { AppThemeProvider } from "./contexts/ThemeProvider.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { ConfirmProvider } from "./contexts/ConfirmProvider.jsx";
import { CourseProvider } from "./contexts/CourseProvider";
import { EnrollProvider } from "./contexts/EnrollProvider.jsx";
import { LessonProvider } from "./contexts/LessonProvider.jsx";
import { QuizProvider } from "./contexts/QuizProvider.jsx";
import { StrictMode } from "react";
import { SubmissionProvider } from "./contexts/SubmissionProvider.jsx";
import { ToastProvider } from "./contexts/ToastProvider.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppThemeProvider>
            <ToastProvider>
                <ConfirmProvider>
                    <AuthProvider>
                        <CourseProvider>
                            <EnrollProvider>
                                <QuizProvider>
                                    <LessonProvider>
                                        <SubmissionProvider>
                                            <App />
                                        </SubmissionProvider>
                                    </LessonProvider>
                                </QuizProvider>
                            </EnrollProvider>
                        </CourseProvider>
                    </AuthProvider>
                </ConfirmProvider>
            </ToastProvider>
        </AppThemeProvider>
    </StrictMode>,
);
