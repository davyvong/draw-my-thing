import PropTypes from 'prop-types';
import React from 'react';

import Player from './components/Player';
import { Title, Wrapper } from './styled';

const PlayerPanel = ({ drawingPlayer, players }) => (
  <Wrapper>
    <Title>Players</Title>
    {players.map(player => (
      <Player {...player} isDrawing={player.id === drawingPlayer} key={player.id} />
    ))}
  </Wrapper>
);

PlayerPanel.propTypes = {
  drawingPlayer: PropTypes.string,
  players: PropTypes.array,
};

export default PlayerPanel;
