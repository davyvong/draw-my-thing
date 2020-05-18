import styled from 'styled-components';

import colors from 'styles/colors';

import hexToRGB from 'utils/hexToRGB';

const StyledBackdrop = styled.div`
  align-items: center;
  background-color: ${hexToRGB(colors.black, 0.5)};
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 7;
`;

const StyledButton = styled.button`
  border-radius: 0.25rem;
  color: ${({ color }) => color || colors.blue};
  font-family: 'Google Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  transition: 150ms ease-in-out;
  white-space: nowrap;

  &:not(:first-child) {
    margin-left: 1rem;
  }

  &:hover {
    background-color: ${({ color }) => hexToRGB(color || colors.blue, 0.05)};
  }

  &:active {
    background-color: ${({ color }) => hexToRGB(color || colors.blue, 0.15)};
  }
`;

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledMessage = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  padding: 0 0.75rem;
`;

const StyledTitle = styled.div`
  color: ${colors.raisinBlack};
  font-family: 'Google Sans', sans-serif;
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem 0 0.75rem;
  white-space: nowrap;
`;

const StyledWrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 1px ${hexToRGB(colors.gray, 0.15)};
  min-width: 400px;
  padding: 0.5rem;
  position: relative;
  top: -10%;
`;

export {
  StyledBackdrop as Backdrop,
  StyledButton as Button,
  StyledFooter as Footer,
  StyledMessage as Message,
  StyledTitle as Title,
  StyledWrapper as Wrapper,
};
