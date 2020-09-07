import React, { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Store } from 'redux';

const createHttpRetryLink = (store: Store) => {
    return createHttpLink({
        uri: 'http://localhost:3000/graphql',
        credentials: 'same-origin',
        fetch: (input: RequestInfo, init?: RequestInit) => {
            // do the fetch, if it fails for 403 reasons, then we need to do refresh token request
            return fetch(input, init)
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
