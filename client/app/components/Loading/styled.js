import styled from 'styled-components';
import colors from 'styles/colors';

const StyledBouncer = styled.div`
  animation: bouncedelay ${props => props.duration} infinite ease-in-out both;
  animation-delay: ${props => props.delay};
  background-color: ${props => props.color};
  border-radius: 100%;
  height: ${props => props.size};
  width: ${props => props.size};
  -webkit-animation: bouncedelay ${props => props.duration} infinite ease-in-out both;
  -webkit-animation-delay: ${props => props.delay};

  &:not(:first-child) {
    margin-left: calc(${props => props.size} / 2);
  }
`;

StyledBouncer.defaultProps = {
  color: colors.blue,
  delay: '0s',
  duration: '1.4s',
  size: '0.75rem',
};

const StyledSpinner = styled.div`
  display: flex;
  flex-direction: row;
`;

export { StyledBouncer as Bouncer, StyledSpinner as Spinner }
