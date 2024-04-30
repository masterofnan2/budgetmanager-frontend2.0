import { Action } from "../../core/dataTypes";
import { TypeStorage } from "../../storage";
import { SETAVAILABLECATEGORYBUDGET, SETBUDGETBALANCE, SETDEFAULTBUDGET } from "./actionTypes";

export default function (state: TypeStorage, action: Action): TypeStorage {
    switch (action.type) {
        case SETDEFAULTBUDGET:
            state.budget.defaultBudget = action.payload;
            break;

        case SETBUDGETBALANCE:
            state.budget.budgetBalance = action.payload;
            break;

        case SETAVAILABLECATEGORYBUDGET:
            state.budget.availableCategoryBudget = action.payload;
            break;

        default:
            break;
    }

    return state;
}