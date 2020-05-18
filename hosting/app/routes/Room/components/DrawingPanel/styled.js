import styled from 'styled-components';
import colors from 'styles/colors';

const StyledCanvas = styled.canvas`
  background-color: ${colors.gainsboro};
`;

const StyledWrapper = styled.div`
  display: block;
`;

export {
  StyledCanvas as Canvas,
  StyledWrapper as Wrapper,
};
