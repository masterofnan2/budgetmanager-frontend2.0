import getElementProps from "../../globals/helpers/getElementProps";

type Props = {
    children: any,
    id: string,
    className?: string,
    [key: string]: any
};

const hide = (modalElement: HTMLElement) => {
    modalElement?.classList.toggle('hiding');
    setTimeout(() => {
        modalElement?.classList.toggle('hiding');
        modalElement?.classList.toggle('show');
    }, 500);
}

export const show = (modalElement: HTMLElement) => {
    if (!modalElement?.getAttribute('class')?.includes('show')) {
        modalElement?.classList.toggle('show');
    }
}

export const toggle = (modalElement: HTMLElement) => {
    modalElement?.getAttribute('class')?.includes('show') ? hide(modalElement) : show(modalElement);
}

const Modal = (props: Props) => {
    const { id, children } = props;
    const modalBodyProps = getElementProps(props, ['id', 'children', 'className']);
    let modalElement: HTMLElement | null;

    const handleClick = (e: any) => {
        if (!modalElement) {
            modalElement = document.getElementById(id);
        }

        if (e.target.id === id) {
            modalElement &&
                toggle(modalElement);
        }
    }

    return <div
        className="modal-container"
        id={id}
        onClick={handleClick}>
        <div
            className={"modal-body " + (props.className || '')}
            {...modalBodyProps}>
            {children}
        </div>
    </div>
}


export default Modal;