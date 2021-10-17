import { Wrapper, Body, Title, IconWrapper, Description, Control, ControlsWrapper, Background } from "./CallModal.styles";
import { useEffect } from "react";
import { observer } from "mobx-react-lite"
import { rootState } from 'store';


export const CallModal: React.FC<{}> = observer(() => {
    const {
        isShow,
        title,
        description,
        onClose,
        onAccept,
        onReject,
        setShow,
    } = rootState.callModal

    const handleAccept = () => {
        if (onAccept) onAccept()
        setShow(false)
    }

    const handleReject = () => {
        if (onReject) onReject()
        setShow(false)
    }

    const handleBackgroundClick = () => {
        if (onClose) onClose()
        setShow(false)
    }

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return null;
            if (onClose) onClose()
        }
        document.addEventListener('keydown', keyHandler)

        return () => {
            document.removeEventListener('keydown', keyHandler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isShow) return null

    return (
        <Wrapper>
            <Background onClick={handleBackgroundClick} />
            <Body>
                <Title>{title}</Title>
                <IconWrapper>
                    <i className="fa fa-user-circle-o icon" />
                </IconWrapper>

                {description && (
                    <Description>{description}</Description>
                )}

                <ControlsWrapper>
                    {onAccept && (
                        <Control onClick={handleAccept}>
                            <i className="fa fa-phone icon" />
                            Accept
                        </Control>
                    )}
                    {onReject && (
                        <Control
                            reject={true}
                            onClick={handleReject}
                        >
                            <i className="fa fa-times icon" />
                            Reject
                        </Control>
                    )}
                </ControlsWrapper>
            </Body>
        </Wrapper>
    )
})
