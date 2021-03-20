import {Category} from '../api/models'
import {Action, Dispatch} from 'redux'
import {default as CategoriesApi} from '../api/categories'

const actionTypes = {
    CATEGORIES_LOADED: 'CATEGORIES_LOADED'
}

// State
export interface State {
    data: Category[],
    loading: boolean,
    success: boolean
}

const initialState: State = {
    data: [],
    loading: true,
    success: true
}

// Actions
export type CategoriesLoadedAction = {
    payload: {
        data: Category[],
        success: boolean
    }
} & Action

export type CategoriesActions = CategoriesLoadedAction

// Action creators
export function categoriesLoaded(data: Category[], success: boolean): CategoriesLoadedAction {
    return {
        type: actionTypes.CATEGORIES_LOADED,
        payload: {
            data, success
        }
    }
}

// Dispatchers
export function loadCategories(): (dispatch: Dispatch) => void {
    return (dispatch: Dispatch): void => {
        CategoriesApi.get()
            .then(response => {
                dispatch(categoriesLoaded(response.data, true))
            }, () => {
                dispatch(categoriesLoaded([], false))
            })
            .catch(() => {
                dispatch(categoriesLoaded([], false))
            })
    }
}

// Reducer
export function reducer(state: State = initialState, action: CategoriesActions): State {
    switch (action.type) {
        case actionTypes.CATEGORIES_LOADED:
            return {
                data: action.payload.data,
                loading: false,
                success: action.payload.success
            }
        default:
            return state
    }
}