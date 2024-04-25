import { setCycle } from "../../storage/parts/cycle/actions";
import { getCurrentCycle } from "../functions/actions";
import useDispatch from "../../storage/core/useDispatch";

export const useRefreshCycle = () => {
    const dispatch = useDispatch();

    return () => {
        getCurrentCycle()
            .then(response => {
                if (response.data?.cycle) {
                    dispatch(setCycle(response.data.cycle));
                }
            })
    }
}