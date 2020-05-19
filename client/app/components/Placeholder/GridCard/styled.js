import styled from 'styled-components';

import colors from 'styles/colors';

import hexToRGB from 'utils/hexToRGB';

const StyledWrapper = styled.div`
  align-items: center;
  border-top: 0.25rem solid ${props => hexToRGB(props.color, 0.75)};
  color: ${colors.gray};
  padding: 1.5rem;
  position: relative;
  transition: 150ms ease-in-out;

  -ms-grid-row: ${props => 1 + Math.floor(props.index / 3)};

  &:nth-child(3n) {
    -ms-grid-column: 5;
  }

  &:nth-child(3n + 1) {
    -ms-grid-column: 1;
  }

  &:nth-child(3n + 2) {
    -ms-grid-column: 3;
  }
`;

export { StyledWrapper as Wrapper };
