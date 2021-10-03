import { ConnectBarProps } from "./ConnectBar.types"
import { LogoWrapper, Wrapper, Text, TextBold, CodeArea, FirstText, CallArea } from './ConnectBar.styled'
import { Button, Checkbox, Logo, TextInput } from "components"
import { useState } from "react"

export const ConnectBar: React.FC<ConnectBarProps> = () => {

    const [allowRandom, setAllowRandom] = useState(false)

    return (
        <Wrapper>
            <LogoWrapper>
                <Logo size="small" />
            </LogoWrapper>

            <FirstText>
                Talk with other user by passing his personal code or talk with random person!
            </FirstText>

            <CodeArea>
                <Text>Your personal code</Text>
                <TextBold>SD!@#SSD2314fsasd3*S*SJD081324</TextBold>
                <Button textColor="gold">
                    <i className="fa fa-clone" />
                </Button>
            </CodeArea>

            <CallArea>
                <Text>Personal code</Text>
                <TextInput className="connect-bar-input" />
                <Button className="connect-bar-btn">
                    <i className="fa fa-comment-o connect-bar-btn-icon" />
                    Chat
                </Button>
                <Button
                    textColor="gold"
                >
                    <i className="fa fa-video-camera connect-bar-btn-icon" />
                    Video
                </Button>
            </CallArea>

            <CallArea>
                <Text>Random person</Text>
                <Button className="connect-bar-btn">
                    <i className="fa fa-comment-o connect-bar-btn-icon" />
                    Chat
                </Button>
                <Button
                    textColor="gold"
                >
                    <i className="fa fa-video-camera connect-bar-btn-icon" />
                    Video
                </Button>
            </CallArea>

            <Checkbox
                id="allow-random-checkbox"
                className="connect-bar-checkbox"
                checked={allowRandom}
                onChange={(e) => setAllowRandom(!allowRandom)}
            >
                <Text>Allow connection from random</Text>
            </Checkbox>

        </Wrapper>
    )
}