import { FC } from "react";
import styled from 'styled-components'
import { User } from "../../models/User";
import { Action } from "../../styles/shareStyled";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 10%;
`

const Avatar = styled.img`
    border-radius: 50%;
    width: 100%;
`

const FirstName = styled.h1`
    width: 100%;
    text-align: center;
    font-size: ${props=>props.theme.title.size};
    color: ${props=>props.theme.title.color};
`

const LastName = styled.h2`
    width: 100%;
    text-align: center;
    font-size: ${props=>props.theme.subTitle.size};
    color: ${props=>props.theme.subTitle.color};
`


interface UserComponentProps {
    user: User
    onSee: (user: User) => void
}

const UserComponent: FC<UserComponentProps> = props => {
    return (
        <Wrapper>
            <Avatar src={props.user.avatar}/>
            <FirstName>{props.user.first_name}</FirstName>
            <LastName>{props.user.last_name}</LastName>
            <Action status="primary" onClick={()=>{props.onSee(props.user)}}>See</Action>
        </Wrapper>
    )
}

export default UserComponent