import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useRefreshCycle } from "../../../../../../others/api/hooks/useRefreshCycle";
import useSelector from "../../../../../../others/storage/core/useSelector";
import { Cycle } from "../../../../../../others/constants/dataTypes";
import FloatingForm from "../../../../../../others/minicomponents/FloatingForm/FloatingForm";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import Modal, { toggle } from "../../../../../../others/minicomponents/Modal/Modal";
import Button from "../../../../../../others/minicomponents/Button/Button";
import React from "react";
import { editCycle } from "../../../../../../others/api/functions/actions";

const CYCLEMODALID = 'cycle-modal-id';

const BudgetCycle = () => {
    let modalElement: null | HTMLElement;
    const cycle = useSelector(state => state.cycle) as Cycle;

    const [state, setState] = React.useState({
        endDate: null as Date | null,
        loading: false
    });

    const refreshCycle = useRefreshCycle();

    React.useEffect(() => {
        if (!cycle) {
            refreshCycle();
        }
    }, [cycle]);

    const toggleModal = React.useCallback(() => {
        if (!modalElement) {
            modalElement = document.getElementById(CYCLEMODALID);
        }

        if (modalElement) {
            toggle(modalElement);
        }
    }, []);

    const handleSave = React.useCallback(() => {
        const endDate = state.endDate;
        if (endDate) {
            setState(s => ({ ...s, loading: true }));
            endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());

            editCycle({ end_date: endDate.toUTCString() })
                .then(() => {
                    setState(s => ({ ...s, loading: false }));
                    refreshCycle();
                    toggleModal();
                });
        } else {
            toggleModal();
        }
    }, [state.endDate]);

    const handleChange = React.useCallback((endDate: Date) => {
        setState(s => ({ ...s, endDate }));
    }, []);

    if (cycle) {
        const startDate = new Date(cycle.start_date);
        const endDate = new Date(cycle.end_date);

        const calendarMinDate = new Date();
        calendarMinDate.setHours(24);

        return <>
            <div className="budget-cycle d-flex w-100">
                <Calendar
                    value={startDate}
                    defaultActiveStartDate={new Date(cycle.start_date)}
                    className={'cycle-calendar'} />
                <div
                    className="cycle-information ">
                    <button
                        className="btn cycle-action"
                        onClick={toggleModal}>
                        <Icon>cog</Icon> settings
                    </button>
                    <div className="d-flex flex-column gap-3 align-items-center justify-content-center h-100">
                        <FloatingForm
                            value={startDate.toLocaleDateString()}
                            disabled={true}
                            placeholder='start date'
                            options={{ className: 'w-75' }} />

                        <FloatingForm
                            placeholder='end date'
                            value={endDate.toLocaleDateString()}
                            options={{ className: 'w-75' }}
                            disabled={true} />
                    </div>
                </div>
            </div>
            <Modal
                id={CYCLEMODALID}
                className="budget-cycle-modal">
                <div className="d-flex flex-column gap-2 align-items-center">
                    <div className="mb-2">
                        <h3 className="display-2">Edit end date</h3>
                        <small className="text-secondary">You can set your custom end date by choosing a date on the calendar</small>
                    </div>
                    <Calendar
                        minDate={calendarMinDate}
                        onChange={handleChange}
                        value={state.endDate || endDate} />
                    <div className="w-100 d-flex justify-content-center gap-1 mt-2">
                        <Button
                            type='button'
                            className='btn-sm btn-secondary col-3'
                            onClick={toggleModal}>Cancel</Button>
                        <Button
                            type='button'
                            className='btn-sm btn-primary col-4'
                            onClick={handleSave}
                            options={{ loading: state.loading }}>Save</Button>
                    </div>
                </div>
            </Modal>
        </>
    }
}

export default BudgetCycle;