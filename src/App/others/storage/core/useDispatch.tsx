import React from "react";
import { StorageContext } from "./context";

export default function () {
    const { dispatch } = React.useContext(StorageContext);
    return dispatch;
}