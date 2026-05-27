import { useEffect, useRef, useState } from "react";

import { Text } from "../ui/Text";
import { authService } from "../../services/auth.service";
import blankImage from "../../assets/avatar.png";
import { clearAccessToken } from "../../services/api";
import { pageList } from "./nav-content";
import styled from "styled-components";
import { useAuth } from "../../hooks/authHook";
import { useToast } from "../../contexts/ToastContext";

const ROLE = { "fd4546e4-bf5c-4d4d-8a88-f62a8b43e832": "STUDENT" };

export default function NavBar() {
    const { user } = useAuth();
    return (
        <NavBarStyle>
            <AccountRole role={ROLE[user?.role_id]} />

            <MainFeatures />

            <UserBar user={user || null} />
        </NavBarStyle>
    );
}

function UserBar({ user }) {
    const { setUser } = useAuth();
    const { toast } = useToast();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const userBarRef = useRef(null);
    const navigate = (to) => {
        window.history.pushState({}, "", to);
        window.dispatchEvent(new Event("app:navigate"));
    };

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

    const handleLogout = async () => {
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
    };

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
                onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
                <i
                    class="fa-solid fa-ellipsis-vertical"
                    style={{
                        transition: "transform 0.3s ease",
                        transform: `rotate(${isOpenMenu ? 90 : 0}deg)`,
                    }}
                ></i>
            </UserActionBtn>

            <UserActionMenu style={{ display: isOpenMenu ? "flex" : "none" }}>
                <Item
                    onClick={() => navigate("/signin")}
                    style={{ display: !user ? "flex" : "none" }}
                >
                    <i class="fa-solid fa-user-lock"></i>
                    <TitleText>Đăng nhập</TitleText>
                </Item>
                <Item
                    onClick={() => navigate("/register")}
                    style={{ display: !user ? "flex" : "none" }}
                >
                    <i class="fa-solid fa-user"></i>
                    <TitleText>Đăng kí</TitleText>
                </Item>
                <Item style={{ display: user ? "flex" : "none" }}>
                    <i class="fa-solid fa-user"></i>
                    <TitleText>Thông tin tài khoản</TitleText>
                </Item>
                <Item>
                    <i class="fa-solid fa-cog"></i>
                    <TitleText>Cài đặt</TitleText>
                </Item>
                <Item
                    onClick={() => handleLogout()}
                    style={{ display: user ? "flex" : "none" }}
                >
                    <i class="fa-solid fa-sign-out-alt"></i>
                    <TitleText>Đăng xuất</TitleText>
                </Item>
            </UserActionMenu>
        </BaseBarStyle>
    );
}

function AccountRole({ role }) {
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

function MainFeatures() {
    const [openLabel, setOpenLabel] = useState(null);

    useEffect(() => {
        const handleAppNavigate = () => setOpenLabel(null);
        window.addEventListener("app:navigate", handleAppNavigate);
        return () =>
            window.removeEventListener("app:navigate", handleAppNavigate);
    }, []);

    const toggle = (label) => {
        setOpenLabel((prev) => (prev === label ? null : label));
    };

    return (
        <MainFeaturesStyle>
            {pageList.map((p) => (
                <DropDownMenu
                    key={p.label}
                    title={p.label}
                    paths={p.paths}
                    icon={p.icon}
                    open={openLabel === p.label}
                    onToggle={toggle}
                />
            ))}
        </MainFeaturesStyle>
    );
}

function DropDownMenu({ title, paths, icon, open, onToggle }) {
    const [hovered, setHovered] = useState(false);

    const navigate = (to) => {
        window.history.pushState({}, "", to);
        window.dispatchEvent(new Event("app:navigate"));
    };

    const contentRef = useRef(null);
    const isSingleLink = typeof paths === "string";
    const isActive = open || hovered;

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        if (isActive) {
            el.style.maxHeight = el.scrollHeight + "px";
        } else {
            el.style.maxHeight = "0px";
        }
    }, [isActive]);

    const handleTitleClick = () => {
        if (isSingleLink) {
            navigate(paths);
            onToggle(null);
            return;
        }
        onToggle(title);
    };

    return (
        <DropDownMenuStyle
            onMouseEnter={() => !isSingleLink && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <ClickableTitle
                onClick={handleTitleClick}
                role="button"
                $active={isActive}
            >
                {icon && (
                    <IconWrapper>
                        <i className={icon}></i>
                    </IconWrapper>
                )}
                <TitleText>{title}</TitleText>
                {!isSingleLink && (
                    <ExpandIcon $open={isActive}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </ExpandIcon>
                )}
            </ClickableTitle>

            <DropDownContent ref={contentRef} aria-hidden={!isActive}>
                <DropDownInner>
                    {Array.isArray(paths) &&
                        paths.map((item) => (
                            <Item
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    onToggle(null);
                                }}
                            >
                                {item.name}
                            </Item>
                        ))}
                </DropDownInner>
            </DropDownContent>
        </DropDownMenuStyle>
    );
}

