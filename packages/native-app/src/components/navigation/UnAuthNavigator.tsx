import React from 'react'
import { useSelector } from "react-redux"
import { TokenSelector } from "../../store/selector/TokenSelector"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"

type UnAuthNavigatorProps = {
    Stack: any
}

export const UnAuthNavigator: React.FC<UnAuthNavigatorProps> = ({
    Stack
}) => {
    const token = useSelector(TokenSelector)
    if (token) {
        return null
    }

    return <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="register" component={Register} />
    </Stack.Navigator>
}