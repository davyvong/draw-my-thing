import Icon from 'components/Icon';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { System, Text, Timestamp, User, Wrapper } from './styled';

const Message = ({ id, sender, text, timestamp, type }) => {
  if (type === 'system') {
    return (
      <System>
        <Icon>arrow_forward</Icon>
        <span>{text}</span>
      </System>
    );
  }
  return (
    <Wrapper key={id}>
      <User>{sender}</User>
      <Text>{text}</Text>
      <Timestamp>{moment(timestamp * 1000).fromNow()}</Timestamp>
    </Wrapper>
  );
};

Message.propTypes = {
  id: PropTypes.string.isRequired,
  sender: PropTypes.string,
  text: PropTypes.string,
  timestamp: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Message;
