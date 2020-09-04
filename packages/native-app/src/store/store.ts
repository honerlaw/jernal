import { createStore as reduxCreateStore, Store } from 'redux'

export type AppAction = any

export type AppState = {

}

export const createStore = (): Store<any> => {
    return reduxCreateStore<AppState, AppAction, any, any>((state: AppState = {}, action: AppAction): AppState => {
        return state
    })
}
