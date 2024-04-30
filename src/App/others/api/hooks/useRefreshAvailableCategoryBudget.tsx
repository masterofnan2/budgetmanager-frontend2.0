import useDispatch from "../../storage/core/useDispatch";
import { setAvailableCategoryBudget } from "../../storage/parts/budget/actions";
import { getAvailableCategoryBudget } from "../functions/actions";

const useRefreshAvailableCategoryBudget = function () {
    const dispatch = useDispatch();

    return () => {
        getAvailableCategoryBudget()
            .then(response => {
                if (response.status === 200 && response.data?.available !== undefined) {
                    dispatch(setAvailableCategoryBudget(response.data.available));
                }
            })
    }
}

export default useRefreshAvailableCategoryBudget;