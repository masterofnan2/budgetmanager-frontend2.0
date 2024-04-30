import React from "react";
import Carousel, { CarouselElement, CarouselRef } from "../../../../others/minicomponents/Carousel/Carousel";
import FloatingForm from "../../../../others/minicomponents/FloatingForm/FloatingForm";
import Button from "../../../../others/minicomponents/Button/Button";
import handleInputBlur from "../../../../others/globals/helpers/handleInputBlur";
import getFormData from "../../../../others/globals/helpers/getFormData";
import getValidationMessages from "../../../../others/globals/helpers/getValidationMessages";
import { forgetPassword } from "../../../../others/api/functions/actions";
import useToasts from "../../../../others/minicomponents/Toast/assets/hooks/useToasts";
import ResendEmailCountdown from "../../../../others/minicomponents/ResendEmailCountdown/ResendEmailCountdown";

type ValidationMessages = {
    [key: string]: string
}

function sentMessage(email: string) {
    return `An email has been sent to ${email}, please check your inbox or your spam.`;
}

const PasswordForgotten = () => {
    const carouselRef = React.useRef() as React.MutableRefObject<CarouselRef>;

    const [state, setState] = React.useState({
        email: '',
        validationMessages: null as ValidationMessages | null,
        loading: false
    });

    const toast = useToasts();

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
                        const newState = {
                            ...s,
                            loading: false,
                            email: formData.email
                        };

                        if (response.error?.errors) {
                            newState.validationMessages = response.error.errors;
                        }

                        return newState;
                    });

                    if (response.status === 200) {
                        carouselRef.current?.jumpTo(2);
                    }
                });
        }
    }, [carouselRef]);

    const resendEmail = React.useCallback(() => {
        forgetPassword(state.email)
            .then(response => {
                if (response.status === 200) {
                    toast.push({
                        title: 'Request sent!',
                        content: sentMessage(state.email),
                        type: "success"
                    });
                } else {
                    toast.push({
                        title: 'Error occured!',
                        content: `Failed to process your request, please come back later.`,
                        type: "danger"
                    });
                }
            })
    }, [state.email, toast.push]);

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
            <CarouselElement className="d-flex flex-column gap-2 justify-content-center h-100 align-items-center">
                <h5 className="display-3">Password reset link sent</h5>
                <p className="text-secondary col-6 text-align-center">{sentMessage(state.email)}</p>
                <ResendEmailCountdown initConfirmation={resendEmail} />
            </CarouselElement>
        </Carousel>
    </div>
}

export default PasswordForgotten;