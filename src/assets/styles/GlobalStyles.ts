import { globalFonts } from "assets/fonts/fonts";
import { createGlobalStyle } from "styled-components";
import { resetStyles } from "./reset";

export const GlobalStyles = createGlobalStyle`
body {
	font-family: "Montserrat", sans-serif, Helvetica;
}

* {
	box-sizing: border-box;
}

${globalFonts()}
${resetStyles()}
`