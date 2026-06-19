import { LoadingLine, LoadingRectangle, LoadingSquare } from "./loading-style";

import { memo } from "react";
import styled from "styled-components";

function CourseItemSkeleton() {
    return (
        <CourseSkeletonWrapper>
            <LoadingSquare $width="50px" />

            <InfoSkeletonWrapper>
                <LoadingLine $width="60%" />
                <LoadingLine $width="80%" />
            </InfoSkeletonWrapper>

            <LoadingRectangle $width="50px" $height="50px" />
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
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const InfoSkeletonWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
`;

export default memo(CourseItemSkeleton);
export { CoursesSkeleton };
