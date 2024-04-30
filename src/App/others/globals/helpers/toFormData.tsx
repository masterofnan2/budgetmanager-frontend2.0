type Payload = {
    [key: string]: any
}

export default function (payload: Payload): FormData {
    const form = new FormData();

    const keys = Object.keys(payload);
    keys.length > 0 && keys.forEach(key => {
        form.append(key, payload[key]);
    });

    return form;
}