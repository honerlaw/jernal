import React, { useState } from 'react'
import { Button, Content, Container, Form, Item, Label, Text, Input, Toast } from "native-base"
import { useAuthenticateUserMutation } from '../../generated/graphql'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setTokenAction } from '../../store/action/SetTokenAction'
import { useNavigation } from '@react-navigation/native'

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
        <Content scrollEnabled={false} contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
            <Form style={{margin: 24}}>
                <Item floatingLabel last style={{paddingTop: 5, paddingBottom: 5}}>
                    <Label>{t('page.login.label.email_address')}</Label>
                    <Input value={email} onChangeText={setEmail} autoCapitalize={"none"} />
                </Item>
                <Item floatingLabel last style={{paddingTop: 5, paddingBottom: 5, marginBottom: 15}}>
                    <Label>{t('page.login.label.password')}</Label>
                    <Input secureTextEntry={true} value={password} onChangeText={setPassword} />
                </Item>
                <Button onPress={onLoginPress} block>
                    <Text>
                        {t('page.login.button.login')}
                    </Text>
                </Button>
                <Button style={{marginTop: 24}} onPress={onRedirectPress} block transparent light>
                    <Text style={{fontSize: 14}}>
                        {t('page.login.button.not_a_user')}
                    </Text>
                </Button>
            </Form>
        </Content>
    </Container>
}