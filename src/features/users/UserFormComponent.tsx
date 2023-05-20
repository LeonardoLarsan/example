import { useForm } from "react-hook-form"
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import SlideComponent from "../../components/SlideComponent";
import { User } from "../../models/User";
import Link from "next/link";
import { Action, FullSubmit } from "../../styles/shareStyled";


const Wrapper = styled.div`
    display: flex;
    min-height: 95vh;
    flex-direction: column;
    justify-content: space-evenly;
`

const Form = styled.form`
 padding: 0% 10% 0% 10%;
`

const Avatar = styled.img`
    border-radius: 50%;
    width: 70%;
    margin: 0% 10% 5% 10%;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    margin-bottom: 20px;
`

const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Input = styled.input`
    display: flex;
    width: 90%;
    padding: 5px;
    color: black;
    background: none;
    border: none;
    border-bottom: 1px solid;
    &:disabled{
        border: none;
        color: grey;
    }
`

const EnableFieldButton = styled.button`
    cursor: pointer;
    border: none;
    font-size: 20px;
    &:before {
        content: '✎';
    }
`

const ErrorMessage = styled.b`
    display: flex;
    width: 100%;
    color: red;
    background: 'blue';
`

type FormValues = {
    firstName: string
    lastName: string
    email: string
    avatar: string
};

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ActionButtom = styled.input<{ disabled: boolean }>`
    display: inline;
    width: auto;
    border: none;
    background: #09f;
    border-radius: 5px;
    padding: 5px 10px;
    box-shadow: 1px 1px 5px grey;
    color: white;
    opacity: ${props => props.disabled ? '.3' : '1'};
`

interface UserFormComponentProps {
    user: User
    onSubmit: (user: User) => void
    isOpen: boolean
    onClose: () => void
}


const UserFormComponent: FC<UserFormComponentProps> = props => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
        defaultValues: { avatar: '', firstName: '', lastName: '', email: '' }
    })

    const [disabledFields, setDisabledFields] = useState({
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
    })

    useEffect(() => {
        setValue('avatar', props.user.avatar)
        setValue('firstName', props.user.first_name)
        setValue('lastName', props.user.last_name)
        setValue('email', props.user.email)
        setDisabledFields({
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
        })
    }, [props.user])

    const disabledSubmitButton = disabledFields.avatar && disabledFields.firstName && disabledFields.lastName && disabledFields.email

    const onClickEnableFieldHandler = (e: React.MouseEvent<HTMLElement>, field: keyof FormValues) => {
        e.preventDefault()
        if (field === 'avatar') {
            setDisabledFields({ ...disabledFields, avatar: false })
            return
        }
        if (field === 'firstName') {
            setDisabledFields({ ...disabledFields, firstName: false })
            return
        }
        if (field === 'lastName') {
            setDisabledFields({ ...disabledFields, lastName: false })
            return
        }
        if (field === 'email') {
            setDisabledFields({ ...disabledFields, email: false })
            return
        }
    }

    const onSubmitHandler = (data: FormValues) => {
        props.onSubmit({
            ...props.user,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            avatar: data.avatar
        })
    }

    return (
        <SlideComponent isOpen={props.isOpen} onClose={props.onClose} position='right'>
            <Wrapper>
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Avatar src={props.user.avatar} />
                    <InputWrapper>
                        <InputRow>
                            <Input
                                type="text"
                                disabled={disabledFields.avatar}
                                {...register('avatar', { required: true, maxLength: 100, value: props.user.avatar })}
                            />
                            <EnableFieldButton disabled={!disabledFields.firstName} onClick={(e) => onClickEnableFieldHandler(e, 'avatar')} />
                        </InputRow>
                        <ErrorMessage>{errors.firstName?.type}</ErrorMessage>
                    </InputWrapper>
                    <InputWrapper>
                        <InputRow>
                            <Input
                                type="text"
                                disabled={disabledFields.firstName}
                                {...register('firstName', { required: true, maxLength: 20, value: props.user.first_name })}
                            />
                            <EnableFieldButton disabled={!disabledFields.firstName} onClick={(e) => onClickEnableFieldHandler(e, 'firstName')} />
                        </InputRow>
                        <ErrorMessage>{errors.firstName?.type}</ErrorMessage>
                    </InputWrapper>
                    <InputWrapper>
                        <InputRow>
                            <Input
                                type="text"
                                disabled={disabledFields.lastName}
                                {...register('lastName', { required: true, maxLength: 20, value: props.user.last_name })}
                            />
                            <EnableFieldButton disabled={!disabledFields.lastName} onClick={(e) => onClickEnableFieldHandler(e, 'lastName')} />
                        </InputRow>
                        <ErrorMessage>{errors.lastName?.type}</ErrorMessage>
                    </InputWrapper>
                    <InputWrapper>
                        <InputRow>
                            <Input
                                type="email"
                                disabled={disabledFields.email}
                                {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/, value: props.user.email })}
                            />
                            <EnableFieldButton disabled={!disabledFields.email} onClick={(e) => onClickEnableFieldHandler(e, 'email')} />
                        </InputRow>
                        <ErrorMessage>{errors.email?.type === 'pattern' ? 'Invalid' : errors.email?.type}</ErrorMessage>
                    </InputWrapper>

                    <InputWrapper>
                        <InputRow>
                            <FullSubmit status="primary" disabled={disabledSubmitButton} type="submit" value="Submit" />
                        </InputRow>
                    </InputWrapper>
                </Form>
                <Footer>
                    <Action status="primary">
                        <Link href={`/user-posts/${props.user.id}`}>See Posts</Link>
                    </Action>   
                    <Action status="primary">
                        <Link href={`/user-albums/${props.user.id}`}>See Album</Link>
                    </Action>
                </Footer>
            </Wrapper>
        </SlideComponent>
    )
}

export default UserFormComponent