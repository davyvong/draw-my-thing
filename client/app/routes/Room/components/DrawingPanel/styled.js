import styled from 'styled-components';

const StyledCanvas = styled.canvas`
  border-radius: 0.25rem;

  &:hover {
    cursor: ${props => props.disabled ? 'auto': 'crosshair'};
  }
`;

const StyledWrapper = styled.div`
  flex: 1;
`;

export {
  StyledCanvas as Canvas,
  StyledWrapper as Wrapper,
};
