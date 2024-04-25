import { Outlet } from "react-router-dom";
import { useRedirect } from "../hooks/useRedirect"
import useSelector from "../storage/core/useSelector";

const state = true;

const AuthRoutes = () => {
    useRedirect(state);
    const user = useSelector(state => state.user);
    
    if (user) {
        return <Outlet />;
    }
}

export default AuthRoutes;