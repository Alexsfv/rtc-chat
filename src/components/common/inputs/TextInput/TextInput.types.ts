import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    postfix?: JSX.Element
}

export type StyledInputProps = Pick<TextInputProps, 'error'> & {
    postfix: boolean
}