import Icon from 'components/Icon';
import Subtitle from 'components/Typography/Subtitle';
import styled from 'styled-components';

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
  padding-left: 1rem;
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

const StyledTitle = styled(Subtitle)`
  margin: 0 1rem 0.5rem 1rem;
  text-align: left;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 348px;
  min-height: 100vh;
  min-width: 348px;
  padding: 1.5rem;
`;

export {
  StyledForm as Form,
  StyledIcon as Icon,
  StyledLog as Log,
  StyledTitle as Title,
  StyledWrapper as Wrapper,
};
