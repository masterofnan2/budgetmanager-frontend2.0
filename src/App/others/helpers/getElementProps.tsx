const excludedProps: string[] = ['options'];

const getElementProps = (props: {[key: string]: any}, notElementProps: string[] = excludedProps) => {
    const givenProps = { ...props };
    let elementProps = {};

    for (let propName in givenProps) {
        if (!notElementProps.includes(propName)) {
            elementProps = { ...elementProps, [propName]: givenProps[propName] };
        }
    }

    return elementProps;
}

export default getElementProps;