import React from "react";
import getElementProps from "../../globals/helpers/getElementProps";

type Props = {
    value: string,
    onChange: Function,
    type?: string,
    className?: string,
    disabled?: boolean,
    onBlur?: Function,
    name?: string,
    id?: string,
    placeholder?: string
}

const PriceInput = React.forwardRef((props: Props, ref: any) => {
    const inputProps = getElementProps(props, ['onChange']);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const striped = value.replace(/[^0-9]/g, '');
        const intValue = parseInt(striped);

        if (!isNaN(intValue)) {
            props.onChange && props.onChange(intValue);
        }
    }, [props.onChange]);

    return <input
        {...inputProps}
        onChange={handleChange}
        ref={ref} />
});

export default PriceInput;