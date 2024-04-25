import budgetReducer from '../parts/budget/budgetReducer';
import cycleReducer from '../parts/cycle/cycleReducer';
import userReducer from '../parts/user/userReducer';
import categoryReducer from '../parts/category/categoryReducer';
import * as userActionTypes from '../parts/user/actionTypes';
import * as categoryActionTypes from '../parts/category/actionTypes';
import * as cycleActionTypes from '../parts/cycle/actionTypes';
import * as budgetActionTypes from '../parts/budget/actionTypes';
import { Map } from './dataTypes';

export default {
    user: {
        actionTypes: userActionTypes,
        reducer: userReducer
    },
    budget: {
        actionTypes: budgetActionTypes,
        reducer: budgetReducer
    },
    cycle: {
        actionTypes: cycleActionTypes,
        reducer: cycleReducer
    },
    category: {
        actionTypes: categoryActionTypes,
        reducer: categoryReducer
    }
} as Map;