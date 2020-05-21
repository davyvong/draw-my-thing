import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledText = styled.p`
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

const StyledUser = styled.p`
  color: ${props => props.color};
  font-size: 0.875rem;
`;

StyledUser.defaultProps = {
  color: colors.raisinBlack,
};

const StyledWrapper = styled.div`
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  transition: 150ms ease-in-out;

  &:hover {
    background-color: ${hexToRGB(colors.gray, 0.15)};
  }

  &:active {
    background-color: ${hexToRGB(colors.gray, 0.3)};
  }
`;

export {
  StyledText as Text,
  StyledUser as User,
  StyledWrapper as Wrapper,
};
