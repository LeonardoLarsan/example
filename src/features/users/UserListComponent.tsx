import { FC } from 'react'
import styled from 'styled-components'
import UserComponent from './UserComponent'
import { User } from '../../models/User'

const UserListWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-flow: row wrap;
    @media (min-width: 1024px) {
        flex-direction: row;
    }
`

const UserListItemStyled = styled.div`
    display: flex;
    width: 100%;
    @media (min-width: 800px) {
        width: 50%;
    }
    @media (min-width: 1024px) {
        width: 33.33%;
    }
`

interface UserListComponentProps {
    users: Array<User>
    onSeeUser: (user: User) => void
}

const UserListComponent: FC<UserListComponentProps> = props => {

    return (
        <UserListWrapperStyled>
            {props.users.map(user=> (
                <UserListItemStyled key={user.id}>
                    <UserComponent user={user} onSee={props.onSeeUser}/>
                </UserListItemStyled>
            ))}
        </UserListWrapperStyled>
    )
}


export default UserListComponent