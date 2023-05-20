import { FC, useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { selectUsers, fetchUserListAction, selectTotalPages, selectCurrentPage, selectIsLoading, updateUserAction, preloadUsersAction } from './usersSlice'

import UserListComponent from './UserListComponent';
import UserPaginator from './UserPaginatorComponent';
import { Loader } from '../../components/LoaderComponent';
import UserFormComponent from './UserFormComponent';
import { User } from '../../models/User';

export interface UsersFeatureProps {
    preloadedUsers: Array<User>
    preloadedTotalPages: number
    preloadedCurrentPage: number 
}

const UsersFeature: FC<UsersFeatureProps> = props => {

    const dispatch = useAppDispatch()
    const users = useAppSelector(selectUsers)
    const totalPages = useAppSelector(selectTotalPages)
    const currentPage = useAppSelector(selectCurrentPage)
    const isLoading = useAppSelector(selectIsLoading)

    const [isOpenUserSlide, setIsOpenUserSlide] = useState<boolean>(false)

    const [userTarget, setUserTarget] = useState<User>({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
    })

    useEffect(()=>{
        onInitHandler()
    }, [])

    const onInitHandler = () => {
        dispatch(preloadUsersAction(props.preloadedUsers))
    }

    const onChangePageHandler = (currentPage: number) => {
        dispatch(fetchUserListAction(currentPage))
    }

    const onCloseUserSlide = () => {
        setIsOpenUserSlide(false)
    }

    const onModifyUserHandler = (user: User) => {
        setUserTarget(user)
        setIsOpenUserSlide(true)
    }

    const onSubmitUserFormHandler = (user: User) => {
        dispatch(updateUserAction(user))
        setIsOpenUserSlide(false)
    }

    const usersComputed = users.length ? users : props.preloadedUsers 
    const totalPagesComputed = totalPages ? totalPages : props.preloadedTotalPages
    const currentPageComputed = currentPage ? currentPage : props.preloadedCurrentPage


    return (
        <>
            <Loader isOpen={isLoading} />
            <UserListComponent users={usersComputed} onSeeUser={onModifyUserHandler} />
            <UserPaginator
                onChangePage={onChangePageHandler}
                currentPage={currentPageComputed}
                totalPages={totalPagesComputed}
            />
            <UserFormComponent
                user={userTarget}
                onSubmit={onSubmitUserFormHandler}
                isOpen={isOpenUserSlide}
                onClose={onCloseUserSlide}
            />
        </>
    )
}

export default UsersFeature