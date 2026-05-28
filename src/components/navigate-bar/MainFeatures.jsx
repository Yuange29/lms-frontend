import React, { useEffect, useState } from "react";
import { pageList } from "./nav-content";
import DropDownMenu from "./DropDownMenu";
import { MainFeaturesStyle } from "./styles";

export default function MainFeatures() {
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
