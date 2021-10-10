import { Wrapper, Body, Title, IconWrapper, Description, Control, ControlsWrapper, Background } from "./CallModal.styles";
import { CallModalProps } from ".";
import { useEffect } from "react";


export const CallModal: React.FC<CallModalProps> = (props) => {
    const {
        title,
        description,
        onAccept,
        onReject,
        onClose,
    } = props

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

    return (
        <Wrapper>
            <Background onClick={onClose} />
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
                        <Control onClick={onAccept}>
                            <i className="fa fa-phone icon" />
                            Accept
                        </Control>
                    )}
                    {onReject && (
                        <Control
                            reject={true}
                            onClick={onReject}
                        >
                            <i className="fa fa-times icon" />
                            Reject
                        </Control>
                    )}
                </ControlsWrapper>
            </Body>
        </Wrapper>
    )
}
