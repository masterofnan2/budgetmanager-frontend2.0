import { User } from "../../../constants/dataTypes";
import { SETAUTH } from "./actionTypes";

export const setAuth = (auth: User | boolean) => ({
    type: SETAUTH,
    payload: auth
});