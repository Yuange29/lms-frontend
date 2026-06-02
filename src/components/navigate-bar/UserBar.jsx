import {
    Avatar,
    BaseBarStyle,
    Item,
    TitleText,
    UserActionBtn,
    UserActionMenu,
    UserInfo,
} from "./styles";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Text } from "../ui/Text";
import { UserSkeletonLoading } from "../loading/NavBarSkeleton";
import { authService } from "../../services/auth.service";
import blankImage from "../../assets/avatar.png";
import { clearAccessToken } from "../../services/api";
import { useAuth } from "../../hooks/authHook";
import { useConfirm } from "../../hooks/confirmHook";
import { useToast } from "../../hooks/toastHook";

function UserBar({ user }) {
    const { setUser, loading } = useAuth();
    const { toast } = useToast();
    const { confirm } = useConfirm();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const userBarRef = useRef(null);

    const navigate = useCallback((to) => {
        window.history.pushState({}, "", to);
        window.dispatchEvent(new Event("app:navigate"));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpenMenu &&
                userBarRef.current &&
                !userBarRef.current.contains(event.target)
            ) {
                setIsOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenMenu]);

    const handleLogout = useCallback(async () => {
        const isOk = await confirm({
            title: "Đăng xuất",
            content: "Bạn chắc chắn muốn đăng xuất chứ",
            confirmText: "Đăng xuất",
            cancelText: "Trở lại",
        });

        if (!isOk) return;

        try {
            await authService.signout();
            clearAccessToken();
            setUser(null);

            window.history.pushState(null, "", "/");
            window.dispatchEvent(new Event("app:navigate"));
        } catch (error) {
            toast.error("Lỗi: Đăng xuất thất bại");
            console.log("Lỗi: ", error);
        }
    }, [confirm, setUser, toast]);

    const iconStyle = useMemo(
        () => ({
            transition: "transform 0.3s ease",
            transform: `rotate(${isOpenMenu ? 90 : 0}deg)`,
        }),
        [isOpenMenu],
    );

    const menuStyle = useMemo(
        () => ({ display: isOpenMenu ? "flex" : "none" }),
        [isOpenMenu],
    );

    if (loading) return <UserSkeletonLoading />;

    return (
        <BaseBarStyle ref={userBarRef}>
            <Avatar src={user?.avatar_url || blankImage} alt="User Avatar" />
            <UserInfo>
                <Text
                    style={{
                        color: "var(--color-on-primary)",
                        fontWeight: "600",
                    }}
                >
                    {user?.full_name || "Guest"}
                </Text>
                <Text size="xs" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {user?.email || "your email"}
                </Text>
            </UserInfo>
            <UserActionBtn
                title="Cài đặt tài khoản"
                onClick={() => setIsOpenMenu((prev) => !prev)}
            >
                <i
                    className="fa-solid fa-ellipsis-vertical"
                    style={iconStyle}
                ></i>
            </UserActionBtn>

            <UserActionMenu style={menuStyle}>
                <Item
                    onClick={() => navigate("/signin")}
                    style={{ display: !user ? "flex" : "none" }}
                >
                    <i className="fa-solid fa-user-lock"></i>
                    <TitleText>Đăng nhập</TitleText>
                </Item>
                <Item
                    onClick={() => navigate("/register")}
                    style={{ display: !user ? "flex" : "none" }}
                >
                    <i className="fa-solid fa-user"></i>
                    <TitleText>Đăng kí</TitleText>
                </Item>
                <Item style={{ display: user ? "flex" : "none" }}>
                    <i className="fa-solid fa-user"></i>
                    <TitleText>Thông tin tài khoản</TitleText>
                </Item>
                <Item onClick={() => navigate("/setting")}>
                    <i className="fa-solid fa-cog"></i>
                    <TitleText>Cài đặt</TitleText>
                </Item>
                <Item
                    onClick={handleLogout}
                    style={{ display: user ? "flex" : "none" }}
                >
                    <i className="fa-solid fa-sign-out-alt"></i>
                    <TitleText>Đăng xuất</TitleText>
                </Item>
            </UserActionMenu>
        </BaseBarStyle>
    );
}

export default memo(UserBar);
