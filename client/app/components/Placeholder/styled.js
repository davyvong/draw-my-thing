import styled from 'styled-components';

import colors from 'styles/colors';

const StyledRectangle = styled.div`
  animation: placeholder 1.5s infinite;
  background-color: ${colors.davysGray};
  border-radius: 0.5rem;
  height: ${({ height }) => height || '4rem'};
  margin: ${({ margin }) => margin || '1rem 0 0 0'};
  width: ${({ width }) => width || '100%'};
`;

const StyledText = styled.div`
  animation: placeholder 1.5s infinite;
  background-color: ${colors.davysGray};
  border-radius: 1rem;
  height: ${({ height }) => height || '1rem'};
  margin: ${({ margin }) => margin || '1rem'};
  width: ${({ width }) => width || '20%'};
`;

export { StyledRectangle as Rectangle, StyledText as Text };
