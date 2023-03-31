import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
      @font-face {
        font-display: swap;
        font-family: "Pacifico";
        font-weight: 400;
        src: url("../fonts/pacifico-v22-latin-regular.woff2") format("woff2"),
            url("../fonts/pacifico-v22-latin-regular.woff") format("woff"),
            url("../fonts/pacifico-v22-latin-regular.ttf") format("truetype");
      }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a { 
        text-decoration: none;
        color: grey;
    }
`;

export default GlobalStyle;