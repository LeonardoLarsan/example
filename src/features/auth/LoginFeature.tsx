import { useRouter } from "next/router"
import { Loader } from "../../components/LoaderComponent"
import { useAppDispatch, useAppSelector } from "../../hooks"
import LoginFormComponent from "./LoginFormComponent"
import { loginAction, selectIsLoading } from "./authSlice"

const LoiginFeature = () => {

    const router = useRouter();
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectIsLoading)

    const onSubmitLoginFormHandler = (formValue: {email: string, password: string} ) => {
        dispatch(
            loginAction(
                {
                    email: formValue.email, 
                    password: formValue.password
                }, 
                router.push
            )
        )
    }

    return (
        <div>
            <Loader isOpen={isLoading} />
            <LoginFormComponent onSubmit={onSubmitLoginFormHandler}/>
        </div>
    )
}

export default LoiginFeature