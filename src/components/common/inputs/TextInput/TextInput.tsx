import React from 'react'
import { TextInputProps } from "./TextInput.types";
import { Wrapper, Input, Error, Label, Postfix } from './TextInput.styles'

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const {
        error,
        postfix,
        className,
        design = "default",
        ...otherProps
    } = props

    return (
        <Wrapper className={className}>
            <Label>
                <Input
                    design={design}
                    error={error}
                    postfix={Boolean(postfix)}
                    ref={ref}
                    data-testid="input"
                    {...otherProps}
                />
                {
                    postfix &&
                    <Postfix>
                        {postfix}
                    </Postfix>
                }
            </Label>
            <Error error={error} >
                {error}
            </Error>
        </Wrapper>
    )
})