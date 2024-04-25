/**
 * Permet de convertir le contenu d'un formulaire en JS Object à partir de son attribut `name`
 * @param {*} event l'évennement qui résulte de la submission du formulaire
 * @returns {Object} les données du formulaire formatées en JS Object
 */

import { FormEvent } from "react";

const getFormData = (event: FormEvent<HTMLFormElement>) => {
    let formData = {};

    const inputsCount = event.target?.length;

    if (inputsCount > 0) {
        for (let i = 0; i < inputsCount; i++) {
            const { name, value } = event.target[i];
            if (name && value !== undefined) {
                formData = { ...formData, [name]: value }
            }
        }
    }

    return formData;
}

export default getFormData;