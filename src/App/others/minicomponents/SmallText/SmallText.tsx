import React from "react";
import Button from "../Button/Button";

type Props = {
    children: any,
    maxLength?: number,
    isExtendable?: boolean
}

const SmallText = React.memo((props: Props) => {
    const { children, maxLength = 5, isExtendable = false } = props;
    const defaultHiding = React.useMemo(() => {
        return children.length > maxLength;
    }, [children, maxLength]);

    const [isHiding, setIsHiding] = React.useState(defaultHiding);
    return <>
        {isHiding ? children.replace(children.substr(maxLength), '...') : children}
        {isExtendable && children.length > maxLength && <Button
            type="button"
            className={"smalltext-button"}
            onClick={() => setIsHiding(!isHiding)}>show {isHiding ? 'more' : 'less'}</Button>}
    </>
});

export default SmallText;