import { Category } from "../../../constants/dataTypes";
import { SETCATEGORIES } from "./actionTypes";

export const setCategories = (payload: Category[]) => ({
    type: SETCATEGORIES,
    payload
});