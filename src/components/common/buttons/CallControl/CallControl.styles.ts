import { BREAKPOINTS, COLORS } from "@Assets";
import styled, { css } from "styled-components";
import { CallControlProps } from './CallControl.types'

export const StyledButton = styled.button<CallControlProps>`
    display: grid;
    padding: 8px 10px;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: filter .2s ease;
    color: ${COLORS.WHITE};
    background-color: ${p => p.color === "red" ? COLORS.DANGER : COLORS.BLACK_LITE};

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }

    &:disabled {
        cursor: default;
        filter: brightness(0.5);
    }

    ${p => p.size === 'small' && smallSize(p)}
    ${p => p.size === 'large' && largeSize(p)}
`

// mixins

function largeSize(p: CallControlProps) {
    return css`
        width: 75px;
        height: 75px;
        font-size: 26px;
        border-radius: 25px;

        @media (max-width: ${BREAKPOINTS.XS}px) {
            width: 60px;
            height: 60px;
            font-size: 20px;
            border-radius: 20px;
        }
    `
}

function smallSize(p: CallControlProps) {
    return css`
        width: 50px;
        height: 50px;
        border-radius: 50%;

        @media (max-width: ${BREAKPOINTS.XS}px) {
            width: 40px;
            height: 40px;
        }
    `
}
