import { BREAKPOINTS } from 'assets/styles/constants';
import styled from 'styled-components';


export const Layout = styled.div`
    display: grid;
	height: 100vh;
    width: 100%;
    padding: 10px;
    grid-template-columns: 1fr 480px;
    grid-template-rows: calc(100vh - 20px);

    @media (max-width: ${BREAKPOINTS.XXL}px) {
        grid-template-columns: 1fr 420px;
    }

    @media (max-width: ${BREAKPOINTS.L}px) {
        grid-template-columns: 1fr 320px;
    }

    @media (max-width: ${BREAKPOINTS.M}px) {
        // Position fixed
        padding: 0px;
        grid-template-columns: 1fr;
        grid-template-rows: 100vh;
    }
`

export const Container = styled.div`
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: ${BREAKPOINTS.XXL}px) {
        max-width: 100%;
    }
`