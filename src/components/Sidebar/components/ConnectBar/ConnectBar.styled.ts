import { COLORS } from "assets";
import styled from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 20px;
    color: ${COLORS.WHITE};
    background: linear-gradient(0deg, ${COLORS.GREEN_DARK}, ${COLORS.GREEN_BRIGHT});
    border-radius: 24px;
    flex-direction: column;
    justify-content: flex-start;

    .connect-bar-checkbox {
        margin-top: auto;
    }
`

export const LogoWrapper = styled.div`
    display: grid;
    justify-items: flex-end;
    margin: 0 0 60px;
`

export const Text = styled.p`
    font-size: 14px;
    word-break: break-all;
`

export const TextBold = styled(Text)`
    font-weight: bold;
`

export const FirstText = styled(Text)`
    margin-bottom: 20px;
`

export const CodeArea = styled.div`
    display: grid;
    padding: 15px;
    background-color: ${COLORS.WHITE_EXTA_LITE};
    border-radius: 12px;
    align-items: center;
    gap: 15px 10px;
    grid-template-columns: 1fr auto;
    grid-template-areas:
    "text ."
    "bold-text btn";

    ${Text} {
        grid-area: text;
    }

    ${TextBold} {
        grid-area: bold-text;
    }

    button {
        grid-area: btn;
    }
`

export const CallArea = styled.div`
    display: grid;
    margin: 40px 0 0;
    gap: 15px 10px;
    grid-template-columns: 1fr 1fr;

    ${Text}, .connect-bar-input {
        grid-column: 1 / 3;
    }

    .connect-bar-btn-icon {
        display: inline-block;
        margin-right: 10px;
    }
`