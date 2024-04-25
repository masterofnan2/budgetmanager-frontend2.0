import { Outlet } from "react-router-dom";
import { useRedirect } from "../hooks/useRedirect"
import useSelector from "../storage/core/useSelector";

const state = false;

const GuestRoutes = () => {
    useRedirect(state);
    const user = useSelector(state => state.user);

    if (user === state) {
        return <Outlet />
    }
}

export default GuestRoutes;