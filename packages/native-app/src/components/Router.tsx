import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { useStore } from '../store/store';
import { ApolloProvider } from '@apollo/client'
import { Root } from 'native-base'
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { Dashboard } from './dashboard/Dashboard';
import { TokenSelector } from '../store/selector/TokenSelector';
import { NavigationContainer } from '@react-navigation/native';
import { useGQLClient } from '../util/client';

const Stack = createNativeStackNavigator()

const UnAuthNavigator: React.FC = () => {
    const token = useSelector(TokenSelector)
    if (token) {
        return null
    }

    return <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="register" component={Register} />
    </Stack.Navigator>
}

const AuthNavigator: React.FC = () => {
    const token = useSelector(TokenSelector)
    if (!token) {
        return null
    }

    return <Stack.Navigator>
        <Stack.Screen name="login" component={Dashboard} />
    </Stack.Navigator>
}

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
                    <AuthNavigator />
                    <UnAuthNavigator />
                </NavigationContainer>
            </Provider>
        </ApolloProvider>
    </Root>
}

