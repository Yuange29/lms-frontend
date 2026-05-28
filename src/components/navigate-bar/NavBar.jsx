import React from "react";
import { useAuth } from "../../hooks/authHook";
import AccountRole from "./AccountRole";
import MainFeatures from "./MainFeatures";
import UserBar from "./UserBar";
import { NavBarStyle } from "./styles";

const ROLE = { "fd4546e4-bf5c-4d4d-8a88-f62a8b43e832": "STUDENT" };

export default function NavBar() {
    const { user } = useAuth();
    return (
        <NavBarStyle>
            <AccountRole role={ROLE[user?.role_id]} />

            <MainFeatures />

            <UserBar user={user || null} />
        </NavBarStyle>
    );
}
