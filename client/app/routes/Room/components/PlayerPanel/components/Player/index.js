import Icon from 'components/Icon';
import Tooltip from 'components/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';

import { Avatar, Name, Wrapper } from './styled';

const Player = ({ avatar, color, displayName, isDrawing, points }) => {
  if (!displayName) {
    return null;
  }
  return (
    <Tooltip message={points !== undefined ? `${points} Points` : ''}>
      <Wrapper>
        <Avatar color={color} src={avatar}>
          <Icon>{isDrawing ? 'edit' : 'face'}</Icon>
        </Avatar>
        <Name>{displayName}</Name>
      </Wrapper>
    </Tooltip>
  );
};

Player.propTypes = {
  avatar: PropTypes.string,
  color: PropTypes.string,
  displayName: PropTypes.string.isRequired,
  isDrawing: PropTypes.bool,
  points: PropTypes.number,
};

export default Player;
