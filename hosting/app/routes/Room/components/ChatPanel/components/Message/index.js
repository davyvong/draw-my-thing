import PropTypes from 'prop-types';
import React from 'react';

import { Text, User, Wrapper } from './styled';

const Message = ({ id, text, username }) => (
  <Wrapper key={id}>
    <User>{username}</User>
    <Text>{text}</Text>
  </Wrapper>
);

Message.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default Message;
