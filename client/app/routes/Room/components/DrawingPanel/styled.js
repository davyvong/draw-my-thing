import styled from 'styled-components';
import colors from 'styles/colors';

const StyledCanvas = styled.canvas`
  background-color: ${colors.gainsboro};
  border-radius: 0.25rem;
`;

const StyledWrapper = styled.div`
  display: block;
`;

export {
  StyledCanvas as Canvas,
  StyledWrapper as Wrapper,
};
