import styled, { keyframes } from "styled-components";

import { memo } from "react";

const shimmer = keyframes`
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;

function CourseItemSkeleton() {
    return (
        <CourseSkeletonWrapper>
            <IconSkeleton />

            <InfoSkeletonWrapper>
                <TitleSkeleton />
                <DescriptionSkeleton />
            </InfoSkeletonWrapper>

            <MenuSkeleton />
        </CourseSkeletonWrapper>
    );
}

function CoursesSkeleton({ count = 4 }) {
    return (
        <CoursesSkeletonWrapper>
            {Array.from({ length: count }).map((_, index) => (
                <CourseItemSkeleton key={index} />
            ))}
        </CoursesSkeletonWrapper>
    );
}

const CoursesSkeletonWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const CourseSkeletonWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-card);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SkeletonBase = styled.div`
    background: linear-gradient(
        90deg,
        var(--color-surface) 25%,
        var(--color-surface-soft) 50%,
        var(--color-surface) 75%
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite;
    border-radius: 4px;
`;

const IconSkeleton = styled(SkeletonBase)`
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 6px;
`;

const InfoSkeletonWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
`;

const TitleSkeleton = styled(SkeletonBase)`
    height: 1rem;
    width: 70%;
    border-radius: 4px;
`;

const DescriptionSkeleton = styled(SkeletonBase)`
    height: 0.875rem;
    width: 90%;
    border-radius: 4px;
`;

const MenuSkeleton = styled(SkeletonBase)`
    width: 40px;
    height: 40px;
    border-radius: 6px;
`;

export default memo(CourseItemSkeleton);
export { CoursesSkeleton };
