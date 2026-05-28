import React, { useEffect, useRef, useState } from "react";
import {
    DropDownMenuStyle,
    IconWrapper,
    ClickableTitle,
    TitleText,
    ExpandIcon,
    DropDownContent,
    DropDownInner,
    Item,
} from "./styles";

export default function DropDownMenu({ title, paths, icon, open, onToggle }) {
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
