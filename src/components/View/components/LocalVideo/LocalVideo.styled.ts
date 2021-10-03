import { BREAKPOINTS, COLORS } from "assets";
import styled from "styled-components";


export const Wrapper = styled.div`
    position: absolute;
    display: grid;
    max-width: 180px;
    max-height: 360px;
    align-items: center;
    justify-content: center;
    left: 20px;
    top: 20px;
    border-radius: 12px;
    border: 2px solid ${COLORS.WHITE};
    overflow: hidden;
    z-index: 2;

    @media (max-width: ${BREAKPOINTS.XS}px) {
        left: 10px;
        top: 10px;
    }
`

export const Video = styled.video`
    display: block;
    width: 100%;
    height: 100%;
`