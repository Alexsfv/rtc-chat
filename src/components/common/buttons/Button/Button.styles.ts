import { COLORS } from "@Assets";
import styled, { css } from "styled-components";
import { ButtonProps } from './Button.types'

export const StyledButton = styled.button<ButtonProps>`
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    padding: 8px 10px;
    font-size: 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: filter .2s ease;

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

    ${whiteDesign}
    ${goldDesign}
`

// mixins

function goldDesign(p: ButtonProps) {
    if (p.design !== 'gold') return false

    return css`
        color: ${COLORS.WHITE};
        background: linear-gradient(90deg, ${COLORS.GOLD}, ${COLORS.GOLD_BRIGHT});
    `
}

function whiteDesign(p: ButtonProps) {
    if (p.design !== 'white') return false

    return css`
        color: ${p.textColor === 'gold' ? COLORS.GOLD : COLORS.GREEN};
        background: ${COLORS.WHITE};
    `
}
