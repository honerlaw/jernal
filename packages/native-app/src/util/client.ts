import React, { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Store } from 'redux';
import { setTokenAction } from '../store/action/SetTokenAction';

const buildNewFetchResult = (result: any, text: any) => {
    delete result.json
    result.text = () => new Promise((resolve) => resolve(text))
    return result
}

const createHttpRetryLink = (store: Store) => {
    return createHttpLink({
        uri: 'http://localhost:3000/graphql',
        credentials: 'same-origin',
        fetch: async (input: RequestInfo, init?: RequestInit) => {
            const result = await fetch(input, init)

            const text = await result.text()
            try {
                const json = JSON.parse(text)
                if (!json.errors || json.errors.length === 0) {
                    return buildNewFetchResult(result, text)
                }
                const statusCode = json.errors[0].extensions.exception.status

                if (statusCode === 401) {
                    store.dispatch(setTokenAction(null))
                }

                if (statusCode === 403) {
                    // @todo hit the refresh token endpoint and get new access tokens if we can, otherwise, logout
                }
            } catch (err) {
                // do nothing, failed to parse, so re-wrap it and handle it downstream
            }

            return buildNewFetchResult(result, text)
        }
    })
}

const createAuthLink = (store: Store) => {
    return setContext((_, { headers }) => {
        const token = store.getState().token?.accessToken
        if (!token) {
            return {
                headers
            }
        }
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            }
        }
    })
}

export const useGQLClient = (store: Store | null): ApolloClient<any> | null => {
    const [client, setClient] = useState<ApolloClient<any> | null>(null)
    useEffect(() => {
        if (!store) {
            return
        }

        setClient(new ApolloClient({
            cache: new InMemoryCache(),
            link: createAuthLink(store).concat(createHttpRetryLink(store))
        }))
    }, [store])
    return client
}
