import { StorageReducer } from "./dataTypes";
import map from "./map";

const reducer: StorageReducer = (state, action) => {
    for (let part in map) {
        if (Object.keys(map[part].actionTypes).includes(action.type)) {
            return { ...state, ...map[part].reducer(state, action) };
        }
    }

    return { ...state };
};

export default reducer;