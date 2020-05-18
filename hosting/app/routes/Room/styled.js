import Subtitle from 'components/Typography/Subtitle';
import styled from 'styled-components';

const StyledContainer = styled.div`
  flex: 1;
`;

const StyledSubtitle = styled(Subtitle)`
  margin-bottom: 1.5rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  max-height: 100vh;
`;

export { StyledContainer as Container, StyledSubtitle as Subtitle, StyledWrapper as Wrapper };
