import Title from 'components/Typography/Title';
import React, { useCallback, useEffect } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import ChatPanel from './components/ChatPanel';
import DrawingPanel from './components/DrawingPanel';
import PlayerPanel from './components/PlayerPanel';
import * as queries from './queries';
import { Container, Subtitle, Wrapper } from './styled';

const RoomRoute = () => {
  const secretWord = undefined;

  const title = secretWord ? `Your secret word is $secretWord` : `$playerName is drawing`;

  const onRoomEvent = useCallback(({ data }) => {
    console.log(data.roomEvents);
  }, []);

  useEffect(() => {
    const wsClient = new SubscriptionClient(process.env.GRAPHQL_WS_URL, {
      reconnect: true,
    });
    wsClient.onConnected(() => {
      const subscription = wsClient.request({
        query: queries.subscribeRoomEvents,
      });
      subscription.subscribe(onRoomEvent);
    });
    return () => {
      wsClient.unsubscribeAll();
      wsClient.close();
    };
  }, []);

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
