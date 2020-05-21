import styled from 'styled-components';
import colors from 'styles/colors';
import hexToLuma from 'utils/hexToLuma';
import hexToRGB from 'utils/hexToRGB';

const StyledAvatar = styled.div`
  align-items: center;
  background-color: ${props => props.color};
  border-radius: 1.5rem;
  color: ${props => hexToLuma(props.color) > 200 ? colors.gray : colors.white};
  display: flex;
  height: 2.25rem;
  justify-content: center;
  margin-right: 0.5rem;
  width: 2.25rem;

  & i {
    font-size: 1.5rem;
  }
`;

StyledAvatar.defaultProps = {
  color: colors.gray,
};

const StyledName = styled.div``;

const StyledPoints = styled.div`
  font-size: 0.875rem;
`;

const StyledWrapper = styled.div`
  align-items: center;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  transition: 150ms ease-in-out;

  &:hover {
    background-color: ${hexToRGB(colors.gray, 0.15)};
  }

  &:active {
    background-color: ${hexToRGB(colors.gray, 0.3)};
  }
`;

export {
  StyledAvatar as Avatar,
  StyledName as Name,
  StyledPoints as Points,
  StyledWrapper as Wrapper,
};
