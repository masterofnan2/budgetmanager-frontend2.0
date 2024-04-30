import React, { FormEvent } from "react";
import { PasswordFloatingForm } from "../../../../others/minicomponents/FloatingForm/FloatingForm";
import Button from "../../../../others/minicomponents/Button/Button";
import { useParams } from "react-router-dom";
import getFormData from "../../../../others/globals/helpers/getFormData";
import getValidationMessages from "../../../../others/globals/helpers/getValidationMessages";
import { resetPassword } from "../../../../others/api/functions/actions";
import handleInputBlur from "../../../../others/globals/helpers/handleInputBlur";
import useDispatch from "../../../../others/storage/core/useDispatch";
import { setAuth } from "../../../../others/storage/parts/user/actions";

type Payload = {
    password?: string,
    password_confirmation?: string
}

const ResetPassword = React.memo(() => {
    const [state, setState] = React.useState({
        validationMessages: null as Payload | null,
        loading: false
    });

    const { token } = useParams();
    const dispatch = useDispatch();

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token) {
            const formData = getFormData(e) as Payload;
            const validationMessages = getValidationMessages(formData);

            setState(s => ({ ...s, validationMessages, loading: !Boolean(validationMessages) }));

            if (!validationMessages) {
                resetPassword({
                    token: token,
                    password: formData.password!,
                    password_confirmation: formData.password_confirmation!
                }).then(response => {
                    setState(s => {
                        const newState = { ...s, loading: false };

                        if (response?.error?.errors) {
                            newState.validationMessages = response.error.errors;
                        }

                        return newState;
                    })

                    if (response.data?.user && response.data?.token) {
                        localStorage.setItem('authToken', response.data.token);
                        dispatch(setAuth(response.data.user));
                    }
                })
            }
        }
    }, [token]);

    const handleBlur = React.useCallback((e: Event) => {
        handleInputBlur(e, setState);
    }, []);

    if (token) {
        return <form className="reset-password-container" onSubmit={handleSubmit}>
            <h5 className="text-secondary display-3">Finalizing your password reset</h5>
            <PasswordFloatingForm
                placeholder="password"
                options={{
                    icon: 'password-field',
                    error: state.validationMessages?.password
                }}
                name="password"
                onBlur={handleBlur} />

            <PasswordFloatingForm
                placeholder="password confirmation"
                options={{
                    icon: 'password-field',
                    error: state.validationMessages?.password_confirmation
                }}
                name="password_confirmation"
                onBlur={handleBlur} />

            <Button
                type="submit"
                className="btn-primary w-50"
                options={{ loading: state.loading }}
                disabled={Boolean(state.validationMessages)}>Reset Password</Button>
        </form>
    }
});

export default ResetPassword;