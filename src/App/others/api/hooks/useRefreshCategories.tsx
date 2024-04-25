import useDispatch from "../../storage/core/useDispatch"
import { setCategories } from "../../storage/parts/category/actions";
import { getCategories } from "../functions/actions";

export const useRefreshCategories = () => {
    const dispatch = useDispatch();

    return () => {
        getCategories()
            .then(response => {
                if (response.data?.categories) {
                    dispatch(setCategories(response.data.categories));
                }
            })
    }
}