import { FC } from "react"
import { GetServerSideProps } from "next"
import { Page } from "../../styles/shareStyled"
import NavigatorFeature from "../../features/auth/NavigatorFeature"
import AlbumsFeature, { AlbumsFeatureProps } from "../../features/albums/AlbumsFeature"
import { getUserAlbumsController } from "../api/user-albums/[id]"

const PostsPage: FC<AlbumsFeatureProps> = props => {

  return (
    <Page>
      <NavigatorFeature />
      <AlbumsFeature preloadedAlbums={props.preloadedAlbums}/>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const userIdParam = Number(context.query.id)
  const fetchUsersResponse = await getUserAlbumsController(userIdParam)

  if (fetchUsersResponse.isSuccess) return {
    props: {
      preloadedAlbums: fetchUsersResponse.data
    } as AlbumsFeatureProps
  }

  return {
    props: {
      preloadedAlbums: []
    }
  }
}

export default PostsPage