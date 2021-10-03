import React from 'react'
import { CheckboxProps } from "./Checkbox.types";
import { Wrapper, Input, Label, InputWrapper, FakeInput } from './Checkbox.styles'

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const {
        className,
        children,
        checked,
        id,
        ...otherProps
    } = props

    return (
        <Wrapper className={className}>
            <InputWrapper>
                <Input
                    ref={ref}
                    type="checkbox"
                    data-testid="input"
                    id={id}
                    {...otherProps}
                />
                <FakeInput checked={!!checked}>
                    <i className="fa fa-check checkbox-icon" />
                </FakeInput>
            </InputWrapper>

            <Label htmlFor={id}>
                {children}
            </Label>
        </Wrapper>
    )
})