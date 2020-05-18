import styled from 'styled-components';

import colors from 'styles/colors';

import hexToRGB from 'utils/hexToRGB';

const Button = styled.button`
  background-color: ${colors.blue};
  border-radius: 0.25rem;
  color: ${colors.white};
  display: inline-block;
  font-family: 'Google Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 3.375rem;
  padding: 0.625rem 1.5rem;
  text-align: center;
  text-decoration: none;
  transition: 150ms ease-in-out;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    box-shadow: 0 1px 3px 1px ${hexToRGB(colors.gray, 0.15)};
  }

  &:active {
    opacity: 0.85;
  }
`;

export default Button;
