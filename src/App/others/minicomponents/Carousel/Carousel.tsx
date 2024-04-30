import React from "react";

type Props = {
    children: React.JSX.Element | React.JSX.Element[],
    withCarouselList?: boolean,
    cycle?: number,
    onActiveChange?: Function
}

export type CarouselRef = {
    jumpTo: Function,
    active: number
};

const Carousel = React.forwardRef((props: Props, ref: any) => {
    const { children, withCarouselList = false, cycle, onActiveChange } = props;

    const [state, setState] = React.useState({
        active: 1,
        carouselElementsCount: 0,
        position: 0
    });

    const carouselElementsRef = React.useRef() as any;

    const jumpTo = React.useCallback((number: number) => {
        if (number > 0 && state.carouselElementsCount >= number) {
            setState(s => ({ ...s, active: number, position: -100 * (number - 1) }));
            onActiveChange && onActiveChange(number);
        }
    }, [state.carouselElementsCount]);

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

type CarouselElementProps = {
    children: React.JSX.Element | React.JSX.Element[],
    style?: { [key: string]: number | string },
    className?: string
};

export const CarouselElement = (props: CarouselElementProps) => {
    const { children, style = {}, className = '' } = props;

    return <div className={"carousel-element " + className} style={style}>
        {children}
    </div>
}

export default Carousel;