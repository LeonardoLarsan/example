import LoiginFeature from "../features/auth/LoginFeature";
import { authApiController } from "./api/auth";

const Login = (props: any) => {
    return (
        <div>
            <LoiginFeature />
        </div>
    )
}

export const getServerSideProps = async (context: any) => {

    const token = context.req.cookies.token ? context.req.cookies.token : ''
 
    const authResult = await authApiController(token)

    if(authResult === true) return {
      redirect: {
        destination: '/users?page=1',
        permanent: false,
      }
    }

    return {
      props: {}
    }
}

export default Login