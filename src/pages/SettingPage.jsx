import { H, Text } from "../components/ui/Text";

import Button from "../components/ui/Button";
import { Section } from "../components/ui/Secttion";
import { getRole } from "../utils/getRole";
import styled from "styled-components";
import { useAuth } from "../hooks/authHook";
import { useTheme } from "../hooks/themehHook";

function SettingPage() {
    const { isDarkMode, toggleTheme } = useTheme();
    const { user } = useAuth();
    const roleName = getRole(user?.role_id);
    return (
        <>
            <InfomationCard title={"Thông tin tài khoản"}>
                <Text>Tên: {user?.full_name}</Text>
                <Text>Email: {user?.email}</Text>
                <Text>Vai trò: {roleName}</Text>
            </InfomationCard>

            <InfomationCard title={"Tùy chỉnh"}>
                <Button
                    $fullWidth={false}
                    onClick={toggleTheme}
                    variant="secondary"
                >
                    Chuyển sang {isDarkMode ? "light" : "dark"} theme
                </Button>
            </InfomationCard>
        </>
    );
}

function InfomationCard({ title, children }) {
    return (
        <Section>
            <H size="h2">{title}</H>
            <Content>{children}</Content>
        </Section>
    );
}

const Content = styled.div`
    padding: 0.5em 1em;
    border-top: 1px solid white;
    margin-top: 0.5em;

    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export default SettingPage;
