import { ConnectBarProps } from "./ConnectBar.types"
import { LogoWrapper, Wrapper, Text, TextBold, CodeArea, FirstText, CallArea } from './ConnectBar.styled'
import { Button, Checkbox, Logo, TextInput } from "components"
import { useState } from "react"
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'
import { CallType, CreateOfferData, rtcService } from 'services'

export const ConnectBar: React.FC<ConnectBarProps> = observer(() => {

    const personalCode = rootState.media.personalCode
    const isConnected = rootState.call.isConnected
    const ui = rootState.ui

    const [allowRandom, setAllowRandom] = useState(false)
    const [connectCode, setConnectCode] = useState('')

    const handleCopyCode = () => {
        window.navigator.clipboard.writeText(personalCode)
    }

    const handleCall = (callType: CreateOfferData['callType']) => () => {
        if (!connectCode) return null;
        const data: CreateOfferData = {
            calleeId: connectCode,
            callType,
        }
        rtcService.createOffer(data)
    }

    const handleRandomCall = (callType: CallType) => () => {
        rtcService.createRandomOffer(callType)
    }

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
                <TextBold>{personalCode}</TextBold>
                <Button
                    textColor="gold"
                    onClick={handleCopyCode}
                >
                    <i className="fa fa-clone" />
                </Button>
            </CodeArea>

            <CallArea>
                <Text>Personal code</Text>
                <TextInput
                    className="connect-bar-input"
                    design="opacity"
                    value={connectCode}
                    disabled={isConnected}
                    onChange={e => setConnectCode(e.target.value)}
                />
                <Button
                    className="connect-bar-btn"
                    disabled={isConnected}
                    onClick={handleCall('CHAT_PERSONAL')}
                >
                    <i className="fa fa-comment-o connect-bar-btn-icon" />
                    Chat
                </Button>
                <Button
                    textColor="gold"
                    disabled={isConnected}
                    onClick={handleCall('VIDEO_PERSONAL')}
                >
                    <i className="fa fa-video-camera connect-bar-btn-icon" />
                    Video
                </Button>
            </CallArea>

            <CallArea>
                <Text>Random person</Text>
                <Button
                    className="connect-bar-btn"
                    disabled={isConnected}
                    onClick={handleRandomCall('CHAT_RANDOM')}
                >
                    <i className="fa fa-comment-o connect-bar-btn-icon" />
                    Chat
                </Button>
                <Button
                    textColor="gold"
                    disabled={isConnected}
                    onClick={handleRandomCall('VIDEO_RANDOM')}
                >
                    <i className="fa fa-video-camera connect-bar-btn-icon" />
                    Video
                </Button>
            </CallArea>

            <Checkbox
                id="allow-random-checkbox"
                className="connect-bar-checkbox"
                checked={ui.allowRandomConnect}
                disabled={isConnected}
                onChange={() => ui.setAllowRandomConnect(!ui.allowRandomConnect)}
            >
                <Text>Allow connection from random</Text>
            </Checkbox>
        </Wrapper>
    )
})