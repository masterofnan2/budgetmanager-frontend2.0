import { Budget } from "../../../constants/dataTypes";
import { SETDEFAULTBUDGET, SETBUDGETBALANCE } from "./actionTypes";

export const setDefaultBudget = (budget: Budget) => ({
    type: SETDEFAULTBUDGET,
    payload: budget
});

export const setBudgetBalance = (budget: Budget) => ({
    type: SETBUDGETBALANCE,
    payload: budget
});