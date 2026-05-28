import { RoleBarStyle, RoleIcon, UserActionBtn, UserInfo } from "./styles";

import { Text } from "../ui/Text";

export default function AccountRole({ role }) {
    return (
        <RoleBarStyle>
            <RoleIcon>
                <i className="fa-solid fa-shield-halved"></i>
            </RoleIcon>
            <UserInfo>
                <Text
                    size="xs"
                    style={{
                        color: "rgba(255, 255, 255, 0.6)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                    }}
                >
                    Vai trò
                </Text>
                <Text
                    size="lg"
                    style={{
                        color: "var(--color-on-primary)",
                        fontWeight: "700",
                    }}
                >
                    {role === "ADMIN"
                        ? "Quản trị viên"
                        : role === "INSTRUCTOR"
                          ? "Giáo viên"
                          : role === "STUDENT"
                            ? "Học sinh"
                            : "Khách"}
                </Text>
            </UserInfo>
            <UserActionBtn title="Thông báo">
                <i className="fa-solid fa-bell"></i>
            </UserActionBtn>
        </RoleBarStyle>
    );
}
