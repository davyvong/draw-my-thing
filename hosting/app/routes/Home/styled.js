import Button from 'components/Button';
import Container from 'components/Container';
import styled from 'styled-components';

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1.5rem 0;
`;

const StyledButton = styled(Button)`
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

const StyledSpacer = styled.div`
  flex: 1;
`;

export {
  StyledActions as Actions,
  StyledButton as Button,
  StyledContainer as Container,
  StyledSpacer as Spacer,
};
