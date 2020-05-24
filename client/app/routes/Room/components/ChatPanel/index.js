import Icon from 'components/Icon';
import IconButton from 'components/IconButton';
import Popover from 'components/Popover';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import PlayerPanel from '../PlayerPanel';
import Message from './components/Message';
import ScrollDownButton from './components/ScrollDownButton';
import { Form, Header, Input, Log, Title, Wrapper } from './styled';

const ChatPanel = ({ drawingPlayer, messages, players, sendMessage }) => {
  const logRef = useRef();
  const playerRef = useRef();
  const [input, setInput] = useState('');
  const [isBottom, setIsBottom] = useState(true);
  const [showPlayers, setShowPlayers] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 150);
  }, [messages]);

  useEffect(() => {
    const onScroll = () => {
      const isNewPositionAtBottom =
        logRef.current.scrollHeight - logRef.current.scrollTop - logRef.current.clientHeight < 50;
      if (isBottom && !isNewPositionAtBottom) {
        setIsBottom(false);
      } else if (!isBottom && isNewPositionAtBottom) {
        setIsBottom(true);
      }
    };
    logRef.current.addEventListener('scroll', onScroll);
    return () => {
      logRef.current.removeEventListener('scroll', onScroll);
    };
  }, [isBottom]);

  const scrollToBottom = useCallback(
    (options = {}) => {
      logRef.current.scrollTo({
        ...options,
        top: logRef.current.scrollHeight,
      });
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
      return <Message {...message} key={message.id} sender={sender.displayName} />;
    },
    [messages],
  );

  const playerList = useMemo(() => Object.values(players), [players]);

  const showPlayerList = useCallback(() => {
    setShowPlayers(true);
  }, []);

  const hidePlayerList = useCallback(() => {
    setShowPlayers(false);
  }, []);

  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          <Title>Chat</Title>
          <IconButton onClick={showPlayerList} ref={playerRef}>
            <Icon>group</Icon>
          </IconButton>
        </Header>
        <Log ref={logRef}>{messages.map(renderMessage)}</Log>
        <ScrollDownButton onClick={() => scrollToBottom({ behavior: 'smooth' })} visible={!isBottom} />
        <Form onSubmit={submitMessage}>
          <Input onChange={onChangeInput} placeholder="Enter here" value={input} />
          <IconButton>
            <Icon onClick={submitMessage}>send</Icon>
          </IconButton>
        </Form>
      </Wrapper>
      <Popover anchor={playerRef.current} open={showPlayers} onClose={hidePlayerList}>
        <PlayerPanel drawingPlayer={drawingPlayer} players={playerList} />
      </Popover>
    </React.Fragment>
  );
};

ChatPanel.defaultProps = {
  messages: [],
};

ChatPanel.propTypes = {
  drawingPlayer: PropTypes.string,
  messages: PropTypes.array,
  players: PropTypes.object,
  sendMessage: PropTypes.func,
};

export default ChatPanel;
