import React from "react";
import { Category } from "../../../../../../others/constants/dataTypes";
import Button from "../../../../../../others/minicomponents/Button/Button";
import Icon from "../../../../../../others/minicomponents/Icon/Icon";
import SmallText from "../../../../../../others/minicomponents/SmallText/SmallText";
import useSelector from "../../../../../../others/storage/core/useSelector";
import { toggleDeleteDialog, toggleEditDialog, useDeleteCategory, useEditCategory } from "../Categories";

const CategoriesList = React.memo(() => {
    const categories = useSelector(state => state.category) as Category[];
    const onDelete = useDeleteCategory();
    const onEdit = useEditCategory();

    const handleDelete = React.useCallback((category: Category) => {
        onDelete.set(category);
        toggleDeleteDialog();
    }, [onDelete.set]);

    const handleEdit = React.useCallback((category: Category) => {
        onEdit.set(category);
        toggleEditDialog();
    }, []);

    if (categories) {
        return <>
            <table className="categories-list">
                <thead>
                    <tr>
                        <th className="col-1"></th>
                        <th className="col-2">name</th>
                        <th className="col-2">budget</th>
                        <th className="col-5">description</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => {
                        return <tr key={category.id}>
                            <td><div className="category-icon"></div></td>
                            <td>{category.name}</td>
                            <td>{category.budget?.toLocaleString('fr-Fr')} Ariary</td>
                            <td className="category-description">
                                <SmallText
                                    isExtendable={true}
                                    maxLength={50}>
                                    {category.description}
                                </SmallText>
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    className="btn"
                                    onClick={() => handleEdit(category)}>
                                    <Icon>pencil</Icon>
                                </Button>
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    className="btn text-danger"
                                    onClick={() => handleDelete(category)}>
                                    <Icon>trash-can</Icon>
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    }
})

export default CategoriesList;