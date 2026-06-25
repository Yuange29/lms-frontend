import { CourseDetailHeader, CourseDetailMeta } from "../course/courses-style";
import { LoadingLine, LoadingRectangle, LoadingSquare } from "./loading-style";

import { Section } from "../ui/Secttion";
import { memo } from "react";
import styled from "styled-components";

function CourseItemSkeleton() {
    return (
        <CourseSkeletonWrapper>
            <LoadingSquare $width="50px" />

            <InfoSkeletonWrapper>
                <LoadingLine $width="60%" />
                <LoadingLine $width="80%" />
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

const CourseSkeletonWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
    border: 2px solid rgba(0, 0, 0, 0.207);
    border-radius: 8px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.305);
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
