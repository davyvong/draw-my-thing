import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledInput = styled.input`
  background-color: ${hexToRGB(colors.gray, 0.05)};
  border: 0;
  border-radius: 0.25rem;
  color: ${colors.raisinBlack};
  font-size: 0.875rem;
  outline: none;
  padding: 0.75rem 1rem;
  transition: 150ms ease-in-out;
  width: 100%;

  &:active {
    background-color: ${hexToRGB(colors.gray, 0.15)};
  }
`;

export default StyledInput;
