import { BREAKPOINTS, COLORS } from "assets";
import styled from "styled-components";


export const Wrapper = styled.div`
    display: grid;
    position: absolute;
    align-items: center;
    justify-content: center;
    grid-auto-flow: column;
    gap: 30px;
    padding: 20px;
    right: 20px;
    top: 20px;

    border-radius: 8px;
    background-color: ${COLORS.BLACK_LITE};
    z-index: 2;

    @media (max-width: ${BREAKPOINTS.M}px) {
        top: 80px;
    }

    @media (max-width: ${BREAKPOINTS.XS}px) {
        padding: 10px 15px;
        gap: 30px;
        right: 10px;
        top: 70px;
    }
`

export const Control = styled.div`
    display: grid;
    border: none;
    align-items: center;
    justify-content: center;
    color: ${COLORS.WHITE};
    font-size: 18px;
    cursor: pointer;

    @media (max-width: ${BREAKPOINTS.XS}px) {
        font-size: 14px;
    }
`