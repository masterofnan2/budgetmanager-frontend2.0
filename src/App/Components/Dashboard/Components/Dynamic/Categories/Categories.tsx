import React from "react";
import useSelector from "../../../../../others/storage/core/useSelector";
import { useRefreshCategories } from "../../../../../others/api/hooks/useRefreshCategories";
import CategoriesList from "./Components/CategoriesList";
import CreateCategory from "./Components/CreateCategory";
import { toggle } from "../../../../../others/minicomponents/Modal/Modal";
import DeleteDialog from "./Components/DeleteDialog";
import Fade from "../../../../../others/minicomponents/Fade/Fade";
import { Category } from "../../../../../others/constants/dataTypes";
import { deleteCategory } from "../../../../../others/api/functions/actions";
import useToasts from "../../../../../others/minicomponents/Toast/assets/hooks/useToasts";

export const DELETEDIALOGID = 'delete-dialog-modal';
let deleteDialogElement: null | HTMLElement;

export const toggleDeleteDialog = () => {
    if (!deleteDialogElement) {
        deleteDialogElement = document.getElementById(DELETEDIALOGID);
    }

    deleteDialogElement && toggle(deleteDialogElement);
};

const CategoriesContext = React.createContext({
    onDelete: {
        category: null as Category | null,
        initDeletion: () => { },
        set: (category: Category) => { category },
        loading: false,
    }
});

export const useDeleteCategory = () => {
    const { onDelete } = React.useContext(CategoriesContext);
    return onDelete;
}

const Categories = React.memo(() => {
    const categories = useSelector(state => state.category);
    const refreshCategories = useRefreshCategories();
    const toast = useToasts();

    const [state, setState] = React.useState({
        onDelete: {
            loading: false,
            category: null as Category | null
        }
    });

    React.useEffect(() => {
        if (!categories) {
            refreshCategories();
        }

        return () => {
            if (deleteDialogElement) {
                deleteDialogElement = null;
            }
        }
    }, [categories]);

    const onDelete = React.useMemo(() => ({
        category: state.onDelete.category,
        loading: state.onDelete.loading,
        set: (category: Category) => {
            setState(s => ({ ...s, onDelete: { ...s.onDelete, category } }));
        },
        initDeletion: () => {
            if (state.onDelete.category) {
                setState(s => ({ ...s, onDelete: { ...s.onDelete, loading: true } }));
                deleteCategory(state.onDelete.category.id!)
                    .then(() => {
                        toast.push({
                            title: 'Category removed',
                            content: 'The category has been removed successfully',
                            type: 'success'
                        });
                        refreshCategories();
                        setState(s => ({ ...s, onDelete: { loading: false, category: null } }));
                        toggleDeleteDialog()
                    });
            }
        }
    }), [state.onDelete, toast]);

    const contextValue = React.useMemo(() => ({
        onDelete
    }), [onDelete]);

    return <CategoriesContext.Provider value={contextValue}>
        <Fade
            className="categories-container"
            from={{ opacity: 0 }}
            animateEnter={true}
            visible={true}>
            <CategoriesList />
            <CreateCategory />
            <DeleteDialog />
        </Fade>
    </CategoriesContext.Provider>
})

export default Categories;