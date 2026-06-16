import styled, { keyframes } from "styled-components";
import { useCallback, useMemo, useState } from "react";

import { ToastContext } from "./ToastContext";

const notificationDefaults = {
    success: {
        icon: "fa-solid fa-circle-check",
        title: "Thành công",
    },
    warning: {
        icon: "fa-solid fa-triangle-exclamation",
        title: "Cảnh báo",
    },
    error: {
        icon: "fa-solid fa-circle-exclamation",
        title: "Thất bại",
    },
    info: {
        icon: "fa-solid fa-circle-info",
        title: "Thông báo",
    },
};

const appendAlpha = (hexColor, alphaHex) => {
    if (!hexColor || typeof hexColor !== "string") return hexColor;
    const cleanHex = hexColor.replace("#", "");
    if (cleanHex.length === 6) return `#${cleanHex}${alphaHex}`;
    return hexColor;
};

const getTypeColor = (theme, type) => {
    if (!theme || !theme.colors) return undefined;
    // map info -> primary if info not defined in theme
    if (type === "info") return theme.colors.info || theme.colors.primary;
    return theme.colors[type] || undefined;
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((current) => current.filter((item) => item.id !== id));
    }, []);

    const notify = useCallback(
        ({ type = "info", message, title, duration = 4000 }) => {
            const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            const notificationType = notificationDefaults[type] ? type : "info";
            const notification = {
                id,
                type: notificationType,
                title: title || notificationDefaults[notificationType].title,
                message,
                duration,
            };

            setToasts((current) => [...current, notification]);

            if (duration > 0) {
                window.setTimeout(() => removeToast(id), duration);
            }
        },
        [removeToast],
    );

    const makeNotifier = useCallback(
        (type) => (message, title, duration) =>
            notify({ type, message, title, duration }),
        [notify],
    );

    const notifySuccess = useCallback(
        (message, title, duration) =>
            notify({ type: "success", message, title, duration }),
        [notify],
    );

    const notifyWarning = useCallback(
        (message, title, duration) =>
            notify({ type: "warning", message, title, duration }),
        [notify],
    );

    const notifyError = useCallback(
        (message, title, duration) =>
            notify({ type: "error", message, title, duration }),
        [notify],
    );

    const notifyInfo = useCallback(
        (message, title, duration) =>
            notify({ type: "info", message, title, duration }),
        [notify],
    );

    const value = useMemo(
        () => ({
            toast: {
                success: makeNotifier("success"),
                warning: makeNotifier("warning"),
                error: makeNotifier("error"),
                info: makeNotifier("info"),
                raw: notify,
            },
            notifySuccess,
            notifyWarning,
            notifyError,
            notifyInfo,
        }),
        [
            makeNotifier,
            notify,
            notifySuccess,
            notifyWarning,
            notifyError,
            notifyInfo,
        ],
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastOutlet toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    );
}

function ToastOutlet({ toasts, onDismiss }) {
    return (
        <ToastRoot>
            {toasts.map((item) => (
                <ToastCard
                    key={item.id}
                    type={item.type}
                    role="status"
                    aria-live="polite"
                >
                    <ToastIcon type={item.type}>
                        <i className={notificationDefaults[item.type].icon} />
                    </ToastIcon>
                    <ToastContent>
                        <ToastTitle>{item.title}</ToastTitle>
                        <ToastMessage>{item.message}</ToastMessage>
                    </ToastContent>
                    <ToastClose
                        type="button"
                        aria-label="Đóng thông báo"
                        onClick={() => onDismiss(item.id)}
                    >
                        <i className="fa-solid fa-xmark" />
                    </ToastClose>
                </ToastCard>
            ))}
        </ToastRoot>
    );
}

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

const ToastRoot = styled.div`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 9999;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.75rem;
    width: min(360px, calc(100% - 2rem));
    pointer-events: none;

    @media (max-width: 640px) {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        width: calc(100% - 2rem);
    }
`;

const ToastCard = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    padding: 0.95rem 1rem;
    border-radius: 16px;
    background: ${({ theme, type }) =>
        appendAlpha(
            getTypeColor(theme, type) || theme.colors?.background,
            "22",
        ) || "rgba(255, 255, 255, 0.14)"};
    border: 1px solid
        ${({ theme, type }) =>
            appendAlpha(
                getTypeColor(theme, type) || theme.colors?.border,
                "55",
            ) || "rgba(0, 0, 0, 0.12)"};
    color: ${({ theme }) => theme.colors?.text || "#111"};
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
    animation: ${slideIn} 220ms ease forwards;
    pointer-events: auto;
`;

const ToastIcon = styled.div`
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: ${({ theme, type }) =>
        getTypeColor(theme, type) || theme.colors?.text};
    background: ${({ theme, type }) =>
        appendAlpha(getTypeColor(theme, type) || theme.colors?.surface, "55")};
    font-size: 1.1rem;
`;

const ToastContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
`;

const ToastTitle = styled.p`
    margin: 0;
    font-size: 0.96rem;
    font-weight: 700;
`;

const ToastMessage = styled.p`
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.4;
    color: ${({ theme }) =>
        theme.colors?.textSoft || theme.colors?.text || "rgba(0, 0, 0, 0.8)"};
`;

const ToastClose = styled.button`
    border: none;
    background: transparent;
    color: inherit;
    padding: 0;
    font-size: 0.9rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 150ms ease;

    &:hover {
        opacity: 1;
    }
`;
