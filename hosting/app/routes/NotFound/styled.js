import Container from 'components/Container';
import Subtitle from 'components/Typography/Subtitle';
import Title from 'components/Typography/Title';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin: 0 auto;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 1rem;
`;

const StyledSubtitle = styled(Subtitle)`
  margin-bottom: 1.5rem;
`;

const StyledActions = styled.div`
  display: flex;
  flex: 0;
  flex-direction: row;
  justify-content: center;

  & > :not(:first-child) {
    margin-left: 1.5rem;
  }
`;

const StyledImage = styled.img`
  margin: 3rem auto;
`;

export {
  StyledActions as Actions,
  StyledContainer as Container,
  StyledImage as Image,
  StyledSubtitle as Subtitle,
  StyledTitle as Title,
};
