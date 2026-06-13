import { RoleBarStyle, RoleIcon, UserActionBtn, UserInfo } from "./styles";

import { RoleSkeletonLoading } from "../loading/NavBarSkeleton";
import { Text } from "../ui/Text";
import { memo } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/authHook";

function AccountRole() {
    const { loading, role } = useAuth();

    if (loading) return <RoleSkeletonLoading />;

    const notice = 0;

    return (
        <RoleBarStyle>
            <RoleIcon>
                <i className="fa-solid fa-shield-halved"></i>
            </RoleIcon>
            <UserInfo>
                <Text
                    size="xs"
                    style={{
                        color: "var(--color-on-primary)",
                        opacity: 0.65,
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
                    {role}
                </Text>
            </UserInfo>
            <UserActionBtn title="Thông báo">
                <i className="fa-solid fa-bell"></i>
                <Notice style={{ display: notice > 0 ? "flex" : "none" }}>
                    {notice}
                </Notice>
            </UserActionBtn>
        </RoleBarStyle>
    );
}

const Notice = styled.p`
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-error);
    border: 0;
    border-radius: 999px;
    font-size: 0.75em;
    width: 15px;
    height: 15px;
`;

export default memo(AccountRole);
