
import { setBudgetBalance } from "../../storage/parts/budget/actions";
import useDispatch from "../../storage/core/useDispatch";
import { getBalance } from "../functions/actions";

export const useRefreshBalance = () => {
    const dispatch = useDispatch();

    return () => {
        getBalance()
            .then(response => {
                if (response?.data?.balance !== undefined) {
                    dispatch(setBudgetBalance({ amount: response.data.balance }));
                }
            })
    }
}