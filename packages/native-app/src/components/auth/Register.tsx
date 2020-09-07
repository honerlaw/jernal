import React, { useState } from 'react'
import { Button, Content, Container, Form, Item, Label, Text, Input, Toast } from "native-base"
import { useCreateUserMutation } from '../../generated/graphql'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setTokenAction } from '../../store/action/SetTokenAction'

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
        <Content scrollEnabled={false} contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
            <Form style={{margin: 24}}>
                <Item floatingLabel last style={{paddingTop: 5, paddingBottom: 5}}>
                    <Label>{t('page.register.label.email_address')}</Label>
                    <Input value={email} onChangeText={setEmail} autoCapitalize={"none"} />
                </Item>
                <Item floatingLabel last style={{paddingTop: 5, paddingBottom: 5}}>
                    <Label>{t('page.register.label.password')}</Label>
                    <Input secureTextEntry={true} value={password} onChangeText={setPassword} />
                </Item>
                <Item floatingLabel bordered={false} last style={{paddingTop: 5, paddingBottom: 5, marginBottom: 15}}>
                    <Label>{t('page.register.label.confirm_password')}</Label>
                    <Input secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                </Item>
                <Button onPress={onRegisterPress} block>
                    <Text>
                        {t('page.register.button.create_account')}
                    </Text>
                </Button>
                <Button style={{marginTop: 24}} onPress={onRedirectPress} block transparent light>
                    <Text style={{fontSize: 14}}>
                        {t('page.register.button.already_a_user')}
                    </Text>
                </Button>
            </Form>
        </Content>
    </Container>
}