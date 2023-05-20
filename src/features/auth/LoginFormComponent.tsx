import { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { BigTitle, FullSubmit, Text } from '../../styles/shareStyled'

const Background = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: #37c;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: rgb(240,240,240);
    padding: 20px;
    max-width: 500px;    
    @media (min-width: 1024px) {
        padding: 10px 50px 50px 50px;
    }
`

const Title = styled.h1`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: #555;
    font-size: 25px;
    margin-bottom: 15px;
`

const Field = styled.div`
    width: 100%;
    margin-bottom: 5px;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: solid 1px grey;
    border-radius: 5px;
`

const Error = styled.a`
    display: flex;
    width: 100%;
    color: red;
    font-size: 12px;
    height: 15px;
`

type FormValues = {
    email: string
    password: string
};

interface LoginFormComponentProps {
    onSubmit: (formValues: FormValues) => void
}

const LoginFormComponent: FC<LoginFormComponentProps> = props => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
    })

    const onSubmitHandler = (data: FormValues) => {
        props.onSubmit({
            email: data.email,
            password: data.password
        })
    }

    return (
        <Background>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <BigTitle align="center">Sign In</BigTitle>
                <Text align='center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                <Field>
                    <Input
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                    />
                    <Error>{errors.email?.type === 'pattern' ? 'Invalid' : errors.email?.type}</Error>
                </Field>
                <Field>
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register('password', { required: true, maxLength: 20 })}
                    />
                    <Error>{errors.password?.type}</Error>
                </Field>
                <Field>
                    <FullSubmit status='primary' type='submit' value="Sign In" />
                </Field>
            </Form>
        </Background>
    )
}

export default LoginFormComponent