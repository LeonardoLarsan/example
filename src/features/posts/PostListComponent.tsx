import { FC, useState } from 'react'
import styled from 'styled-components'
import { Post } from '../../models/Post'
import { Modal } from '../../components/ModalComponent'
import { Action, Button, Title, Text } from '../../styles/shareStyled'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 5%;
    @media (min-width: 1025px) {
        padding: 0% 25% 0px 25%;
    }
`

const Item = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    margin-bottom: 15px;
`

const Footer = styled.div`
    margin: 10px 0px 0px 0px;
    display: flex;
    flex-direction: row-reverse;
`

const ContentModal = styled.div`
    padding: 10px;
    text-align: center;

`

const FooterModal = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    padding: 10px;
`
interface PostListComponentProps {
    posts: Array<Post>
    onDelete: (post: Post) => void
}

const PostListComponent: FC<PostListComponentProps> = props => {

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)

    const [postTarget, setPostTarget] = useState<Post>({
        id: 0,
        title: '',
        body: '',
        userId: 0,
    })

    const onClickDeletePostHandler = (post: Post)=> {
        setPostTarget(post)
        setIsOpenDeleteModal(true)
    }

    const onConfirmDeletePostHandler = () => {
        props.onDelete(postTarget)
        onCloseDeleteModalHandler()
    }

    const onCloseDeleteModalHandler = ()=> {
        setIsOpenDeleteModal(false)
    }

    return (
        <Wrapper>
            <Modal 
                isOpen={isOpenDeleteModal} 
                level='medium' 
                onClose={onCloseDeleteModalHandler} 
                title='Delete' 
                size='S'
            >
                <ContentModal>
                    <Text align='left'>{postTarget.title}</Text>
                </ContentModal>
                <FooterModal>
                    <Button status="default" onClick={onCloseDeleteModalHandler}>Cancel</Button>
                    <Button status="danger" onClick={onConfirmDeletePostHandler}>Confirm</Button>
                </FooterModal>
            </Modal>
            {props.posts.map(post=>(
                <Item key={post.id}>
                    <Title align='center'>{post.title}</Title>
                    <Text align='left'>{post.body}</Text>
                    <Footer>
                        <Action status="danger" onClick={()=> onClickDeletePostHandler(post)}>✘ Delete</Action>
                    </Footer>
                </Item>
            ))}
        </Wrapper>
    )
}

export default PostListComponent