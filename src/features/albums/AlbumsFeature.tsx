import { FC } from "react"
import { Album } from "../../models/Album"
import styled from "styled-components"
import Link from "next/link"
import { Title } from "../../styles/shareStyled"

export interface AlbumsFeatureProps {
    preloadedAlbums: Array<Album>
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
`

const Album = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 20px;
    @media (min-width: 800px) {
        width: 50%;
    }
    @media (min-width: 1024px) {
        width: 33.33%;
    }
`

const Logo = styled.div`
    width: 100%;
    height: 235px;
    padding-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Photo = styled.div<{color: string, angle: number}>`
    width: 150px;
    height: 150px;
    border: 5px solid white;
    border-bottom: 30px solid white;
    background: ${props=>props.color};
    transform: rotate(${props=>props.angle}deg);
    position: absolute;
    box-shadow: 1px 1px 5px grey;
    z-index: 0;
`


const Action = styled.span`
    width: 100%;
    text-align: center;
    color: #09f;
`


const AlbumsFeature: FC<AlbumsFeatureProps> = props => {
    return (
        <Wrapper>
            {props.preloadedAlbums.map(album=> (
                <Album key={album.id}>
                    <Logo>
                        <Photo color='red' angle={45}/>
                        <Photo color='pink' angle={30}/>
                        <Photo color='#88c' angle={5}/>
                    </Logo>
                    <Title align="center">{album.title}</Title>
                    <Action><Link href={`/albums/${album.id}`}>See</Link></Action>
                </Album>
            ))}
        </Wrapper>
    )
}

export default AlbumsFeature