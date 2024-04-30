import { Budget } from "../../../constants/dataTypes";
import { SETDEFAULTBUDGET, SETBUDGETBALANCE, SETAVAILABLECATEGORYBUDGET } from "./actionTypes";

export const setDefaultBudget = (budget: Budget) => ({
    type: SETDEFAULTBUDGET,
    payload: budget
});

export const setBudgetBalance = (budget: Budget) => ({
    type: SETBUDGETBALANCE,
    payload: budget
});

export const setAvailableCategoryBudget = (amount: number) => ({
    type: SETAVAILABLECATEGORYBUDGET,
    payload: amount
});