import styled from 'styled-components';

const StyledCanvas = styled.canvas`
  border-radius: 0.25rem;
  left: 0;
  position: absolute;
  top: 0;

  &:hover {
    cursor: ${props => props.disabled ? 'auto': 'crosshair'};
  }
`;

const StyledControls = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  
  & *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const StyledWrapper = styled.div`
  flex: 1;
  margin: 0 1.5rem;
  padding-top: 56.25%;
  position: relative;
`;

export {
  StyledCanvas as Canvas,
  StyledControls as Controls,
  StyledWrapper as Wrapper,
};
