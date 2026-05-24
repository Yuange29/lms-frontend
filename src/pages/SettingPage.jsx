import Button from "../components/ui/Button";
import { useTheme } from "../contexts/ThemeContext";

function SettingPage() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div>
            <h1>SettingPage</h1>
            <Button onClick={toggleTheme} variant="secondary">
                Chuyển sang {isDarkMode ? "light" : "dark"} theme
            </Button>
        </div>
    );
}

export default SettingPage;
