import { TypeStorage } from "../storage";
import { SETSTORAGE } from "./actionTypes";

export const setStorage = (storage: TypeStorage) => ({
    type: SETSTORAGE,
    payload: storage
});