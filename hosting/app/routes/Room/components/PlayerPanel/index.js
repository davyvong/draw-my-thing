import React from 'react';

import Player from './components/Player';
import { Wrapper } from './styled';

const players = new Array(5).fill().map((_, index) => ({
  id: String(index),
  points: 0,
  username: '$playerName',
}));

const PlayerPanel = () => <Wrapper>{players.map(Player)}</Wrapper>;

export default PlayerPanel;
