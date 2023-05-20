import { useEffect, useState } from "react"
import styled from "styled-components"
import timer from "../utils/timer"

const BackDropLoaderShadow = styled.div<{isOpen: boolean}>`
    display: flex;
    opacity: ${props => props.isOpen ? '1' : '0'};
    justify-content: center;
    align-items: center;
    position: fixed;
    background: rgba(0,0,0,0.3);
    height: 100vh;
    width: 100%;
    margin: 0px;
    top: 0;
    left: 0;
    z-index: 998;
    transition: opacity .2s ease-in;
`

export const LoaderSpinner = styled.div`
    
    border: 16px solid #ccc;
    border-radius: 50%;
    border-top: 16px solid grey;
    width: 60px;
    height: 60px;

    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
    

    /* Safari */
    @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }

`

export const Loader = (props: {isOpen: boolean})=> {

    const [isRendered, setIsRendered] = useState<boolean>(false)
    const [isOpenAnimation, setIsOpenAnimation] = useState<boolean>(false)
 
    useEffect(()=>{
        if(props.isOpen !== isRendered) changeAnimation(props.isOpen)
    }, [props.isOpen])

    const changeAnimation = async (isOpen: boolean) => {
        if(props.isOpen){
            setIsRendered(true)
            await timer(50)
            setIsOpenAnimation(true)
        }else{
            setIsOpenAnimation(false)
            await timer(300)
            setIsRendered(false)
        }
    }

    return (
        <div>
            {isRendered ? (
                <BackDropLoaderShadow isOpen={isOpenAnimation}>
                    <LoaderSpinner/>
                </BackDropLoaderShadow>
            ) : null}
        </div>       
    )
}