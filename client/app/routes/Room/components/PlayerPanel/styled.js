import Subtitle from 'components/Typography/Subtitle';
import styled from 'styled-components';

const StyledTitle = styled(Subtitle)`
  margin: 0 0.5rem 0.5rem 0.5rem;
  text-align: left;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  min-height: 100vh;
  min-width: 260px;
  padding: 1.5rem;
`;

export {
  StyledTitle as Title,
  StyledWrapper as Wrapper,
};
