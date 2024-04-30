type Object = {
    [key: string]: any
};

export type Response = {
    data: Object | null,
    error: any,
    status: number
};

type Method = 'GET' | 'POST' | 'UPDATE' | 'PUT' | 'DELETE'

type Options = {
    method: Method,
    headers: HeadersInit,
    body?: string | FormData
};

const apiUrl = 'http://127.0.0.1:8000/api';

const fetchApi = async (
    uri: string,
    method?: Method,
    payload?: Object | FormData) => {

    let returnObject: Response = {
        data: null,
        error: null,
        status: 200
    };

    const isFormData = payload instanceof FormData;

    const accept = 'application/json';
    const contentType = isFormData ? 'multipart/form-data' : accept;

    const headers: HeadersInit = {
        Accept: accept,
        'Content-Type': contentType
    };

    const authToken = localStorage.getItem("authToken");
    const tokenPrefix = 'Bearer ';

    if (authToken) {
        headers.Authorization = tokenPrefix + authToken;
    }

    if (!method) {
        method = 'GET'
    }

    const options: Options = {
        method,
        headers,
    };

    if (method !== "GET" && payload) {
        options.body = isFormData ? payload : JSON.stringify(payload);
    }

    try {
        const response = await fetch(apiUrl + uri, options);
        const responseData = await response.json();

        if (!response.ok) {
            returnObject = { ...returnObject, error: responseData };
        } else {
            returnObject = { ...returnObject, data: responseData };
        }
        
        returnObject = { ...returnObject, status: response.status };

    } catch (e: any) {
        returnObject = { ...returnObject, error: e };
    }

    return returnObject;
}

export default fetchApi;
