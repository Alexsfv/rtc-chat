import { BREAKPOINTS, COLORS } from 'assets';
import styled from 'styled-components';


export const Wrapper = styled.div`
    position: relative;
    display: grid;
    margin: 0 10px 0 0;
    border-radius: 24px;
    background: linear-gradient(0deg, ${COLORS.GREEN_DARK}, ${COLORS.GREEN_BRIGHT});
    overflow: hidden;

    @media (max-width: ${BREAKPOINTS.M}px) {
        border-radius: 0;
        margin: 0;
    }
`