import Transition from 'components/Transition';
import isString from 'lodash/isString';
import PopperJS from 'popper.js';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { Popup } from './styled';

const Tooltip = ({ children, message, placement }) => {
  const anchor = useRef(null);
  const popper = useRef(null);
  const tooltip = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  function updatePosition() {
    if (!anchor.current || !tooltip.current) {
      return;
    }
    if (popper.current) {
      popper.current.destroy();
    }
    popper.current = new PopperJS(anchor.current, tooltip.current, {
      modifiers: {
        offset: {
          enabled: true,
          offset: '0, 8',
        },
      },
      placement,
    });
  }

  function onMouseEnter() {
    setShouldRender(true);
  }

  function onMouseLeave() {
    setShouldRender(false);
  }

  const hasMessage = isString(message) && message.length > 0;

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        ...children.props,
        onMouseEnter,
        onMouseLeave,
        onTouchStart: onMouseEnter,
        onTouchEnd: onMouseLeave,
        ref: anchor,
      })}
      {ReactDOM.createPortal(
        <Transition in={hasMessage && shouldRender} onIn={updatePosition} ref={tooltip}>
          <Popup>{message}</Popup>
        </Transition>,
        document.body,
      )}
    </React.Fragment>
  );
};

Tooltip.defaultProps = {
  placement: 'bottom',
};

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  message: PropTypes.string,
  placement: PropTypes.string,
};

export default Tooltip;
