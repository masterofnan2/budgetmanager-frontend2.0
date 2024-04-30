import React from "react";
import { StorageContext } from "./context";
import { Action } from "./dataTypes";
import reducer from "./reducer";
import { setStorage } from "./actions";

export default function () {
    const { dispatch } = React.useContext(StorageContext);
    return dispatch;
}

export function useGroupDispatch() {
    const { storage, dispatch } = React.useContext(StorageContext);
    let newStorage = { ...storage };

    return (...actions: Action[]) => {
        actions.forEach(action => {
            newStorage = { ...newStorage, ...reducer(newStorage, action) }
        });

        dispatch(setStorage(newStorage));
    }
}