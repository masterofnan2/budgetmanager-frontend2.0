import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSelector from "../storage/core/useSelector";
import { User } from "../constants/dataTypes";

type SessionIntended = { aim: null | boolean, path: string } | null

export function useRedirect(aim: boolean): void {

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const existingIntended: null | string = sessionStorage.getItem('intended');

    const sessionIntended: SessionIntended = existingIntended && JSON.parse(existingIntended);

    const user = useSelector(state => state.user) as User;
    const userAuthenticated = Boolean(user);

    useEffect(() => {
        if (userAuthenticated !== aim) {
            const intended = {
                path: currentPath,
                aim
            }
            sessionStorage.setItem('intended', JSON.stringify(intended));
        }
    }, [userAuthenticated, aim, currentPath]);

    useEffect(() => {
        if (user && user.email_verified_at === null) {
            location.pathname !== '/auth/confirmation' && navigate('/auth/confirmation');
        } else {
            if (userAuthenticated !== aim) {
                if (sessionIntended && sessionIntended.aim === userAuthenticated) {
                    sessionStorage.removeItem('intended');
                    navigate(sessionIntended.path);
                } else {
                    navigate(aim ? '/auth/login' : '/dashboard');
                }
            }
        }
    }, [userAuthenticated, aim, sessionIntended, navigate, user]);
}