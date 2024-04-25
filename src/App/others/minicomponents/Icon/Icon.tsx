
import React from "react";
import getElementProps from "../../helpers/getElementProps";
import iconsMap from "./assets/constants/iconsMap";

type DynamicObject = { [key: string]: string | number };

type Props = {
    children: string,
    style?: DynamicObject,
    className?: string,
    [key: string]: any
};

const Icon = (props: Props) => {
    const iconProps = getElementProps(props, ['children']);
    const svg = React.useMemo(() => (iconsMap[props.children] || ''), [props.children]);
    
    return <i {...iconProps}>
        {svg}
    </i>
}

export default Icon;