import React from "react";
import Toasts, { defaultToast } from "../minicomponents/Toast/Toasts";
import PagePreloader, { defaultPreloader } from "../minicomponents/PagePreloader/PagePreloader";

type GlobalsProps = {
    children: React.JSX.Element
};

export const GlobalsContext = React.createContext({
    toastRef: { current: defaultToast },
    pagePreloaderRef: { current: defaultPreloader }
});

const GlobalsProvider = React.memo((props: GlobalsProps) => {
    const toastRef = React.useRef(defaultToast);
    const pagePreloaderRef = React.useRef(defaultPreloader);

    const ContextValue = React.useMemo(() => ({
        toastRef,
        pagePreloaderRef
    }), [toastRef, pagePreloaderRef]);

    return <GlobalsContext.Provider value={ContextValue}>
        <Toasts />
        <PagePreloader />
        {props.children}
    </GlobalsContext.Provider>
})

export default GlobalsProvider;