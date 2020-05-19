import Input from 'components/Input';
import Label from 'components/Label';
import Subtitle from 'components/Typography/Subtitle';
import Title from 'components/Typography/Title';
import React, { useCallback, useReducer } from 'react';

import { initialState } from './constants';
import reducer from './reducer';
import { Actions, Button, Container, Spacer } from './styled';

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
      <Spacer />
      <Title>Draw My Thing</Title>
      <Subtitle>Guessing Game</Subtitle>
      <Label>Name</Label>
      <Input onChange={onChangeName} placeholder="Jane Doe" value={name} />
      <Actions>
        <Button>Play</Button>
        <Button>Create Private Room</Button>
      </Actions>
      <Label>Room Code</Label>
      <Input onChange={onChangeRoomCode} placeholder="ABCDE" value={roomCode} />
      <Actions>
        <Button>Join Private Room</Button>
      </Actions>
      <Spacer />
    </Container>
  );
};

export default HomeRoute;
