import Input from 'components/Input';
import Loading from 'components/Loading';
import Label from 'components/Typography/Label';
import Subtitle from 'components/Typography/Subtitle';
import Title from 'components/Typography/Title';
import useGraphQL from 'hooks/useGraphQL';
import useProfile from 'hooks/useProfile';
import React, { useCallback, useMemo, useReducer } from 'react';
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
  const [, request] = useGraphQL();
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

  const onSubmitRoomCode = useCallback(
    event => {
      event.preventDefault();
      joinPrivateRoom();
    },
    [history, profile.state.displayName, state],
  );

  const createPrivateRoom = useCallback(async () => {
    if (!displayName) {
      dispatch({
        type: 'setDisplayNameError',
        error: messages.displayNameIsRequired,
      });
      return;
    }
    dispatch({
      type: 'setCreatingRoom',
      data: true,
    });
    request(
      {
        data: {
          query: queries.createRoom,
          variables: {
            input: {
              displayName: profile.state.displayName,
            },
          },
        },
      },
      data => {
        profile.dispatch({
          type: 'setProfile',
          data: data.updateAccount,
        });
        history.push(`/room/${data.createRoom.code}`);
      },
      () => {
        dispatch({
          type: 'setCreatingRoom',
          data: false,
        });
      },
    );
  }, [history, profile.state, state]);

  const joinPrivateRoom = useCallback(async () => {
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
    dispatch({
      type: 'setJoiningRoom',
      data: true,
    });
    request(
      {
        data: {
          query: queries.joinRoom(roomCode),
          variables: {
            input: {
              displayName: profile.state.displayName,
            },
          },
        },
      },
      data => {
        profile.dispatch({
          type: 'setProfile',
          data: data.updateAccount,
        });
        history.push(`/room/${data.joinRoom.code}`);
      },
      () => {
        dispatch({
          type: 'setJoiningRoom',
          data: false,
        });
        dispatch({
          type: 'setRoomCodeError',
          error: messages.roomCodeNotFound,
        });
      },
    );
  }, [history, profile.state, state]);

  const { displayNameError, roomCode, roomCodeError } = state;
  const { displayName } = profile.state;

  const pending = useMemo(() => state.creatingRoom || state.joiningRoom, [state.creatingRoom, state.joinPrivateRoom]);

  return (
    <Container>
      <Spacer />
      <Title>Draw My Thing</Title>
      <Subtitle>Guessing Game</Subtitle>
      <Label>Name</Label>
      <Input
        onBlur={onBlurDisplayName}
        onChange={onChangeDisplayName}
        placeholder="Jane Doe"
        value={displayName || ''}
      />
      {displayNameError && <ErrorMessage>{displayNameError}</ErrorMessage>}
      <Actions>
        <Button disabled>Play</Button>
        <Button disabled={pending} onClick={createPrivateRoom}>
          {state.creatingRoom ? <Loading color={colors.white} size="0.5rem" /> : 'Create Private Room'}
        </Button>
      </Actions>
      <Label>Room Code</Label>
      <form onSubmit={onSubmitRoomCode}>
        <Input onChange={onChangeRoomCode} placeholder="ABCDE" value={roomCode} />
      </form>
      {roomCodeError && <ErrorMessage>{roomCodeError}</ErrorMessage>}
      <Actions>
        <Button disabled={pending} onClick={joinPrivateRoom}>
          {state.joiningRoom ? <Loading color={colors.white} size="0.5rem" /> : 'Join Private Room'}
        </Button>
      </Actions>
      <Spacer />
    </Container>
  );
};

export default HomeRoute;
