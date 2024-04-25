import { Action } from "../../core/dataTypes";
import { TypeStorage } from "../../storage";
import { SETAUTH } from "./actionTypes";

export default function (state: TypeStorage, action: Action): TypeStorage {
    switch (action.type) {
        case SETAUTH:
            state.user = action.payload;
            break;

        default:
            break;
    }

    return state;
}