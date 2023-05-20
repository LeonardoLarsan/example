import { useRouter } from "next/router";
import AppBarComponent from "../../components/AppBarComponent"
import { useAppDispatch } from "../../hooks";
import { signOutAction } from "./authSlice";

const NavigatorFeature = () => {

    const router = useRouter();

    const dispatch = useAppDispatch()
    
    const onRedirectToUsersPageHandler = () => {
        router.push('/users?page=1')
    }

    const onLogOutActionHandler = () => {
        dispatch(signOutAction(router.push))
    }

    return (
        <AppBarComponent items={[
            {
                text: 'Users',
                onClick: onRedirectToUsersPageHandler
            },
            {
                text: 'Log Out',
                onClick: onLogOutActionHandler
            }
        ]}/>
    )
}

export default NavigatorFeature