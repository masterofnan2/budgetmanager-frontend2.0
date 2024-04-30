import { Budget, Category, Cycle, User } from "../constants/dataTypes";

const storage = {
    user: null as User | boolean | null,
    budget: {
        defaultBudget: null as Budget | null,
        budgetBalance: null as Budget | null,
        availableCategoryBudget: null,
    },
    cycle: null as Cycle | null,
    category: null as Category | null
};

export type TypeStorage = typeof storage;
export default storage;