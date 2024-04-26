import { Link } from "react-router-dom";
import Button from "../../../../others/minicomponents/Button/Button";
import FloatingForm, { PasswordFloatingForm } from "../../../../others/minicomponents/FloatingForm/FloatingForm";
import getFormData from "../../../../others/helpers/getFormData";
import React, { FormEvent } from "react";
import { logIn } from "../../../../others/api/functions/actions";
import handleInputBlur from "../../../../others/helpers/handleInputBlur";
import getValidationMessages from "../../../../others/helpers/getValidationMessages";
import Fade from "../../../../others/minicomponents/Fade/Fade";
import useDispatch from "../../../../others/storage/core/useDispatch";
import { setAuth } from "../../../../others/storage/parts/user/actions";

type ValidationMessages = {
    email?: string | string[],
    password?: string | string[]
}

const Login = () => {
    const [state, setState] = React.useState({
        loading: false,
        validationMessages: null as ValidationMessages | null,
        credentialsWereWrongOnce: false
    });

    const dispatch = useDispatch();

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = getFormData(e) as { email: string, password: string };

        const validationMessages: { email?: string, password?: string } | null = getValidationMessages(formData);

        setState(s => ({
            ...s,
            loading: !Boolean(validationMessages),
            validationMessages
        }));

        if (!validationMessages) {
            logIn(formData)
                .then((response) => {
                    setState(s => {
                        const newState = { ...s };

                        if (response.error?.errors) {
                            newState.validationMessages = response.error.errors;
                            newState.credentialsWereWrongOnce = Boolean(response.error.errors);
                        }

                        newState.loading = false;

                        return newState;
                    })

                    if (response.data?.user && response.data?.token) {
                        localStorage.setItem('authToken', response.data.token);
                        dispatch(setAuth(response.data.user));
                    }
                });
        }
    }, []);

    return <form className="login-form" onSubmit={handleSubmit}>
        <FloatingForm
            placeholder='email'
            options={{ error: state.validationMessages?.email, icon: 'email' }}
            name="email"
            onBlur={(e: InputEvent) => handleInputBlur(e, setState)} />

        <PasswordFloatingForm
            placeholder='password'
            options={{ error: state.validationMessages?.password, icon: 'password-field' }}
            name="password"
            onBlur={(e: InputEvent) => handleInputBlur(e, setState)} />

        <Button
            type="submit"
            className="btn-primary w-50"
            options={{ loading: state.loading }}
            disabled={Boolean(state.validationMessages)}>Log in</Button>

        <p>No account yet? <Link to={'/auth/signup'}>Create one for free</Link></p>
        {state.credentialsWereWrongOnce &&
            <Fade
                animateEnter={true}
                visible={true}
                from={{ opacity: 0 }}
                className="text-align-center">
                <Link
                    to='/auth/password-forgotten'
                    className="text-secondary">Password forgotten?</Link>
            </Fade>}
    </form>
}

export default Login;