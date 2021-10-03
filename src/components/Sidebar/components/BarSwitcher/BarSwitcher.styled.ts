import { BREAKPOINTS, COLORS } from "assets";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export const SwitchButton = styled.button<{ active: boolean }>`
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    background-color: ${COLORS.GREEN_DARK};
    color: ${COLORS.WHITE};
    opacity: 0.5;
    font-size: 24px;
    cursor: pointer;

    filter: ${p => p.active
        ? "brightness(1)"
        : "brightness(0.7)"
    };

    &:first-child {
        border-right: 1px solid ${COLORS.WHITE};
    }

    &:hover {
        filter: brightness(1);
    }

    @media (max-width: ${BREAKPOINTS.M}px) {
        opacity: 1;
    }

    @media (max-width: ${BREAKPOINTS.XS}px) {
        font-size: 18px;
    }
`