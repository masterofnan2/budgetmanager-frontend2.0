import React from "react";
import Carousel, { CarouselElement } from "../../../../others/minicomponents/Carousel/Carousel";
import FirstStep from "./partials/FirstStep";
import SecondStep from "./partials/SecondStep";

const Signup = () => {

    const [state, setState] = React.useState({
        email: '' as string
    });

    const carouselRef = React.useRef();

    const setEmail = React.useCallback((email: string) => {
        setState(s => ({ ...s, email }));
    }, []);

    const goToStep = React.useCallback((number: number) => {
        carouselRef.current?.jumpTo(number)
    }, [carouselRef]);

    return <div className="signup-form">
        <Carousel
            ref={carouselRef}>
            <CarouselElement>
                <FirstStep
                    goToStep={goToStep}
                    setEmail={setEmail} />
            </CarouselElement>
            <CarouselElement>
                <SecondStep
                    goToStep={goToStep}
                    email={state.email} />
            </CarouselElement>
        </Carousel>
    </div>
}

export default Signup;