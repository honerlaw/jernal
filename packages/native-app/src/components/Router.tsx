import React from 'react'
import { Provider } from 'react-redux'
import { useStore } from '../store/store';
import { ApolloProvider } from '@apollo/client'
import { Root } from 'native-base'
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { useGQLClient } from '../util/client';
import { AuthNavigator } from './navigation/AuthNavigator';
import { UnAuthNavigator } from './navigation/UnAuthNavigator';

const Stack = createNativeStackNavigator()

export const Router: React.FC = () => {
    const store = useStore()
    const client = useGQLClient(store)
    if(!store || !client) {
        return null
    }

    return <Root>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <NavigationContainer>
                    <AuthNavigator Stack={Stack} />
                    <UnAuthNavigator Stack={Stack} />
                </NavigationContainer>
            </Provider>
        </ApolloProvider>
    </Root>
}

