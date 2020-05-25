import Button from 'components/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { Overlay } from './styled';

const GameStartOverlay = ({ onStart, visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <Overlay>
      <Button onClick={onStart}>Start Game</Button>
    </Overlay>
  );
};

GameStartOverlay.propTypes = {
  onStart: PropTypes.func,
  visible: PropTypes.bool,
};

export default GameStartOverlay;
