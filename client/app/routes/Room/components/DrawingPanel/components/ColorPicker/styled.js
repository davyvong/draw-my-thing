import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledButton = styled.button`
  align-items: center;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  outline: none;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  transition: 150ms ease-in-out;

  &:hover {
    background-color: ${hexToRGB(colors.gray, 0.15)};
  }

  &:active {
    background-color: ${hexToRGB(colors.gray, 0.3)};
  }
`;

const StyledPicker = styled.div`
  padding: 1rem;
`;

const StyledPreview = styled.div`
  align-items: center;
  background-color: ${props => props.color};
  border-radius: 1.5rem;
  display: flex;
  height: 2.25rem;
  justify-content: center;
  margin-right: 0.5rem;
  width: 2.25rem;
`;

export {
  StyledButton as Button,
  StyledPicker as Picker,
  StyledPreview as Preview,
};
