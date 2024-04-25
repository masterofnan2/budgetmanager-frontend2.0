import React from "react";
import { Selector } from "./dataTypes";
import { StorageContext } from "./context";

export default function (selector: Selector) {
    const { storage } = React.useContext(StorageContext);
    return selector(storage);
}