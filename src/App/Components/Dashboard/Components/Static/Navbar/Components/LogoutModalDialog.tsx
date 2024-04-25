import React from "react";
import Modal from "../../../../../../others/minicomponents/Modal/Modal";
import Button from "../../../../../../others/minicomponents/Button/Button";
import { logoutModalId } from "../Navbar";
import useDispatch from "../../../../../../others/storage/core/useDispatch";
import { setAuth } from "../../../../../../others/storage/parts/user/actions";

const tokenName = 'authToken';

const LogoutModalDialog = () => {

    const dispatch = useDispatch();

    const handleDisconnect = React.useCallback(() => {
        dispatch(setAuth(false));
        localStorage.removeItem(tokenName);
    }, []);

    return <Modal
        id={logoutModalId}>
        <div className="modal-dialog-title">
            <h4>Are you sure to disconnect?</h4>
            <p>Next time, you will need to login again to access to your account.</p>
        </div>
        <div className="modal-content">
            <Button
                type='button'
                className='btn-danger btn-sm'
                onClick={handleDisconnect}>Yes, log me out</Button>
        </div>
    </Modal>
}

export default LogoutModalDialog;