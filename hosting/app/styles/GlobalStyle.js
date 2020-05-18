import { createGlobalStyle } from 'styled-components';
import colors from 'styles/colors';

import 'styles/keyframes.css';
import 'styles/sanitize.css';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #app {
    padding: 0 !important;
    position: relative;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.raisinBlack};
    font-family: 'Google Sans', sans-serif;
  }

  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.375rem;
  }

  * {
    -webkit-tap-highlight-color: ${colors.transparent};
  }

  *::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
`;

export default GlobalStyle;