// --------------- NavBar Styles ---------------
const NavBarStyle = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: var(--color-primary);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--color-primary-active);
`;

const BaseBarStyle = styled.div`
    width: 100%;
    height: 72px;
    padding: 0 1.2em;
    background-color: var(--color-primary-active);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const RoleBarStyle = styled(BaseBarStyle)`
    border-top: none;
`;

// --------------- User Bar Styles ---------------
const Avatar = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-right: 0.8em;
    border: 2px solid rgba(255, 255, 255, 0.5);
    object-fit: cover;
`;

const UserInfo = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    & > span,
    & > p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const UserActionBtn = styled.button`
    height: 36px;
    width: 36px;
    border-radius: 8px;
    border: none;
    color: white;
    background-color: rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;

    &:hover {
        scale: 1.1;
        border: 1px solid var(--color-on-primary);
    }

    &:active {
        scale: 0.98;
        opacity: 0.8;
        color: var(--color-on-primary);
    }
`;

const RoleIcon = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 0.8em;
    font-size: 1.3em;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(242, 242, 242, 0.147);
    border-radius: 10px;
`;

const UserActionMenu = styled.div`
    width: 250px;
    position: absolute;
    bottom: 1em;
    right: -256px;
    background-color: red;
    padding: 0.5em;
    border-radius: 8px;
    background-color: var(--color-primary-active);

    flex-direction: column;

    @media (max-width: 480px) {
        right: 0;
        bottom: 75px;
    }
`;

//--------------- Main Features ---------------
const MainFeaturesStyle = styled.div`
    width: 100%;
    flex: 1;
    margin-top: 10px;
    margin-bottom: 82px;
    overflow-y: auto;
    padding: 0 0.8em;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
`;

const DropDownMenuStyle = styled.div`
    width: 100%;
    margin-bottom: 0.3em;
`;

const IconWrapper = styled.div`
    width: 24px;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    opacity: 0.9;
`;

const ClickableTitle = styled.div`
    height: 46px;
    display: flex;
    align-items: center;
    padding: 0 1em;
    cursor: pointer;
    color: var(--color-on-primary);
    border-radius: 10px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: ${({ $active }) =>
        $active ? "rgba(255, 255, 255, 0.15)" : "transparent"};

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateX(2px);
    }

    &:active {
        scale: 0.98;
    }
`;

const TitleText = styled.div`
    flex: 1;
    font-weight: 1000;
    font-size: 1em;
    margin-left: 0.5em;
`;

const ExpandIcon = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.8em;
    opacity: 0.7;
    transition: transform 0.25s ease;
    transform: rotate(${({ $open }) => ($open ? "90deg" : "0deg")});
`;

const DropDownContent = styled.div`
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DropDownInner = styled.div`
    border-left: 2px solid white;
    margin-left: 1em;
    padding: 0.3em 0 0.3em 0.8em;
`;

const Item = styled.div`
    padding: 0.6em 1em;
    margin: 2px 0;
    cursor: pointer;
    font-size: 0.9em;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    &:hover {
        color: var(--color-on-primary);
        background-color: rgba(255, 255, 255, 0.08);
        padding-left: 1.3em;
    }

    &:active {
        scale: 0.98;
    }
`;
