import React from "react";
import Button from "../../../../../../others/minicomponents/Button/Button";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import Modal from "../../../../../../others/minicomponents/Modal/Modal";
import { DELETEDIALOGID, toggleDeleteDialog, useDeleteCategory } from "../Categories";

const DeleteDialog = React.memo(() => {
    const { initDeletion, category, loading } = useDeleteCategory();

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
                onClick={initDeletion}
                options={{ loading }}><Icon>trash-can</Icon> Delete</Button>
        </div>
    </Modal>
})

export default DeleteDialog;