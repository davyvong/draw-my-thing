import Icon from 'components/Icon';
import Title from 'components/Typography/Title';
import styled from 'styled-components';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
`;

const StyledIcon = styled(Icon)`
  margin-left: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const StyledLog = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const StyledTitle = styled(Title)`
  margin: 0 1rem 1rem 0rem;
  text-align: left;
`;

const StyledWrapper = styled.div`
  align-items: stretch;
  border-left: 1px solid ${hexToRGB(colors.gray, 0.25, { useAlpha: false })};
  display: flex;
  flex: 0.35;
  flex-direction: column;
  min-height: 100vh;
  padding: 1.5rem;
  position: relative;
`;

export {
  StyledForm as Form,
  StyledIcon as Icon,
  StyledLog as Log,
  StyledTitle as Title,
  StyledWrapper as Wrapper,
};
