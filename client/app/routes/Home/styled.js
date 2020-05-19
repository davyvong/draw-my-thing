import Button from 'components/Button';
import Container from 'components/Container';
import styled from 'styled-components';
import colors from 'styles/colors';

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1.5rem 0;
`;

const StyledButton = styled(Button)`
  min-height: 38px;

  &:not(:first-child) {
    margin-left: 1rem;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 480px;
`;

const StyledErrorMessage = styled.div`
  color: ${colors.red};
  font-size: 0.875rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

const StyledSpacer = styled.div`
  flex: 1;
`;

export {
  StyledActions as Actions,
  StyledButton as Button,
  StyledContainer as Container,
  StyledErrorMessage as ErrorMessage,
  StyledSpacer as Spacer,
};
