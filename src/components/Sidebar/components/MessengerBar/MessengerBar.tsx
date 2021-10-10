import { MessengerBarProps } from "./MessengerBar.types"
import { InputField, Message, MessageList, Wrapper, } from './MessengerBar.styled'
import { Button, TextInput } from "components"

const messages = [
    {
        text: 'Hello',
        isOpposite: true,
    },
    {
        text: 'Whats up?',
        isOpposite: true,
    },
    {
        text: 'Hello',
        isOpposite: false,
    },
    {
        text: 'Im fine. And you?',
        isOpposite: false,
    },

]

export const MessengerBar: React.FC<MessengerBarProps> = () => {

    return (
        <Wrapper>
            <MessageList>
                {
                    [...messages, ...messages, ...messages, ...messages].map(m => (
                        <Message
                            key={Math.random()}
                            opposite={m.isOpposite}
                        >
                            {m.text}
                        </Message>
                    ))
                }
            </MessageList>
            <InputField>
                <TextInput
                    design="default"
                    postfix={
                        <Button
                            textColor="gold"
                            className="message-bar-send-btn"
                        >
                            <i className="fa fa-paper-plane-o" />
                        </Button>
                    }
                />

            </InputField>
        </Wrapper>
    )
}