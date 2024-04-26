import React from "react";
import { User } from "../../../../others/constants/dataTypes";
import useSelector from "../../../../others/storage/core/useSelector";
import Countdown from "./Components/Countdown";
import { makeEmailConfirmation, matchConfirmationCode } from "../../../../others/api/functions/actions";
// import { useNavigate } from "react-router-dom";
import CodeInput from "../../../../others/minicomponents/CodeInput/CodeInput";
import useAuthenticateUser from "../../../../others/api/hooks/useAuthenticateUser";

const Confirmation = () => {
    const [state, setState] = React.useState({
        error: ''
    });

    const user = useSelector(state => state.user) as User;
    const authenticateUser = useAuthenticateUser();

    React.useEffect(() => {
        if (!user?.email_verified_at) {
            makeEmailConfirmation();
        }
    }, [user?.email_verified_at]);

    const handleComplete = React.useCallback((code: string) => {
        matchConfirmationCode(code)
            .then(response => {
                if (response.data?.matched) {
                    authenticateUser();
                }

                if (response.error?.code) {
                    setState(s => ({ ...s, error: response.error?.code }));
                }
            })
    }, [authenticateUser]);

    if (!user.email_verified_at) {
        return <form className="auth-confirmation-container p-1 text-align-center">
            <label htmlFor="code-input-0">
                <h3 className="display-2 mb-1">Confirm your email</h3>
                <p className="text-secondary">
                    We have sent an email to <span className="user-email">{user.email}</span>,
                    please, check your inbox and type the code here
                </p>
            </label>

            <CodeInput
                onComplete={handleComplete}
                length={6}
                error={state.error}
                />
            <Countdown initConfirmation={makeEmailConfirmation} />
        </form>
    }
}

export default Confirmation;