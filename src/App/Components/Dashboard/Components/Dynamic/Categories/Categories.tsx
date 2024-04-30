import React from "react";
import useSelector from "../../../../../others/storage/core/useSelector";
import { useRefreshCategories } from "../../../../../others/api/hooks/useRefreshCategories";
import CategoriesList from "./Components/CategoriesList";
import CreateCategory from "./Components/CreateCategory";
import { toggle } from "../../../../../others/minicomponents/Modal/Modal";
import DeleteDialog from "./Components/DeleteDialog";
import Fade from "../../../../../others/minicomponents/Fade/Fade";
import { Category } from "../../../../../others/constants/dataTypes";
import EditCategory from "./Components/EditCategory";
import useRefreshAvailableCategoryBudget from "../../../../../others/api/hooks/useRefreshAvailableCategoryBudget";
import { useRefreshDefaultBudget } from "../../../../../others/api/hooks/useRefreshDefaultBudget";

export const DELETEDIALOGID = 'delete-dialog-modal';
export const EDITMODALID = 'edit-category-modal';
export const CREATEMODALID = 'add-category-modal';

export const toggleDeleteDialog = () => {
    const deleteDialogElement = document.getElementById(DELETEDIALOGID);
    deleteDialogElement && toggle(deleteDialogElement);
};

export const toggleEditDialog = () => {
    const editDialogElement = document.getElementById(EDITMODALID);
    editDialogElement && toggle(editDialogElement);
}

export const toggleCreateModal = () => {
    const createModalElement = document.getElementById(CREATEMODALID);
    createModalElement && toggle(createModalElement);
}

const CategoriesContext = React.createContext({
    onDelete: {
        category: null as Category | null,
        set: (category: Category | null) => { category }
    },
    onEdit: {
        category: null as Category | null,
        set: (category: Category | null) => { category }
    }
});

export const useDeleteCategory = () => {
    const { onDelete } = React.useContext(CategoriesContext);
    return onDelete;
}

export const useEditCategory = () => {
    const { onEdit } = React.useContext(CategoriesContext);
    return onEdit;
}

const Categories = React.memo(() => {
    const categories = useSelector(state => state.category);
    const { availableCategoryBudget, defaultBudget } = useSelector(state => state.budget);

    const refreshCategories = useRefreshCategories();
    const refreshAvailableCategoryBudget = useRefreshAvailableCategoryBudget();
    const refreshDefaultBudget = useRefreshDefaultBudget();

    const [state, setState] = React.useState({
        onDelete: {
            category: null as Category | null
        },
        onEdit: {
            category: null as Category | null
        }
    });

    const onDelete = React.useMemo(() => ({
        category: state.onDelete.category,
        set: (category: Category | null) => {
            setState(s => ({ ...s, onDelete: { ...s.onDelete, category } }));
        }
    }), [state.onDelete]);

    const onEdit = React.useMemo(() => ({
        category: state.onEdit.category,
        set: (category: Category | null) => {
            setState(s => ({ ...s, onEdit: { ...s.onEdit, category } }));
        }
    }), [state.onEdit]);

    const contextValue = React.useMemo(() => ({
        onDelete,
        onEdit
    }), [onDelete, onEdit]);

    React.useEffect(() => {
        if (!categories) {
            refreshCategories();
        } else if (availableCategoryBudget === null) {
            refreshAvailableCategoryBudget();
        } else if (!defaultBudget) {
            refreshDefaultBudget();
        }
    }, [categories, availableCategoryBudget, defaultBudget]);

    if (categories) {
        return <CategoriesContext.Provider value={contextValue}>
            <Fade
                className="categories-container"
                from={{ opacity: 0 }}
                animateEnter={true}
                visible={true}>
                <CategoriesList />
                <CreateCategory />
                <DeleteDialog />
                <EditCategory />
            </Fade>
        </CategoriesContext.Provider>
    }
})

export default Categories;