import Icon from 'components/Icon';
import PropTypes from 'prop-types';
import React from 'react';

import { Wrapper } from './styled';

const Message = ({ onClick, visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <Wrapper onClick={onClick}>
      <Icon>arrow_downward</Icon>
    </Wrapper>
  );
};

Message.propTypes = {
  onClick: PropTypes.func,
  visible: PropTypes.bool,
};

export default Message;
