import React from "react";
import storage from "../storage";
import reducer from "./reducer";
import { Action, StorageProviderProps } from "./dataTypes";

const dispatch: React.Dispatch<Action> = () => { };

export const StorageContext = React.createContext({
    storage,
    dispatch,
});

export const StorageProvider = React.memo((props: StorageProviderProps) => {
    const [state, dispatch] = React.useReducer(reducer, storage);

    const value = React.useMemo(() => ({
        storage: state,
        dispatch
    }), [state]);

    return <StorageContext.Provider value={value}>
        {props.children}
    </StorageContext.Provider>;
})