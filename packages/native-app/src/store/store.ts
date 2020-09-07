import { createStore as reduxCreateStore, Store } from 'redux'
import { JsonWebTokenFragment } from '../generated/graphql'
import { SetTokenAction } from './action/SetTokenAction'
import { AsyncStorage } from 'react-native'
import { useEffect, useState } from 'react'

export type AppAction = SetTokenAction

export type AppState = Partial<{
    token: JsonWebTokenFragment
}>

async function save(state: AppState): Promise<void> {
    await AsyncStorage.setItem('store', JSON.stringify(state))
}

async function restore(): Promise<AppState> {
    try {
        const store = await AsyncStorage.getItem('store')
        if (!!store) {
            return JSON.parse(store)
        }
    } catch (err) {
        // do nothing
    }
    return {}
}

const actionReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'set_token':
            return {
                ...state,
                token: action.token || undefined
            }
        default:
            return state
    }
}

const createStore = (initialState: AppState): Store<any> => {
    return reduxCreateStore<AppState, AppAction, any, any>((state: AppState = initialState, action: AppAction): AppState => {
        const newState = actionReducer(state, action)

        // persist the state whenever its updated
        save(newState)

        return newState
    })
}

export const useStore = (): Store | null => {
    const [store, setStore] = useState<Store | null>(null)
    useEffect(() => {
        (async () => {
            const restoredState = await restore()
            setStore(createStore(restoredState))
        })()
    }, [])
    return store
}
