import Button from 'components/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { Overlay } from './styled';

const GameStartOverlay = ({ onStart, roomCreator, visible }) => {
  if (!visible) {
    return null;
  }
  if (roomCreator) {
    return (
      <Overlay>
        <Button onClick={onStart}>Start Game</Button>
      </Overlay>
    );
  }
  return (
    <Overlay>
      <div>Waiting for room creator to start the game.</div>
    </Overlay>
  );
};

GameStartOverlay.propTypes = {
  onStart: PropTypes.func,
  roomCreator: PropTypes.bool,
  visible: PropTypes.bool,
};

export default GameStartOverlay;
