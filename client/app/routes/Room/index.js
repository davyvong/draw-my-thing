import useGraphQL from 'hooks/useGraphQL';
import useProfile from 'hooks/useProfile';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import ChatPanel from './components/ChatPanel';
import DrawingPanel from './components/DrawingPanel';
import { initialState } from './constants';
import * as queries from './queries';
import reducer from './reducer';
import { Container, Header, Subtitle, Title, Wrapper } from './styled';

const RoomRoute = ({ match }) => {
  const drawingPanel = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [, request] = useGraphQL();
  const profile = useProfile();

  const cannotDraw = useMemo(() => profile.state.id !== state.drawingPlayer, [
    profile.state,
    state.drawingPlayer,
    state.gameStarted,
  ]);

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
          query: queries.joinRoom(code),
          variables: {
            input: {
              displayName: profile.state.displayName,
            },
          },
        },
      },
      data => {
        dispatch({
          type: 'joinRoom',
          data: data.joinRoom,
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
          const { lines, strokeColor, strokeWidth, tool } = roomEvents.data;
          lines.forEach(line => {
            drawingPanel.current.drawLine(line.start, line.stop, strokeColor, strokeWidth, tool);
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

  const updateTool = useCallback(async tool => {
    profile.dispatch({
      type: 'setTool',
      data: tool,
    });
    // return request({
    //   data: {
    //     query: queries.updateTool(tool),
    //   },
    // });
  }, []);

  const updateStrokeColor = useCallback(async color => {
    profile.dispatch({
      type: 'setStrokeColor',
      data: color,
    });
    // return request({
    //   data: {
    //     query: queries.updateStrokeColor(color),
    //   },
    // });
  }, []);

  const updateStrokeWidth = useCallback(async width => {
    profile.dispatch({
      type: 'setStrokeWidth',
      data: width,
    });
    // return request({
    //   data: {
    //     query: queries.updateStrokeWidth(width),
    //   },
    // });
  }, []);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>{title}</Title>
          <Subtitle>Room Code: {code}</Subtitle>
        </Header>
        <DrawingPanel
          disabled={cannotDraw}
          ref={drawingPanel}
          tool={profile.state.tool}
          strokeColor={profile.state.strokeColor}
          strokeWidth={profile.state.strokeWidth}
          updateTool={updateTool}
          updateStrokeColor={updateStrokeColor}
          updateStrokeWidth={updateStrokeWidth}
          uploadLines={sendDrawing}
        />
      </Container>
      <ChatPanel
        drawingPlayer={state.drawingPlayer}
        messages={state.chat}
        players={state.playerObjs}
        sendMessage={sendMessage}
      />
    </Wrapper>
  );
};

RoomRoute.propTypes = {
  match: PropTypes.object,
};

export default RoomRoute;
