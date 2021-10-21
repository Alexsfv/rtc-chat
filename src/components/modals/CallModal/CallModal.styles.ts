import { BREAKPOINTS, COLORS } from "assets";
import styled from "styled-components";

type ControlProps = { reject?: boolean }

export const Wrapper = styled.div`
    position: fixed;
    display: grid;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    grid-template-columns: 20px minmax(200px, 500px) 20px;
    z-index: 1000;

`

export const Background = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${COLORS.BLACK_LITE};
`

export const Body = styled.div`
    position: relative;
    display: grid;
    max-height: 90vh;
    width: 100%;
    padding: 40px 30px;
    grid-column: 2 / 3;
    border-radius: 18px;
    overflow-y: auto;

    background-color: ${COLORS.WHITE};

    @media (max-width: ${BREAKPOINTS.S}px) {
        padding: 20px 10px;
    }
`

export const Title = styled.p`
    width: 100%;
    margin: 0 0 40px;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    word-break: break-word;

    @media (max-width: ${BREAKPOINTS.S}px) {
        margin: 0 0 20px;
        font-size: 24px;
    }
`

export const Description = styled.p`
    width: 100%;
    margin: 0 0 40px;
    font-size: 28px;
    text-align: center;
    word-break: break-word;

    @media (max-width: ${BREAKPOINTS.S}px) {
        margin: 20px 0;
        font-size: 20px;
    }
`

export const IconWrapper = styled.div`
    position: relative;
    height: 0;
    width: 70%;
    margin: 0 0 40px;
    padding-bottom: 70%;
    display: grid;
    justify-content: center;
    align-items: center;
    justify-self: center;
    font-size: 140px;
    border-radius: 50%;
    color: ${COLORS.WHITE};
    background: linear-gradient(0deg, ${COLORS.GREEN_DARK}, ${COLORS.GREEN_BRIGHT});

    .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    @media (max-width: ${BREAKPOINTS.S}px) {
        width: 80%;
        padding-bottom: 80%;
        font-size: 25vw;
    }
`

export const ControlsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${BREAKPOINTS.S}px) {
        flex-wrap: wrap;
    }
`

export const Control = styled.button<ControlProps>`
    display: block;
    width: 100%;
    padding: 15px 10px;
    text-align: center;
    border-radius: 8px;
    font-size: 26px;
    color: ${COLORS.WHITE};
    background-color: ${p => p.reject ? COLORS.DANGER : COLORS.GREEN};
    border: none;
    cursor: pointer;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }

    &:not(:last-child) {
        margin-right: 15px;
    }

    .icon {
        font-size: 32px;
        margin-right: 15px;
    }

    @media (max-width: ${BREAKPOINTS.S}px) {
        font-size: 22px;

        &:not(:last-child) {
            margin-right: 0;
            margin-bottom: 15px;
        }

        .icon {
            font-size: 26px;
        }
    }
`