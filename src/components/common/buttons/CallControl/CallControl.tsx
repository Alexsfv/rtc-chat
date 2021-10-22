import React from 'react'
import { StyledButton } from './CallControl.styles'
import { CallControlProps } from './CallControl.types'

export const CallControl = React.forwardRef<HTMLButtonElement, CallControlProps>((props, ref) => {
    const {
        size = "small",
        color = "default",
        fontColor,
        children,
        ...otherProps
    } = props

    return (
        <StyledButton
            size={size}
            color={color}
            fontColor={fontColor}
            ref={ref}
            {...otherProps}
        >
            {children}
        </StyledButton>
    )
})