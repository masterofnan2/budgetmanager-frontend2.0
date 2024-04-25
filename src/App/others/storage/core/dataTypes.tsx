import { Budget, Category, Cycle, User } from "../../constants/dataTypes"
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

export type Selector = (state: TypeStorage) => User | Budget | Cycle | Category | boolean | null;

export type StorageProviderProps = {
    children: any
};