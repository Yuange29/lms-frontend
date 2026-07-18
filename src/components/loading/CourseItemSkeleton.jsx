import { CourseDetailHeader, CourseDetailMeta } from "../course/courses-style";
import {
    LoadingDivWrapper,
    LoadingLine,
    LoadingRectangle,
    LoadingSquare,
} from "./loading-style";

import { Section } from "../ui/Secttion";
import { memo } from "react";
import styled from "styled-components";

function CourseItemSkeleton() {
    return (
        <LoadingDivWrapper>
            <LoadingSquare $width="50px" />

            <InfoSkeletonWrapper>
                <LoadingLine $width="60%" />
                <LoadingLine $width="80%" />
                <LoadingLine $width="80%" />
            </InfoSkeletonWrapper>

            <LoadingRectangle $width="50px" $height="50px" />
        </LoadingDivWrapper>
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

function CourseDialogSkeleton() {
    return (
        <BodySkeleton>
            <LoadingLine $width="80px" />
            <LoadingLine $width="50%" style={{ margin: "0 auto 10px" }} />
            <LoadingRectangle $height="30px" $width="100%" />
            <LoadingRectangle $height="30px" $width="100%" />
            <LoadingRectangle $height="30px" $width="100%" />
            <LoadingRectangle $height="30px" $width="100%" />
            <LoadingRectangle $height="30px" $width="100%" />
        </BodySkeleton>
    );
}

function CourseDetailPageSkeleton() {
    return (
        <>
            <Section>
                <LoadingRectangle $width="70%" $height="30px" />
            </Section>
            <Section>
                <LoadingRectangle $width="45%" $height="30px" />
                <CourseDetailHeader>
                    <div style={{ flex: 1 }}>
                        <LoadingRectangle $width="50%" $height="30px" />
                        <LoadingRectangle $width="40%" $height="30px" />
                    </div>
                    <LoadingSquare $width="240px" />
                </CourseDetailHeader>
            </Section>
            <Section>
                <LoadingRectangle $width="25%" $height="30px" />
                <CourseDetailMeta>
                    <LoadingRectangle $width="90%" $height="30px" />
                    <LoadingRectangle $width="90%" $height="30px" />
                    <LoadingRectangle $width="90%" $height="30px" />
                    <LoadingRectangle $width="90%" $height="30px" />
                </CourseDetailMeta>
            </Section>
            <Section>
                <LoadingRectangle $width="25%" $height="30px" />
                <CourseDetailMeta>
                    <LoadingRectangle $width="90%" $height="80px" />
                    <LoadingRectangle $width="90%" $height="80px" />
                    <LoadingRectangle $width="90%" $height="80px" />
                </CourseDetailMeta>
            </Section>
        </>
    );
}

const BodySkeleton = styled.div`
    display: flex;
    flex-direction: column;
`;

const CoursesSkeletonWrapper = styled.div`
    width: 100%;
    max-height: 250px;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(2, 1fr);

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const InfoSkeletonWrapper = styled.div`
    margin-left: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
`;

export default memo(CourseItemSkeleton);
export { CoursesSkeleton, CourseDialogSkeleton, CourseDetailPageSkeleton };
