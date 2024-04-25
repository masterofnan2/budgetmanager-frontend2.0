import React from "react";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import Modal, { toggle } from "../../../../../../others/minicomponents/Modal/Modal";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import ImageInputDD, { Image } from "../../../../../../others/minicomponents/ImageInputDD/ImageInputDD";

const MODALID = 'add-category-modal';

const CreateCategory = React.memo(() => {
    const [state, setState] = React.useState({
        image: {
            imageData: null,
            imageUrl: ''
        }
    });

    let modalElement: HTMLElement | null;

    const toggleModal = React.useCallback(() => {
        if (!modalElement) {
            modalElement = document.getElementById(MODALID);
        }

        modalElement && toggle(modalElement);
    }, []);

    const handleAddImage = React.useCallback((image: Image) => {
        setState(s => ({ ...s, image }));
        console.log(image);

    }, []);

    const handleRemoveImage = React.useCallback((url: string) => {
        setState(s => ({ ...s, image: { imageData: null, imageUrl: '' } }));
    }, []);

    return <>
        <button
            className="create-category btn-primary"
            onClick={toggleModal}>
            <Icon>plus</Icon>
        </button>
        <Modal id={MODALID} className="create-category-modal">
            <div className="create-category-modal-header">
                <h5 className="display-2">Create a new category</h5>
                <small className="text-secondary">Customize your category by completing the informations</small>
            </div>
            <div className="create-category-modal-content">
                <div className="category-name custom-input">
                    <label htmlFor="category-name-input">
                        Category name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id='category-name-input'
                        placeholder="name of the category" />
                </div>
                <div className="category-description custom-input">
                    <label htmlFor="category-description-input">
                        Category description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id='category-description-input'
                        placeholder="description of the category" />
                </div>
                <div className="category-icon">
                    <ImageInputDD
                        addImage={handleAddImage} removeImage={handleRemoveImage} imageUrl={state.image.imageUrl} />
                </div>
                <div className="category-amount">
                    <div className="attributed-budget">
                        <h6>Budget Consumption</h6>
                        <CircularProgressbarWithChildren
                            className="attributed-budget-circle"
                            value={50} text="50%">
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className="custom-input">
                        <label htmlFor="category-amount-input">
                            Category Budget (Ariary)
                        </label>
                        <input type="text" name="budget" id='category-amount-input' placeholder="0.00 Ariary" />
                        <div className="max-budget">
                            max: <small>100 000</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="create-category-modal-footer">
                <button className="btn-secondary col-3">cancel</button>
                <button className="btn-primary col-4">save</button>
            </div>
        </Modal>
    </>
})

export default CreateCategory;