import usePagePreloader from "../../minicomponents/PagePreloader/assets/hooks/usePagePreloader";
import useDispatch from "../../storage/core/useDispatch";
import { setAuth } from "../../storage/parts/user/actions";
import { authenticate } from "../functions/actions";

const useAuthenticateUser = () => {
    const dispatch = useDispatch();
    const pagePreloader = usePagePreloader();

    return () => {
        authenticate()
            .then(response => {
                dispatch(setAuth(response.data?.user || false));
                pagePreloader.disable();
            });
    }
}

export default useAuthenticateUser;