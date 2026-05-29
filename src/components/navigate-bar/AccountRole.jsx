import { RoleBarStyle, RoleIcon, UserActionBtn, UserInfo } from "./styles";

import { RoleSkeletonLoading } from "../loading/NavBarSkeleton";
import { Text } from "../ui/Text";
import { useAuth } from "../../hooks/authHook";

export default function AccountRole({ role }) {
    const { loading } = useAuth();

    if (loading) return <RoleSkeletonLoading />;

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
