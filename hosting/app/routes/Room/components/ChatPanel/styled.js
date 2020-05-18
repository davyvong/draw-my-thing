import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledLog = styled.div`
  height: 100%;
  overflow: auto;
  padding-top: 0.5rem;
`;

const StyledInput = styled.input`
  background-color: ${colors.white};
  border: 0;
  border-radius: 0.5rem;
  flex: 1;
  font-size: 0.875rem;
  margin: 0.5rem;
  outline: none;
  padding: 0.75rem 1rem;
`;

const StyledWrapper = styled.div`
  background-color: ${hexToRGB(colors.gray, 0.10)};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 300px;
  max-width: 300px;
`;

export {
  StyledInput as Input,
  StyledLog as Log,
  StyledWrapper as Wrapper,
};
