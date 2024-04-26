import { Link } from "react-router-dom";
import Button from "../../../../../others/minicomponents/Button/Button";
import FloatingForm from "../../../../../others/minicomponents/FloatingForm/FloatingForm";
import React, { FormEvent } from "react";
import getFormData from "../../../../../others/helpers/getFormData";
import { verifyEmailConformity } from "../../../../../others/api/functions/actions";
import handleInputBlur from "../../../../../others/helpers/handleInputBlur";
import getValidationMessages from "../../../../../others/helpers/getValidationMessages";

const nextStepNumber = 2;

type ValidationMessages = {
    email?: string|string[]
}

type Props = {
    goToStep: Function,
    setEmail: Function
};

const FirstStep = (props: Props) => {
    const { goToStep, setEmail } = props;

    const [state, setState] = React.useState({
        validationMessages: null as ValidationMessages | null,
        loading: false
    });

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = getFormData(e) as { email: string };
        const validationMessages: ValidationMessages | null = getValidationMessages(formData);

        setState(s => ({ ...s, loading: !Boolean(validationMessages), validationMessages }));

        if (!validationMessages) {
            verifyEmailConformity(formData)
                .then(response => {
                    setState(s => {
                        const newState = { ...s };

                        newState.loading = false;
                        
                        if (response.error?.errors) {
                            newState.validationMessages = response.error.errors;
                        }

                        return newState;
                    });

                    setEmail(formData.email);
                    !response.error?.errors && goToStep(nextStepNumber);
                });
        }
    }, [goToStep]);

    return <form className="signup-form" onSubmit={handleSubmit}>
        <FloatingForm
            placeholder='email'
            name='email'
            options={{ icon: 'email', error: state.validationMessages?.email }}
            onBlur={(e: InputEvent) => handleInputBlur(e, setState)} />

        <Button
            type="submit"
            className="btn-primary w-50"
            options={{ loading: state.loading }}
            disabled={Boolean(state.validationMessages)}>
            Sign up
        </Button>
        <p>Already have an account? <Link to='/auth/login'>Log in</Link></p>
    </form>
}

export default FirstStep;