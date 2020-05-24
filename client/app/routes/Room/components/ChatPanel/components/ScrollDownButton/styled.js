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
  transition: 150ms ease-in-out;
  width: 2rem;

  &:hover {
    cursor: pointer;
    height: 2.5rem;
    right: calc(50% - 1.25rem);
    width: 2.5rem;
  }
`;

export { StyledWrapper as Wrapper };
