import fetchApi, { Response } from "./fetchApi"

export const logIn = (payload: { email: string, password: string }): Promise<Response> => {
    return fetchApi('/auth/login', 'POST', payload);
}

export const signUp = (payload: { email: string, password: string, name: string }): Promise<Response> => {
    return fetchApi('/auth/signup', 'POST', payload);
}

export const verifyEmailConformity = (payload: { email: string }): Promise<Response> => {
    return fetchApi('/auth/verify_email_conformity', 'POST', payload);
}

export const authenticate = (): Promise<Response> => {
    return fetchApi('/auth/user');
}

export const getDefaultBudget = (): Promise<Response> => {
    return fetchApi('/budget');
}

export const getBalance = (): Promise<Response> => {
    return fetchApi('/budget/balance');
}

export const setDefaultBudget = (amount: number): Promise<Response> => {
    return fetchApi('/budget/set', 'POST', { amount });
}

export const getCurrentCycle = (): Promise<Response> => {
    return fetchApi('/cycle/current');
}

export const editCycle = (payload: { end_date: string }): Promise<Response> => {
    return fetchApi('/cycle/edit', "POST", payload);
}

export const getCategories = (): Promise<Response> => {
    return fetchApi('/category/currents');
}

export const makeEmailConfirmation = (): Promise<Response> => {
    return fetchApi('/auth/email/make_confirmation');
}

export const matchConfirmationCode = (code: string): Promise<Response> => {
    return fetchApi('/auth/email/match_code', "POST", { code });
}

export const deleteCategory = (id: number): Promise<Response> => {
    return fetchApi('/category/delete/' + id, "DELETE");
}

export const forgetPassword = (email: string) => {
    return fetchApi('/auth/forgotten-password', "POST", { email });
}

export const resetPassword = (payload: {
    password: string,
    password_confirmation: string,
    token: string
}) => {
    return fetchApi('/auth/reset-password', "POST", payload);
}