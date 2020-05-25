import Input from 'components/Input';
import Transition from 'components/Transition';
import useProfile from 'hooks/useProfile';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import messages from './messages';
import { Backdrop, Button, ErrorMessage, Footer, Form, Message, Title, Wrapper } from './styled';

const ProfileModal = ({ code, onClose, open, ...props }) => {
  const [error, setError] = useState();
  const profile = useProfile();

  const delay = 50;
  const duration = 100;

  const onChange = event => {
    profile.dispatch({
      type: 'setDisplayName',
      data: event.target.value,
    });
  };

  const onWrapperClick = event => {
    if (event) {
      event.stopPropagation();
    }
  };

  const onSubmit = event => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    if (profile.state.displayName) {
      props.onSubmit(profile.state.displayName);
      onClose();
    } else {
      setError(messages.invalidDisplayName);
    }
  };

  return ReactDOM.createPortal(
    <Transition delay={delay} duration={duration} in={open}>
      <Backdrop>
        <Wrapper onClick={onWrapperClick}>
          <Title>Room Code: {code}</Title>
          <Message>{messages.requiredDisplayName}</Message>
          <Form onSubmit={onSubmit}>
            <Input onChange={onChange} placeholder="Name" value={profile.state.displayName} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Form>
          <Footer>
            <Button onClick={onSubmit}>Set name</Button>
          </Footer>
        </Wrapper>
      </Backdrop>
    </Transition>,
    document.body,
  );
};

export default ProfileModal;
