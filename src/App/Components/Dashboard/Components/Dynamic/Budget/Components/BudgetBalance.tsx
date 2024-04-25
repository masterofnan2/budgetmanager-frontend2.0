import React from "react";
import { useRefreshBalance } from "../../../../../../others/api/hooks/useRefreshBalance";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import useSelector from "../../../../../../others/storage/core/useSelector";
import { Budget } from "../../../../../../others/constants/dataTypes";

const BudgetBalance = () => {
    const budgetBalance = useSelector(state => state.budget.budgetBalance) as Budget;
    const refreshBalance = useRefreshBalance();

    React.useEffect(() => {
        !budgetBalance && refreshBalance()
    }, [budgetBalance]);

    if (budgetBalance) {
        return <div
            className="budget-balance">
            <div className="gradient-container">
                <p>
                    <Icon className="icon-3">dollar-circle</Icon> Your current balance
                </p>
                <h6 className="budget-amount">{budgetBalance.amount?.toLocaleString('fr-Fr')}</h6>
            </div>
        </div>
    }
}

export default BudgetBalance;