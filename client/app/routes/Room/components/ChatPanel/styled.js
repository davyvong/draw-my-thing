import Input from 'components/Input';
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

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
`;

const StyledInput = styled(Input)`
  margin-right: 0.5rem;
`

const StyledLog = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const StyledTitle = styled(Title)`
  flex: 1;
  text-align: left;
`;

const StyledWrapper = styled.div`
  align-items: stretch;
  border-left: 1px solid ${hexToRGB(colors.gray, 0.25, { useAlpha: false })};
  display: flex;
  flex: 35;
  flex-direction: column;
  min-height: 100vh;
  padding: 1.5rem;
  position: relative;
`;

export {
  StyledForm as Form,
  StyledHeader as Header,
  StyledInput as Input,
  StyledLog as Log,
  StyledTitle as Title,
  StyledWrapper as Wrapper,
};
