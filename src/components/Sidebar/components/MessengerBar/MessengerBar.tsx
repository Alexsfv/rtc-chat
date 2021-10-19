import { MessengerBarProps } from "./MessengerBar.types"
import { InputField, Message, MessageList, Wrapper, } from './MessengerBar.styled'
import { Button, TextInput } from "components"
import { useState } from 'react'
import { rtcService } from 'services'
import { rootState } from 'store'
import { observer } from 'mobx-react-lite'

export const MessengerBar: React.FC<MessengerBarProps> = observer(() => {

    const messages = rootState.ui.messages
    const isConnected = rootState.call.isConnected

    const [message, setMessage] = useState<string>('')

    const handleSend = () => {
        if (!message || !isConnected) return null;
        rtcService.sendMessage(message)
        rootState.ui.addMessage({
            text: message,
            isOpposite: false,
        })
        setMessage('')
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend()
    }

    return (
        <Wrapper>
            <MessageList>
                {
                    messages.map(m => (
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
                    value={message}
                    design="default"
                    postfix={
                        <Button
                            textColor="gold"
                            className="message-bar-send-btn"
                            onClick={handleSend}
                        >
                            <i className="fa fa-paper-plane-o" />
                        </Button>
                    }
                    onKeyDown={handleKey}
                    onChange={e => setMessage(e.target.value)}
                />
            </InputField>
        </Wrapper>
    )
})