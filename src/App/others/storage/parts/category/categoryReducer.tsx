import { Action } from "../../core/dataTypes";
import { TypeStorage } from "../../storage";
import { SETCATEGORIES } from "./actionTypes";

export default function(state: TypeStorage, action: Action): TypeStorage{
    switch (action.type) {
        case SETCATEGORIES:
            state.category = action.payload;
            break;
    
        default:
            break;
    }
    
    return state;
}