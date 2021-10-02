import React from 'react'
import { StyledButton } from './Button.styles'
import { ButtonProps } from './Button.types'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        design = "white",
        textColor = "green",
        children,
        ...otherProps
    } = props

    return (
        <StyledButton
            design={design}
            textColor={textColor}
            ref={ref}
            {...otherProps}
        >
            {children}
        </StyledButton>
    )
})