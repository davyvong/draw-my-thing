import Button from 'components/Button';
import React from 'react';
import { withRouter } from 'react-router-dom';

const HomeButton = withRouter(({ history }) => {
  const onClick = () => {
    history.push('/');
  };
  return <Button onClick={onClick}>Go Home</Button>;
});

export default HomeButton;
