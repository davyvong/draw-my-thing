import React, { useCallback, useEffect, useRef } from 'react';

import Message from './components/Message';
import { Input, Log, Wrapper } from './styled';

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
      <Log ref={logRef}>{messages.map(Message)}</Log>
      <Input placeholder="Enter here" />
    </Wrapper>
  );
};

export default ChatPanel;
