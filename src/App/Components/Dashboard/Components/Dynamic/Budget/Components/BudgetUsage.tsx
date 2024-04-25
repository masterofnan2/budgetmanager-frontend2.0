import { CircularProgressbar } from "react-circular-progressbar";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import 'react-circular-progressbar/dist/styles.css';
import useSelector from "../../../../../../others/storage/core/useSelector";
import React from "react";

const BudgetUsage = () => {
    const { budgetBalance, defaultBudget } = useSelector(state => state.budget);

    const percentage = React.useMemo(() => {
        let value = 0;

        if (budgetBalance?.amount && defaultBudget?.amount) {
            value = 100 - (budgetBalance.amount * 100 / defaultBudget.amount);
        }

        if (value < 0 || value > 100) {
            value = (value < 0) ? 0 : 100;
        }

        return value;
    }, [budgetBalance, defaultBudget]);

    if (budgetBalance !== null && defaultBudget !== null) {
        return <div
            className="budget-usage">
            <p><Icon className="icon-3">eye</Icon> Budget usage</p>
            <div className="d-flex justify-content-center align-items-center">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`} />
            </div>
        </div>
    }

}
export default BudgetUsage;