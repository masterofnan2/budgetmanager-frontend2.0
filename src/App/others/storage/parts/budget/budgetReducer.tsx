import { Action } from "../../core/dataTypes";
import { TypeStorage } from "../../storage";
import { SETBUDGETBALANCE, SETDEFAULTBUDGET } from "./actionTypes";

export default function (state: TypeStorage, action: Action): TypeStorage {
    switch (action.type) {
        case SETDEFAULTBUDGET:
            state.budget = { ...state.budget, defaultBudget: action.payload };
            break;

        case SETBUDGETBALANCE:
            state.budget = { ...state.budget, budgetBalance: action.payload };
            break;

        default:
            break;
    }

    return state;
}