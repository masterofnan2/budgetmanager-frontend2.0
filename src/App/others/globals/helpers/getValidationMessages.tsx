import getValidationMessage from "./getValidationMessage"

type ObjectType = {
    [key: string]: any
}

const getValidationMessages = (formData: ObjectType): ObjectType | null => {
    let messages: ObjectType = {};

    for (let name in formData) {
        const message = getValidationMessage(name, formData[name]);
        if (message) {
            messages = { ...messages, [name]: message }
        }
    }

    return (Object.keys(messages).length) ? messages : null;
}

export default getValidationMessages;