import { css } from "styled-components";

export const globalFonts = () => css`
@font-face {
    font-family: 'Montserrat';
    src: local('Montserrat Hairline'), local('Montserrat-Hairline'), url('montserrathairline.woff2') format('woff2'), url('montserrathairline.woff') format('woff'), url('montserrathairline.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
}
@font-face {
    font-family: 'Montserrat';
    src: local('Montserrat Light'), local('Montserrat-Light'), url('montserratlight.woff2') format('woff2'), url('montserratlight.woff') format('woff'), url('montserratlight.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}
@font-face {
    font-family: 'Montserrat';
    src: local('Montserrat'), local('Montserrat-Regular'), url('montserrat.woff2') format('woff2'), url('montserrat.woff') format('woff'), url('montserrat.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'Montserrat';
    src: local('Montserrat Bold'), local('Montserrat-Bold'), url('montserratbold.woff2') format('woff2'), url('montserratbold.woff') format('woff'), url('montserratbold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
}
@font-face {
    font-family: 'Montserrat';
    src: local('Montserrat Black'), local('Montserrat-Black'), url('montserratblack.woff2') format('woff2'), url('montserratblack.woff') format('woff'), url('montserratblack.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
}
`