import Input from 'components/Input';
import React, { useCallback, useEffect, useRef } from 'react';

import Message from './components/Message';
import { Controls, Icon, Log, Title, Wrapper } from './styled';

const messages = new Array(5).fill().map((_, index) => ({
  id: String(index),
  text: 'hi',
  username: '$playerName',
}));

const ChatPanel = () => {
  const logRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

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

  return (
    <Wrapper>
      <Title>Chat</Title>
      <Log ref={logRef}>{messages.map(Message)}</Log>
      <Controls>
        <Input placeholder="Enter here" />
        <Icon>send</Icon>
      </Controls>
    </Wrapper>
  );
};

export default ChatPanel;
