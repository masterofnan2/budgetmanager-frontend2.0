import React from "react";
import Carousel, { CarouselElement } from "../../../../others/minicomponents/Carousel/Carousel";
import FloatingForm from "../../../../others/minicomponents/FloatingForm/FloatingForm";
import Button from "../../../../others/minicomponents/Button/Button";
import handleInputBlur from "../../../../others/helpers/handleInputBlur";
import getFormData from "../../../../others/helpers/getFormData";
import getValidationMessages from "../../../../others/helpers/getValidationMessages";
import Countdown from "../Confirmation/Components/Countdown";
import { forgetPassword } from "../../../../others/api/functions/actions";

type ValidationMessages = {
    [key: string]: string
}

const PasswordForgotten = () => {
    const carouselRef = React.useRef();
    const [state, setState] = React.useState({
        email: '',
        validationMessages: null as ValidationMessages | null,
        loading: false
    });

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = getFormData(e);
        const validationMessages = getValidationMessages(formData);

        if (validationMessages) {
            setState(s => ({ ...s, validationMessages }));
        } else {
            setState(s => ({ ...s, loading: true }));
            forgetPassword(formData.email)
                .then(response => {
                    setState(s => {
                        const newState = { ...s, loading: false, email: formData.email };

                        if (response.error?.errors) {
                            newState.validationMessages = response.error.errors;
                        }

                        return newState;
                    });
                });
        }
    }, []);

    const resendEmail = React.useCallback(() => {

    }, []);

    return <div className="forgotten-password-container">
        <Carousel ref={carouselRef}>
            <CarouselElement className="d-flex justify-content-center h-100 align-items-center">
                <form className="col-6 d-flex flex-column gap-3" onSubmit={handleSubmit}>
                    <p className="text-secondary">Your email adress is required in order to reset your password</p>
                    <FloatingForm
                        placeholder="email"
                        name='email'
                        onBlur={(e: any) => handleInputBlur(e, setState)}
                        options={{ className: 'col-12', error: state.validationMessages?.email, icon: 'email' }} />
                    <Button
                        type="submit"
                        className="btn-primary"
                        options={{ loading: state.loading }}>Reset password</Button>
                </form>
            </CarouselElement>
            <CarouselElement>
                <h5>An email has been sent to <strong>{state.email}</strong></h5>
                <Countdown initConfirmation={resendEmail} />
            </CarouselElement>
        </Carousel>
    </div>
}

export default PasswordForgotten;