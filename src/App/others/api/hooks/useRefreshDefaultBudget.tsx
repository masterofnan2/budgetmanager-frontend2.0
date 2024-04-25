
import { setDefaultBudget } from "../../storage/parts/budget/actions";
import useDispatch from "../../storage/core/useDispatch";
import { getDefaultBudget } from "../functions/actions";

export const useRefreshDefaultBudget = () => {
    const dispatch = useDispatch();

    return () => {
        getDefaultBudget()
            .then(response => {
                if (response?.data?.budget) {
                    dispatch(setDefaultBudget(response.data.budget));
                }
            })
    }
}