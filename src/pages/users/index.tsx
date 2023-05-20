import { FC } from "react"
import { authApiController } from '../api/auth'
import UsersFeature, { UsersFeatureProps } from "../../features/users/UsersFeature"
import { GetServerSideProps } from "next"
import { Page } from "../../styles/shareStyled"
import NavigatorFeature from "../../features/auth/NavigatorFeature"
import { fetchUsersController } from "../api/users"


const UsersPage: FC<UsersFeatureProps> = props => {

    return (
      <Page>
        <NavigatorFeature />
        <UsersFeature {...props}/>
      </Page>   
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const pageParam = Number(context.query.page)
    const fetchUsersResponse = await fetchUsersController(pageParam)

    if(fetchUsersResponse.isSuccess) return {props: {
      preloadedUsers: fetchUsersResponse.data.data,
      preloadedTotalPages: fetchUsersResponse.data.total_pages,
      preloadedCurrentPage: fetchUsersResponse.data.page 
    }}

    return {
      props: {
        preloadedUsers: [],
        preloadedTotalPages: 0,
        preloadedCurrentPage: 0 
      } as UsersFeatureProps
    }
  }

export default UsersPage