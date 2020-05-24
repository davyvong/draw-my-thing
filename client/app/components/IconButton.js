import styled from 'styled-components';

import colors from 'styles/colors';

import hexToRGB from 'utils/hexToRGB';

const IconButton = styled.button`
  align-items: center;
  border-radius: 50%;
  color: ${({ color }) => color || colors.gray};
  display: flex;
  height: 2.5rem;
  justify-content: center;
  padding: 0;
  transition: 150ms ease-in-out;
  min-width: 2.5rem;
  width: 2.5rem;

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    background-color: ${({ color }) => hexToRGB(color || colors.gray, 0.05)};
  }

  &:active {
    background-color: ${({ color }) => hexToRGB(color || colors.gray, 0.15)};
  }
`;

export default IconButton;
