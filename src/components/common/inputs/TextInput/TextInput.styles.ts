import { COLORS } from "@Assets";
import { SHADOWS } from "assets/styles/constants";
import { StyledInputProps, TextInputProps } from "components";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    display: block;
    width: 100%;
`

export const Input = styled.input<StyledInputProps>`
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    border: 1px solid ${COLORS.WHITE};
    outline: none;
    padding: 0 15px;
    font-size: 16px;
    box-shadow: ${SHADOWS.PRIMARY};


    &:disabled {
        background-color: ${COLORS.GRAY_LITE};
        color: ${COLORS.GRAY};
        border-color: ${COLORS.GRAY};

        &::placeholder {
            color: ${COLORS.GRAY_EXTA_LITE};
        }
    }

    &::placeholder {
        color: ${COLORS.WHITE_EXTA_LITE};
    }

    ${p => inputError(p)}
    ${p => inputPostfix(p)}
    ${p => design(p)}
`

export const Error = styled.span<Pick<TextInputProps, 'error'>>`
    display: ${p => p.error ? 'block' : 'none'};
    max-width: 100%;
    font-size: 12px;
    color: ${COLORS.DANGER};
`

export const Label = styled.label`
    position: relative;
    display: block;
    height: 40px;
`

export const Postfix = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    bottom: 5px;
    overflow: hidden;
`

// mixins
const inputError = (props: StyledInputProps) => {
    if (props.error) return css`
        border-color:  ${COLORS.DANGER};
    `
}

const inputPostfix = (props: StyledInputProps) => {
    if (props.postfix) return css`
        padding-right: 40px;
    `
}

const design = (props: StyledInputProps) => {
    if (props.design === 'opacity') return css`
        background-color: ${COLORS.WHITE_LITE};
        color: ${COLORS.WHITE};
    `
    if (props.design === 'default') return css`
        background-color: ${COLORS.WHITE};
        color: ${COLORS.BLACK};
    `
}