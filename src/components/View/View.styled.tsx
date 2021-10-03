import { COLORS } from 'assets';
import styled from 'styled-components';


export const Wrapper = styled.div`
    position: relative;
    display: grid;
    margin: 10px;
    border-radius: 24px;
    background: linear-gradient(0deg, ${COLORS.GREEN_DARK}, ${COLORS.GREEN_BRIGHT});
    overflow: hidden;
`