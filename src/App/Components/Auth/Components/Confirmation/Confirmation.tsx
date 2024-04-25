import React from "react";
import { User } from "../../../../others/constants/dataTypes";
import useSelector from "../../../../others/storage/core/useSelector";
import Countdown from "./Components/Countdown";
import { makeEmailConfirmation, matchConfirmationCode } from "../../../../others/api/functions/actions";
// import usePagePreloader from "../../../../others/minicomponents/PagePreloader/assets/hooks/usePagePreloader";
import { useNavigate } from "react-router-dom";

const idPrefix = 'code-input-';

const handlePrevNext = (key: number, value: string) => {
    if (key < 5 && value.length > 0) {
        const nextElement = idPrefix + (key + 1);
        document.getElementById(nextElement)?.focus();
    } else if (key > 0 && value.length === 0) {
        const previousElement = idPrefix + (key - 1);
        document.getElementById(previousElement)?.focus();
    }
}

const Confirmation = () => {
    const user = useSelector(state => state.user) as User;
    // const pagePreloader = usePagePreloader();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        values: ['', '', '', '', '', ''],
        error: ''
    });

    const initConfirmation = React.useCallback(() => {
        makeEmailConfirmation();
    }, []);

    const handleChange = React.useCallback((e: any, key: number) => {
        const { value } = e.target;

        if (value.length <= 1 && !isNaN(value)) {
            setState(s => {
                const newValues = [...s.values];
                newValues[key] = value;
                return { ...s, values: newValues }
            });
        }

        handlePrevNext(key, value);
    }, []);

    React.useEffect(() => {
        if (!user?.email_verified_at) {
            initConfirmation();
        } else {
            navigate('/dashboard');
        }
    }, [user?.email_verified_at]);

    React.useEffect(() => {
        const code = state.values.join('');
        if (code.length === 6) {
            // pagePreloader.show();
            matchConfirmationCode(code)
                .then(response => {
                    // pagePreloader.hide();
                    if (response.data?.matched) {
                        location.reload();
                    }

                    if (response.error?.code) {
                        setState(s => ({ ...s, error: response.error?.code }));
                    }

                })
        }
    }, [state.values]);

    if (!user.email_verified_at) {
        return <form className="auth-confirmation-container p-1">
            <label htmlFor="code-input-0">
                <h3 className="display-2 mb-1">Confirm your email</h3>
                <p className="text-secondary">
                    We have sent an email to <span className="user-email">{user.email}</span>,
                    please, check your inbox and type the code here
                </p>
            </label>
            <div className="d-flex justify-content-center gap-1 my-4">
                {state.values.map((value, key) => <input
                    key={key}
                    type='text'
                    className="confirmation-code-input col-1"
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                    id={idPrefix + key} />
                )}
            </div>
            <Countdown initConfirmation={initConfirmation} />
        </form>
    }
}

export default Confirmation;