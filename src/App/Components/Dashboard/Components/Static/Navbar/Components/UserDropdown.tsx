import React from "react";
import Dropdown, { DropdownBody, DropdownButton } from "../../../../../../others/minicomponents/Dropdown/Dropdown";
import SmallText from "../../../../../../others/minicomponents/SmallText/SmallText";
import { logoutModalId } from "../Navbar";
import * as ModalMethods from '../../../../../../others/minicomponents/Modal/Modal';
import useSelector from "../../../../../../others/storage/core/useSelector";
import { User } from "../../../../../../others/constants/dataTypes";

const UserDropdown = () => {
    const user = useSelector(state => state.user) as User;

    let modalElement: HTMLElement | null;

    const showModal = React.useCallback(() => {
        if (!modalElement) {
            modalElement = document.getElementById(logoutModalId);
        }

        modalElement && ModalMethods.toggle(modalElement);
    }, []);

    if (user) {
        return <Dropdown className="drop-end" id='user-dropdown'>
            <DropdownButton type='button' className='btn'>
                <span className="user-profile">
                    {user.name?.charAt(0)}
                </span>
                <SmallText>
                    {user.name}
                </SmallText>
            </DropdownButton>
            <DropdownBody>
                <li onClick={showModal}>Logout</li>
            </DropdownBody>
        </Dropdown>
    }
}

export default UserDropdown;