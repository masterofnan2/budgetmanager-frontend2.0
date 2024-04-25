import { Action } from "../../core/dataTypes";
import { TypeStorage } from "../../storage";
import { SETCYCLE } from "./actionTypes";

export default function (state: TypeStorage, action: Action): TypeStorage {
    switch (action.type) {
        case SETCYCLE:
            state.cycle = action.payload;
            break;

        default:
            break;
    }

    return state;
}