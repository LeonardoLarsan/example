import styled from "styled-components"
import timer from "../utils/timer"
import { useEffect, useState } from "react"

const BackDropModalShadow = styled.div<{isOpen: boolean, level: 'high' | 'medium' | 'low'}>`
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
    z-index: ${props=> props.level === 'high' ? '900' : props.level === 'medium' ? '800' : '700'};
    transition: opacity .2s ease-in;
`

export const ModalWrapper = styled.div<{size: 'S' | 'M' | 'L'}>`

    width: 90%;
    background: #eee;
    box-shadow: 1px 1px 5px grey;
    max-height: 90%;

    @media (min-width: 600px){
        width: ${props=>props.size === 'M' ? '70%' : props.size === 'S' ? '35%' : '90%' };
    }

`

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row-reverse;
    padding:0px;
    margin:0px;
`

export const ModalContent = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 80vh;
    width: 100%;
    margin: 0%;
`

export const ModalCloseButton = styled.button`
    background: none;
    border: none;
    padding: 10px;
    font-size: 25px;
    color:#bbb;
    cursor: pointer;
    font-weight: lighter;
    &:before {
        content: "✖";
    }
    
`

export const Modal = (props: {
    size: 'S' | 'M' | 'L', 
    title: string, 
    isOpen: boolean, 
    level: 'high' | 'medium' | 'low',
    children: React.ReactNode, 
    onClose: () => void
})=> {

    const [isRendered, setIsRendered] = useState<boolean>(false)
    const [isOpenAnimation, setIsOpenAnimation] = useState<boolean>(false)
 
    useEffect(()=>{
        if(props.isOpen !== isRendered) changeAnimation(props.isOpen)
    }, [props.isOpen])

    const changeAnimation = async (isOpen: boolean) => {
        if(props.isOpen){
            setIsRendered(true)
            await timer(100)
            setIsOpenAnimation(true)
        }else{
            setIsOpenAnimation(false)
            await timer(600)
            setIsRendered(false)
        }

    }

    const onClickHandler = () => {
        props.onClose()
    }

    return (
        <div>
            {isRendered ? (
                <BackDropModalShadow isOpen={isOpenAnimation} level={props.level}>
                    <ModalWrapper size={props.size}>
                        <ModalHeader>
                            <ModalCloseButton onClick={onClickHandler}></ModalCloseButton> 
                            <h1 style={{color: '#333', marginLeft: '20px', textAlign: 'center',width: '100%', fontSize: '20px'}}>{props.title}</h1>
                        </ModalHeader>
                        <ModalContent>
                            {props.children}
                        </ModalContent>
                    </ModalWrapper>                
                </BackDropModalShadow>
            ) : null}
        </div>       
    )
}