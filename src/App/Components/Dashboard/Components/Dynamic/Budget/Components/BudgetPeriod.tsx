import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { Cycle } from "../../../../../../others/constants/dataTypes";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import useSelector from "../../../../../../others/storage/core/useSelector";
import React from "react";

const oneDay = 1000 * 60 * 60 * 24;
const nowDate = new Date();
let timeout: number | null = null;

const BudgetPeriod = () => {
    const cycle = useSelector(state => state.cycle) as Cycle | null;

    const [state, setState] = React.useState({
        percentage: 0,
        daysDiff: 0
    });

    React.useEffect(() => {
        if (cycle) {
            const startDate = new Date(cycle.start_date);
            const endDate = new Date(cycle.end_date);

            const timestampDiff = endDate.valueOf() - startDate.valueOf();
            const currentTimestampDiff = nowDate.valueOf() - startDate.valueOf();

            const daysDiff = Math.round((timestampDiff - currentTimestampDiff) / oneDay);
            const percentage = Math.round(currentTimestampDiff * 100 / timestampDiff);

            if (!timeout) {
                timeout = setTimeout(() => {
                    setState(s => ({ ...s, daysDiff, percentage }));
                    timeout = null;
                }, 500);
            }
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

        }
    }, [cycle]);

    if (cycle) {

        return <div className="budget-period">
            <p><Icon className="icon-3">time</Icon> Your budget period</p>
            <div className="d-flex justify-content-center align-items-center circular-container">
                <CircularProgressbarWithChildren
                    className="budget-period-circular"
                    value={state.percentage}
                    styles={buildStyles({
                        pathColor: 'rgb(74, 94, 101)'
                    })}>
                    <div className="budget-period-circular-description d-flex gap-1">
                        <div className="display-1 mb-2">{state.daysDiff}</div>
                        <div className="d-flex flex-column align-self-center">
                            <span className="text-secondary">days</span>
                            <span className="text-secondary">left</span>
                        </div>
                    </div>
                </CircularProgressbarWithChildren>
            </div>
        </div>
    }
}

export default BudgetPeriod;