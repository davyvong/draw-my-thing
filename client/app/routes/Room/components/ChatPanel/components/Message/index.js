import PropTypes from 'prop-types';
import React from 'react';

import { Text, User, Wrapper } from './styled';

const Message = ({ id, sender, text }) => (
  <Wrapper key={id}>
    <User>{sender}</User>
    <Text>{text}</Text>
  </Wrapper>
);

Message.propTypes = {
  id: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default Message;
