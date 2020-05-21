import Icon from 'components/Icon';
import PropTypes from 'prop-types';
import React from 'react';

import { Avatar, Name, Points, Wrapper } from './styled';

const Player = ({ avatar, color, displayName, id, points }) => (
  <Wrapper key={id}>
    <Avatar color={color} src={avatar}>
      <Icon>face</Icon>
    </Avatar>
    <div>
      <Name>{displayName}</Name>
      {points !== undefined && <Points>{points} Points</Points>}
    </div>
  </Wrapper>
);

Player.propTypes = {
  avatar: PropTypes.string,
  color: PropTypes.string,
  displayName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  points: PropTypes.number,
};

export default Player;
