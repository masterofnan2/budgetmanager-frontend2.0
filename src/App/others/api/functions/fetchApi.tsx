type Object = {
    [key: string]: any
};

export type Response = {
    data: Object|null,
    error: any,
    status: number
};

const apiUrl = 'http://127.0.0.1:8000/api';

const fetchApi = async (
    uri: string,
    method?: 'GET' | 'POST' | 'UPDATE' | 'PUT' | 'DELETE',
    payload?: Object | null) => {

    let returnObject: Response = {
        data: null,
        error: null,
        status: 200
    };

    let options = {};

    const headers: HeadersInit = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Credentials: 'include'
    };

    const authToken = localStorage.getItem("authToken");
    const tokenPrefix = 'Bearer ';

    if (authToken) {
        headers.Authorization = tokenPrefix + authToken;
    }

    if (!method) {
        method = 'GET'
    }

    options = { ...options, method, headers };

    if (method !== "GET" && payload) {
        options = { ...options, body: JSON.stringify(payload) };
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
