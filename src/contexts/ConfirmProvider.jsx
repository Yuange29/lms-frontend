import { H, Text } from "../components/ui/Text";
import { useCallback, useMemo, useState } from "react";

import { ConfirmContext } from "./ConfirmContext";
import { createPortal } from "react-dom";
import styled from "styled-components";

const DEFAULT_OPTIONS = {
    title: "Xác nhận",
    content: "Bạn có chắc chắn muốn thực hiện hành động này không?",
    confirmText: "Xác nhận",
    cancelText: "Trở lại",
};

export function ConfirmProvider({ children }) {
    const [confirmData, setConfirmData] = useState(null);

    const confirm = useCallback((options = {}) => {
        return new Promise((resolve) => {
            setConfirmData({
                options: {
                    ...DEFAULT_OPTIONS,
                    ...options,
                },
                resolve,
            });
        });
    }, []);

    const handleClose = useCallback(
        (result) => {
            if (confirmData?.resolve) {
                confirmData.resolve(result);
            }
            setConfirmData(null);
        },
        [confirmData],
    );

    const value = useMemo(() => ({ confirm }), [confirm]);

    return (
        <ConfirmContext.Provider value={value}>
            {children}
            <ConfirmDialog
                open={Boolean(confirmData)}
                options={confirmData?.options}
                onConfirm={() => handleClose(true)}
                onCancel={() => handleClose(false)}
            />
        </ConfirmContext.Provider>
    );
}

function ConfirmDialog({ open, options, onConfirm, onCancel }) {
    if (!open || !options) return null;

    return createPortal(
        <Overlay
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            onClick={onCancel}
        >
            <Dialog onClick={(event) => event.stopPropagation()}>
                <H id="confirm-dialog-title">{options.title}</H>
                <Text>{options.content}</Text>
                <Actions>
                    <CancelButton onClick={onCancel}>
                        {options.cancelText}
                    </CancelButton>
                    <ConfirmButton onClick={onConfirm}>
                        {options.confirmText}
                    </ConfirmButton>
                </Actions>
            </Dialog>
        </Overlay>,
        document.body,
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.45);
    padding: 1rem;
`;

const Dialog = styled.div`
    width: min(480px, 100%);
    background: var(--color-background, #a76969);
    border-radius: 18px;
    box-shadow: rgba(15, 23, 42, 0.18) 0px 20px 60px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

const Button = styled.button`
    font-size: 1em;
    font-weight: 600;
    padding: 0.5em 1em;
    border: 0;
    border-radius: 0.5em;
`;

const CancelButton = styled(Button)`
    flex: 1;
    background-color: var(--color-on-primary);

    &:hover {
        background-color: var(--color-on-secondary);
    }
`;
const ConfirmButton = styled(Button)`
    flex: 1;
    background-color: var(--color-error-hover);

    &:hover {
        background-color: var(--color-error);
    }
`;
