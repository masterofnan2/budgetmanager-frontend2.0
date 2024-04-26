import React, { FormEvent } from "react";
import { Object } from "../../../../../others/constants/dataTypes";
import Button from "../../../../../others/minicomponents/Button/Button";
import FloatingForm, { PasswordFloatingForm } from "../../../../../others/minicomponents/FloatingForm/FloatingForm";
import Icon from "../../../../../others/minicomponents/Icon/Icon";
import getFormData from "../../../../../others/helpers/getFormData";
import { signUp } from "../../../../../others/api/functions/actions";
import handleInputBlur from "../../../../../others/helpers/handleInputBlur";
import getValidationMessages from "../../../../../others/helpers/getValidationMessages";

const previousStep = 1;

const SecondStep = (props: Object) => {
    const { goToStep, email } = props;

    const [state, setState] = React.useState({
        loading: false,
        validationMessages: null as Object | null
    });

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = getFormData(e);
        formData.email = email;

        const validationMessages: Object | null = getValidationMessages(formData);
        setState(s => ({ ...s, loading: !Boolean(validationMessages), validationMessages }));

        !validationMessages &&
            signUp(formData)
                .then(response => {
                    setState(s => {
                        const newState = { ...s };
                        if (response.error?.errors) {
                            newState.validationMessages = response.error.errors;
                        }
                        newState.loading = false;
                        return newState;
                    });

                    if (response.data?.user && response.data?.token) {
                        localStorage.setItem('authToken', response.data.token);
                        location.reload();
                    }

                    response.error?.errors?.email && goToStep(previousStep);
                })
    }, [goToStep, email]);

    return <form className="signup-form" onSubmit={handleSubmit}>
        <Button
            type="button"
            className="btn d-flex align-items-center gap-1 w-50 p-0"
            onClick={() => goToStep(1)}><Icon>left-arrow</Icon> Go back</Button>

        <FloatingForm
            placeholder='username'
            name="name"
            options={{ error: state.validationMessages?.name }}
            onBlur={(e: InputEvent) => handleInputBlur(e, setState)} />

        <PasswordFloatingForm
            placeholder='password'
            options={{ icon: 'password-field', error: state.validationMessages?.password }}
            name='password'
            onBlur={(e: InputEvent) => handleInputBlur(e, setState)} />

        <Button
            type="submit"
            className="btn-primary w-50"
            options={{ loading: state.loading }}
            disabled={Boolean(state.validationMessages)}>
            Create account
        </Button>
    </form>
}

export default SecondStep;