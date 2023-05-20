import Link from "next/link"
import { FC } from "react"
import styled from 'styled-components'

const PaginatorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`

const PaginatorButton = styled.button`
    padding: 10px;
    border: none;
    background: none;
    color: #0ae;
    font-size: 18px;
    &:disabled {
        opacity: 0.5;
    }
`

const PaginatorLabel = styled.span`
    padding: 10px;
    font-size: 18px;
    color: #444;
`

interface UserPaginatorProps {
    onChangePage: (newPage: number) => void
    currentPage: number
    totalPages: number
}

const UserPaginator: FC<UserPaginatorProps> = props => {

    const onPrevPageHandler = (currentPage: number) => {   
        props.onChangePage(currentPage - 1)
    }

    const onNextPageHandler = (currentPage: number) => {
        props.onChangePage(currentPage + 1)
    }

    const prevPageDisabledComputed = props.currentPage === 1
    const nextPageDisabledComputed = props.currentPage >= props.totalPages

    const prevPageUrlComputed = prevPageDisabledComputed ? `/users?page=${props.currentPage}` : `/users?page=${props.currentPage - 1}`
    const nexPageUrlComputed = nextPageDisabledComputed ? `/users?page=${props.currentPage}` : `/users?page=${props.currentPage +1}`

    return (
        <PaginatorWrapper>
            <PaginatorButton disabled={prevPageDisabledComputed} onClick={() => onPrevPageHandler(props.currentPage)}>
                <Link href={prevPageUrlComputed} shallow>Prev</Link>
            </PaginatorButton>
            <PaginatorLabel>{props.currentPage}/{props.totalPages}</PaginatorLabel>
            <PaginatorButton disabled={nextPageDisabledComputed} onClick={() => onNextPageHandler(props.currentPage)}>
                <Link href={nexPageUrlComputed} shallow>Next</Link>
            </PaginatorButton>
        </PaginatorWrapper>
    )
}

export default UserPaginator