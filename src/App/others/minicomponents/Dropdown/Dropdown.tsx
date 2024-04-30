import React from "react";
import Button from "../Button/Button";
import getElementProps from "../../globals/helpers/getElementProps";

type DropdownProps = {
    id: string,
    className?: string,
    children: React.JSX.Element[]
};

type DropdownButtonProps = {
    className?: string,
    children: React.JSX.Element[],
    [key: string]: any
}

type DropdownBodyProps = {
    children: React.JSX.Element
}

const dropdownContext = React.createContext({
    handleClick: () => { }
});

const Dropdown = React.memo((props: DropdownProps) => {

    const { id } = props;

    let timeout: number = 0;
    let dropdownElement: HTMLElement | null = null;

    const setDropdownElementIfNull = React.useCallback(() => {
        if (!dropdownElement) {
            dropdownElement = document.getElementById(id);
        }
    }, [id]);

    const show = React.useCallback(() => {
        setDropdownElementIfNull();

        !dropdownElement?.getAttribute('class')?.includes('show')
            && dropdownElement?.classList.toggle('show');
    }, [setDropdownElementIfNull]);

    const hide = React.useCallback(() => {
        setDropdownElementIfNull();

        dropdownElement?.getAttribute('class')?.includes('show')
            && dropdownElement?.classList.toggle('show');
    }, [setDropdownElementIfNull])

    const fade = React.useCallback(() => {
        setDropdownElementIfNull();

        !dropdownElement?.getAttribute('class')?.includes('fading-out')
            && dropdownElement?.classList.toggle('fading-out');
    }, []);

    const unFade = React.useCallback(() => {
        setDropdownElementIfNull();

        dropdownElement?.getAttribute('class')?.includes('fading-out')
            && dropdownElement?.classList.toggle('fading-out');
    }, [setDropdownElementIfNull]);

    const dropdownIsShown = React.useCallback(() => {
        setDropdownElementIfNull();
        return dropdownElement?.getAttribute('class')?.includes('show');
    }, [setDropdownElementIfNull]);

    const close = () => {
        fade();

        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            hide();
            unFade();
            timeout = 0;
        }, 300);
    }

    const handleClick = React.useCallback(() => {
        dropdownIsShown() ? close() : show();
    }, [dropdownIsShown, close, show]);

    const handleBlur = React.useCallback(() => {
        dropdownIsShown() && close();
    }, []);

    const dropdownContextValue = React.useMemo(() => ({
        handleClick
    }), []);

    return <dropdownContext.Provider value={dropdownContextValue}>
        <div
            className={'dropdown-container ' + (props.className || '')}
            id={id}
            onBlur={handleBlur}>
            {props.children}
        </div>
    </dropdownContext.Provider>
});

export const DropdownButton = React.memo((props: DropdownButtonProps) => {
    const dropdownButtonProps = getElementProps(props, ['onClick', 'children', 'className']);
    const { handleClick } = React.useContext(dropdownContext);

    return <Button
        {...dropdownButtonProps}
        onClick={handleClick}
        className={'dropdown-button ' + (props.className || '')}>
        {props.children}
    </Button>
})

export const DropdownBody = React.memo((props: DropdownBodyProps) => {
    const { handleClick } = React.useContext(dropdownContext);

    return <ul
        className="dropdown-body"
        onClick={handleClick}>
        {props.children}
    </ul>
});

export default Dropdown;