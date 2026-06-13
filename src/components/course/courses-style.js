import { Text } from "../ui/text";
import styled from "styled-components";

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
    border-radius: 24px;
    padding: 24px;
    background: var(--color-surface);
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

export const DialogTitle = styled.h2`
    margin: 0;
    font-size: 1.25rem;
    color: var(--color-text);
`;

export const CloseButton = styled.button`
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background: var(--color-background);
    color: var(--color-text);
    cursor: pointer;
    font-size: 1.25rem;

    &:hover {
        background: var(--color-secondary);
    }
`;

export const DialogForm = styled.form`
    display: grid;
    gap: 18px;
`;

export const DialogBody = styled.div`
    display: grid;
    gap: 18px;
    margin-top: 12px;
`;

export const DialogSection = styled.div`
    display: grid;
    gap: 12px;
`;

export const DialogRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-radius: 16px;
    background: var(--color-surface-soft);
`;

export const DialogLabel = styled.span`
    color: var(--color-text-muted);
    font-size: 0.95rem;
`;

export const DialogValue = styled.span`
    font-weight: 600;
    color: var(--color-text);
`;

export const DialogText = styled.p`
    margin: 0;
    color: var(--color-text);
    line-height: 1.75;
    white-space: pre-wrap;
`;

export const SkeletonBox = styled.div`
    width: ${({ width }) => width || "100%"};
    height: ${({ height }) => height || "16px"};
    border-radius: 12px;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.08),
        rgba(255, 255, 255, 0.16),
        rgba(255, 255, 255, 0.08)
    );
    background-size: 200% 100%;
    animation: loading 1.2s ease-in-out infinite;

    @keyframes loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;

export const DialogActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 8px;
`;

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

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const CourseDetailThumbnail = styled.img`
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 24px;
    background: var(--color-card);
`;

export const CourseDetailMeta = styled.div`
    display: grid;
    gap: 1em;
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
    background: ${({ published }) =>
        published ? "rgba(16, 185, 129, 0.12)" : "rgba(249, 115, 22, 0.12)"};
    color: ${({ published }) => (published ? "#10b981" : "#f97316")};
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
    height: 100px;
    gap: 1rem;
    padding: 0.5em;
    background-color: var(--color-primary-soft);
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
