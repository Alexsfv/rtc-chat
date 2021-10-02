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
    height: 40px;
    border-radius: 12px;
    border: 1px solid ${COLORS.WHITE};
    outline: none;
    background-color: ${COLORS.WHITE_LITE};
    padding: 0 15px;
    font-size: 16px;
    color: ${COLORS.WHITE};
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
`

export const Error = styled.span<Pick<TextInputProps, 'error'>>`
    display: ${p => p.error ? 'block' : 'none'};
    max-width: 100%;
    font-size: 12px;
    color: ${COLORS.DANGER};
`

export const Label = styled.label`
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