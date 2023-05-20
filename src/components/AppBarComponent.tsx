import { FC, useState } from 'react'
import styled from 'styled-components'
import SlideComponent from './SlideComponent'

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #779;
    box-shadow: 0px 0px 6px grey;
    z-index: 500;
`

const Button = styled.button`
    background: none;
    border: none;
    padding: 5px;
    cursor: pointer;
    font-size: 30px;
    color: white;
`

const List = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0px;
`

const Item = styled.li`
    display: row;
    flex-direction: row;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    &:hover {
        background: #777;
    }
`

interface MenuComponentProps {
    onClose: () => void
    items: Array<{text: string, onClick: () => void}>
}

const MenuComponent: FC<MenuComponentProps> = props => {

    const onClickItemHandler = (itemOnClick: () => void) => {
        props.onClose()
        itemOnClick()
    }

    return (
        <List>
            {props.items.map((item, index)=>(
                <Item key={index} onClick={()=>onClickItemHandler(item.onClick)}>{item.text}</Item>
            ))}
        </List>
    )
}


interface AppBarComponentProps {
    items: Array<{text: string, onClick: () => void}>
}

const AppBarComponent: FC<AppBarComponentProps> = props => {

    const [isOpenSlideMenu, setIsOpenSlideMenu] = useState<boolean>(false)

    const onCloseSlideMenuHandler = () => {
        setIsOpenSlideMenu(false)
    }
    
    const onOpenSlideMenuHandler = () => {
        setIsOpenSlideMenu(true)
    }

    return (
        <>
            <Wrapper>
                <Button onClick={onOpenSlideMenuHandler}>☰</Button>
            </Wrapper>
            <SlideComponent isOpen={isOpenSlideMenu} onClose={onCloseSlideMenuHandler} position='left'>
                <MenuComponent onClose={onCloseSlideMenuHandler} items={props.items}/>
            </SlideComponent>
        </>
    )
}

export default AppBarComponent 