import React, { useState } from 'react'
import { Button, Content, Container, Form, Item, Label, Text, Input } from "native-base"
import { useCreateUserMutation } from '../../generated/graphql'

export const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [createUser] = useCreateUserMutation()

    const onPress = async () => {
        try {
            const resp = await createUser({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            })
            console.log(resp)
        } catch (err) {
            console.log(err)
        }
    }

    return <Container>
        <Content scrollEnabled={false} contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
            <Form>
                <Item>
                    <Label>email</Label>
                    <Input value={email} onChangeText={setEmail} />
                </Item>
                <Item>
                    <Label>password</Label>
                    <Input secureTextEntry={true} value={password} onChangeText={setPassword} />
                </Item>
                <Item>
                    <Label>confirm password</Label>
                    <Input secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                </Item>
                <Button onPress={onPress} full>
                    <Text>
                        login
                    </Text>
                </Button>
            </Form>
        </Content>
    </Container>
}