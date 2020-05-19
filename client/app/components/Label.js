import styled from 'styled-components';
import colors from 'styles/colors';

const StyledLabel = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Google Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  hyphens: auto;
  margin-bottom: 0.5rem;
  min-width: 100px;
  word-break: break-word;
  word-wrap: break-word;
  @media screen and (min-width: 500px) {
    width: 200px;
  }
  &:after {
    color: ${colors.red};
    content: "${({ required }) => (required ? ' *' : '')}";
    white-space: pre;
  }
`;

export default StyledLabel;
