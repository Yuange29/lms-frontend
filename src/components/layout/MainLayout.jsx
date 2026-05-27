import styled from "styled-components";
import { useState, useEffect } from "react";
import Body from "./Body";
import NavBar from "../navigate-bar/NavBar";

function MainLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
        const handleAppNavigate = () => {
            setIsSidebarOpen(false);
        };

        window.addEventListener("app:navigate", handleAppNavigate);
        return () =>
            window.removeEventListener("app:navigate", handleAppNavigate);
    }, []);

    return (
        <LayoutStyle>
            <DesktopSidebar>
                <NavBar />
            </DesktopSidebar>

            <MobileHeader>
                <MenuButton
                    type="button"
                    aria-label="Open sidebar"
                    onClick={openSidebar}
                >
                    <MenuIcon className="fa-solid fa-bars" aria-hidden="true" />
                </MenuButton>
            </MobileHeader>

            <Overlay $isOpen={isSidebarOpen} onClick={closeSidebar} />

            <MobileSidebar $isOpen={isSidebarOpen}>
                <MobileNav>
                    <NavBar />
                </MobileNav>
            </MobileSidebar>

            <Content>
                <Body>{children}</Body>
            </Content>
        </LayoutStyle>
    );
}

const LayoutStyle = styled.div`
    display: flex;
    min-height: 100svh;
    background-color: var(--color-background);
`;

const DesktopSidebar = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100svh;
    /* padding: 1em; */
    border-right: 1px solid var(--color-border);
    background-color: var(--color-card);
    color: var(--color-text);
    font-weight: 700;

    @media (max-width: 480px) {
        display: none;
    }
`;

const Content = styled.div`
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    margin-left: 360px;

    @media (max-width: 480px) {
        margin-left: 0;
        padding-top: 56px;
    }
`;

const MobileHeader = styled.header`
    display: none;

    @media (max-width: 480px) {
        position: fixed;
        z-index: 30;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 12px;
        border-bottom: 1px solid var(--color-border);
        background-color: var(--color-card);
    }
`;

const MenuButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
`;

const MenuIcon = styled.i`
    position: relative;
    display: inline-block;
    width: 18px;
    height: 14px;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 18px;
        height: 2px;
        border-radius: 999px;
        background-color: currentColor;
        box-shadow:
            0 6px 0 currentColor,
            0 12px 0 currentColor;
        content: "";
    }
`;

const Overlay = styled.div`
    position: fixed;
    z-index: 40;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.42);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
    transition: opacity 220ms ease;

    @media (min-width: 481px) {
        display: none;
    }
`;

const MobileSidebar = styled.aside`
    position: fixed;
    z-index: 50;
    top: 0;
    bottom: 0;
    left: 0;
    width: min(78vw, 300px);
    border-right: 1px solid var(--color-border);
    background-color: var(--color-card);
    color: var(--color-text);
    box-shadow: 16px 0 32px rgba(15, 23, 42, 0.18);
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
    transition: transform 260ms ease;

    @media (min-width: 481px) {
        display: none;
    }
`;

const MobileNav = styled.nav`
    font-weight: 700;
`;

export default MainLayout;
