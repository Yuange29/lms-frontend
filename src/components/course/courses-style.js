import { Text } from "../ui/text";
import styled from "styled-components";

const appendAlpha = (hexColor, alphaHex) => {
    if (!hexColor || typeof hexColor !== "string") return hexColor;
    const cleanHex = hexColor.replace("#", "");
    if (cleanHex.length === 6) return `#${cleanHex}${alphaHex}`;
    return hexColor;
};

// course dialog
export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: grid;
    place-items: center;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(3px);
`;

export const Dialog = styled.div`
    width: min(600px, calc(100% - 32px));
    border-radius: 1em;
    padding: 1em;
    background: var(--color-primary-soft);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.24);
    color: var(--color-text);
`;

export const DialogHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
`;

export const CloseButton = styled.button`
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    font-size: 18px;

    &:hover {
        opacity: 0.8;
        scale: 1.02;
    }
`;

export const DialogForm = styled.form`
    display: grid;
    gap: 18px;
`;

export const DialogBody = styled.div`
    display: grid;
    gap: 0.5em;
`;

export const DialogActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 8px;

    .remove-btn {
        justify-self: start;
    }
`;

export const ItemContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5em 1em;
    border: 0;
    border-radius: 0.7em;
    background-color: var(--color-card);
`;

// course detail
export const CourseDetailContainer = styled.div`
    display: grid;
    gap: 24px;
    margin-top: 24px;
`;

export const CourseDetailHeader = styled.div`
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 240px;
    align-items: start;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 240px;
        gap: 0.5em;
    }
`;

export const CourseDetailThumbnail = styled.img`
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    background: var(--color-card);
    margin: 0 auto;

    @media (min-width: 1024px) {
        width: 100%;
    }
`;

export const CourseDetailMeta = styled.div`
    margin-top: 0.5em;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 0.5em;
    }
`;

export const CourseDetailMetaItem = styled.div`
    display: grid;
    gap: 6px;
    padding: 18px;
    border-radius: 20px;
    background: var(--color-primary-soft);

    @media (max-width: 768px) {
        padding: 0.8em;
    }
`;

export const CourseDetailMetaLabel = styled.span`
    color: var(--color-text-muted);
    font-size: 0.9rem;
`;

export const CourseDetailMetaValue = styled.span`
    color: var(--color-text);
    font-weight: 600;
`;

export const CourseDetailStatus = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 999px;
    background: ${({ published, theme }) =>
        published
            ? appendAlpha(theme.colors.success, "22")
            : appendAlpha(theme.colors.warning, "22")};
    color: ${({ published, theme }) =>
        published ? theme.colors.success : theme.colors.warning};
    font-weight: 600;
    font-size: 0.95rem;
`;

export const CourseDetailSection = styled.section`
    display: grid;
    gap: 16px;
`;

export const CourseDetailSectionHeader = styled.h3`
    margin: 0;
    font-size: 1.1rem;
    color: var(--color-text);
`;

export const CourseDetailSectionList = styled.div`
    display: grid;
    gap: 16px;
`;

export const CourseDetailSectionItem = styled.div`
    display: grid;
    gap: 14px;
    padding: 20px;
    border-radius: 20px;
    background: var(--color-surface-soft);
`;

export const CourseDetailSectionTitle = styled.h4`
    margin: 0;
    color: var(--color-text);
    font-size: 1rem;
`;

export const CourseDetailSectionSubtitle = styled.p`
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.9rem;
`;

export const CourseDetailRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    color: var(--color-text-soft);
    font-weight: 600;
`;

// course list
export const CoursesWrapper = styled.div`
    width: 100%;
    max-height: 250px;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

export const CourseWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5em 1em;
    background-color: var(--color-background);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        scale: 1.01;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    width: 80px;
    height: 80px;
    background-color: var(--color-secondary);
    border-radius: 6px;
    overflow: hidden;
`;

export const ThumbnailImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const InfoWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
`;

export const CourseTitle = styled(Text)`
    font-weight: 600;
    font-size: 1rem;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const CoursePrice = styled(Text)`
    font-weight: 500;
    font-size: 0.975rem;
    color: var(--color-text-soft);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const CourseDescription = styled(Text)`
    font-size: 0.875rem;
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MenuButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    transition: color 0.2s ease;

    &:hover {
        color: var(--color-text);
    }
`;

export const InfoCardWrapper = styled.div`
    display: grid;
    padding: 0.5em 1em;
    margin: 0.5em 0.25em;
    border: 0;
    border-radius: 0.5em;
    grid-template-columns: 1fr 3fr;
    background-color: #fff;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;

export const AddInfoCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 0.5em 1em;
    margin: 0.5em 0.25em;
    border: 0;
    border-radius: 0.5em;

    .text-group {
        display: flex;
        justify-content: space-between;
        padding: 0.5em 1em;
        margin-bottom: 0.5em;
    }
    .btn-group {
        display: flex;
    }

    .btn-group > button {
        flex: 1;
    }
`;
