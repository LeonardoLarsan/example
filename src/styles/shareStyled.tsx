import styled from "styled-components";

type Status = 'primary'|'default'|'danger'

type Align = 'left'|'center'|'right'


export const Page = styled.div`

    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 50px;
`

export const Button = styled.button<{status: Status}>`

    background:${props=>props.theme.button.bgColor[props.status]};
    color: ${props=>props.theme.button.fontColor[props.status]};
    padding: ${props=>props.theme.button.padding};
    font-size: ${props=>props.theme.button.fontSize};

    display: inline;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 1px 1px 3px grey;
    margin: 5px;

    opacity: ${props=>props.disabled ? 0.3 : 1};
`

export const Action = styled.button<{status: Status}>`

    background: none;
    color: ${props=>props.theme.button.bgColor[props.status]};
    padding: ${props=>props.theme.button.padding};
    font-size: ${props=>props.theme.button.fontSize};

    display: inline;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin: 5px;

    opacity: ${props=>props.disabled ? 0.3 : 1};
`


export const BigTitle = styled.h1<{align: Align}>`
    margin: 5px;
    text-align: ${props=>props.align};
    font-size: ${props=>props.theme.bigTitle.fontSize};
    color: ${props=>props.theme.bigTitle.fontColor};
`

export const Title = styled.h1<{align: Align}>`
    margin: 5px;
    text-align: ${props=>props.align};
    font-size: ${props=>props.theme.title.fontSize};
    color: ${props=>props.theme.title.fontColor};
`

export const SubTitle = styled.h2<{align: Align}>`
    margin: 5px;
    text-align: ${props=>props.align};
    font-size: ${props=>props.theme.text.fontSize};
    color: ${props=>props.theme.subTitle.fontColor};
`

export const Text = styled.p<{align: Align}>`
    margin: 5px;
    text-align: ${props=>props.align};
    font-size: ${props=>props.theme.text.fontSize};
    color: ${props=>props.theme.text.fontColor};
`


export const Submit = styled.input<{status: Status}>`

    background:${props=>props.theme.button.bgColor[props.status]};
    color: ${props=>props.theme.button.fontColor[props.status]};
    padding: ${props=>props.theme.button.padding};
    font-size: ${props=>props.theme.button.fontSize};

    width: auto;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    opacity: ${props=>props.disabled ? 0.3 : 1};
`


export const FullSubmit = styled.input<{status: Status}>`

    background:${props=>props.theme.button.bgColor[props.status]};
    color: ${props=>props.theme.button.fontColor[props.status]};
    padding: 10px;
    font-size: ${props=>props.theme.button.fontSize};
    width: 100%;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    opacity: ${props=>props.disabled ? 0.3 : 1};
`