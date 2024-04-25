import BudgetBalance from "./Components/BudgetBalance";
import BudgetUsage from "./Components/BudgetUsage";
import InitialBudget from "./Components/InitialBudget";
import BudgetCycle from "./Components/BudgetCycle";
import BudgetPeriod from "./Components/BudgetPeriod";
import Fade from "../../../../../others/minicomponents/Fade/Fade";

const Budget = () => {
    return <Fade
        from={{ opacity: 0 }}
        visible={true}
        animateEnter={true}
        duration={1000}
        className="dashboard-budget h-100">
        <BudgetBalance />
        <BudgetUsage />
        <InitialBudget />
        <BudgetCycle />
        <BudgetPeriod />
    </Fade>
}

export default Budget;