import React from 'react'
import { TextInputProps } from "./TextInput.types";
import { Wrapper, Input, Error, Label } from './TextInput.styles'

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const {
        error,
        postfix,
        ...otherProps
    } = props

    return (
        <Wrapper>
            <Label>
                <Input
                    error={error}
                    postfix={Boolean(postfix)}
                    ref={ref}
                    data-testid="input"
                    {...otherProps}
                />
                {postfix}
            </Label>
            <Error error={error} >
                {error}
            </Error>
        </Wrapper>
    )
})