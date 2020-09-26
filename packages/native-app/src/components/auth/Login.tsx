import React, { useState } from 'react'
import { Button, Content, Container, Form, Item, Label, Text, Input, Toast, View } from "native-base"
import { StyleSheet } from "react-native"
import { useAuthenticateUserMutation } from '../../generated/graphql'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setTokenAction } from '../../store/action/SetTokenAction'
import { useNavigation } from '@react-navigation/native'
import { PRIMARY, SIZING } from '../../util/constant'
import { Title } from '../util/Title'

const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: SIZING.C
    },
    form: {
        margin: SIZING.C
    },
    inputItem: {
        margin: 0,
        padding: 0,
        paddingTop: SIZING.B,
        paddingBottom: SIZING.B,
        borderBottomWidth: 0
    },
    button: {
        backgroundColor: PRIMARY,
        marginTop: SIZING.C
    },
    outlineButton: {
        marginTop: SIZING.C
    },
    outlineButtonText: {
        fontSize: SIZING.B + SIZING.A
    }
})

export const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {t} = useTranslation()
    const [authenticateUser] = useAuthenticateUserMutation()

    const onLoginPress = async () => {
        try {
            const resp = await authenticateUser({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            })

            if (!resp.data?.authenticateUser) {
                throw new Error('error.unknown')
            }
            dispatch(setTokenAction(resp.data.authenticateUser))
        } catch (err) {
            Toast.show({
                position: 'bottom',
                text: t([err.message, 'error.unknown']),
                type: 'danger',
                duration: 3500
            })
        }
    }

    const onRedirectPress = () => {
        navigation.navigate('register')
    }

    return <Container>
        <Content scrollEnabled={false} contentContainerStyle={STYLES.container}>
            <Title />
            <View style={STYLES.form}>
                <Item floatingLabel style={STYLES.inputItem}>
                    <Label>{t('page.login.label.email_address')}</Label>
                    <Input value={email} onChangeText={setEmail} autoCapitalize={"none"} />
                </Item>
                <Item floatingLabel style={STYLES.inputItem}>
                    <Label>{t('page.login.label.password')}</Label>
                    <Input secureTextEntry={true} value={password} onChangeText={setPassword} />
                </Item>
                <Button onPress={onLoginPress} style={STYLES.button} block>
                    <Text>
                        {t('page.login.button.login')}
                    </Text>
                </Button>
                <Button style={STYLES.outlineButton} onPress={onRedirectPress} block transparent light>
                    <Text style={STYLES.outlineButtonText}>
                        {t('page.login.button.not_a_user')}
                    </Text>
                </Button>
            </View>
        </Content>
    </Container>
}