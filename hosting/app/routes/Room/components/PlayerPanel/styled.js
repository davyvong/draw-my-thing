import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledWrapper = styled.div`
  background-color: ${hexToRGB(colors.gray, 0.10)};
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0.5rem;
  min-height: 100vh;
  min-width: 300px;
  max-width: 300px;
`;

export {
  StyledWrapper as Wrapper,
};
