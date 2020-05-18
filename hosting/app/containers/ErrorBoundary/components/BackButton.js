import Button from 'components/Button';
import React from 'react';
import { withRouter } from 'react-router-dom';

const BackButton = withRouter(({ history }) => {
  const onClick = () => {
    if (history.length > 1) {
      history.goBack();
    } else {
      history.push('/');
    }
  };
  return <Button onClick={onClick}>Go Back</Button>;
});

export default BackButton;
