import {
    Content,
    DesktopSidebar,
    LayoutStyle,
    MenuButton,
    MenuIcon,
    MobileHeader,
    MobileNav,
    MobileSidebar,
    Overlay,
} from "./MainLayout";
import { useEffect, useState } from "react";

import Body from "./Body";
import Footer from "./Footer";
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
                <Footer />
            </Content>
        </LayoutStyle>
    );
}

export default MainLayout;
