import { Dispatch, SetStateAction } from "react";
import getValidationMessage from "./getValidationMessage";

type State = {
    [key: string]: any,
}

const handleInputBlur = (e: any, setState: Dispatch<SetStateAction<any>>) => {
    const { name, value } = e.target;
    const validationMessage = getValidationMessage(name, value);

    setState((s: State) => {
        const newValidationMessages: State = s.validationMessages ? { ...s.validationMessages } : {};

        if (validationMessage) {
            newValidationMessages[name] = validationMessage;
        } else {
            delete newValidationMessages[name];
        }

        return {
            ...s,
            validationMessages:
                (Object.keys(newValidationMessages).length > 0) ? newValidationMessages : null
        };
    })
}

export default handleInputBlur;