import Title from 'components/Typography/Title';
import useGraphQL from 'hooks/useGraphQL';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import ChatPanel from './components/ChatPanel';
import DrawingPanel from './components/DrawingPanel';
import PlayerPanel from './components/PlayerPanel';
import { initialState } from './constants';
import * as queries from './queries';
import reducer from './reducer';
import { Container, Subtitle, Wrapper } from './styled';

const RoomRoute = ({ match }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [, request] = useGraphQL();

  const secretWord = undefined;

  const title = secretWord ? `Your secret word is $secretWord` : `$playerName is drawing`;

  const code = useMemo(() => get(match, 'params.roomId'), [match]);

  useEffect(() => {
    request(
      {
        data: {
          query: queries.findRoom(code),
        },
      },
      data => {
        dispatch({
          type: 'foundRoom',
          data: data.findRoom,
        });
      },
    );
    const wsClient = new SubscriptionClient(process.env.GRAPHQL_WS_URL, {
      reconnect: true,
    });
    wsClient.onConnected(() => {
      const subscription = wsClient.request({
        query: queries.roomEvents,
        variables: { code },
      });
      subscription.subscribe(event => dispatch(event.data.roomEvents));
    });
    return () => {
      wsClient.unsubscribeAll();
      wsClient.close();
    };
  }, [code]);

  const players = useMemo(() => Object.values(state.playerObjs), [state]);

  const sendMessage = useCallback(
    async message =>
      request({
        data: {
          query: queries.sendMessage({ code, message }),
        },
      }),
    [],
  );

  return (
    <Wrapper>
      <PlayerPanel players={players} />
      <Container>
        <Title>{title}</Title>
        <Subtitle>Room Code: {code}</Subtitle>
        <DrawingPanel />
      </Container>
      <ChatPanel messages={state.chat} players={state.playerObjs} sendMessage={sendMessage} />
    </Wrapper>
  );
};

RoomRoute.propTypes = {
  match: PropTypes.object,
};

export default RoomRoute;
