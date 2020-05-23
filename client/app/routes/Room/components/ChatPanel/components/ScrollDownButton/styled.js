import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledWrapper = styled.div`
  align-items: center;
  background-color: ${colors.white};
  bottom: 6rem;
  border-radius: 100%;
  box-shadow: 0 1px 3px 1px ${hexToRGB(colors.gray, 0.15)};
  display: flex;
  height: 2rem;
  justify-content: center;
  position: absolute;
  right: calc(50% - 1rem);
  width: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

export { StyledWrapper as Wrapper };
