import { GlobalsContext } from "../../globals/GlobalsProvider";
import Fade from "../Fade/Fade";
import React from "react";
import useToasts from "./assets/hooks/useToasts";
import Icon from "../Icon/Icon";

export type Toast = {
    id?: string,
    title: string,
    content: string,
    type?: 'default' | 'success' | 'danger',
    duration?: number
};

export type ToastList = Toast[];

export type ToastRef = {
    current: typeof defaultToast
}

const TOASTPREFIX = 'toast-item-';
const LEAVINGDURATION = 500;

export const defaultToast = {
    pop: (id: string) => { id },
    push: (toast: Toast) => { toast }
}

const ToastItem = React.memo((props: Toast) => {
    const { content, title, id, type, duration } = props;
    const [visible, setVisible] = React.useState(true);
    const { pop } = useToasts();

    let visibleTimeout: number | null;
    let popTimeout: number | null;

    const clearTimeouts = React.useCallback(() => {
        visibleTimeout && clearTimeout(visibleTimeout);
        popTimeout && clearTimeout(popTimeout);
    }, []);

    const handleClose = React.useCallback(() => {
        clearTimeouts();
        setVisible(false);
        
        popTimeout = setTimeout(() => {
            pop(id!);
        }, (LEAVINGDURATION));
    }, [id, pop, clearTimeouts]);

    React.useEffect(() => {
        visibleTimeout = setTimeout(() => {
            setVisible(false);
        }, (duration! - LEAVINGDURATION));

        popTimeout = setTimeout(() => {
            pop(id!);
        }, duration);

        return clearTimeouts;
    }, [duration, pop, id]);


    return <Fade
        from={{ opacity: 0, transform: "translateX(5rem)" }}
        className={"toast-item " + type}
        id={id}
        animateEnter={true}
        visible={visible}>
        <div className="toast-header">
            <h5>{title}</h5>
            <button
                className="btn"
                onClick={handleClose}>
                <Icon>xmark</Icon>
            </button>
        </div>
        <div className="toast-body">
            <p>{content}</p>
        </div>
    </Fade>
});

const Toasts = React.memo(() => {
    const [toasts, setToasts] = React.useState([] as ToastList);
    const { toastRef } = React.useContext(GlobalsContext);

    const pop = React.useCallback((id: string) => {
        setToasts(t => [...t].filter(toast => toast.id !== id));
    }, []);

    const push = React.useCallback((toast: Toast) => {
        const id = TOASTPREFIX + (toast.id || Math.round((Math.random() * 100000)));
        const type = toast.type || "default";
        const duration = toast.duration || 6000;

        setToasts(t => [...t, { ...toast, id, type, duration }]);
    }, []);

    toastRef.current = React.useMemo(() => ({
        push,
        pop
    }), [push, pop]);

    if (toasts.length > 0) {
        return <div className="toast-container">
            {toasts.map(toast => <ToastItem {...toast} key={toast.id} />)}
        </div>
    }
});

export default Toasts;