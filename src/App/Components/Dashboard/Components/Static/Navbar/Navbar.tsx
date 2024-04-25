// import BalanceDisplayer from "./Components/BalanceDisplayer";
import LogoutModalDialog from "./Components/LogoutModalDialog";
import UserDropdown from "./Components/UserDropdown";

export const logoutModalId = 'logout-modal-dialog';

const Navbar = () => {
    return <nav className="dashboard-navbar">
        {/* <BalanceDisplayer /> */}
        <UserDropdown />
        <LogoutModalDialog />
    </nav>
}

export default Navbar;