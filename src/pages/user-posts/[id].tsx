import { FC } from "react"
import { GetServerSideProps } from "next"
import { Page } from "../../styles/shareStyled"
import NavigatorFeature from "../../features/auth/NavigatorFeature"
import PostsFeature, { PostsFeatureProps } from "../../features/posts/PostsFeature"
import { getUserPostsController } from "../api/user-posts/[id]"

const PostsPage: FC<PostsFeatureProps> = props => {

  return (
    <Page>
      <NavigatorFeature />
      <PostsFeature preloadedPosts={props.preloadedPosts} />
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const userIdParam = Number(context.query.id)
  const fetchUsersResponse = await getUserPostsController(userIdParam)

  if (fetchUsersResponse.isSuccess) return {
    props: {
      preloadedPosts: fetchUsersResponse.data
    } as PostsFeatureProps
  }

  return {
    props: {
      preloadedPosts: []
    } as PostsFeatureProps
  }
}

export default PostsPage