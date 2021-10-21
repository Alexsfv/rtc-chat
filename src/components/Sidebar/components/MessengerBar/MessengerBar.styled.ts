import { BREAKPOINTS, COLORS } from "assets";
import styled from "styled-components";


export const Wrapper = styled.div`
    position: relative;
    height: 100%;
    padding: 20px 0 20px 20px;
    background-color: ${COLORS.GREEN_SHINE};

    .message-bar-send-btn {
        position: relative;
        top: -1px;
        font-size: 14px;
    }

    @media (max-width: ${BREAKPOINTS.XS}px) {
        padding: 10px 0 10px 10px;
    }
`

export const MessageList = styled.div`
    display: grid;
    height: calc(100% - 50px);
    padding: 0 20px 60px 0;
    align-content: flex-start;
    overflow: auto;

    @media (max-width: ${BREAKPOINTS.XS}px) {
        padding: 0 10px 50px 0;
    }
`

export const Message = styled.div<{ opposite: boolean }>`
    max-width: 90%;
    margin: 15px 0 15px 0;
    padding: 15px;
    color: ${p => p.opposite ? COLORS.BLACK : COLORS.WHITE};
    background: ${p => p.opposite
        ? COLORS.WHITE
        : `linear-gradient(0deg, ${COLORS.GREEN_DARK}, ${COLORS.GREEN_BRIGHT})`
    };
    border-radius: ${p => p.opposite
        ? '6px 6px 6px 0px'
        : '6px 6px 0px 6px'
    };
    margin-left: ${p => p.opposite
        ? '0px'
        : 'auto'
    };
`

export const InputField = styled.div`
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;

    @media (max-width: ${BREAKPOINTS.XS}px) {
        left: 10px;
        right: 10px;
        bottom: 10px;
    }
`