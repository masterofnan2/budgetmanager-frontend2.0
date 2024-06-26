import getElementProps from "../../globals/helpers/getElementProps";
import Icon from "../Icon/Icon";

type Props = {
    type?: 'button' | 'submit' | 'reset',
    className?: string,
    onClick?: Function,
    onFocus?: Function,
    disabled?: boolean,
    id?: string,
    style?: { [key: string]: any },
    [key: string]: any,
    options?: {
        loading?: boolean
    }
}

const Button = (props: Props) => {
    const buttonProps = getElementProps(props, ['options', 'children', 'disabled']);
    const { options } = props;

    return <button
        {...buttonProps}
        disabled={props.disabled || options?.loading}>
        {props.children}
        {options?.loading &&
            <Icon className="button-loading-spinner">spinner</Icon>}
    </button>
}

export default Button;