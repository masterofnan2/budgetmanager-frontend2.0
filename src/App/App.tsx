import React from "react";
import GlobalsProvider from "./others/globals/GlobalsProvider";
import AppRoutes from "./others/routes/AppRoutes";
import { StorageProvider } from "./others/storage/core/context";
import { createPortal } from "react-dom";

const App = React.memo(() => {

    return createPortal(
        <GlobalsProvider>
            <StorageProvider>
                <AppRoutes />
            </StorageProvider>
        </GlobalsProvider>, document.body)
});

export default App;