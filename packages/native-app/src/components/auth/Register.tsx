import React, { useState } from 'react'
import { Button, Content, Container, Form, Item, Label, Text, Input, Toast, View } from "native-base"
import { StyleSheet } from "react-native"
import { useCreateUserMutation } from '../../generated/graphql'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setTokenAction } from '../../store/action/SetTokenAction'
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

export const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {t} = useTranslation()
    const [createUser] = useCreateUserMutation()

    const onRegisterPress = async () => {
        if (password !== confirmPassword) {
            Toast.show({
                position: 'bottom',
                text: t('error.user.create.password_mismatch'),
                type: 'danger',
                duration: 3500
            })
            return
        }

        try {
            const resp = await createUser({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            })

            if (!resp.data?.createUser) {
                throw new Error('error.unknown')
            }
            dispatch(setTokenAction(resp.data.createUser))
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
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            navigation.navigate('login')
        }
    }

    return <Container>
        <Content scrollEnabled={false} contentContainerStyle={STYLES.container}>
            <Title />
            <View style={STYLES.form}>
                <Item floatingLabel style={STYLES.inputItem}>
                    <Label>{t('page.register.label.email_address')}</Label>
                    <Input value={email} onChangeText={setEmail} autoCapitalize={"none"} />
                </Item>
                <Item floatingLabel style={STYLES.inputItem}>
                    <Label>{t('page.register.label.password')}</Label>
                    <Input secureTextEntry={true} value={password} onChangeText={setPassword} />
                </Item>
                <Item floatingLabel style={STYLES.inputItem}>
                    <Label>{t('page.register.label.confirm_password')}</Label>
                    <Input secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                </Item>
                <Button onPress={onRegisterPress} style={STYLES.button} block>
                    <Text>
                        {t('page.register.button.create_account')}
                    </Text>
                </Button>
                <Button style={STYLES.outlineButton} onPress={onRedirectPress} block transparent light>
                    <Text style={STYLES.outlineButtonText}>
                        {t('page.register.button.already_a_user')}
                    </Text>
                </Button>
            </View>
        </Content>
    </Container>
}