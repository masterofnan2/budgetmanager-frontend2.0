import { TypeStorage } from "../storage"

export type Map = {
    [key: string]: {
        actionTypes: { [key: string]: string },
        reducer: Function
    }
}

export type Action = {
    type: string,
    payload: any
}

export type StorageReducer = (state: TypeStorage, action: Action) => TypeStorage;

export type Selector = (state: TypeStorage) => any;

export type StorageProviderProps = {
    children: any
};