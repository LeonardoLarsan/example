import styled from "styled-components"
import timer from "../utils/timer"
import { useEffect, useState } from "react"

const BackDropModalShadow = styled.div<{isOpen: boolean}>`
    margin: 0px;
    padding: 0px;
    display: flex;
    opacity: ${props => props.isOpen ? '1' : '0'};
    justify-content: center;
    align-items: center;
    position: fixed;
    background: rgba(0,0,0,0.3);
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 900;
    transition: opacity .1s ease-in;
`

export const ModalRightWrapper = styled.div<{isOpen: boolean}>`
    margin: 0px;
    position: absolute;
    height: 100vh;
    background: #eee;
    box-shadow: 1px 1px 5px grey;
    transition: right .2s ease-in;
    z-index: 901;

    width: 100%;
    right: ${props=>props.isOpen ? '0%' : '-50%'};

    @media (min-width: 500px) {
        width: 500px;
        right: ${props=>props.isOpen ? '0px' : '-500px'};
    }
`

export const ModalLeftWrapper = styled.div<{isOpen: boolean}>`
    margin: 0px;
    position: absolute;
    width: 100%;
    height: 100vh;
    left: ${props=>props.isOpen ? '0%' : '-50%'};
    background: #eee;
    box-shadow: 1px 1px 5px grey;
    transition: left .2s ease-in;
    z-index: 901;

    @media (min-width: 500px) {
        width: 500px;
        left: ${props=>props.isOpen ? '0px' : '-500px'};
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
    max-height: 90vh;
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

export const SlideComponent = (props: {
    position: 'left' | 'right'
    isOpen: boolean, 
    children: React.ReactNode, 
    onClose: () => void
})=> {

    const [isRendered, setIsRendered] = useState<boolean>(false)
    const [isOpenAnimation, setIsOpenAnimation] = useState<boolean>(false)
 
    useEffect(()=>{
        if(props.isOpen !== isRendered) changeAnimation(props.isOpen)
    }, [props.isOpen])


    const SelectedModal = props.position === 'right' ? ModalRightWrapper : ModalLeftWrapper

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
                <BackDropModalShadow isOpen={isOpenAnimation}>
                    <SelectedModal isOpen={isOpenAnimation}>
                        <ModalHeader>
                            <ModalCloseButton onClick={onClickHandler}></ModalCloseButton> 
                        </ModalHeader>
                        <ModalContent>
                            {props.children}
                        </ModalContent>
                    </SelectedModal>                
                </BackDropModalShadow>
            ) : null}
        </div>       
    )
}

export default SlideComponent