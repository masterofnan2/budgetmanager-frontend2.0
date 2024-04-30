const getValidationMessage = (type: string, value: string): string | null => {
    let message = null;
    let regexPattern = null;

    switch (type) {
        case "name":
            regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}(\s[a-zéèâàäöïîôòìëêûüùç]{2,20}){0,2}$/i;
            if (!value) {
                message = "The username is required";
            } else if (value.length < 2) {
                message = "The name should be at least 2 caracters";
            } else if (!regexPattern.test(value)) {
                message = "The name must contain only alphabetic caracters";
            }

            break;

        case "email":
            regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

            if (!value) {
                message = "The email is required";
            } else if (!regexPattern.test(value)) {
                message = "This email format is not valid";
            }
            break;

        case "password":
            if (!value) {
                message = "The password is required";
            } else if (value.length < 6) {
                message = "The password length should be at least 6 caracters";
            }
            break;

        case "password_confirmation":
            if (!value) {
                message = "The password is required";
            } else if (value.length < 6) {
                message = "The password length should be at least 6 caracters";
            }
            break;

        case "prix":
            const price = parseFloat(value);

            if (!price) {
                message = "Le prix est obligatoire";
            } else if (price < 0) {
                message = "Le prix du produit ne doit pas être négatif";
            }
            break;

        case 'description':
            if (!value) {
                message = "la description du produit est obligatoire";
            }
            break;

        default:
            break;
    }

    return message;
}

export default getValidationMessage;