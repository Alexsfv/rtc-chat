import { COLORS } from "@Assets";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 30px 1fr;
    gap: 15px;
    align-items: center;
`

export const InputWrapper = styled.label`
    position: relative;
    display: inline-block;
`

export const Input = styled.input`
    width: 1px;
    height: 1px;
    opacity: 0.01;
    position: absolute;
    z-index: -1000;
`

export const FakeInput = styled.div<{checked: boolean}>`
    display: grid;
    width: 30px;
    height: 30px;
    background-color: ${COLORS.WHITE_EXTA_LITE};
    border: 1px solid ${COLORS.WHITE};
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    .checkbox-icon {
        opacity: ${p => p.checked ? 1 : 0};
    }
`

export const Label = styled.label`

`
