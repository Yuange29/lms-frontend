import { memo, useCallback, useEffect, useState } from "react";

import DropDownMenu from "./DropDownMenu";
import { MainFeaturesStyle } from "./styles";
import { pageList } from "./nav-content";

function MainFeatures() {
    const [openLabel, setOpenLabel] = useState(null);

    useEffect(() => {
        const handleAppNavigate = () => setOpenLabel(null);
        window.addEventListener("app:navigate", handleAppNavigate);
        return () =>
            window.removeEventListener("app:navigate", handleAppNavigate);
    }, []);

    const toggle = useCallback((label) => {
        setOpenLabel((prev) => (prev === label ? null : label));
    }, []);

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

export default memo(MainFeatures);
