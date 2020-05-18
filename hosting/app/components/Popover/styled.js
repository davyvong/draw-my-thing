import styled from 'styled-components';

import colors from 'styles/colors';

import hexToRGB from 'utils/hexToRGB';

const StyledPopup = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gainsboro};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 1px ${hexToRGB(colors.gray, 0.15)};
  z-index: 5;

  user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`;

export { StyledPopup as Popup };
