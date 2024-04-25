import React from "react";
import Button from "../../../../../../others/minicomponents/Button/Button";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import { setDefaultBudget } from "../../../../../../others/api/functions/actions";
import useSelector from "../../../../../../others/storage/core/useSelector";
import Modal, { toggle } from "../../../../../../others/minicomponents/Modal/Modal";
import { Budget } from "../../../../../../others/constants/dataTypes";
import { useRefreshDefaultBudget } from "../../../../../../others/api/hooks/useRefreshDefaultBudget";
import { useRefreshBalance } from "../../../../../../others/api/hooks/useRefreshBalance";

const MAXBUDGET = 99_999_999;
const DISCARDDIALOGID = "discard-dialog";

const InitialBudget = React.memo(() => {
    const budget = useSelector(state => state.budget.defaultBudget) as Budget | null;
    let dialogElement: null | HTMLElement;

    const [state, setState] = React.useState({
        editMode: false,
        inputValue: 0,
        loading: false
    });

    const inputRef = React.createRef() as React.RefObject<HTMLInputElement>;
    const refreshDefaultBudget = useRefreshDefaultBudget();
    const refreshBalance = useRefreshBalance();

    React.useEffect(() => {
        !budget && refreshDefaultBudget();
    }, [budget]);

    React.useEffect(() => {
        if (state.editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, state.editMode]);

    const toggleModal = React.useCallback(() => {
        if (!dialogElement) {
            dialogElement = document.getElementById(DISCARDDIALOGID);
        }

        dialogElement && toggle(dialogElement);
    }, []);

    const toggleEditMode = React.useCallback(() => {
        setState(s => ({ ...s, editMode: !s.editMode, inputValue: budget?.amount!}));
    }, [budget]);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const striped = value.replace(/[^0-9]/g, '');
        const intValue = parseInt(striped);

        if (!isNaN(intValue) && intValue < MAXBUDGET) {
            setState(s => ({ ...s, inputValue: intValue }));
        }
    }, []);

    const handleFinishChange = React.useCallback(() => {
        if (state.inputValue && (state.inputValue !== budget?.amount)) {
            setState(s => ({ ...s, loading: true }));
            setDefaultBudget(state.inputValue)
                .then((response) => {
                    if (!response.error) {
                        refreshDefaultBudget();
                        refreshBalance();
                    }
                    setState(s => ({ ...s, editMode: false, loading: false }));
                });
        } else {
            toggleEditMode();
        }
    }, [state.inputValue, budget?.amount]);

    const discardChanges = React.useCallback(() => {
        setState(s => ({ ...s, editMode: false, inputValue: budget?.amount! }));
    }, [budget]);

    const handleBlur = React.useCallback(() => {
        if (state.inputValue === budget?.amount) {
            discardChanges();
        } else {
            toggleModal();
        }
    }, [budget, state.inputValue, discardChanges]);

    const amountString = React.useMemo(() => {
        const amount = state.editMode ? state.inputValue : budget?.amount;
        return amount?.toLocaleString('fr-Fr');
    }, [budget, state.editMode, state.inputValue]);

    if (budget?.amount !== undefined) {
        return <>
            <div className="initial-budget">
                <div className="d-flex justify-content-between">
                    <p><Icon className="icon-3">insert-coins</Icon>Default budget</p>
                    {state.editMode ?
                        <Button
                            className='btn initial-budget-action d-flex justify-content-center gap-1'
                            onClick={handleFinishChange}
                            options={{ loading: state.loading }}><Icon>check</Icon>save</Button> :
                        <Button
                            className='btn initial-budget-action d-flex justify-content-center gap-1'
                            onClick={toggleEditMode}><Icon>pencil</Icon>edit</Button>}
                </div>

                <div className="budget-amount-input d-flex justify-content-center gap-1">
                    <input
                        type='text'
                        className="edit-initial-budget"
                        disabled={!state.editMode}
                        onChange={handleChange}
                        value={amountString}
                        ref={inputRef}
                        onBlur={handleBlur} />
                </div>
            </div>
            <Modal id={DISCARDDIALOGID}>
                <h3 className="display-3">Changes detected</h3>
                <p className="px-0">You've made changes to your budget, do you want to save changes?</p>

                <div className="d-flex justify-content-end gap-1 mt-3">
                    <Button
                        type='button'
                        className='btn-sm btn-secondary col-3'
                        onClick={() => {
                            discardChanges();
                            toggleModal()
                        }}>Discard</Button>

                    <Button
                        type='button'
                        className='btn-sm btn-primary col-4'
                        onClick={() => {
                            handleFinishChange();
                            toggleModal()
                        }}>Save</Button>
                </div>
            </Modal>
        </>
    }
});

export default InitialBudget;