import { BREAKPOINTS } from "assets";
import styled from "styled-components";


export const Wrapper = styled.div`
    position: relative;
    display: grid;
    width: 100%;
    margin: auto 0 20px;
    align-items: center;
    justify-content: center;
    grid-auto-flow: column;
    gap: 20px;

    @media (max-width: ${BREAKPOINTS.XS}px) {
        gap: 10px;

        .icon {
            font-size: 14px;
        }

        .icon-large {
            font-size: 22px;
        }
    }
`