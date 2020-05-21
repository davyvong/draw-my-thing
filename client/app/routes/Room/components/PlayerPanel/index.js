import PropTypes from 'prop-types';
import React from 'react';

import Player from './components/Player';
import { Title, Wrapper } from './styled';

const PlayerPanel = ({ players }) => (
  <Wrapper>
    <Title>Players</Title>
    {players.map(Player)}
  </Wrapper>
);

PlayerPanel.propTypes = {
  players: PropTypes.array,
};

export default PlayerPanel;
