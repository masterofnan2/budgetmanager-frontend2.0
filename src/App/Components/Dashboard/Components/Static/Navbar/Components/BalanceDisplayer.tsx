import { Link, useLocation } from "react-router-dom";
import { Budget } from "../../../../../../others/constants/dataTypes";
import useSelector from "../../../../../../others/storage/core/useSelector";
import Fade from "../../../../../../others/minicomponents/Fade/Fade";

const BalanceDisplayer = () => {
    const { amount } = useSelector(state => state.budget) as Budget || {};
    const location = useLocation();

    return <Fade from={{ opacity: 0 }} animateEnter={true} visible={location.pathname !== '/dashboard/budget'}>
        <Link
            to='/dashboard/budget'
            type='button'
            className='btn w-25'>
            {amount?.toLocaleString('fr-FR')}
            <small>Ariary</small></Link>
    </Fade>
}

export default BalanceDisplayer;