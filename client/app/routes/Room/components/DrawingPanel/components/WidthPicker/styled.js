import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledButton = styled.div`
  align-items: center;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  transition: 150ms ease-in-out;

  &:hover {
    background-color: ${hexToRGB(colors.gray, 0.15)};
  }

  &:active {
    background-color: ${hexToRGB(colors.gray, 0.3)};
  }
`;

const StyledLine = styled.div`
  background-color: black;
  border-radius: ${props => props.size / 2}px;
  height: ${props => props.size}px;
  width: 100%;
`;

const StyledOption = styled.div`
  align-items: center;
  border-radius: 0.25rem;
  display: flex;
  height: 2rem;
  justify-content: center;
  padding: 0 1rem;
  transition: 150ms ease-in-out;
  width: 7rem;

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
  border-radius: 1.5rem;
  display: flex;
  height: 2.25rem;
  justify-content: center;
  margin-right: 0.5rem;
  padding: 0.25rem;
  width: 2.25rem;
`;

export {
  StyledButton as Button,
  StyledLine as Line,
  StyledOption as Option,
  StyledPicker as Picker,
  StyledPreview as Preview,
};
