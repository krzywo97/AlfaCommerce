import * as Ui from './Ui'
import * as Categories from './Categories'

// The top-level state object
export interface ApplicationState {
    ui: Ui.State | undefined,
    categories: Categories.State | undefined
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    ui: Ui.reducer,
    categories: Categories.reducer
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
