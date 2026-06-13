import styled from "styled-components";

export const NavBarStyle = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: var(--color-primary);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--color-primary-active);
`;

export const BaseBarStyle = styled.div`
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

export const RoleBarStyle = styled(BaseBarStyle)`
    border-top: none;
`;

// --------------- User Bar Styles ---------------
export const Avatar = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-right: 0.8em;
    border: 2px solid rgba(255, 255, 255, 0.5);
    object-fit: cover;
`;

export const UserInfo = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    & > span,
    & > p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const UserSkeletonInfo = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
    overflow: hidden;
`;

export const UserActionBtn = styled.button`
    height: 36px;
    width: 36px;
    position: relative;
    border-radius: 8px;
    border: none;
    color: white;
    background-color: rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;

    &:hover {
        scale: 1.1;
        border: 1px solid var(--color-primary-active);
    }

    &:active {
        scale: 0.98;
        opacity: 0.8;
        color: var(--color-on-primary);
    }
`;

export const RoleIcon = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 0.8em;
    font-size: 1.3em;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(242, 242, 242, 0.147);
    border-radius: 10px;
`;

export const UserActionMenu = styled.div`
    width: 250px;
    position: absolute;
    bottom: 1em;
    right: -256px;
    padding: 0.5em;
    border-radius: 8px;
    background-color: var(--color-primary-active);

    flex-direction: column;

    @media (max-width: 480px) {
        right: 0;
        bottom: 75px;
    }
`;

//--------------- Main Features ---------------
export const MainFeaturesStyle = styled.div`
    width: 100%;
    flex: 1;
    margin-top: 10px;
    margin-bottom: 82px;
    overflow-y: auto;
    padding: 0 0.8em;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
`;

export const DropDownMenuStyle = styled.div`
    width: 100%;
    margin-bottom: 0.3em;
`;

export const IconWrapper = styled.div`
    width: 24px;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    opacity: 0.9;
`;

export const ClickableTitle = styled.div`
    height: 46px;
    display: flex;
    align-items: center;
    padding: 0 1em;
    cursor: pointer;
    color: var(--color-on-primary);
    border-radius: 10px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: ${({ $active }) =>
        $active ? "rgba(255, 255, 255, 0.15)" : "transparent"};

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateX(2px);
    }

    &:active {
        scale: 0.98;
    }
`;

export const TitleText = styled.div`
    flex: 1;
    font-weight: 1000;
    font-size: 1em;
    margin-left: 0.5em;
`;

export const ExpandIcon = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.8em;
    opacity: 0.7;
    transition: transform 0.25s ease;
    transform: rotate(${({ $open }) => ($open ? "90deg" : "0deg")});
`;

export const DropDownContent = styled.div`
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const DropDownInner = styled.div`
    border-left: 2px solid var(--color-on-primary);
    margin-left: 1em;
    padding: 0.3em 0 0.3em 0.8em;
`;

export const Item = styled.div`
    padding: 0.6em 1em;
    margin: 2px 0;
    cursor: pointer;
    font-size: 0.9em;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: var(--color-on-primary);
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
`;
