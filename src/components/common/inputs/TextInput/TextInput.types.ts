import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    design?: "default" | "opacity"
    postfix?: JSX.Element
    className?: string
}

export type StyledInputProps =
    Pick<TextInputProps, 'error'> &
    Pick<TextInputProps, 'design'> &
    {
        postfix: boolean
    }