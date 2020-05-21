import Input from 'components/Input';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Message from './components/Message';
import { Form, Icon, Log, Title, Wrapper } from './styled';

const ChatPanel = ({ messages, players, sendMessage }) => {
  const logRef = useRef(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(
    (options = {}) => {
      if (logRef.current) {
        logRef.current.scrollTo({
          ...options,
          top: logRef.current.scrollHeight,
        });
      }
    },
    [logRef],
  );

  const onChangeInput = useCallback(event => {
    setInput(event.target.value);
  }, []);

  const submitMessage = useCallback(
    async event => {
      if (event) {
        event.preventDefault();
      }
      if (input) {
        sendMessage(input);
        setInput('');
      }
    },
    [input],
  );

  const renderMessage = useCallback(
    message => {
      const sender = get(players, message.sender, {});
      return <Message {...message} sender={sender.displayName} />;
    },
    [messages],
  );

  return (
    <Wrapper>
      <Title>Chat</Title>
      <Log ref={logRef}>{messages.map(renderMessage)}</Log>
      <Form onSubmit={submitMessage}>
        <Input onChange={onChangeInput} placeholder="Enter here" value={input} />
        <Icon onClick={submitMessage}>send</Icon>
      </Form>
    </Wrapper>
  );
};

ChatPanel.defaultProps = {
  messages: [],
};

ChatPanel.propTypes = {
  messages: PropTypes.array,
  players: PropTypes.object,
  sendMessage: PropTypes.func,
};

export default ChatPanel;
