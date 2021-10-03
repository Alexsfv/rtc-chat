import { COLORS } from "assets";
import styled from "styled-components";
import { LogoProps } from "./Logo.types";


export const Text = styled.p<LogoProps>`
    margin: 0;
    font-size: 54px;
    font-weight: bold;
    color: transparent;
    background-image: linear-gradient(120deg, ${COLORS.WHITE}, ${COLORS.WHITE_EXTA_LITE});
    -webkit-background-clip: text;

    ${p => p.size === "small" && "font-size: 36px;"}
`