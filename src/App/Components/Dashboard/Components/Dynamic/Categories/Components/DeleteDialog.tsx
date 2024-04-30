import React from "react";
import Button from "../../../../../../others/minicomponents/Button/Button";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import Modal from "../../../../../../others/minicomponents/Modal/Modal";
import { DELETEDIALOGID, toggleDeleteDialog, useDeleteCategory } from "../Categories";
import { deleteCategory } from "../../../../../../others/api/functions/actions";
import useToasts from "../../../../../../others/minicomponents/Toast/assets/hooks/useToasts";
import { useRefreshCategories } from "../../../../../../others/api/hooks/useRefreshCategories";
import useRefreshAvailableCategoryBudget from "../../../../../../others/api/hooks/useRefreshAvailableCategoryBudget";

const DeleteDialog = React.memo(() => {
    const [state, setState] = React.useState({
        loading: false,
    });

    const { category, set } = useDeleteCategory();

    const refreshCategories = useRefreshCategories();
    const refreshAvailableCategoryBudget = useRefreshAvailableCategoryBudget();
    const toasts = useToasts();

    const handleDelete = React.useCallback(() => {
        if (category) {
            setState(s => ({ ...s, loading: true }));
            deleteCategory(category.id!)
                .then(response => {
                    if (response.status === 200) {
                        toasts.push({
                            title: 'Category removed',
                            content: 'The category has been removed successfully',
                            type: 'success'
                        });

                        setState(s => ({ ...s, loading: false }));
                        set(null);

                        refreshAvailableCategoryBudget();
                        refreshCategories();

                        toggleDeleteDialog()
                    }
                });
        }
    }, [category, toasts.push]);

    return <Modal id={DELETEDIALOGID} className="delete-dialog-modal">
        <div className="mb-3">
            <h5 className="display-3 mb-1">Delete this category?</h5>
            <small className="text-secondary">Are you sure to perform this action? this is irreversible</small>
        </div>

        <div className="d-flex justify-content-end gap-1">
            <Button type='button' className="btn-sm btn-secondary col-3 " onClick={toggleDeleteDialog}>Cancel</Button>
            <Button
                type='button'
                className="btn-sm btn-danger col-4 d-flex align-items-center justify-content-center gap-1"
                onClick={handleDelete}
                options={{ loading: state.loading }}><Icon>trash-can</Icon> Delete</Button>
        </div>
    </Modal>
})

export default DeleteDialog;