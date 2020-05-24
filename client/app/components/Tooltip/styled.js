import styled from 'styled-components';

import colors from 'styles/colors';

import hexToRGB from 'utils/hexToRGB';

const StyledPopup = styled.div`
  background-color: ${hexToRGB(colors.black, 0.5, { useAlpha: false })};
  border-radius: 0.25rem;
  color: ${colors.white};
  font-family: 'Google Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  z-index: 6;

  user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`;

export { StyledPopup as Popup };
