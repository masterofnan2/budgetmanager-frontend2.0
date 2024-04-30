import React, { FormEvent } from "react";
import Modal from "../../../../../../others/minicomponents/Modal/Modal";
import { CircularProgressbar } from "react-circular-progressbar";
import ImageInputDD, { Image } from "../../../../../../others/minicomponents/ImageInputDD/ImageInputDD";
import useSelector from "../../../../../../others/storage/core/useSelector";
import useRefreshAvailableCategoryBudget from "../../../../../../others/api/hooks/useRefreshAvailableCategoryBudget";
import price from "../../../../../../others/globals/helpers/price";
import PriceInput from "../../../../../../others/minicomponents/PriceInput/PriceInput";
import getFormData from "../../../../../../others/globals/helpers/getFormData";
import { updateCategory } from "../../../../../../others/api/functions/actions";
import { useRefreshCategories } from "../../../../../../others/api/hooks/useRefreshCategories";
import Button from "../../../../../../others/minicomponents/Button/Button";
import getPercentageOf from "../../../../../../others/globals/helpers/getPercentageOf";
import intVal from "../../../../../../others/globals/helpers/intVal";
import { EDITMODALID, toggleEditDialog, useEditCategory } from "../Categories";
import useToasts from "../../../../../../others/minicomponents/Toast/assets/hooks/useToasts";

const stateFormDefault = {
    image: {
        imageData: null as File | null,
        imageUrl: ''
    } as Image,
    price: 0,
    name: '',
    description: '',
}

const EditCategory = React.memo(() => {
    const [state, setState] = React.useState({
        form: stateFormDefault,
        loading: false,
        budgetConsumption: 0,
    });

    const { form } = state;

    const { availableCategoryBudget, defaultBudget } = useSelector(state => state.budget);
    const { category } = useEditCategory();

    const toasts = useToasts();

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

        if (category) {
            const formData = getFormData(e);
            setState(s => ({ ...s, loading: true }))

            updateCategory({
                id: category.id!,
                budget: intVal(formData.budget),
                description: formData.description,
                name: formData.name,
                image: form.image.imageData
            }).then(response => {
                if (response.status === 200) {
                    setState(s => ({
                        ...s,
                        loading: false,
                        form: stateFormDefault,
                        budgetConsumption: 0
                    }));

                    toggleEditDialog();
                    refreshCategories();
                    refreshAvailableCategoryBudget();

                    toasts.push({
                        title: 'Category Updated',
                        content: 'Your category has been updated',
                        type: 'success'
                    });
                } else {
                    setState(s => ({ ...s, loading: false }));

                    toasts.push({
                        title: 'Failed to update category',
                        content: 'An error has occured when trying to edit the category',
                        type: 'danger'
                    });
                }
            })
        }
    }, [category, toasts.push, form.image.imageData]);

    React.useEffect(() => {
        if (category) {
            setState(s => ({
                ...s,
                form: {
                    ...s.form,
                    description: category.description!,
                    name: category.name!,
                    price: category.budget!,
                },
                budgetConsumption: getPercentageOf(category.budget!, defaultBudget?.amount)
            }))
        }
    }, [category]);

    if (availableCategoryBudget !== null) {
        return <Modal id={EDITMODALID} className="col-8">
            <form className="create-category-modal" onSubmit={handleSubmit}>
                <div className="create-category-modal-header">
                    <h5 className="display-2">Edit an existing category</h5>
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
                            defaultValue={form.name}
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
                            placeholder="Put a description of the category"
                            defaultValue={form.description} />
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
                        onClick={toggleEditDialog}>cancel</button>
                    <Button
                        type="submit"
                        className="btn-primary col-4"
                        options={{ loading: state.loading }}>save</Button>
                </div>
            </form>
        </Modal>
    }
})

export default EditCategory;