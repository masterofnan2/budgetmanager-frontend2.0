import React from "react";
import GlobalsProvider from "./others/globals/GlobalsProvider";
import AppRoutes from "./others/routes/AppRoutes";
import { StorageProvider } from "./others/storage/core/context";

const App = React.memo(() => {
    return <GlobalsProvider>
        <StorageProvider>
            <AppRoutes />
        </StorageProvider>
    </GlobalsProvider>
});

export default App;