import React from "react"
import { useSelector } from "react-redux"
import { TokenSelector } from "../../store/selector/TokenSelector"
import { Dashboard } from "../dashboard/Dashboard"
import { JournalEntryAdd } from "../journal-entry-add/JournalEntryAdd"

const DEFAULT_OPTIONS = {
    headerLargeTitleStyle: {
        color: 'black'
    },
    headerLargeTitle: true,
    headerHideShadow: true,
    headerBackTitle: '',
    headerTintColor: 'black',
}

type AuthNavigatorProps = {
    Stack: any
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({
    Stack
}) => {
    const token = useSelector(TokenSelector)
    if (!token) {
        return null
    }

    return <>
        <Stack.Navigator screenOptions={{headerTintColor: "#000000"}}>
            <Stack.Screen name="dashboard" options={{
                ...DEFAULT_OPTIONS,
                headerTitle: 'jernal'
            }} component={Dashboard} />
            <Stack.Screen name="journal-entry-add" options={{
                ...DEFAULT_OPTIONS,
                headerTitle: 'New Entry'
            }} component={JournalEntryAdd} />
        </Stack.Navigator>
    </>
}