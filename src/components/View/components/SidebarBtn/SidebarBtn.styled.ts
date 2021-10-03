import { BREAKPOINTS } from "assets";
import styled from "styled-components";


export const Wrapper = styled.div`
    position: absolute;
    display: none;
    align-items: center;
    justify-content: center;
    right: 20px;
    top: 20px;
    z-index: 2;

    @media (max-width: ${BREAKPOINTS.M}px) {
        display: grid;
    }

    @media (max-width: ${BREAKPOINTS.XS}px) {
        right: 10px;
        top: 10px;
    }
`