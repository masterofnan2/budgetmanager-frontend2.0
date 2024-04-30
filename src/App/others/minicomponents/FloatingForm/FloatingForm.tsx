import React from "react"
import getElementProps from "../../globals/helpers/getElementProps";
import Icon from "../Icon/Icon";

type Props = {
    type?: string,
    value?: string | number,
    defaultValue?: string | number,
    disabled?: boolean,
    placeholder: string,
    onClick?: Function,
    onBlur?: Function,
    onChange?: Function,
    onFocus?: Function,
    name?: string,
    options?: {
        error?: string | string[],
        icon?: string,
        className?: string
    },
};

const FloatingForm = React.memo((props: Props) => {
    const { options } = props;
    const inputProps = getElementProps(props, ['options', 'type']);

    return <div

        className={"floating-form-group " + (options?.className || '')}>
        <input
            type={props.type || 'text'}
            className={"form-control " + (options?.error ? 'is-invalid' : '')}
            {...inputProps} />
        <label>
            {options?.icon && <Icon>{options.icon}</Icon>}
            {props.placeholder}
        </label>
        {options?.error &&
            <p className="invalid-feedback">
                {options.error}
            </p>}
    </div>
});


export const PasswordFloatingForm = React.memo((props: Props) => {
    const { options } = props;
    const inputProps = getElementProps(props, ['options', 'type', 'onChange']);

    const showPasswordRef = React.useRef();
    const inputRef = React.useRef();

    const makePasswordButtonVisible = React.useCallback(() => {
        const className = showPasswordRef.current?.getAttribute('class');
        !className.includes('visible') && showPasswordRef.current?.classList.toggle('visible');
    }, [showPasswordRef])

    const makePasswordButtonInvisible = React.useCallback(() => {
        const className = showPasswordRef.current?.getAttribute('class');
        className.includes('visible') && showPasswordRef.current?.classList.toggle('visible');
    }, [showPasswordRef]);

    const handleChange = React.useCallback((e) => {
        const { value, type } = e.target;

        if (value.length > 0) {
            type === 'text' && e.target.setAttribute('type', 'password');
            makePasswordButtonVisible();
        } else {
            type === 'password' && e.target.setAttribute('type', 'text');
            makePasswordButtonInvisible();
        }

        props.onChange && props.onChange();
    }, [props, showPasswordRef]);

    const handleShowPassword = React.useCallback(() => {
        if (inputRef.current) {
            const type = inputRef.current.getAttribute('type');
            type === 'text' ?
                inputRef.current.setAttribute('type', 'password') :
                inputRef.current.setAttribute('type', 'text');
        }
    }, [inputRef]);

    return <div className={"floating-form-group " + (options?.className || '')}>
        <input
            type='text'
            className={"form-control " + (options?.error ? 'is-invalid' : '')}
            onChange={handleChange}
            ref={inputRef}
            {...inputProps} />
        <label>
            {options?.icon && <Icon >{options.icon}</Icon>}
            {props.placeholder}
        </label>
        <button
            type="button"
            className="show-password"
            ref={showPasswordRef}
            onClick={handleShowPassword}>
            <Icon className="icon-3">eye</Icon>
        </button>
        {options?.error &&
            <p className="invalid-feedback">
                {options.error}
            </p>}
    </div>
});

export default FloatingForm;