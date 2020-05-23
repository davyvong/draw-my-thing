import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledSystem = styled.div`
  align-items: center;
  display: flex;
  flex-direction:row;
  font-size: 0.875rem;

  & i {
    margin-right: 1rem;
  }
  
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const StyledText = styled.p`
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

const StyledTimestamp = styled.div`
  font-size: 0.75rem;
  position: absolute;
  right: 1rem;
  top: 0.672rem;
`;

const StyledUser = styled.p`
  color: ${props => props.color};
  font-size: 0.875rem;
`;

StyledUser.defaultProps = {
  color: colors.raisinBlack,
};

const StyledWrapper = styled.div`
  background-color: ${hexToRGB(colors.gray, 0.05)};
  border-radius: 0.25rem;
  padding: 0.672rem 1rem 0.5rem 1rem;
  position: relative;
  transition: 150ms ease-in-out;

  &:hover {
    background-color: ${hexToRGB(colors.gray, 0.15)};
  }

  &:active {
    background-color: ${hexToRGB(colors.gray, 0.3)};
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export {
  StyledSystem as System,
  StyledText as Text,
  StyledTimestamp as Timestamp,
  StyledUser as User,
  StyledWrapper as Wrapper,
};
