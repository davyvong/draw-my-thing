import Input from 'components/Input';
import Label from 'components/Label';
import Loading from 'components/Loading';
import Subtitle from 'components/Typography/Subtitle';
import Title from 'components/Typography/Title';
import useGraphQL from 'hooks/useGraphQL';
import useProfile from 'hooks/useProfile';
import React, { useCallback, useReducer } from 'react';
import { useHistory } from 'react-router';
import colors from 'styles/colors';

import { initialState } from './constants';
import messages from './messages';
import * as queries from './queries';
import reducer from './reducer';
import { Actions, Button, Container, ErrorMessage, Spacer } from './styled';

const HomeRoute = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const profile = useProfile();
  const [graphQL, request] = useGraphQL();
  const history = useHistory();

  const onBlurDisplayName = useCallback(() => {
    dispatch({
      type: 'setDisplayNameError',
      error: displayName ? null : messages.displayNameIsRequired,
    });
  }, [profile.state.displayName]);

  const onChangeDisplayName = useCallback(event => {
    profile.dispatch({
      type: 'setDisplayName',
      data: event.target.value,
    });
  }, []);

  const onChangeRoomCode = useCallback(event => {
    dispatch({
      type: 'setRoomCode',
      data: event.target.value.toUpperCase(),
    });
  }, []);

  const createPrivateRoom = useCallback(() => {
    if (!displayName) {
      dispatch({
        type: 'setDisplayNameError',
        error: messages.displayNameIsRequired,
      });
      return;
    }
    request(
      {
        data: {
          query: queries.createRoom,
        },
      },
      data => {
        if (data.createRoom) {
          history.push(`/room/${data.createRoom.code}`);
        }
      },
    );
  }, []);

  const joinPrivateRoom = useCallback(() => {
    if (!displayName) {
      dispatch({
        type: 'setDisplayNameError',
        error: messages.displayNameIsRequired,
      });
    }
    if (!roomCode) {
      dispatch({
        type: 'setRoomCodeError',
        error: messages.roomCodeIsRequired,
      });
    }
    if (!roomCode || !displayName) {
      return;
    }
    request(
      {
        data: {
          query: queries.joinRoom(roomCode),
        },
      },
      data => {
        if (data.joinRoom) {
          history.push(`/room/${data.joinRoom.code}`);
        }
      },
      () => {
        dispatch({
          type: 'setRoomCodeError',
          error: messages.roomCodeNotFound,
        });
      },
    );
  }, [history, profile.state.displayName, state]);

  const { displayNameError, roomCode, roomCodeError } = state;
  const { displayName } = profile.state;

  return (
    <Container>
      <Spacer />
      <Title>Draw My Thing</Title>
      <Subtitle>Guessing Game</Subtitle>
      <Label>Name</Label>
      <Input onBlur={onBlurDisplayName} onChange={onChangeDisplayName} placeholder="Jane Doe" value={displayName} />
      {displayNameError && <ErrorMessage>{displayNameError}</ErrorMessage>}
      <Actions>
        <Button disabled>Play</Button>
        <Button disabled={graphQL.pending} onClick={createPrivateRoom}>
          {graphQL.pending ? <Loading color={colors.white} /> : 'Create Private Room'}
        </Button>
      </Actions>
      <Label>Room Code</Label>
      <Input onChange={onChangeRoomCode} placeholder="ABCDE" value={roomCode} />
      {roomCodeError && <ErrorMessage>{roomCodeError}</ErrorMessage>}
      <Actions>
        <Button disabled={graphQL.pending} onClick={joinPrivateRoom}>
          {graphQL.pending ? <Loading color={colors.white} /> : 'Join Private Room'}
        </Button>
      </Actions>
      <Spacer />
    </Container>
  );
};

export default HomeRoute;
