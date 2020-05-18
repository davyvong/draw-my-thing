import Container from 'components/Container';
import Subtitle from 'components/Typography/Subtitle';
import Title from 'components/Typography/Title';
import React, { useCallback, useState } from 'react';

const HomeRoute = () => {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const onChangeName = useCallback(event => {
    setName(event.target.value);
  }, []);

  const onChangeRoomCode = useCallback(event => {
    setRoomCode(event.target.value);
  }, []);

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
