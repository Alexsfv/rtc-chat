import styled from "styled-components";


export const Wrapper = styled.div`
    position: absolute;
    display: grid;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    border-radius: 12px;
    overflow: hidden;
`

export const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: contain;
`