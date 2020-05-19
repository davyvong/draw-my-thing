import Container from 'components/Container';
import Subtitle from 'components/Typography/Subtitle';
import Title from 'components/Typography/Title';
import React, { useCallback, useReducer } from 'react';

import { initialState } from './constants';
import reducer from './reducer';

const HomeRoute = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeName = useCallback(event => {
    dispatch({
      type: 'setName',
      data: event.target.value,
    });
  }, []);

  const onChangeRoomCode = useCallback(event => {
    dispatch({
      type: 'setRoomCode',
      data: event.target.value,
    });
  }, []);

  const { name, roomCode } = state;

  return (
    <Container>
      <Title>Draw My Thing</Title>
      <Subtitle>Guessing Game</Subtitle>
      <input onChange={onChangeName} placeholder="Name" value={name} />
      <br />
      <button>play</button>
      <br />
      <button>create private room</button>
      <hr />
      <input onChange={onChangeRoomCode} placeholder="Room Code" value={roomCode} />
      <br />
      <button>join private room</button>
    </Container>
  );
};

export default HomeRoute;
