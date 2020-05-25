import Icon from 'components/Icon';
import Tooltip from 'components/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';

import { Wrapper } from './styled';

const Message = ({ onClick, visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <Tooltip message="Scroll to bottom">
      <Wrapper onClick={onClick}>
        <Icon>arrow_downward</Icon>
      </Wrapper>
    </Tooltip>
  );
};

Message.propTypes = {
  onClick: PropTypes.func,
  visible: PropTypes.bool,
};

export default Message;
