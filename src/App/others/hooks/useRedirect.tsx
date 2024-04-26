import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSelector from "../storage/core/useSelector";
import { User } from "../constants/dataTypes";

type SessionIntended = { target: null | boolean, path: string }

const emailConfirmation = '/auth/confirmation';
const loginPage = '/auth/login';
const authPage = '/dashboard';

const notApplicablePaths = [
    emailConfirmation,
    loginPage,
    authPage
];

function setSessionIntended(pathname: string, target: boolean) {
    const intended = {
        path: pathname,
        target
    }

    sessionStorage.setItem('intended', JSON.stringify(intended));
}

function goToIntended(path: string, navigate: Function) {
    sessionStorage.removeItem('intended');
    navigate(path);
}

function getSessionIntended(): SessionIntended | null {
    const existingIntended: null | string = sessionStorage.getItem('intended');
    const sessionIntended: SessionIntended = existingIntended && JSON.parse(existingIntended);

    return sessionIntended;
}

export function useRedirect(target: boolean): Function {
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector(state => state.user) as User;
    const userAuthenticated = Boolean(user);
    const sessionIntended = getSessionIntended();

    const redirect = useCallback(() => {
        if (sessionIntended?.target === userAuthenticated) {
            goToIntended(sessionIntended.path, navigate);
        } else {
            target ? navigate(loginPage) : navigate(authPage);
        }
    }, [sessionIntended, userAuthenticated, navigate, target]);

    useEffect(() => {
        if (userAuthenticated !== target && !notApplicablePaths.includes(location.pathname)) {
            setSessionIntended(location.pathname, target);
        }
    }, [target, location.pathname]);

    useEffect(() => {
        if (user?.email_verified_at === null && location.pathname !== emailConfirmation) {
            navigate(emailConfirmation);
        } else if (user?.email_verified_at && location.pathname === emailConfirmation) {
            redirect()
        } else {
            if (userAuthenticated !== target) {
                redirect()
            }
        }
    }, [userAuthenticated, user, location.pathname, target]);

    return redirect;
}