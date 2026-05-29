import { AnimationWrapper } from "../../styles/Animation";
import styled from "styled-components";

function UserSkeletonLoading() {
    return (
        <AnimationWrapper>
            <LoadingWrapper>
                <Avatar></Avatar>
                <Info>
                    <Line width="120px" />
                    <Line width="160px" />
                </Info>
                <UserBtn />
            </LoadingWrapper>
        </AnimationWrapper>
    );
}

function RoleSkeletonLoading() {
    return (
        <AnimationWrapper>
            <LoadingWrapper>
                <Icon />
                <Info>
                    <Line width="120px" />
                    <Line width="160px" />
                </Info>
                <UserBtn />
            </LoadingWrapper>
        </AnimationWrapper>
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

const Avatar = styled.div`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    margin-right: 0.8em;
`;

const Info = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
    overflow: hidden;
`;

const Line = styled.div`
    height: 10px;
    width: ${({ width }) => width || "100%"};
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
`;

const UserBtn = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.15);
`;

const Icon = styled.div`
    height: 40px;
    width: 40px;
    margin-right: 0.8em;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.15);
`;

export { UserSkeletonLoading, RoleSkeletonLoading };
