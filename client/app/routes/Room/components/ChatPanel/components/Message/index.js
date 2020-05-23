import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { Text, Timestamp, User, Wrapper } from './styled';

const Message = ({ id, sender, text, timestamp }) => (
  <Wrapper key={id}>
    <User>{sender}</User>
    <Text>{text}</Text>
    <Timestamp>{moment(timestamp * 1000).fromNow()}</Timestamp>
  </Wrapper>
);

Message.propTypes = {
  id: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Message;
