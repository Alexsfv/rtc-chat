import { BREAKPOINTS, COLORS} from '@Assets';
import styled, { css } from 'styled-components';

const switcherHeight = 60;
const switcherHeightSmall = 40;

export const Wrapper = styled.div<{ opened: boolean }>`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 3;

    @media (max-width: ${BREAKPOINTS.M}px) {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        ${openedSidebar}
    }
`

export const Body = styled.div<{ opened: boolean }>`
    display: grid;
    grid-template-rows: calc(100% - ${switcherHeight}px) ${switcherHeight}px;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    overflow: hidden;

    @media (max-width: ${BREAKPOINTS.M}px) {
        position: absolute;
        max-width: 85%;
        top: 0;
        bottom: 0;
        right: 0;
        border-radius: 24px 0 0 24px;
    }

    @media (max-width: ${BREAKPOINTS.XS}px) {
        max-width: 320px;
        grid-template-rows: calc(100% - ${switcherHeightSmall}px) ${switcherHeightSmall}px;
    }
`

export const Background = styled.div`
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: ${COLORS.BLACK};

    @media (max-width: ${BREAKPOINTS.M}px) {
        display: block;
        max-width: 320px;
    }
`

export const CloseSidebar = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`

function openedSidebar(p: { opened: boolean }) {
    if (p.opened) return css`
        display: block;

        ${Background} {
            opacity: .3;
        }

        ${Body} {
            transform: translate(0px, 0px);
        }
    `

    return css`
        display: none;

        ${Background} {
            opacity: 0;
        }

        ${Body} {
            transform: translate(-150%, 0px);
        }
    `
}