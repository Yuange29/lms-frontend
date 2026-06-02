import AccountRole from "./AccountRole";
import MainFeatures from "./MainFeatures";
import { NavBarStyle } from "./styles";
import UserBar from "./UserBar";
import { useAuth } from "../../hooks/authHook";

export default function NavBar() {
    const { user } = useAuth();

    return (
        <NavBarStyle>
            <AccountRole role={user?.role_id} />

            <MainFeatures />

            <UserBar user={user || null} />
        </NavBarStyle>
    );
}
