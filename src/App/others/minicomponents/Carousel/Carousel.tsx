import React from "react";

const Carousel = React.forwardRef((props, ref) => {
    const { children, withCarouselList, cycle, onActiveChange } = props;

    const [state, setState] = React.useState({
        active: 1,
        carouselElementsCount: 0,
        position: 0
    });

    const carouselElementsRef = React.useRef();

    const jumpTo = React.useCallback((number: number) => {
        if (number > 0 && state.carouselElementsCount >= number) {
            setState(s => ({ ...s, active: number, position: -100 * (number - 1) }));
            onActiveChange && onActiveChange(number);
        }
    }, [state.carouselElementsCount]);

    const previous = React.useCallback(() => {
        if (state.active > 1) {
            jumpTo(state.active - 1);
        } else {
            jumpTo(state.carouselElementsCount);
        }
    }, [state.active, state.carouselElementsCount]);

    const next = React.useCallback(() => {
        if (state.active < state.carouselElementsCount) {
            jumpTo(state.active + 1);
        } else {
            jumpTo(1);
        }
    }, [state.active, state.carouselElementsCount]);

    const interval = React.useMemo(() => {
        if (cycle) {
            return setInterval(() => {
                next();
            }, cycle);
        } else {
            return undefined;
        }
    }, [cycle, next]);

    const style = React.useMemo(() => {
        return {
            transform: `translateX(${state.position}%)`
        }
    }, [state.position, state.carouselElementsCount]);

    React.useEffect(() => {
        if (carouselElementsRef.current && !state.carouselElementsCount) {
            const { length } = carouselElementsRef.current.children;
            setState(s => ({
                ...s,
                carouselElementsCount: length
            }));
        }

        if (ref) {
            ref.current = {
                jumpTo,
                active: state.active
            }
        }

        return () => clearInterval(interval);
    }, [carouselElementsRef, interval, state.carouselElementsCount, state.active, ref, jumpTo]);

    return <div className="carousel-container" ref={ref}>
        <div className="carousel-elements"
            ref={carouselElementsRef}
            style={style}>
            {children}
        </div>
        {withCarouselList &&
            <ul className="carousel-list">
                {carouselElementsRef.current && Array.from(carouselElementsRef.current.children).map((child, key) => {
                    const id = key + 1;
                    return <li
                        className={"carousel-list-item" + (state.active === id ? ' active' : '')}
                        key={key}
                        onClick={() => jumpTo(id)}>
                    </li>
                })}
            </ul>}
    </div>
});

export const CarouselElement = ({ children, style = {} }) => {
    return <div className="carousel-element" style={style}>
        {children}
    </div>
}

export default Carousel;