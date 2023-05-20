import { FC, useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { deletePostAction, preloadPostsAction, selectIsLoading, selectPosts } from './postsSlice'
import { Post } from '../../models/Post';
import { Loader } from '../../components/LoaderComponent';
import PostListComponent from './PostListComponent';

export interface PostsFeatureProps {
    preloadedPosts: Array<Post> 
}

const PostsFeature: FC<PostsFeatureProps> = props => {

    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectPosts)
    const isLoading = useAppSelector(selectIsLoading)

    useEffect(()=>{
        onInitHandler()
    }, [])

    const onInitHandler = () => {
        dispatch(preloadPostsAction(props.preloadedPosts))
    }

    const onDeletePostHandler = (post: Post) => {
        dispatch(deletePostAction(post.id))
    }

    const postsComputed = posts.length ? posts : props.preloadedPosts

    return (
        <>
            <Loader isOpen={isLoading}/>
            <PostListComponent posts={postsComputed} onDelete={onDeletePostHandler}/>
        </>
    )
}

export default PostsFeature