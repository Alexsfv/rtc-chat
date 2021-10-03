import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    postfix?: JSX.Element
    className?: string
}

export type StyledInputProps = Pick<TextInputProps, 'error'> & {
    postfix: boolean
}