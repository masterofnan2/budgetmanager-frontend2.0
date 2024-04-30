import { SETSTORAGE } from "./actionTypes";
import { StorageReducer } from "./dataTypes";
import map from "./map";

const reducer: StorageReducer = (state, action) => {
    switch (action.type) {
        case SETSTORAGE:
            return action.payload;

        default:
            for (let part in map) {
                if (Object.keys(map[part].actionTypes).includes(action.type)) {
                    return { ...state, ...map[part].reducer(state, action) };
                }
            }
            break;
    }

    return { ...state };
};

export default reducer;