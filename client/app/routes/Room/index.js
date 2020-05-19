import Title from 'components/Typography/Title';
import React from 'react';

import ChatPanel from './components/ChatPanel';
import DrawingPanel from './components/DrawingPanel';
import PlayerPanel from './components/PlayerPanel';
import { Container, Subtitle, Wrapper } from './styled';

const RoomRoute = () => {
  const secretWord = undefined;

  const title = secretWord ? `Your secret word is $secretWord` : `$playerName is drawing`;

  return (
    <Wrapper>
      <PlayerPanel />
      <Container>
        <Title>{title}</Title>
        <Subtitle>Room ID: $roomId</Subtitle>
        <DrawingPanel />
      </Container>
      <ChatPanel />
    </Wrapper>
  );
};

export default RoomRoute;
