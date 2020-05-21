import Title from 'components/Typography/Title';
import useGraphQL from 'hooks/useGraphQL';
import useProfile from 'hooks/useProfile';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import ChatPanel from './components/ChatPanel';
import DrawingPanel from './components/DrawingPanel';
import PlayerPanel from './components/PlayerPanel';
import { initialState } from './constants';
import * as queries from './queries';
import reducer from './reducer';
import { Container, Subtitle, Wrapper } from './styled';

const RoomRoute = ({ match }) => {
  const drawingPanel = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [, request] = useGraphQL();
  const profile = useProfile();

  const cannotDraw = useMemo(() => profile.state.id !== state.drawingPlayer, [state.drawingPlayer, state.gameStarted]);

  const drawingPlayerName = useMemo(() => get(state.playerObjs, state.drawingPlayer, {}).displayName, [
    state.drawingPlayer,
    state.playerObjs,
  ]);

  const title = useMemo(() => {
    if (!state.gameStarted) {
      return 'Draw My Thing';
    }
    if (cannotDraw) {
      return `${drawingPlayerName} is drawing`;
    }
    return `Your secret word is ${state.secretWord}`;
  }, [drawingPlayerName, cannotDraw, state.gameStarted, state.secretWord]);

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
      subscription.subscribe(event => {
        const { roomEvents } = event.data;
        if (roomEvents.type === 'drawing') {
          roomEvents.data.forEach(line => {
            drawingPanel.current.drawLine(line.start, line.stop, '#EE92C2');
          });
        } else {
          dispatch(roomEvents);
        }
      });
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
    [code],
  );

  const sendDrawing = useCallback(
    async drawing =>
      request({
        data: {
          query: queries.sendDrawing({ code }),
          variables: { input: drawing },
        },
      }),
    [code],
  );

  return (
    <Wrapper>
      <PlayerPanel drawingPlayer={state.drawingPlayer} players={players} />
      <Container>
        <Title>{title}</Title>
        <Subtitle>Room Code: {code}</Subtitle>
        <DrawingPanel disabled={cannotDraw} ref={drawingPanel} uploadLines={sendDrawing} />
      </Container>
      <ChatPanel messages={state.chat} players={state.playerObjs} sendMessage={sendMessage} />
    </Wrapper>
  );
};

RoomRoute.propTypes = {
  match: PropTypes.object,
};

export default RoomRoute;
