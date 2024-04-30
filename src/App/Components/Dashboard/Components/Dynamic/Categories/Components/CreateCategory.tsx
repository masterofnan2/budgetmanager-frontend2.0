import React, { FormEvent } from "react";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import Modal from "../../../../../../others/minicomponents/Modal/Modal";
import { CircularProgressbar } from "react-circular-progressbar";
import ImageInputDD, { Image } from "../../../../../../others/minicomponents/ImageInputDD/ImageInputDD";
import useSelector from "../../../../../../others/storage/core/useSelector";
import useRefreshAvailableCategoryBudget from "../../../../../../others/api/hooks/useRefreshAvailableCategoryBudget";
import price from "../../../../../../others/globals/helpers/price";
import PriceInput from "../../../../../../others/minicomponents/PriceInput/PriceInput";
import getFormData from "../../../../../../others/globals/helpers/getFormData";
import { createCategory } from "../../../../../../others/api/functions/actions";
import { useRefreshCategories } from "../../../../../../others/api/hooks/useRefreshCategories";
import Button from "../../../../../../others/minicomponents/Button/Button";
import getPercentageOf from "../../../../../../others/globals/helpers/getPercentageOf";
import intVal from "../../../../../../others/globals/helpers/intVal";
import { CREATEMODALID, toggleCreateModal } from "../Categories";

const stateFormDefault = {
    image: {
        imageData: null as File | null,
        imageUrl: ''
    } as Image,
    price: 0,
}

const CreateCategory = React.memo(() => {
    const [state, setState] = React.useState({
        form: stateFormDefault,
        loading: false,
        budgetConsumption: 0,
    });

    const { form } = state;

    const { availableCategoryBudget, defaultBudget } = useSelector(state => state.budget);

    const refreshAvailableCategoryBudget = useRefreshAvailableCategoryBudget();
    const refreshCategories = useRefreshCategories();

    const handleAddImage = React.useCallback((image: Image) => {
        setState(s => ({
            ...s,
            form: {
                ...s.form,
                image
            }
        }));
    }, []);

    const handleRemoveImage = React.useCallback(() => {
        setState(s => ({
            ...s,
            form: {
                ...s.form,
                image: {
                    imageData: null,
                    imageUrl: ''
                }
            }
        }));
    }, []);

    const handlePriceInputChange = React.useCallback((value: number) => {
        if (value <= availableCategoryBudget) {
            setState(s => ({
                ...s,
                form: {
                    ...s.form,
                    price: value
                },
                budgetConsumption: getPercentageOf(value, defaultBudget?.amount)
            }));
        }
    }, [availableCategoryBudget, defaultBudget]);

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = getFormData(e);
        setState(s => ({ ...s, loading: true }))

        createCategory({
            budget: intVal(formData.budget),
            description: formData.description,
            name: formData.name,
            image: form.image.imageData,
        }).then(response => {
            if (response.status === 200) {
                setState(s => ({
                    ...s,
                    loading: false,
                    form: stateFormDefault,
                    budgetConsumption: 0
                }));

                toggleCreateModal();
                refreshCategories();
                refreshAvailableCategoryBudget();
            } else {
                setState(s => ({ ...s, loading: false }))
            }
        })
    }, [form.image.imageData]);

    if (availableCategoryBudget !== null) {
        return <>
            <button
                className="create-category btn-primary"
                onClick={toggleCreateModal}>
                <Icon>plus</Icon>
            </button>
            <Modal id={CREATEMODALID} className="col-8">
                <form className="create-category-modal" onSubmit={handleSubmit}>
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
                                placeholder="Eg: Taxes"
                            />
                        </div>
                        <div className="category-description custom-input">
                            <label htmlFor="category-description-input">
                                Category description
                            </label>
                            <input
                                type="text"
                                name="description"
                                id='category-description-input'
                                placeholder="Put a description of the category" />
                        </div>
                        <div className="category-icon">
                            <ImageInputDD
                                addImage={handleAddImage}
                                removeImage={handleRemoveImage}
                                imageUrl={form.image.imageUrl} />
                        </div>
                        <div className="category-amount">
                            <div className="attributed-budget">
                                <h6>Budget Consumption</h6>
                                <CircularProgressbar
                                    className="attributed-budget-circle"
                                    value={state.budgetConsumption}
                                    text={`${state.budgetConsumption}%`}>
                                </CircularProgressbar>
                            </div>
                            <div className="custom-input">
                                <label htmlFor="category-amount-input">
                                    Category Budget (Ariary)
                                </label>

                                <PriceInput
                                    type="text"
                                    name="budget"
                                    id='category-amount-input'
                                    placeholder="0.00 Ariary"
                                    onChange={handlePriceInputChange}
                                    value={price(form.price)} />

                                <div className="max-budget">
                                    available: <small>{price(availableCategoryBudget)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="create-category-modal-footer">
                        <button
                            type="button"
                            className="btn-secondary col-3"
                            onClick={toggleCreateModal}>cancel</button>
                        <Button
                            type="submit"
                            className="btn-primary col-4"
                            options={{ loading: state.loading }}>save</Button>
                    </div>
                </form>
            </Modal>
        </>
    }
})

export default CreateCategory;