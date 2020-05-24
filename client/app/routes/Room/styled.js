import Subtitle from 'components/Typography/Subtitle';
import Title from 'components/Typography/Title';
import styled from 'styled-components';

const StyledContainer = styled.div`
  flex: 0.65;
  margin: 1.5rem 0;
  max-height: 100vh;
  max-width: 1024px;
  overflow: auto;
`;

const StyledHeader = styled.div`
  align-item: flex-start;
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
`;

const StyledSubtitle = styled(Subtitle)`
  margin-bottom: 0rem;
  text-align: right;
`;

const StyledTitle = styled(Title)`
  flex: 1;
  margin-bottom: 0rem;
  text-align: left;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  max-height: 100vh;
`;

export {
  StyledContainer as Container,
  StyledHeader as Header,
  StyledSubtitle as Subtitle,
  StyledTitle as Title,
  StyledWrapper as Wrapper,
};
