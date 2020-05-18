import Icon from 'components/Icon';
import PropTypes from 'prop-types';
import React from 'react';

import { Avatar, Name, Points, Wrapper } from './styled';

const Player = ({ avatar, color, id, points, username }) => (
  <Wrapper key={id}>
    <Avatar color={color} src={avatar}>
      <Icon>face</Icon>
    </Avatar>
    <div>
      <Name>{username}</Name>
      {points !== undefined && <Points>{points} Points</Points>}
    </div>
  </Wrapper>
);

Player.propTypes = {
  avatar: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  points: PropTypes.number,
  username: PropTypes.string.isRequired,
};

export default Player;
