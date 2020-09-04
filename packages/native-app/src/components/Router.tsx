import React from 'react'
import { NativeRouter, Route, Redirect } from "react-router-native";
import { Provider } from 'react-redux'
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { createStore } from '../store/store';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Root } from 'native-base'

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});

export const Router: React.FC = () => {
    return <Root>
        <NativeRouter>
            <ApolloProvider client={client}>
                <Provider store={createStore()}>
                        <Redirect to={'/login'} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                </Provider>
            </ApolloProvider>
        </NativeRouter>
    </Root>
}

