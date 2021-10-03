import { Checkbox } from './index'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const Postfix = (
    <button data-testid="postfix">
        Send
    </button>
)

describe("Checkbox Component", () => {
    test("should render", () => {
        render(<Checkbox />)
        expect(screen.getByTestId('input')).toBeInTheDocument()
    })

    test("should execute OnChange", () => {
        const changeHandler = jest.fn()
        const inputText = 'Some input text'

        render(<Checkbox onChange={changeHandler}/>)
        const input = screen.getByTestId('input')
        userEvent.type(input, inputText)

        expect(changeHandler).toHaveBeenCalledTimes(inputText.length)
    })

    test("should allow input", () => {
        const inputText = 'Some input text'

        render(<Checkbox/>)
        const input = screen.getByTestId('input')
        userEvent.type(input, inputText)

        expect(input).toHaveValue(inputText)
    })

    test("should display error", () => {
        const errorText = 'Somthing went wrong!'
        render(<Checkbox error={errorText}/>)
        expect(screen.getByText(errorText)).toBeInTheDocument()
    })

    test("should display Postfix", () => {
        render(<Checkbox postfix={Postfix}/>)
        expect(screen.getByTestId("postfix")).toBeInTheDocument()
    })

    test("should disable", () => {
        render(<Checkbox disabled/>)
        const input = screen.getByTestId('input')
        userEvent.type(input, 'smtg')
        expect(input).toHaveValue("")
    })
})