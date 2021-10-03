import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@Components'

describe("Button Component", () => {
    test("Should render", () => {
        const text = 'Click'
        render(<Button>{text}</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
        expect(screen.getByRole('button')).toHaveTextContent(text)
    })

    test("Should trigger onClick", () => {
        const handleClick = jest.fn()

        render(
            <Button onClick={handleClick}>
                Click
            </Button>
        )
        const btn = screen.getByRole('button')
        userEvent.click(btn)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})