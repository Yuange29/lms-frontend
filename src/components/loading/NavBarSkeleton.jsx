import { LoadingCircle, LoadingLine, LoadingSquare } from "./loading-style";

import styled from "styled-components";

function UserSkeletonLoading() {
    return (
        <LoadingWrapper>
            <LoadingCircle $width="42px" $right="0.5em" />
            <Info>
                <LoadingLine $width="120px" />
                <LoadingLine $width="160px" />
            </Info>
            <LoadingSquare $width="35px" />
        </LoadingWrapper>
    );
}

function RoleSkeletonLoading() {
    return (
        <LoadingWrapper>
            <LoadingSquare $width="42px" $right="0.5em" />
            <Info>
                <LoadingLine $width="120px" />
                <LoadingLine $width="160px" />
            </Info>
            <LoadingSquare $width="35px" />
        </LoadingWrapper>
    );
}

const LoadingWrapper = styled.div`
    width: 100%;
    height: 72px;
    padding: 0 1.2em;
    background-color: var(--color-primary-active);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    /* gap: 0.5em; */
    overflow: hidden;
`;

export { UserSkeletonLoading, RoleSkeletonLoading };
