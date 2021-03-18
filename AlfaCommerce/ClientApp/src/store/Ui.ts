import {Action, AnyAction, Dispatch} from 'redux'

const actionTypes = {
    SET_UI_FLUID: 'SET_UI_FLUID'
}

// State
export interface State {
    fluid: boolean
}

const initialState: State = {
    fluid: true
}

// Actions
export type SetUiFluidAction = {
    fluid: boolean,
} & Action

export type UiActions = SetUiFluidAction

// Action creators 
function setUiFluidAction(fluid: boolean): SetUiFluidAction {
    return {
        type: actionTypes.SET_UI_FLUID,
        fluid
    }
}

// Dispatchers
export function setUiFluid(fluid: boolean): (dispatch: Dispatch) => AnyAction {
    return (dispatch: Dispatch): AnyAction => {
        return dispatch(setUiFluidAction(fluid))
    }
}

// Reducer
export function reducer(state: State = initialState, action: UiActions): State {
    switch (action.type) {
        case actionTypes.SET_UI_FLUID:
            return {
                fluid: action.fluid
            }
        default:
            return state
    }
}