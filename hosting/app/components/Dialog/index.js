import Transition from 'components/Transition';
import useDialog from 'hooks/useDialog';
import isFunction from 'lodash/isFunction';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import colors from 'styles/colors';

import { Backdrop, Button, Footer, Message, Title, Wrapper } from './styled';

const Dialog = () => {
  const { current: callbacks } = useRef({});
  const {
    disableBackdrop,
    message,
    open,
    primaryCallback,
    primaryText,
    secondaryCallback,
    secondaryText,
    title,
    ...dialog
  } = useDialog();

  const delay = 50;
  const duration = 100;

  const onBackdropClick = () => {
    if (!disableBackdrop) {
      dialog.updateState({ open: false });
    }
  };

  const onPrimaryClick = () => {
    if (callbacks.primary) {
      clearTimeout(callbacks.primary);
      callbacks.primary = null;
    }
    dialog.updateState({ open: false });
    if (isFunction(primaryCallback)) {
      callbacks.primary = setTimeout(primaryCallback, delay + duration);
    }
  };

  const onSecondaryClick = () => {
    if (callbacks.secondary) {
      clearTimeout(callbacks.secondary);
      callbacks.secondary = null;
    }
    dialog.updateState({ open: false });
    if (isFunction(secondaryCallback)) {
      callbacks.secondary = setTimeout(secondaryCallback, delay + duration);
    }
  };

  const onWrapperClick = event => {
    if (event) {
      event.stopPropagation();
    }
  };

  return ReactDOM.createPortal(
    <Transition delay={delay} duration={duration} in={open}>
      <Backdrop onClick={onBackdropClick}>
        <Wrapper onClick={onWrapperClick}>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <Footer>
            <Button color={colors.gray} onClick={onSecondaryClick}>
              {secondaryText}
            </Button>
            <Button onClick={onPrimaryClick}>{primaryText}</Button>
          </Footer>
        </Wrapper>
      </Backdrop>
    </Transition>,
    document.body,
  );
};

export default Dialog;
